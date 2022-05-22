import { Expose, Transform } from "class-transformer"

export class ReportDTO {
	@Expose()
	id: number

	@Expose()
	price: number

	@Expose()
	approved: boolean

	@Expose()
	make: string

	@Expose()
	model: string

	@Expose()
	year: Date

	@Expose()
	lng: number

	@Expose()
	lat: number

	@Expose()
	mileage: number

	@Transform(({ obj }) => obj.user.id)
	@Expose()
	userId: number
}
