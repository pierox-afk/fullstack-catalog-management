import { IsString, IsOptional, Length } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(1, 255)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
