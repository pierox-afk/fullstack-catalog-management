import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  async create(dto: CreateProductDto) {
    const p = this.repo.create(dto);
    return this.repo.save(p);
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const p = await this.repo.findOneBy({ id });
    if (!p) throw new NotFoundException('Product not found');
    return p;
  }

  async remove(id: string) {
    const p = await this.findOne(id);
    await this.repo.remove(p);
    return { removed: true };
  }
}
