import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Item } from "src/item/entities/item.entity";
import { User } from "src/user/entities/user.entity";
import { Auction } from "../entities/auction.entity";

export class BuyAuctionDTO {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    auction_id: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    item_count: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    item_index: number;
}
export class PurcahseDTO {
    purchase_count: number; 
    purchase_date: string;
    user: User; 
    auction: Auction;
}
export class AddAuctionDTO {
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

    register_date: string;

    user: User;

    item: Item;
}

export class GetAuctionByFilter {

    @ApiProperty({description: '',required : false})
    search_keyword: string;

    @ApiProperty({description: '0이 높은 순, 1이 낮은 순',required : false})
    item_count: number;

    @ApiProperty({description: '0이 높은 순, 1이 낮은 순',required : false})
    item_price: number;

    @ApiProperty({description: '0이 높은 순, 1이 낮은 순',required : false})
    item_name: number;

    @ApiProperty({description: '',required : false})
    min_price: number;

    @ApiProperty({description:'',required : false})
    max_price: number;

    @ApiProperty({description:'이동할 페이지',required : true})
    page: number;

}