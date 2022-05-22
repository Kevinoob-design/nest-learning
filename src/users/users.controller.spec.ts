import { Test, TestingModule } from "@nestjs/testing"

import { AuthService } from "./auth/auth.service"
import { CreateUserDto } from "./dtos/create-user.dto"
import { UsersController } from "./users.controller"
import { UsersService } from "./users.service"

describe("UsersController", () => {
	let controller: UsersController
	let fakeUsersService: Partial<UsersService>
	let fakeAuthService: Partial<AuthService>

	const defaultEmail = "h@email.com"

	const fakeAuthServiceFunctionFake = (userDto: CreateUserDto) =>
		Promise.resolve({
			id: 1,
			email: userDto.email,
			password: userDto.password,
			admin: true
		})

	beforeEach(async () => {
		fakeUsersService = {
			findOne: id =>
				Promise.resolve({
					id,
					email: defaultEmail,
					password: "1234567",
					admin: true
				}),
			find: email =>
				Promise.resolve([
					{
						id: 1,
						email,
						password: "1234567",
						admin: true
					}
				]),
			remove: id =>
				Promise.resolve([
					{
						id,
						email: defaultEmail,
						password: "1234567",
						admin: true
					}
				]),
			update: (id, userDto) =>
				Promise.resolve({
					id,
					email: userDto.email,
					password: userDto.password,
					admin: true
				})
		}

		fakeAuthService = {
			singUp: fakeAuthServiceFunctionFake,
			singIn: fakeAuthServiceFunctionFake
		}

		const module: TestingModule = await Test.createTestingModule({
			controllers: [UsersController],
			providers: [
				{
					provide: UsersService,
					useValue: fakeUsersService
				},
				{
					provide: AuthService,
					useValue: fakeAuthService
				}
			]
		}).compile()

		controller = module.get<UsersController>(UsersController)
	})

	it("should be defined", () => {
		expect(controller).toBeDefined()
	})

	it("find all users returns list of users with given email", async () => {
		const users = await controller.find(defaultEmail)

		expect(users.length).toEqual(1)
		expect(users[0].email).toEqual(defaultEmail)
	})
})
