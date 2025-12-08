import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';

@Injectable()
export class StoresService {
  constructor(@InjectRepository(Store) private repo: Repository<Store>) {}

  async create(dto: CreateStoreDto) {
    const s = this.repo.create(dto);
    return this.repo.save(s);
  }

  async findAll(page = 1, limit = 10, q?: string) {
    const skip = (page - 1) * limit;
    const where = q ? { name: ILike(`%${q}%`) } : {};
    const [items, total] = await this.repo.findAndCount({
      where,
      skip,
      take: limit,
    });
    return { items, total, page, limit };
  }

  async findOne(id: number) {
    const s = await this.repo.findOneBy({ id });
    if (!s) throw new NotFoundException('Store not found');
    return s;
  }

  async update(id: number, dto: UpdateStoreDto) {
    const s = await this.findOne(id);
    Object.assign(s, dto);
    return this.repo.save(s);
  }

  async remove(id: number) {
    const s = await this.findOne(id);
    (await this.repo.softRemove)
      ? this.repo.softRemove(s)
      : this.repo.remove(s);
    return { removed: true };
  }
}
