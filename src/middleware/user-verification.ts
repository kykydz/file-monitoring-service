import { NextFunction, Request, Response } from 'express';
import { ENV } from '../config/environment';
import { Logger } from '../utils/logger';
import { UserService } from '../service/user';

const logger = new Logger(ENV);

export const userVerificationMiddleware = async (
    userService: UserService
) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await userService.findById(req.params.userId);

            if (!user) {
                logger.error('Unable to process the upload file', req);
                res.status(401).json({ message: 'Unauthorized' });
            }

            req.user = user;
            next();
        } catch (error) {
            logger.error('Unable to process the upload file', req);
            res.status(500).json({ message: 'Something unexpected error' });
        }
    }
};

