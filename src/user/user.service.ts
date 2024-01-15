import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';
import { ExpDTO, UserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { OwnItemRepository } from 'src/item/repositories/own_item.repository';
import { ItemRepository } from 'src/item/repositories/item.repository';
import { Item } from 'src/item/entities/item.entity';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
        private ownItemRepository: OwnItemRepository,
        private itemRepository: ItemRepository
    ){}

    async createUser(userDto: UserDto): Promise<{accessToken: string}> {
        const { user_name, asset_id } = userDto;

        const user = await this.userRepository.createUser(userDto);

        const accessToken = await this.jwtService.sign({user_name,asset_id});

        const promises = [];
        for (let i = 0; i < 4; i++) {
        let itemId: number;
        if (i === 0) itemId = 22;
        else if (i === 1) itemId = 23;
        else if (i === 2) itemId = 24;
        else if (i === 3) itemId = 1;

        const itemPromise = this.itemRepository.getItemByID(itemId);
        promises.push(itemPromise);
        }

        const items = await Promise.all(promises);
        const secondPromises = [];
        for (let i = 0; i < 4; i++) {
            secondPromises.push(this.ownItemRepository.welcomeItem(user, items[i], i));
        }
        await Promise.all(secondPromises);
        return { accessToken };
    }

    async login(userDto: UserDto): Promise<{accessToken: string}> {
        const { user_name, asset_id } = userDto;

        const user = await this.userRepository.getUser(user_name);

        const accessToken = await this.jwtService.sign({user_name,asset_id});

        return { accessToken };
    }

    getAllUserByAssetID(asset_id: string[]): Promise<User[]> {
        return this.userRepository.getAllUserByAssetID(asset_id);
    }
    getUserByAssetID(asset_id: string): Promise<User> {
        return this.userRepository.getUserByAssetID(asset_id);
    }

    expUp(expDto: ExpDTO, user: User ): Promise<User> {
        return this.userRepository.expUp(expDto,user);
    }
}
