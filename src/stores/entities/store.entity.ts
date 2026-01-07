import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StoreProduct } from './store-product.entity';

@Entity('stores')
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @OneToMany(() => StoreProduct, (storeProduct) => storeProduct.store)
  productConnections: StoreProduct[];
}
