import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class BuyItemDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    item_id: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    item_count: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    item_price: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    item_index: number;
}