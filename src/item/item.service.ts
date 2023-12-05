import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OwnItemRepository } from './repositories/own_item.repository';
import { User } from 'src/user/entities/user.entity';
import { OwnItem } from './entities/own_item.entity';
import { AddItemDto } from './dto/add_item.dto';
import { BuyItemDto } from './dto/buy_item.dto';
import { UserRepository } from 'src/user/repositories/user.repository';

@Injectable()
export class ItemService {
    constructor(
        private ownitemRepository: OwnItemRepository,
        private userRepository: UserRepository
    ){}

    getMyItems(user_id: number): Promise<OwnItem[]> {
        return this.ownitemRepository.getMyItems(user_id);
    }

    addItem(user: User, addItemdto: AddItemDto): Promise<string> {
        return this.ownitemRepository.addItem(user,addItemdto);
    }

    async buyItem(user: User, buyItemDto: BuyItemDto): Promise<OwnItem> {
        if(await this.userRepository.useCFT(buyItemDto.item_price, user)){
            return this.ownitemRepository.buyItem(user,buyItemDto);
        }else {
            throw new InternalServerErrorException('not enought cft');
        }
    }

    async sellItem(user: User, sellItemDto: BuyItemDto): Promise<string> {
        await this.ownitemRepository.sellItem(user,sellItemDto);

        if(await this.userRepository.getCFT(sellItemDto.item_price,user)){
            return 'success';
        }else {
            return 'failed';
        }
    }
}
