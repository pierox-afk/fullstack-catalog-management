// src/stores/entities/store-product.entity.ts
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Store } from '../../stores/entities/store.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('store_products')
@Unique(['store', 'product']) // Asegura que no se pueda añadir el mismo producto dos veces a la misma tienda
export class StoreProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('int')
  stock: number;

  @ManyToOne(() => Store, (store) => store.productConnections, {
    onDelete: 'CASCADE',
  })
  store: Store;

  @ManyToOne(() => Product, (product) => product.storeConnections, {
    eager: true, // Carga automáticamente el producto al consultar StoreProduct
  })
  product: Product;
}
