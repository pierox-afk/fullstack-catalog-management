import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { StoreProduct } from './entities/store-product.entity';
import { AuthModule } from '../auth/auth.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Store, StoreProduct]),
    AuthModule,
    ProductsModule,
  ],
  controllers: [StoresController],
  providers: [StoresService],
})
export class StoresModule {}
