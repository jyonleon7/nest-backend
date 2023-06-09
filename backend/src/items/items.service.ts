import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemRepository } from './item.repository';
import { Item } from 'src/entities/item.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class ItemsService {
  constructor(private readonly itemRepository: ItemRepository) {}

  async findById(id: string): Promise<Item> {
    const item = await this.itemRepository.findOne(id);
    if (!item) {
      throw new NotFoundException('商品が見つかりません');
    }
    return item;
  }

  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find();
  }

  async create(createItemDto: CreateItemDto, user: User): Promise<Item> {
    const item = await this.itemRepository.createItem(createItemDto, user);
    return item;
  }

  async updateStatus(id: string, user: User): Promise<Item> {
    const item = await this.findById(id);

    if (item.userId === user.id) {
      throw new BadRequestException('自身の商品を購入することはできません');
    }

    return await this.itemRepository.updateStatus(item);
  }

  async delete(id: string, user: User): Promise<void> {
    const item = await this.findById(id);

    if (item.userId !== user.id) {
      throw new BadRequestException('他人の商品を削除することはできません');
    }
    this.itemRepository.delete(id);
  }
}
