import Joi from 'joi';

export const UserCreationSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),

    quota: Joi.number().min(1).max(99999999).required()
});
