import { Type } from "class-transformer"
import { IsDate, IsNumber, IsString, Max, MaxDate, Min, MinDate } from "class-validator"

export class CreateReportDTO {
	@IsNumber()
	price: number

	@IsString()
	make: string

	@IsString()
	model: string

	@MaxDate(new Date())
	@MinDate(new Date("01-01-1930"))
	@IsDate()
	@Type(() => Date)
	year: Date

	@IsNumber()
	lng: number

	@IsNumber()
	lat: number

	@Max(1000000)
	@Min(0)
	@IsNumber()
	mileage: number
}
