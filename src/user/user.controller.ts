import { Controller, Body, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';


@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Post('/')
    createUser(@Body() userDto: UserDto): Promise<User> {
        return this.userService.createUser(userDto);
    }

}
