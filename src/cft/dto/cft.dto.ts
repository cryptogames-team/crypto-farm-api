import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class AddCftAuctionDTO {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    cft: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    price: number;

    date: string;

    user: User;

    is_sale: number;
}

export class GetCFTAuctionByFilter {

    @ApiProperty({description: '0이 높은 순, 1이 낮은 순',required : false})
    cft_count: number;

    @ApiProperty({description: '0이 높은 순, 1이 낮은 순',required : false})
    cft_price: number;

    @ApiProperty({description: '0이 최신 순, 1이 오래된 순',required : false})
    register_date: number;

    @ApiProperty({description:'이동할 페이지',required : true})
    page: number;

}

export class BuyCFTDTO {

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    cft_auction_id: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    cft: number;

}