import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { Store } from './entities/store.entity';
import { StoreProductsModule } from '../store-products/store-products.module';

@Module({
  imports: [TypeOrmModule.forFeature([Store]), StoreProductsModule],
  controllers: [StoresController],
  providers: [StoresService],
})
export class StoresModule {}
