import { User } from '../entity/user';
import { BaseRepository } from './base';
import { ILogger } from '../utils/logger';
import { DataSource } from 'typeorm';

export class UserRepository extends BaseRepository<User> {
	constructor(dataSource: DataSource, logger: ILogger) {
		super(dataSource, User, logger);
	}

	// add custom method
}
