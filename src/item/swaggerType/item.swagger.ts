import { ApiProperty } from "@nestjs/swagger";
import { Item } from "../entities/item.entity";

export class OwnItemType {
    @ApiProperty()
    own_item_id: number;

    @ApiProperty()
    item_count: number;

    @ApiProperty()
    item_id: Item;
}