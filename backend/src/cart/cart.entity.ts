import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Products } from 'src/products/products.entity';
import { User } from 'src/auth/user.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Products)
  @JoinColumn()
  product: Products;

  @Column({ default: 1 })
  quantity: number;
}
