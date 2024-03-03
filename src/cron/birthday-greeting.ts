import { DataSource } from 'typeorm';
import { UserRepository } from '../repository/user';
import { Greeting } from '../service/file';
import { ILogger } from '../utils/logger';
import { GreetingRepository } from '../repository/file';

export const birthdayGreetingCron = async (
	dataSource: DataSource,
	logger: ILogger
) => {
	const userRepository = new UserRepository(dataSource, logger);
	const greetingRepository = new GreetingRepository(dataSource, logger);

	const greeting = new Greeting(userRepository, greetingRepository);

	return await greeting.birthdayEmail();
};
