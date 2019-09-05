import { NextFunction, Request, Response } from 'express';
import { generateRequestId } from '../utils/generateRequestId';

export const setRequestId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Ignore introspection quries log
  if (req.body && req.body.operationName === 'IntrospectionQuery') {
    next();
    return;
  }

  const requestId = generateRequestId();

  res.set({
    'X-Request-Id': requestId,
  });

  next();
};
