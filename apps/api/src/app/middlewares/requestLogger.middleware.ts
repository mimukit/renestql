import { Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

const generate = require('nanoid/generate');

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const generateRequestId = () => generate(alphabet, 25);

export const requestLogger = (
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

  Logger.log(
    `${requestId} ${req.method} ${
      req.body.operationName === 'IntrospectionQuery'
        ? 'Introspection Query'
        : JSON.stringify(req.body)
            .replace(/\\n/g, '')
            .replace(/\s\s+/g, ' ')
    }`,
    'Request'
  );

  next();
};
