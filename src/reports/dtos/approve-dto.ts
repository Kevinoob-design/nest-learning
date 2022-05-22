import { IsBoolean } from "class-validator"

export class ApprovedDTO {
	@IsBoolean()
	approved: boolean
}
