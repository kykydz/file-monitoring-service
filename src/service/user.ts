import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from '../entity/user';
import { uuid } from 'uuidv4';
import { UserRepository } from '../repository/user';

export class UserService {
	protected repository: UserRepository;

	constructor(repository: UserRepository) {
		this.repository = repository;
	}

	async create(data: Partial<User>) {
		const userData = {
			id: String(uuid()),
			name: data.name,
			quota: data.quota,
			quota_used: 0
		};

		const result = await this.repository.save(userData);
		return result;
	}

	async findById(userId: string) {
		try {
			const result = await this.repository.getOne({
				where: {
					id: userId
				}
			});

			return result
		} catch (error) {
			throw new Error(`Can not find user by id ${userId}`);
		}
	}

	async delete(data: any) {
		const query: FindOptionsWhere<User> = {
			id: data.id,
		};

		const result = await this.repository.delete(query);
		return result;
	}
}
