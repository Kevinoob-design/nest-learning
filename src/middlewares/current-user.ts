import { Injectable, NestMiddleware } from "@nestjs/common"
import { NextFunction, Request, Response } from "express"

import { UsersService } from "../users/users.service"

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
	constructor(private usersService: UsersService) {}

	async use(request: Request, response: Response, next: NextFunction) {
		const { userId } = request.session || {}

		if (userId) {
			const user = await this.usersService.findOne(userId)

			request.CurrentUser = user
		}

		next()
	}
}
