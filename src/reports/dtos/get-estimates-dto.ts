import { Type } from "class-transformer"
import { IsDate, IsNumber, IsOptional, IsString, Max, MaxDate, Min, MinDate } from "class-validator"

export class GetEstimateDTO {
	@IsOptional()
	@IsString()
	make: string

	@IsOptional()
	@IsString()
	model: string

	@IsOptional()
	@MaxDate(new Date())
	@MinDate(new Date("01-01-1930"))
	@IsDate()
	@Type(() => Date)
	year: Date

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	lng: number

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	lat: number

	@IsOptional()
	@Max(1000000)
	@Min(0)
	@IsNumber()
	@Type(() => Number)
	mileage: number
}
