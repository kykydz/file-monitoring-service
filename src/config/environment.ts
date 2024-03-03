require('dotenv').config();

export const SERVICE_NAME = require('../../package.json').name;
// export const DB = process.env.GAME_DB_HOST || 'game-db.json';
export const SERVER_PORT = process.env.SERVER_PORT || 3000;
export const ENV = process.env.NODE_ENV || 'local';
export const LOG_LOCATION = process.env.LOG_LOCATION || 'logs/';

export const FILE_UPLOAD_CONFIG = {
    FIELD_NAME: 'file',
    TEMP_PATH: 'uploads/temp',
    DEFAULT_NAMING: new Date().getTime.toString(),
};