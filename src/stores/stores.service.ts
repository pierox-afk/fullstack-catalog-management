import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import { AddProductToStoreDto } from './dto/add-product-to-store.dto';
import { StoreProduct } from './entities/store-product.entity';
import { ProductsService } from '../products/products.service';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    @InjectRepository(StoreProduct)
    private readonly storeProductRepository: Repository<StoreProduct>,
    private readonly productsService: ProductsService,
  ) {}

  create(createStoreDto: CreateStoreDto) {
    const store = this.storeRepository.create(createStoreDto);
    return this.storeRepository.save(store);
  }

  async findAll(pagination: PaginationDto) {
    const { limit = 10, offset = 0, q } = pagination;
    const queryBuilder = this.storeRepository.createQueryBuilder('store');

    if (q) {
      queryBuilder.where('store.name ILIKE :q', { q: `%${q}%` });
    }

    const [stores, total]: [Store[], number] = await queryBuilder
      .skip(offset)
      .take(limit)
      .getManyAndCount();

    return {
      data: stores,
      meta: {
        totalItems: total,
        itemsPerPage: limit,
        currentPage: offset / limit + 1,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const store = await this.storeRepository.findOneBy({ id });
    if (!store) throw new NotFoundException(`Store with id ${id} not found`);
    return store;
  }

  async update(id: string, updateStoreDto: UpdateStoreDto) {
    const store = await this.storeRepository.preload({
      id,
      ...updateStoreDto,
    });
    if (!store) throw new NotFoundException(`Store with id ${id} not found`);
    return this.storeRepository.save(store);
  }

  async remove(id: string) {
    const store = await this.findOne(id);
    await this.storeRepository.remove(store);
    return { message: `Store with id ${id} deleted` };
  }

  async addProductToStore(
    storeId: string,
    addProductDto: AddProductToStoreDto,
  ) {
    const store = await this.findOne(storeId);
    // Aquí necesitaríamos un ProductsService para validar que el producto existe
    // Por ahora, asumimos que existe y lo crearemos en el siguiente paso.
    const product = await this.productsService.findOne(addProductDto.productId);

    // Verificar duplicado: si ya existe una relación store-product para este par
    const existing = await this.storeProductRepository.findOne({
      where: { store: { id: storeId }, product: { id: product.id } },
    });
    if (existing) {
      throw new ConflictException(
        'El producto ya ha sido asociado a esta tienda.',
      );
    }

    const storeProduct: StoreProduct = this.storeProductRepository.create({
      store,
      product,
      price: addProductDto.price,
      stock: addProductDto.stock,
    });

    return this.storeProductRepository.save(storeProduct);
  }
}
