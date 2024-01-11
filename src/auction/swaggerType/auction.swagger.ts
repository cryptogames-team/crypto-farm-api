import { ApiProperty } from "@nestjs/swagger"
import { Item } from "src/item/entities/item.entity"
import { User } from "src/user/entities/user.entity"
import { Purchase } from "../entities/purchase.entity";

export class AuctionType {
    @ApiProperty()
    auction_id: number;

    @ApiProperty()
    item_count: number;

    @ApiProperty()
    item_price: number;

    @ApiProperty()
    register_date: string;

    @ApiProperty({type: () => User})
    user: User;

    @ApiProperty({type: () => Item})
    item: Item;
}

export class AuctionFilterType {
    @ApiProperty({type: () => [AuctionType]})
    auctions : AuctionType[];

    @ApiProperty()
    count: number;
}

export class PurchaseType {
    @ApiProperty({type: () => [Purchase]})
    result : Purchase[];

    @ApiProperty()
    count: number;
}