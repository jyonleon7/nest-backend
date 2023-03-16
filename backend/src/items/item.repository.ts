import { Item } from 'src/entities/item.entity';
import { Repository, EntityRepository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemStatus } from './item-status.enum';

// TypeOrm で ItemEntity のリポジトリとして扱うための記述
@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  async createItem(createItemDto: CreateItemDto): Promise<Item> {
    const { name, description, price } = createItemDto;
    const item = this.create({
      name,
      description,
      price,
      status: ItemStatus.ON_SALE,
    });

    this.save(item);
    return item;
  }

  async updateStatus(item: Item): Promise<Item> {
    const newItem = {
      ...item,
      status: ItemStatus.SOLD_OUT,
    };

    this.save(newItem);

    return newItem;
  }
}
