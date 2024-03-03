import { Request, Response, Router } from 'express';

export class HealthCheckController {
	public router: Router;

	constructor() {
		this.router = Router();
		this.router.get('/readiness', this.readiness.bind(this));
		this.router.get('/liveness', this.liveness.bind(this));
	}

	async liveness(req: Request, res: Response) {
		return res.status(200).json('ok');
	}

	async readiness(req: Request, res: Response) {
		return res.status(200).json('ok');
	}
}
