import { Test, TestingModule } from "@nestjs/testing"

import { CreateUserDTO } from "../dtos"
import { User } from "../users.entity"
import { UsersService } from "../users.service"
import { AuthService } from "./auth.service"

describe("AuthService", () => {
	let service: AuthService
	let fakeUsersService: Partial<UsersService>

	const fakeDefaultEmail = "asd@email.com"

	beforeEach(async () => {
		const users: User[] = []

		fakeUsersService = {
			find: (email: string) => Promise.resolve(users.filter(user => user.email === email)),
			create: async (userDto: CreateUserDTO) => {
				const user: User = {
					id: Math.floor(Math.random() * 9999),
					email: userDto.email,
					password: userDto.password,
					admin: true
				}

				users.push(user)

				return user
			}
		}

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: UsersService,
					useValue: fakeUsersService
				}
			]
		}).compile()

		service = module.get<AuthService>(AuthService)
	})

	it("should be defined", async () => {
		expect(service).toBeDefined()
	})

	it("created a new user", async () => {
		const user = await service.singUp({
			email: fakeDefaultEmail,
			password: "1234567"
		})

		expect(user.password).not.toEqual("1234567")
		const [salt, hash] = user.password.split(".")

		expect(salt).toBeDefined()
		expect(hash).toBeDefined()
	})

	it("error for email that is in use", done => {
		service
			.singUp({
				email: fakeDefaultEmail,
				password: "1234567"
			})
			.then(() => {
				service
					.singUp({
						email: fakeDefaultEmail,
						password: "1234567"
					})
					.then()
					.catch(() => done())
			})
	})

	it("error if SignIn called with unused email", done => {
		service
			.singIn({
				email: fakeDefaultEmail,
				password: "1234567"
			})
			.then()
			.catch(() => done())
	})

	it("error if invalid password on SignIn", async () => {
		await service.singUp({
			email: fakeDefaultEmail,
			password: "1234567"
		})
		try {
			await service.singIn({
				email: fakeDefaultEmail,
				password: "12345678"
			})
		} catch (error) {
			expect(error).toBeDefined()
		}
	})

	test("return user if correct password provided", async () => {
		const user = await service.singUp({
			email: fakeDefaultEmail,
			password: "1234567"
		})

		expect(user.password).not.toEqual("1234567")
		const [salt, hash] = user.password.split(".")

		expect(salt).toBeDefined()
		expect(hash).toBeDefined()
		const signUser = await service.singIn({
			email: fakeDefaultEmail,
			password: "1234567"
		})

		expect(signUser).toBeDefined()
	})
})
