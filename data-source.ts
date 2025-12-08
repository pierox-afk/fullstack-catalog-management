import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Auth } from './src/auth/entities/auth.entity';
import { Product } from './src/products/entities/product.entity';
import { Store } from './src/stores/entities/store.entity';
import { StoreProduct } from './src/store-products/entities/store-product.entity';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'choppi_db',
  entities: [Auth, Product, Store, StoreProduct],
  synchronize: false,
  migrations: ['dist/migrations/*.js'],
});

export default dataSource;
