import fs from 'fs';
import { SERVICE_NAME, LOG_LOCATION } from '../config/environment';

const logLocation = LOG_LOCATION;
const fileName = SERVICE_NAME;

export interface ILogger {
	info(message: string, context?: object): void;
	error(message: string, context?: object, err?: Error | any): void;
}

export class Logger implements ILogger {
	protected log: Function;
	protected env: string;
	protected fileStream: Function;

	constructor(env: string) {
		this.log = console.log;
		this.env = env;
		this.fileStream = function (data: string) {
			if (env !== 'production') {
				if (!fs.existsSync(logLocation)) {
					fs.mkdirSync(logLocation);
				}
				return fs.appendFileSync(
					`${logLocation}` + `/${fileName}`,
					data + '\n'
				);
			}

			return null;
		};
	}

	info(message: string, context?: Object) {
		const data = JSON.stringify({
			level: 'info',
			timestamp: new Date(),
			message,
			context,
		});

		this.fileStream(data);
		this.log(data);

		return null;
	}

	error(message: string, context?: Object, err?: Error) {
		const data = JSON.stringify({
			level: 'error',
			timestamp: new Date(),
			message,
			context,
			lastError: err,
		});

		this.fileStream(data);
		this.log(data);

		return null;
	}
}
