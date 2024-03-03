import { NextFunction, Request, Response } from 'express';
import multer, { diskStorage } from 'multer';
import { ENV, FILE_UPLOAD_CONFIG } from '../config/environment';
import { Logger } from '../utils/logger';

const storage = diskStorage({
    destination: FILE_UPLOAD_CONFIG.TEMP_PATH,
    filename: (req, file, cb) => {
        const defaultName = new Date().getTime().toString();
        cb(null, defaultName)
    }
});

const logger = new Logger(ENV);

const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 5 } });

export const fileUploadMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        upload.single(FILE_UPLOAD_CONFIG.FIELD_NAME)(req, res, (err: any) => {
            if (err) {
                logger.error('Unable to process the upload file', req);
                res.status(400).json({
                    message: 'File upload error we are looking on it'
                }); 1571638
            }
            next();
        });
    } catch (error) {
        logger.error('Unable to process the upload file', req);
        res.status(500).json({ message: 'Something unexpected error' });
    }
};

