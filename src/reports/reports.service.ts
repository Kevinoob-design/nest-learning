import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "src/users/users.entity"
import { Repository } from "typeorm"

import { CreateReportDTO } from "./dtos/create-report-dto"
import { GetEstimateDTO } from "./dtos/get-estimates-dto"
import { Report } from "./reports.entity"

@Injectable()
export class ReportsService {
	constructor(@InjectRepository(Report) private repository: Repository<Report>) {}

	findAll(user: User) {
		try {
			return this.repository.find({
				cache: true,
				where: { user: { id: user.id } }
			})
		} catch (error) {
			console.error(error)

			throw error
		}
	}

	create(reportDTO: CreateReportDTO, user: User) {
		try {
			const report = this.repository.create(reportDTO)

			report.user = user

			return this.repository.save(report)
		} catch (error) {
			console.error(error)

			throw error
		}
	}

	async changeApproval(id: string, approved: boolean) {
		const report = await this.repository.findOne(id)

		if (!report) throw new NotFoundException("Report does not exists")

		report.approved = approved

		return this.repository.save(report)
	}

	createEstimate(estimateDTO: GetEstimateDTO) {
		return (
			this.repository
				.createQueryBuilder()
				.select("*")
				.where("make = :make", { make: estimateDTO.make })
				.andWhere("model = :model", { model: estimateDTO.model })
				.andWhere("lng - :lng BETWEEN -5 AND 5", { lng: estimateDTO.lng })
				.andWhere("lat - :lat BETWEEN -5 AND 5", { lat: estimateDTO.lat })
				// .andWhere("year - :year BETWEEN -3 AND 3", { year: estimateDTO.year })
				.andWhere("approved - :approved", { approved: true })
				.orderBy("mileage - :mileage")
				.setParameter("mileage", estimateDTO.mileage)
				.getRawMany()
		)
	}
}
