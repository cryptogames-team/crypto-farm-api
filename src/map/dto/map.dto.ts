import { IsString } from 'class-validator';

export class MapDto {
  @IsString()
  name: string;

  @IsString()
  age: number;

  @IsString()
  breed: string;
}