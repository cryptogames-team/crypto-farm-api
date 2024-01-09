import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddAuctionDTO {
    @IsNumber()
    @IsNotEmpty()
    item_id: number;

    @IsNumber()
    @IsNotEmpty()
    item_count: number;

    @IsNumber()
    @IsNotEmpty()
    item_price: number;

    register_date: string;

    user_id: number;
}