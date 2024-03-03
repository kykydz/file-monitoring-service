import Joi from 'joi';

export const UploadParamsSchema = Joi.object({
	userId: Joi.string().min(3).max(100).required(),
});
