import { CustomRepository } from "src/core/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { Item } from "../entities/item.entity";

@CustomRepository(Item)
export class ItemRepository extends Repository<Item>{
    async getItemByID(item_id: number): Promise<Item>{
        console.log(item_id)
        return await this.findOne({where : {item_id}})
    }
}