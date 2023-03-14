import { Controller, Get, Post } from '@nestjs/common';

@Controller('items')
export class ItemsController {
  @Get()
  findAll(): string {
    return 'this find All';
  }
}
