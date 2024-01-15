import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class MapDto {

  
  asset_id: string;

  @ApiProperty()
  objects: [];

  @ApiProperty()
  crops: [];
}