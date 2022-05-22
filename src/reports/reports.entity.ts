import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"

import { User } from "../users/users.entity"

@Entity()
export class Report {
	@PrimaryGeneratedColumn("increment")
	id: number

	@Column("boolean", { default: false })
	approved: boolean

	@Column("decimal")
	price: number

	@Column("varchar")
	make: string

	@Column("varchar")
	model: string

	@Column("date")
	year: Date

	@Column("double")
	lng: number

	@Column("double")
	lat: number

	@Column("double")
	mileage: number

	@ManyToMany(() => User, user => user.reports)
	user: User
}
