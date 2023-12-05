import { IsString } from 'class-validator';

export class MapDto {
  @IsString()
  title: string;

  @IsString()
  desc: string;

  @IsString()
  password: string;
}