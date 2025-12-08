import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { StoreProductsService } from '../store-products/store-products.service';
import { CreateStoreProductDto } from '../store-products/dto/create-store-product.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('stores')
export class StoresController {
  constructor(
    private readonly storesService: StoresService,
    private readonly spService: StoreProductsService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storesService.create(createStoreDto);
  }

  @Get()
  findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('q') q?: string,
  ) {
    return this.storesService.findAll(Number(page), Number(limit), q);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storesService.findOne(Number(id));
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storesService.update(Number(id), updateStoreDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storesService.remove(Number(id));
  }

  // POST /stores/:id/products
  @UseGuards(AuthGuard('jwt'))
  @Post(':id/products')
  addProductToStore(
    @Param('id') id: string,
    @Body() dto: CreateStoreProductDto,
  ) {
    return this.spService.createForStore(Number(id), dto);
  }
}
