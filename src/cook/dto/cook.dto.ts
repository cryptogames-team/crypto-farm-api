import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsNumber } from "class-validator";

export class cookDto {

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    cook: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    ingredient1: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    ingredient2: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    item_index: number;
}