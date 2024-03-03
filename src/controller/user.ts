import { UserCreationSchema } from '../schema/user';
import { UserService } from '../service/user';

import { Request, Response, Router } from 'express';

import { ValidationResult } from 'joi';
import { User } from '../entity/user';

export class UserController {
	protected userService: UserService;
	public router: Router;

	constructor(userService: UserService) {
		this.userService = userService;

		this.router = Router();
		this.router.post('/', this.create.bind(this));
	}

	async create(req: Request, res: Response) {
		const validatedUserCreation: ValidationResult = UserCreationSchema.validate(
			req.body
		);
		if (validatedUserCreation.error) {
			return res.status(404).send({
				message: 'Bad request',
				last_error: validatedUserCreation.error.details,
			});
		}

		const userData = validatedUserCreation.value as Partial<User>;
		const result = await this.userService.create({
			name: userData.name,
			quota: userData.quota
		});
		return res.status(200).json(result);
	}
}
