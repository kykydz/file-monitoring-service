import { DataSource, DataSourceOptions } from 'typeorm';
import { ILogger } from '../../utils/logger';
import { sqliteOptions } from './ormconfig';

const sqliteDataSource: DataSourceOptions = sqliteOptions;

export class AppDataSource {
	protected logger: ILogger;

	constructor(logger: ILogger) {
		this.logger = logger;
	}

	// This method initializes the data source
	async initDatasource(): Promise<DataSource> {
		let dataSource: DataSource;
		try {
			dataSource = await new DataSource(sqliteDataSource).initialize();
			this.logger.info('Connected to datasource');
		} catch (error) {
			this.logger.error('Failed to initialize data source', {}, error);
			throw new Error('Failed to initialize data source');
		}
		return dataSource;
	}
}
