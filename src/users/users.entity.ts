import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

import { Report } from "../reports/reports.entity"

@Entity()
export class User {
	@PrimaryGeneratedColumn("increment")
	id: number

	@Column("varchar")
	email: string

	@Column("varchar")
	password: string

	@OneToMany(() => Report, report => report.user)
	reports?: [Report]

	@Column("boolean", { default: true })
	admin: boolean
}
