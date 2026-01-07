import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly repo: Repository<Product>,
  ) {}

  async create(dto: CreateProductDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  /** Simple paginated list. If no params provided, returns up to 100 items. */
  async findAll(options?: { limit?: number; offset?: number }) {
    const limit = options?.limit ?? 100;
    const offset = options?.offset ?? 0;
    const [data, total]: [Product[], number] = await this.repo.findAndCount({
      skip: offset,
      take: limit,
    });
    return { data, total, limit, offset };
  }

  async findOne(id: string) {
    const item = await this.repo.findOneBy({ id });
    if (!item) throw new NotFoundException(`Product with id ${id} not found`);
    return item;
  }

  async update(id: string, dto: UpdateProductDto) {
    const toSave = await this.repo.preload({ id, ...dto } as Partial<Product>);
    if (!toSave) throw new NotFoundException(`Product with id ${id} not found`);
    return this.repo.save(toSave);
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    await this.repo.remove(item);
    return { removed: true };
  }
}
