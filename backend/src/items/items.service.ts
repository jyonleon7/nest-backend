import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemRepository } from './item.repository';
import { Item } from 'src/entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(private readonly itemRepository: ItemRepository) {}

  async findById(id: string): Promise<Item> {
    const item = await this.itemRepository.findOne(id);
    if (!item) throw new NotFoundException();
    return item;
  }

  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find();
  }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const item = await this.itemRepository.createItem(createItemDto);
    return item;
  }

  async updateStatus(id: string): Promise<Item> {
    const item = await this.findById(id);
    return await this.itemRepository.updateStatus(item);
  }

  async delete(id: string): Promise<void> {
    this.itemRepository.delete(id);
  }
}
