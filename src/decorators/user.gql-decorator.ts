import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data, [root, args, ctx, info]) => {
  return data ? ctx.req.user && ctx.req.user[data] : ctx.req.user;
});
