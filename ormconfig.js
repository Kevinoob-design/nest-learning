const baseConfig = {
	type: "sqlite",
	synchronize: false,
	migrations: ["migrations/*.js"],
	entities: ["**/*.entity.js"],
	cli: { migrationsDir: "migrations" }
}

const dbConfigDev = {
	...baseConfig,
	database: "db.sqlite"
}

const dbConfigTest = {
	...baseConfig,
	entities: ["**/*.entity.ts"],
	database: "test.sqlite",
	migrationsRun: true
}

const dbConfigProd = {
	...baseConfig,
	typeof: "postgres",
	url: process.env.DATABASE_URL,
	migrationsRun: true,
	ssl: { rejectUnauthorized: false }
}

const config = {
	development: dbConfigDev,
	test: dbConfigTest,
	production: dbConfigProd
}

module.exports = config[process.env.NODE_ENV || "development"]
