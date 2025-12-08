import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StoreProductsService } from './store-products.service';
import { CreateStoreProductDto } from './dto/create-store-product.dto';
import { UpdateStoreProductDto } from './dto/update-store-product.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('store-products')
export class StoreProductsController {
  constructor(private readonly storeProductsService: StoreProductsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createStoreProductDto: CreateStoreProductDto) {
    if (createStoreProductDto.storeId) {
      return this.storeProductsService.createForStore(
        createStoreProductDto.storeId,
        createStoreProductDto as any,
      );
    }
    // fallback: create without store (not typical) - reuse createForStore requires storeId
    return { error: 'storeId required' };
  }

  @Get()
  findAll() {
    return this.storeProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeProductsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStoreProductDto: UpdateStoreProductDto,
  ) {
    return this.storeProductsService.update(id, updateStoreProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeProductsService.remove(id);
  }
}
