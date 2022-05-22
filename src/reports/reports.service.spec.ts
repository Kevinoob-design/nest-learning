import { Test, TestingModule } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { Report } from "./reports.entity"
import { ReportsService } from "./reports.service"

export type MockType<T> = {
	[P in keyof T]?: jest.Mock<object>
}

describe("ReportsService", () => {
	let service: ReportsService

	const repositoryMock: () => MockType<Repository<Report>> = jest.fn(() => ({}))

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ReportsService,
				{
					provide: getRepositoryToken(Report),
					useFactory: repositoryMock
				}
			]
		}).compile()

		service = module.get<ReportsService>(ReportsService)
	})

	it("should be defined", () => {
		expect(service).toBeDefined()
	})
})
