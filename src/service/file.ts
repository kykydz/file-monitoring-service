import { User } from '../entity/user';
import { UserRepository } from '../repository/user';
import { FileRepository } from '../repository/file';
import { AWSS3 } from '../client/aws-s3';
import { File } from '../entity/files';
import { uuid } from 'uuidv4';
import { Logger } from '../utils/logger';

export class FileService {
	protected userRepository: UserRepository;
	protected fileRepository: FileRepository;
	protected storageClient: AWSS3;
	logger: Logger

	constructor(
		userRepository: UserRepository,
		fileRepository: FileRepository,
		storageClient: AWSS3,
		logger?: Logger
	) {
		this.userRepository = userRepository;
		this.fileRepository = fileRepository;
		this.storageClient = storageClient;
		this.logger = logger;
	}

	async upload(userId: string, file: Partial<File>) {
		try {
			// check if user valid
			const user = await this.isValidUser(userId);

			// check if user still have quota left
			await this.checkUserQuotaLeft(user, file);

			// upload to S3
			const fileUploaded = await this.storageClient.uploadS3Mock({
				name: file.name,
				userId
			})

			// save data
			const fileData = {
				id: String(uuid()),
				name: file.name,
				path: fileUploaded.message.path,
				size: file.size,
				user
			} as File;
			const fileSaved = await this.fileRepository.save(fileData);

			// update quota of user
			await this.userRepository.update({
				id: user.id
			}, {
				quota_used: user.quota - fileData.size
			});

			return fileSaved;
		} catch (error) {
			this.logger.error('There is error on uploading and saving file', {
				userId,
				file
			}, error)
			throw new Error(error);
		}
	}

	async isValidUser(userId: string): Promise<User | null> {
		try {
			const result = await this.userRepository.getOne({
				where: {
					id: userId
				}
			});

			return result
		} catch (error) {
			throw new Error(`Can not find user by id ${userId}`);
		}
	}

	async checkUserQuotaLeft(user: User, file: Partial<File>) {
		const quotaLeft = user.quota - user.quota_used;
		if (quotaLeft < file.size) {
			throw new Error(`Insufficient user quota (${quotaLeft} from ${user.quota}). And file trying to be save ${file.size}`);
		}

		return true;
	}
}
