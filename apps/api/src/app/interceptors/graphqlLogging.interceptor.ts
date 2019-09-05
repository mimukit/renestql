import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class GraphqlLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();

    const gqlCtx: GraphQLExecutionContext = GqlExecutionContext.create(context);
    const info = gqlCtx.getInfo();

    const req: Request = gqlCtx.getContext().req;
    const res: Response = gqlCtx.getContext().res;

    const requestId = res.getHeaders()['x-request-id'] || 'null';

    return next.handle().pipe(
      tap(() =>
        Logger.log(
          `${requestId} ${info.parentType} "${info.fieldName}" ${JSON.stringify(
            req.body.query
          )
            .replace(/\\n/g, '')
            .replace(/\s\s+/g, ' ')} ${Date.now() - now}ms`,
          'GraphqlLogger'
        )
      )
    );
  }
}
