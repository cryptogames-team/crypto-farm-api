import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class MapDto {

  
  asset_id: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  objects: [];

  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  crops: [];

  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  trees: [];

  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  rocks: [];

  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  buildings: [];
}