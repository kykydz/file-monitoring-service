import { NextFunction, Request, Response } from 'express';

import { ENV } from '../config/environment';
import { Logger } from '../utils/logger';
import { uuid } from 'uuidv4';

const logger = new Logger(ENV);

export const requestLogger = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const currentReqUUID = uuid();
	logger.info('Incoming request', {
		content: {
			path: req.path,
			method: req.method,
			content: req.body,
		},
		requestUUID: currentReqUUID,
	});

	const originalJsonMethod = res.json;

	res.json = (responseData) => {
		logger.info(`Response requestUUID: ${currentReqUUID}`, {
			content: responseData,
			requestUUID: currentReqUUID,
		});

		return originalJsonMethod.call(res, responseData);
	};

	const originalSendMethod = res.send;
	res.send = (responseData) => {
		logger.info(`Response requestUUID: ${currentReqUUID}`, {
			content: responseData,
			requestUUID: currentReqUUID,
		});

		return originalSendMethod.call(res, responseData);
	};

	next();
};
