import { IsNotEmpty, IsNumber } from "class-validator";

export class AddItemDto {
    @IsNumber()
    @IsNotEmpty()
    item_id: number;

    @IsNumber()
    @IsNotEmpty()
    item_count: number;
}