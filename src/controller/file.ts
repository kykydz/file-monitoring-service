import { UploadParamsSchema } from '../schema/file';

import { Request, Response, Router } from 'express';

import { ValidationResult } from 'joi';
import { FileService } from '../service/file';

export class FileController {
    protected fileService: FileService;
    public router: Router;

    constructor(fileService: FileService) {
        this.fileService = fileService;

        this.router = Router();
        this.router.post('/:userId', this.upload.bind(this));
    }

    async upload(req: Request, res: Response) {
        const validatedParams: ValidationResult = UploadParamsSchema.validate(
            req.params
        );
        if (validatedParams.error) {
            return res.status(404).send({
                message: 'Bad request',
                last_error: validatedParams.error.details,
            });
        }

        const result = await this.fileService.upload(validatedParams.value.userId, {
            name: req.file.originalname,
            path: req.file.path,
            size: req.file.size
        });
        return res.status(200).json(result);
    }
}
