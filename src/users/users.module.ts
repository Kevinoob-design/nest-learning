import { MiddlewareConsumer, Module } from "@nestjs/common"
// import { APP_INTERCEPTOR } from "@nestjs/core"
import { TypeOrmModule } from "@nestjs/typeorm"

import { CurrentUserMiddleware } from "../middlewares/current-user"
import { AuthService } from "./auth/auth.service"
// import { CurrentUserInterceptor } from "./interceptors/current-user.interceptor"
import { UsersController } from "./users.controller"
import { User } from "./users.entity"
import { UsersService } from "./users.service"

CurrentUserMiddleware

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	controllers: [UsersController],
	providers: [
		UsersService,
		AuthService
		// {
		// 	provide: APP_INTERCEPTOR,
		// 	useClass: CurrentUserInterceptor
		// }
	]
})
export class UsersModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(CurrentUserMiddleware).forRoutes("*")
	}
}
