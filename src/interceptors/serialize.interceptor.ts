import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common"
import { plainToInstance } from "class-transformer"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"

interface ClassConstructor<T> {
	new (...args: unknown[]): T
}

export function Serialize<T>(dto: ClassConstructor<T>) {
	return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor<T> implements NestInterceptor {
	constructor(private dto: ClassConstructor<T>) {}

	intercept(context: ExecutionContext, next: CallHandler<unknown>): Observable<unknown> | Promise<Observable<unknown>> {
		return next.handle().pipe(
			map((data: unknown) => {
				return plainToInstance(this.dto, data, { excludeExtraneousValues: true })
			})
		)
	}
}
