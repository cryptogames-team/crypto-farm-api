import { IsNotEmpty, IsNumber } from "class-validator";

export class UseItemDto {
    @IsNumber()
    @IsNotEmpty()
    item_id: number;

    @IsNumber()
    @IsNotEmpty()
    item_count: number;
}