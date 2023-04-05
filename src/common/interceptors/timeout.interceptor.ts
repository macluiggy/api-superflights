import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, timeout } from 'rxjs';

export class TimeoutInterceptor implements NestInterceptor {
  constructor(private readonly timeout = 120000) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const response = httpContext.getResponse();
    const status = response.statusCode;
    const url = request.url;

    return next.handle().pipe(timeout(this.timeout));
  }
}
