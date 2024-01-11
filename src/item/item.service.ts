import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OwnItemRepository } from './repositories/own_item.repository';
import { User } from 'src/user/entities/user.entity';
import { OwnItem } from './entities/own_item.entity';
import { AddItemDto } from './dto/add_item.dto';
import { BuyItemDto } from './dto/buy_item.dto';
import { UserRepository } from 'src/user/repositories/user.repository';
import { ItemRepository } from './repositories/item.repository';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {
    constructor(
        private ownitemRepository: OwnItemRepository,
        private userRepository: UserRepository,
        private itemRepository: ItemRepository
    ){}

    getMyItems(user_id: number): Promise<OwnItem[]> {
        return this.ownitemRepository.getMyItems(user_id);
    }

    async addItem(user: User, addItemdto: AddItemDto): Promise<string> {
        const { item_id } = addItemdto;
        const item = await this.itemRepository.getItemByID(item_id);
        return this.ownitemRepository.addItem(user,addItemdto,item);
    }

    async buyItem(user: User, buyItemDto: BuyItemDto): Promise<OwnItem> {
        const { item_id } = buyItemDto;
        if(await this.userRepository.useCFT(buyItemDto.item_price, user)){
            const item = await this.itemRepository.getItemByID(item_id);
            return this.ownitemRepository.buyItem(user,buyItemDto,item);
        }else {
            throw new InternalServerErrorException('not enought cft');
        }
    }

    async sellItem(user: User, sellItemDto: BuyItemDto): Promise<string> {
        const { item_id } = sellItemDto;
        const item = await this.itemRepository.getItemByID(item_id);
        await this.ownitemRepository.sellItem(user,sellItemDto,item);

        if(await this.userRepository.getCFT(sellItemDto.item_price,user)){
            return 'success';
        }else {
            return 'failed';
        }
    }

    getAllItem(): Promise<Item[]> {
        return this.itemRepository.getAllItem();
    }

    async moveItem(user: User, item_id: number, item_index: number){
        const item = await this.itemRepository.getItemByID(item_id);
        return this.ownitemRepository.moveItem(user,item, item_index);
    }
}
