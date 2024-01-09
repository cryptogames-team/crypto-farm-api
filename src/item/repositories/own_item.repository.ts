import { CustomRepository } from "src/core/typeorm-ex.decorator";
import { OwnItem } from "../entities/own_item.entity";
import { Repository } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { AddItemDto } from "../dto/add_item.dto";
import { BuyItemDto } from "../dto/buy_item.dto";
import { InternalServerErrorException } from '@nestjs/common';
import { UseItemDto } from "../dto/use_item.dto";
@CustomRepository(OwnItem)
export class OwnItemRepository extends Repository<OwnItem>{
    async getItemByUserIDANDItemID(user_id: number, item_id: number): Promise<OwnItem> {
        return this.findOne({ where : { user_id, item_id } });
    }
    
    async getMyItems(user_id: number): Promise<OwnItem[]> {
        return this.createQueryBuilder('own_item')
            .leftJoinAndSelect('own_item.item_id','item')
            .where('own_item.user_id = :user_id', { user_id })
            .getMany();
    }
    
    async addItem(user: User, addItemDto: AddItemDto): Promise<string> {
        const { user_id } = user;
        const { item_id, item_count } = addItemDto;
        const found = await this.getItemByUserIDANDItemID(user_id, item_id);
        
        if (!found) {
            const new_item = this.create({ item_id, item_count, user_id });
            await this.save(new_item);
            return 'success';
        } else {
            found.item_count += item_count;
            await this.save(found);
            return 'success';
        }
    }

    async buyItem(user: User, buyItemDto: BuyItemDto): Promise<OwnItem> {
        const { item_id, item_count } = buyItemDto;
        const { user_id } = user;

        const found = await this.getItemByUserIDANDItemID(user_id, item_id);

        if (!found) {
            const new_item = this.create({ item_id, item_count, user_id });
            await this.save(new_item);
            return new_item;
        } else {
            found.item_count += item_count;
            await this.save(found);
            return found;
        }   
    }

    async sellItem(user: User, sellItemDto: BuyItemDto): Promise<void> {
        const { item_id, item_count } = sellItemDto;
        const { user_id } = user;

        const found = await this.getItemByUserIDANDItemID(user_id, item_id);

        if (!found) {
            throw new InternalServerErrorException(`you don't have this item`);
        } else {
            if(found.item_count >= item_count){
                found.item_count -= item_count;
                await this.save(found);
            }else {
                throw new InternalServerErrorException(`you don't have this item enought`);
            }
            
        }   
    }

    async useItem(user: User, useItemDto: UseItemDto) {
        const { item_id, item_count } = useItemDto;
        const { user_id } = user;

        const found = await this.getItemByUserIDANDItemID(user_id, item_id);

        if (!found) {
            throw new InternalServerErrorException(`you don't have this item`);
        } else {
            if(found.item_count >= item_count){
                found.item_count -= item_count;
                await this.save(found);
            }else {
                throw new InternalServerErrorException(`you don't have this item enought`);
            }
            
        } 
    }
}