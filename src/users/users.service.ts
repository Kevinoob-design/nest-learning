import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { CreateUserDTO } from "./dtos"
import { User } from "./users.entity"

@Injectable()
export class UsersService {
	constructor(@InjectRepository(User) private repository: Repository<User>) {}

	async create(userDTO: CreateUserDTO) {
		try {
			const user = this.repository.create({
				email: userDTO.email,
				password: userDTO.password
			})

			return await this.repository.save(user)
		} catch (error) {
			throw error
		}
	}

	async findOne(id: number) {
		try {
			if (!id) return null

			return await this.repository.findOne(id)
		} catch (error) {
			throw error
		}
	}

	async find(email: string) {
		try {
			return await this.repository.find({
				cache: true,
				where: { email }
			})
		} catch (error) {
			throw error
		}
	}

	async update(id: number, userDTO: Partial<User>) {
		try {
			const user = await this.findOne(id)

			if (!user) throw new Error("User does not exists")

			Object.assign(user, userDTO)

			return await this.repository.save(user)
		} catch (error) {
			throw error
		}
	}

	async remove(id: number) {
		try {
			const user = await this.findOne(id)

			if (!user) throw new Error("User does not exists")

			return await this.repository.remove([user])
		} catch (error) {
			throw error
		}
	}
}
