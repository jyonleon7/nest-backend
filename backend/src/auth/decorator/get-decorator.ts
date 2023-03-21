import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Getuser は、 @UseGuards(JwtAuthGuard)　とセットで使える
export const GetUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  return request.user;
});
