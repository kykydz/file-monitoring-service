import { UserRepository } from '../repository/user';
import { FileRepository } from '../repository/file';

interface IDataUpload {
    name: string,
    userId: string
}

interface IReponse {
    status: number,
    message: IDataUpload | any
};

export class AWSS3 {
    protected userRepository: UserRepository;
    protected fileRepository: FileRepository;

    async uploadS3Mock(data: IDataUpload): Promise<IReponse> {
        return new Promise((resolve, reject) => {
            const randomValues = Math.random() * 10;
            if (randomValues > 9) {
                reject({
                    status: 500,
                    message: 'Something random error'
                });
            } else {
                resolve({
                    status: 200,
                    message: {
                        name: data.name,
                        path: `https://awss3.mock.com/my/files/${data.userId}/${data.name}`
                    }
                })
            }
        });
    }

    async getS3File(fileName: string): Promise<IReponse> {
        return new Promise((resolve, reject) => {
            const randomValues = Math.random() * 10;
            if (randomValues > 9) {
                reject({
                    status: 500,
                    message: 'Something random error'
                });
            } else {
                resolve({
                    status: 200,
                    message: {
                        name: 'random_name',
                        path: `https://awss3.mock.com/my/files/some/path/${fileName}.jpg`,
                        size: 10000
                    }
                })
            }
        });
    }

    async deleteFile(fileName: string): Promise<IReponse> {
        return new Promise((resolve, reject) => {
            const randomValues = Math.random() * 10;
            if (randomValues > 9) {
                reject({
                    status: 500,
                    message: 'Something random error'
                });
            } else {
                resolve({
                    status: 200,
                    message: {
                        name: 'random_name',
                        path: `https://awss3.mock.com/my/files/some/path/${fileName}.jpg`,
                        size: 10000,
                        deleted: true
                    }
                })
            }
        });
    }
}
