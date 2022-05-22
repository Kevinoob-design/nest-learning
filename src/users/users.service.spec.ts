import { Test, TestingModule } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { User } from "./users.entity"
import { UsersService } from "./users.service"

export type MockType<T> = {
	[P in keyof T]?: jest.Mock<object>
}

describe("UsersService", () => {
	let service: UsersService

	const repositoryMock: () => MockType<Repository<User>> = jest.fn(() => ({}))

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersService,
				{
					provide: getRepositoryToken(User),
					useFactory: repositoryMock
				}
			]
		}).compile()

		service = module.get<UsersService>(UsersService)
	})

	it("should be defined", () => {
		expect(service).toBeDefined()
	})
})
