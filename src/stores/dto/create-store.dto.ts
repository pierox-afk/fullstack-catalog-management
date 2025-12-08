import { IsString, Length } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @Length(1, 255)
  name: string;
}
