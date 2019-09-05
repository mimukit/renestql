import { Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export const httpLogger = (req: Request, res: Response, next: NextFunction) => {
  // Ignore graphql quries log
  if (req.body && req.body.query) {
    next();
    return;
  }

  const requestId = res.getHeaders()['x-request-id'] || null;

  Logger.log(
    `${requestId} ${req.method} ${req.path} ${JSON.stringify(req.body)
      .replace(/\\n/g, '')
      .replace(/\s\s+/g, ' ')}`,
    'HttpLogger'
  );

  next();
};
