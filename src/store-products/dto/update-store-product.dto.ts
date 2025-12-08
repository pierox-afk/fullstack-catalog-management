import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreProductDto } from './create-store-product.dto';

export class UpdateStoreProductDto extends PartialType(CreateStoreProductDto) {
  // PartialType makes all properties of CreateStoreProductDto optional.
  // No need to redeclare properties here unless you want to change their decorators.
}
