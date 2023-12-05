import { Controller, Body, Post, Get, Patch, Param, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import UseAuthGuard from './auth-guards/user-auth';
import AuthUser from 'src/core/auth-user.decorator';


@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Post('/create')
    createUser(@Body(ValidationPipe) userDto: UserDto): Promise<{accessToken: string}> {
        return this.userService.createUser(userDto);
    }
    
    @Post('/')
    login(@Body(ValidationPipe) userDto: UserDto): Promise<{accessToken: string}> {
        return this.userService.login(userDto);
    }
    
    @Get('/:asset_id')
    getUserByAssetID(@Param('asset_id') asset_id: string): Promise<User> {
        return this.userService.getUserByAssetID(asset_id);
    }

    @Post('/all')
    getAllUserByAssetID(@Body() asset_id: string[]): Promise<User[]> {
        return this.userService.getAllUserByAssetID(asset_id);
    }
    
    @Patch('/exp')
    @UseAuthGuard()
    expUp(
        @Body('exp') exp: number,
        @AuthUser()user: User): Promise<string> {
        return this.userService.expUp(exp,user);
    }


}
