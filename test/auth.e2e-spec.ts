import { INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing"
import * as request from "supertest"

import { AppModule } from "../src/app.module"

describe("Auth System", () => {
	let app: INestApplication

	const defaultEmail = "h46@email.com"

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [AppModule] }).compile()

		app = moduleFixture.createNestApplication()
		await app.init()
	})

	it("/auth/signup (POST)", () => {
		return request(app.getHttpServer())
			.post("/auth/signup")
			.send({
				email: defaultEmail,
				password: "1234567"
			})
			.expect(201)
			.then(res => {
				const { id, email } = res.body

				expect(id).toBeDefined()
				expect(email).toEqual(defaultEmail)
			})
	})

	it("/auth/signup (POST), set cookie, who im i", async () => {
		const res = await request(app.getHttpServer()).post("/auth/signup").send({
			email: defaultEmail,
			password: "1234567"
		})

		const cookie = res.get("Set-cookie")

		const { body } = await request(app.getHttpServer()).get("/auth/whoImI").set("Cookie", cookie).expect(200)

		expect(body.email).toEqual(defaultEmail)
	})
})
