import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import { User } from '../../entity/user';
import { File } from '../../entity/files';

export const sqliteOptions: SqliteConnectionOptions = {
	type: 'sqlite',
	database: 'database.sqlite',
	synchronize: true,
	logging: true,
	entities: [User, File],
	migrationsTableName: 'migration_record',
	migrations: ['../../migration/**/*.ts'],
};
