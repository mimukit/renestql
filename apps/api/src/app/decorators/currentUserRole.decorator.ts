import { createParamDecorator } from '@nestjs/common';

export const CurrentUserRole = createParamDecorator(
  (data, [root, args, ctx, info]) => ctx.req.user.role
);
