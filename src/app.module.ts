import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { StoresModule } from './stores/stores.module';
import { StoreProductsModule } from './store-products/store-products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Auth } from './auth/entities/auth.entity';
import { Product } from './products/entities/product.entity';
import { Store } from './stores/entities/store.entity';
import { StoreProduct } from './store-products/entities/store-product.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST', 'localhost'),
        port: Number(config.get('DB_PORT', 5432)),
        username: config.get('DB_USERNAME', 'postgres'),
        password: config.get('DB_PASSWORD', 'postgres'),
        database: config.get('DB_DATABASE', 'choppi_db'),
        entities: [Auth, Product, Store, StoreProduct],
        synchronize: config.get('DB_SYNCHRONIZE', 'true') === 'true',
      }),
    }),
    AuthModule,
    ProductsModule,
    StoresModule,
    StoreProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
