import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'now()',
    precision: 0,
  })
  createdAt: Date;
}
