import { IsNotEmpty, IsNumber, IsPositive, IsUUID } from 'class-validator';

export class AddProductToStoreDto {
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  stock: number;
}
