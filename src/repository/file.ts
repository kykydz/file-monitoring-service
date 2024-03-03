import { BaseRepository } from './base';
import { ILogger } from '../utils/logger';
import { DataSource } from 'typeorm';
import { File } from '../entity/files';

export class FileRepository extends BaseRepository<File> {
	constructor(dataSource: DataSource, logger: ILogger) {
		super(dataSource, File, logger);
	}

	// add custom method
}
