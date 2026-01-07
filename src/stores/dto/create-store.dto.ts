import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}
