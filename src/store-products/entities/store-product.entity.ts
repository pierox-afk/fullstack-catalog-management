import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  Unique,
  JoinColumn,
} from 'typeorm';
import { Store } from '../../stores/entities/store.entity';
import { Product } from '../../products/entities/product.entity';

@Entity({ name: 'store_products' })
@Unique(['storeId', 'productId'])
export class StoreProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  storeId: number;

  @Column()
  @Index()
  productId: string;

  @ManyToOne(() => Store, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'storeId' })
  store: Store;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
  price: string; // store as string in JS for numeric/decimal

  @Column({ type: 'int', default: 0 })
  stock: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
