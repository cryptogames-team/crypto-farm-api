import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository
    ){}

    createUser(userDto: UserDto): Promise<User> {
        return this.userRepository.createUser(userDto);
    }
}
