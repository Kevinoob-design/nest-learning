import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import { randomBytes, scrypt as _scrypt } from "crypto"
import { promisify } from "util"

import { CreateUserDTO } from "../dtos"
import { UsersService } from "../users.service"

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
	constructor(private userService: UsersService) {}

	async singUp(user: CreateUserDTO) {
		try {
			const users = await this.userService.find(user.email)

			if (users.length) throw new BadRequestException("The User is already in use")

			const salt = randomBytes(8).toString("hex")

			const hash = (await scrypt(user.password, salt, 32)) as Buffer

			const result = `${salt}.${hash.toString("hex")}`

			user.password = result

			return await this.userService.create(user)
		} catch (error) {
			throw error
		}
	}

	async singIn(user: CreateUserDTO) {
		try {
			const [storedUser] = await this.userService.find(user.email)

			if (!storedUser) throw new NotFoundException("The User does not exists")

			const [salt, storedHash] = storedUser.password.split(".")

			const hash = (await scrypt(user.password, salt, 32)) as Buffer

			if (storedHash !== hash.toString("hex")) throw new BadRequestException("Bad password")

			return storedUser
		} catch (error) {
			throw error
		}
	}
}
