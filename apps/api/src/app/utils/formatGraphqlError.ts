import { Logger } from '@nestjs/common';
import { environment } from '../../environments/environment';
import { generateRefCode } from './generateErrorRefCode';

export const formatGraphqlError = (error: any) => {
  const errorRefCode = generateRefCode();

  if (environment.debug.printRawError) {
    Logger.error(error, 'RawError');
  }

  const code = error.extensions.exception.status || 500;
  const path =
    error.path && error.path.length > 0 ? error.path[0] : error.extensions.path;
  const name =
    error.message.name ||
    error.message.error ||
    error.extensions.code ||
    'InternalServerError';
  const message =
    error.message.message || error.message.error || 'internal server error';

  const stack =
    environment.debug.printErrorStack &&
    error.extensions &&
    error.extensions.exception &&
    error.extensions.exception.stacktrace
      ? error.extensions.exception.stacktrace
      : null;

  const formattedError = {
    code,
    path,
    name,
    message,
    errorRefCode,
  };

  if (error.extensions.code === 'GRAPHQL_VALIDATION_FAILED') {
    formattedError.code = 400;
    formattedError.path = 'request';
    formattedError.name = 'InvalidRequest';
    formattedError.message = 'request not valid. please check your query';
  }

  if (
    error.extensions.code === 'GRAPHQL_VALIDATION_FAILED' &&
    message.includes('exceeds complexity limit')
  ) {
    formattedError.message! = `exceeds maximum query complexity limit of ${environment.env.GRAPHQL_QUERY_COST_LIMIT}`;
  }

  if (
    error.extensions.code === 'GRAPHQL_VALIDATION_FAILED' &&
    message.includes('maximum operation')
  ) {
    formattedError.message! = `exceeds maximum operation depth of ${environment.env.GRAPHQL_DEPTH_LIMIT}`;
  }

  if (
    error.extensions.code === 'INTERNAL_SERVER_ERROR' &&
    message.includes('Unauthorized')
  ) {
    formattedError.message! = 'authorization token is missing, invalid or expired';
  }

  if (error.extensions.code === 'FORBIDDEN') {
    formattedError.code! = 403;
  }

  Logger.error({ ...formattedError, stack }, null, 'GraphqlError');

  return formattedError;
};
