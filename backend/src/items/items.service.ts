import { Injectable } from '@nestjs/common';
import { Item } from './item.model';
import { ItemStatus } from './item-status.enum';
import { CreateItemDto } from './dto/create-item.dto';
import { v4 as uuid } from 'uuid';
@Injectable()
export class ItemsService {
  private items: Item[] = [];
  // TODO: なんでこれが(constructor で変数を定義)ダメなのかは、もっと慣れてきたら調べる
  // constructor(public items: Item) {}

  findById(id: string): Item {
    return this.items.find((item) => item.id === id);
  }

  findAll(): Item[] {
    return this.items;
  }

  create(createItemDto: CreateItemDto): Item {
    const item: Item = {
      id: uuid(),
      ...createItemDto,
      status: ItemStatus.ON_SALE,
    };

    this.items.push(item);
    return item;
  }

  updateStatus(id: string): Item {
    const item = this.findById(id);
    item.status = ItemStatus.SOLD_OUT;

    return item;
  }

  delete(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
  }
}
