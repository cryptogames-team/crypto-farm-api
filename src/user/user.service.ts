import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService
    ){}

    async createUser(userDto: UserDto): Promise<{accessToken: string}> {
        const { user_name, asset_id } = userDto;

        const user = await this.userRepository.createUser(userDto);

        const accessToken = await this.jwtService.sign({user_name,asset_id});

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

    expUp(exp: number, user: User ): Promise<string> {
        return this.userRepository.expUp(exp,user);
    }
}
