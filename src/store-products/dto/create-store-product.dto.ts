import { IsNotEmpty, IsNumber, IsUUID, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

const TypeDecorator = Type as unknown as (
  fn: (...args: any[]) => any,
) => PropertyDecorator;
const IsNotEmptyDecorator = IsNotEmpty as unknown as () => PropertyDecorator;
const IsIntDecorator = IsInt as unknown as () => PropertyDecorator;
const IsUUIDDecorator = IsUUID as unknown as () => PropertyDecorator;
const IsNumberDecorator = IsNumber as unknown as () => PropertyDecorator;
const MinDecorator = Min as unknown as (value: number) => PropertyDecorator;

export class CreateStoreProductDto {
  @TypeDecorator(() => Number)
  @IsNotEmptyDecorator()
  @IsIntDecorator()
  storeId: number;

  @IsNotEmptyDecorator()
  @IsUUIDDecorator()
  productId: string;

  @TypeDecorator(() => Number)
  @IsNotEmptyDecorator()
  @IsNumberDecorator()
  @MinDecorator(0)
  price: number;

  @TypeDecorator(() => Number)
  @IsNotEmptyDecorator()
  @IsIntDecorator()
  @MinDecorator(0)
  stock: number;
}
