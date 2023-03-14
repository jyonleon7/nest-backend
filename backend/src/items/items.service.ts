import { Injectable } from '@nestjs/common';
import { Item } from './item.model';
import { Status } from './item-status.enum';

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

  create(item: Item): Item {
    this.items.push(item);
    return item;
  }

  updateStatus(id: string): Item {
    const item = this.findById(id);
    item.status = Status.SOLD_OUT;

    return item;
  }
}
