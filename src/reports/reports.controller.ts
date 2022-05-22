import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common"

import { AdminGuard } from "../guards/admin.guard"
import { AuthGuard } from "../guards/auth.guard"
import { Serialize } from "../interceptors/serialize.interceptor"
import { CurrentUser } from "../users/decorators/current-user-.decorators"
import { User } from "../users/users.entity"
import { ApprovedDTO } from "./dtos/approve-dto"
import { CreateReportDTO } from "./dtos/create-report-dto"
import { GetEstimateDTO } from "./dtos/get-estimates-dto"
import { ReportDTO } from "./dtos/report-dto"
import { ReportsService } from "./reports.service"

@UseGuards(AuthGuard)
@Controller("reports")
export class ReportsController {
	constructor(private reportsService: ReportsService) {}

	@Post()
	@Serialize(ReportDTO)
	createReport(@Body() body: CreateReportDTO, @CurrentUser() user: User) {
		return this.reportsService.create(body, user)
	}

	@Get("estimates")
	getEstimate(@Query() query: GetEstimateDTO) {
		return this.reportsService.createEstimate(query)
	}

	@Get()
	@Serialize(ReportDTO)
	findReports(@CurrentUser() user: User) {
		return this.reportsService.findAll(user)
	}

	@Patch("/:id")
	@UseGuards(AdminGuard)
	approve(@Param() id: string, @Body() body: ApprovedDTO) {
		return this.reportsService.changeApproval(id, body.approved)
	}
}
