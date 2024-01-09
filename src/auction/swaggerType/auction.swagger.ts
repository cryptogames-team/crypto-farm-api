import { ApiProperty } from "@nestjs/swagger"
import { Item } from "src/item/entities/item.entity"
import { User } from "src/user/entities/user.entity"

export class AuctionType {
    @ApiProperty()
    auction_id: number;

    @ApiProperty()
    item_count: number;

    @ApiProperty()
    item_price: number;

    @ApiProperty()
    register_date: string;

    @ApiProperty()
    user_id: User;

    @ApiProperty()
    item_id: Item;
}

export class AuctionFilterType {
    @ApiProperty({type:[AuctionType]})
    auctions : AuctionType[];

    @ApiProperty()
    count: number;
}