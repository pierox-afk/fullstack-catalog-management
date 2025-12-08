import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreProduct } from './entities/store-product.entity';
import { CreateStoreProductDto } from './dto/create-store-product.dto';
import { Store } from '../stores/entities/store.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class StoreProductsService {
  constructor(
    @InjectRepository(StoreProduct) private repo: Repository<StoreProduct>,
    @InjectRepository(Store) private storesRepo: Repository<Store>,
    @InjectRepository(Product) private productsRepo: Repository<Product>,
  ) {}

  async createForStore(storeId: number, dto: CreateStoreProductDto) {
    const store = await this.storesRepo.findOneBy({ id: storeId });
    if (!store) throw new NotFoundException('Store not found');
    const product = await this.productsRepo.findOneBy({ id: dto.productId });
    if (!product) throw new NotFoundException('Product not found');
    const sp = this.repo.create({
      store,
      product,
      // entity stores price as string (numeric), convert here
      price: String(dto.price),
      stock: dto.stock || 0,
    });
    return this.repo.save(sp);
  }

  async findAll() {
    return this.repo.find({ relations: ['store', 'product'] });
  }

  async findOne(id: string) {
    const r = await this.repo.findOne({
      where: { id },
      relations: ['store', 'product'],
    });
    if (!r) throw new NotFoundException('StoreProduct not found');
    return r;
  }

  async update(id: string, dto: Partial<CreateStoreProductDto>) {
    const item = await this.findOne(id);
    if (dto.price !== undefined) item.price = String(dto.price);
    if (dto.stock !== undefined) item.stock = dto.stock;
    if (dto.productId) {
      const product = await this.productsRepo.findOneBy({
        id: dto.productId as string,
      });
      if (!product) throw new NotFoundException('Product not found');
      item.product = product;
    }
    return this.repo.save(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    await this.repo.remove(item);
    return { removed: true };
  }
}
