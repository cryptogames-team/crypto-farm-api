import { CustomRepository } from "src/core/typeorm-ex.decorator";
import { OwnItem } from "../entities/own_item.entity";
import { Repository } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { AddItemDto } from "../dto/add_item.dto";
import { BuyItemDto } from "../dto/buy_item.dto";
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UseItemDto } from "../dto/use_item.dto";
import { Item } from "../entities/item.entity";
@CustomRepository(OwnItem)
export class OwnItemRepository extends Repository<OwnItem>{
    async getItemByUserIDANDItemID(user_id: number, item: Item): Promise<OwnItem> {
        const { item_id } = item;
        // return this.findOne({ where : { user_id, item_id : item.item_id } });
        return this.createQueryBuilder('own_item')
            .leftJoinAndSelect('own_item.item','item')
            .andWhere('own_item.user_id = :user_id', { user_id })
            .andWhere('item.item_id = :item_id', {item_id})
            .getOne();
    }
    
    async getMyItems(user_id: number): Promise<OwnItem[]> {

        return this.createQueryBuilder('own_item')
            .leftJoinAndSelect('own_item.item','item')
            .where('own_item.user_id = :user_id', { user_id })
            .getMany();
    }
    

    
    async addItem(user: User, addItemDto: AddItemDto,item: Item): Promise<string> {
        const { user_id } = user;
        const { item_id, item_count,item_index } = addItemDto;

        const found = await this.getItemByUserIDANDItemID(user_id, item);

        if (!found) {
            const new_item = this.create({ item, item_count, user_id, item_index });
            await this.save(new_item);
            return 'success';
        } else {
            found.item_count += item_count;
            await this.update(found.own_item_id,found);
            return 'success';
        }
    }

    async buyItem(user: User, buyItemDto: BuyItemDto,item: Item): Promise<OwnItem> {
        const { item_id, item_count } = buyItemDto;
        const { user_id } = user;

        const found = await this.getItemByUserIDANDItemID(user_id, item);

        if (!found) {
            const new_item = this.create({ item, item_count, user_id });
            await this.save(new_item);
            return new_item;
        } else {
            found.item_count += item_count;
            await this.update(found.own_item_id,found);
            return found;
        }   
    }

    async sellItem(user: User, sellItemDto: BuyItemDto,item: Item): Promise<void> {
        const { item_id, item_count } = sellItemDto;
        const { user_id } = user;

        const found = await this.getItemByUserIDANDItemID(user_id, item);

        if (!found) {
            throw new InternalServerErrorException(`you don't have this item`);
        } else {
            if(found.item_count >= item_count){
                found.item_count -= item_count;
                if(found.item_count <= 0){
                    await this.delete(found.own_item_id);
                }else {
                    await this.update(found.own_item_id,found);
                }
                
            }else {
                throw new InternalServerErrorException(`you don't have this item enought`);
            }
            
        }   
    }

    async moveItem(user: User,item: Item, item_index: number){
        const { user_id } = user;
        const found = await this.getItemByUserIDANDItemID(user_id,item);
        found.item_index = item_index;
        await this.update(found.own_item_id,found);
        return 'success';
    }

    async useItem(user: User, useItemDto: UseItemDto,item: Item) {
        const { item_id, item_count } = useItemDto;
        const { user_id } = user;

        const found = await this.getItemByUserIDANDItemID(user_id, item);

        if (!found) {
            throw new InternalServerErrorException(`you don't have this item`);
        } else {
            if(found.item_count >= item_count){
                found.item_count -= item_count;
                if(found.item_count <= 0){
                    await this.delete(found.own_item_id);
                }else {
                    await this.update(found.own_item_id,found);
                }
                return 'use success';
            }else {
                throw new InternalServerErrorException(`you don't have this item enought`);
            }
            
        } 
    }
}