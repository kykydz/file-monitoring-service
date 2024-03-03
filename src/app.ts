import { UserController } from './controller/user';
import 'reflect-metadata';

import express, { Request, Response, Router } from 'express';

import bodyParser from 'body-parser';
import { UserRepository } from './repository/user';
import { UserService } from './service/user';
import { requestLogger } from './middleware/logger';
import { AppDataSource } from './config/orm/typorm';
import { Logger } from './utils/logger';
import { ENV } from './config/environment';
import { HealthCheckController } from './controller/healthcheck';
import { FileRepository } from './repository/file';
import { FileService } from './service/file';
import { AWSS3 } from './client/aws-s3';
import { FileController } from './controller/file';
import { fileUploadMiddleware } from './middleware/file-handler';

const logger = new Logger(ENV);

const setupRoutes = async (app: any) => {
	// init DataSource
	const appDatasource = await new AppDataSource(logger).initDatasource();

	// init client
	const storageClient = new AWSS3();

	// init core dependency
	const userRepository = new UserRepository(appDatasource, logger);
	const fileRepository = new FileRepository(appDatasource, logger);

	const userService = new UserService(userRepository);
	const fileService = new FileService(userRepository, fileRepository, storageClient, logger);

	const healthCheckController = new HealthCheckController();
	const userController = new UserController(userService);
	const fileController = new FileController(fileService);

	app.use(requestLogger);

	app.use('/healthcheck', healthCheckController.router);
	app.use('/api/user', userController.router);
	app.use('/api/file', fileUploadMiddleware, fileController.router);

	app.use('*', (_: Request, res: Response) => {
		res.status(401).send('Unauthorized');
	});
};

export const createApp = async () => {
	const app = express();

	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	await setupRoutes(app);

	return app;
};
