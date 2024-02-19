import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNumber } from "class-validator";

export class cookDto {

    @IsEmpty()
    @IsNumber()
    @ApiProperty()
    cook: number;

    @IsEmpty()
    @IsNumber()
    @ApiProperty()
    ingredient1: number;

    @IsEmpty()
    @IsNumber()
    @ApiProperty()
    ingredient2: number;

    @IsEmpty()
    @IsNumber()
    @ApiProperty()
    item_index: number;
}