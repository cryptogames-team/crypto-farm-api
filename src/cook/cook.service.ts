import { Injectable } from '@nestjs/common';
import { ItemRepository } from 'src/item/repositories/item.repository';
import { OwnItemRepository } from 'src/item/repositories/own_item.repository';
import { UserRepository } from 'src/user/repositories/user.repository';
import { cookDto } from './dto/cook.dto';
import { User } from 'src/user/entities/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class CookService {
    
    constructor(
        private userRepository: UserRepository,
        private itemRepository: ItemRepository,
        private ownItemRepository: OwnItemRepository,
        private dataSource: DataSource
    ){}

    async cook(user: User, cookDto: cookDto){
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const { cook, ingredient1, ingredient2, item_index } = cookDto;
        const ingredient1_item = await this.itemRepository.getItemByID(ingredient1);
        const ingredient2_item = await this.itemRepository.getItemByID(ingredient2);
        const cook_item = await this.itemRepository.getItemByID(cook);
        const useItemDto1 = {item_id : ingredient1, item_count : 1};
        const useItemDto2 = {item_id : ingredient2, item_count : 1};
        const addItemDto = {item_id : cook, item_count : 1, item_index};
        try {
            await this.ownItemRepository.useItem(user,useItemDto1,ingredient1_item);
            await this.ownItemRepository.useItem(user,useItemDto2,ingredient2_item);
            await this.ownItemRepository.addItem(user,addItemDto,cook_item);
            await queryRunner.commitTransaction();
            return 'success';
        }catch(error){
            await queryRunner.rollbackTransaction();
        }finally {
            await queryRunner.release();
        }
        
    }
}
