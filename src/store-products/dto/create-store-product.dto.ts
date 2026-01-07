import { IsNotEmpty, IsNumber, IsUUID, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateStoreProductDto {
  @Type(() => String)
  @IsNotEmpty()
  @IsUUID()
  storeId: string;

  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  stock: number;
}
