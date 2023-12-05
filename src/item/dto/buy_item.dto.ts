import { IsNotEmpty, IsNumber } from "class-validator";

export class BuyItemDto {
    @IsNumber()
    @IsNotEmpty()
    item_id: number;

    @IsNumber()
    @IsNotEmpty()
    item_count: number;

    @IsNumber()
    @IsNotEmpty()
    item_price: number;
}