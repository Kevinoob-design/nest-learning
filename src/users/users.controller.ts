import { Body, Controller, Delete, Get, Param, Post, Put, Query, Session, UseGuards } from "@nestjs/common"

import { AuthGuard } from "../guards/auth.guard"
import { Serialize } from "../interceptors/serialize.interceptor"
import { AuthService } from "./auth/auth.service"
import { CurrentUser } from "./decorators/current-user-.decorators"
import { CreateUserDTO, UpdateUserDTO, UserDTO } from "./dtos"
import { UsersService } from "./users.service"

@Serialize(UserDTO)
@Controller("auth")
export class UsersController {
	constructor(private userService: UsersService, private authService: AuthService) {}

	@Post("/signup")
	async create(@Body() user: CreateUserDTO, @Session() session: { userId: number }) {
		try {
			const singUpUser = await this.authService.singUp(user)

			session.userId = singUpUser.id

			return singUpUser
		} catch (error) {
			throw error
		}
	}

	@Post("/singIn")
	async singIn(@Body() user: CreateUserDTO, @Session() session: { userId: number }) {
		try {
			const singInUser = await this.authService.singIn(user)

			session.userId = singInUser.id

			return singInUser
		} catch (error) {
			throw error
		}
	}

	@Post("/singOut")
	async singOut(@Session() session: { userId: number }) {
		try {
			session.userId = null
		} catch (error) {
			throw error
		}
	}

	@Get("/whoImI")
	@UseGuards(AuthGuard)
	async whoImI(@CurrentUser() user: UserDTO) {
		try {
			return user
		} catch (error) {
			throw error
		}
	}

	@Get("/find/:id")
	async findOne(@Param("id") id: number) {
		try {
			return await this.userService.findOne(id)
		} catch (error) {
			throw error
		}
	}

	@Get("/find")
	async find(@Query("email") email: string) {
		try {
			return await this.userService.find(email)
		} catch (error) {
			throw error
		}
	}

	@Put("/:id")
	async update(@Param("id") id: number, @Body() userDTO: UpdateUserDTO) {
		try {
			return await this.userService.update(id, userDTO)
		} catch (error) {
			throw error
		}
	}

	@Delete("/:id")
	async remove(@Param("id") id: number) {
		try {
			return await this.userService.remove(id)
		} catch (error) {
			throw error
		}
	}
}
