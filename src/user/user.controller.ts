import { Controller, Body, Post, Get, Patch, Param, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { ExpDTO, UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import UseAuthGuard from './auth-guards/user-auth';
import AuthUser from 'src/core/auth-user.decorator';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';


@Controller('user')
@ApiTags('유저 API')
export class UserController {
    constructor(private userService: UserService){}

    @Post('/create')
    @ApiOperation({summary: '캐릭터 생성', description: '생성되지 않은 캐릭터 생성해 줌'})
    @ApiCreatedResponse({description:'엑세스 토큰 보내줄거임 형식은 accessToken : "토큰값"'})
    createUser(@Body(ValidationPipe) userDto: UserDto): Promise<{accessToken: string}> {
        return this.userService.createUser(userDto);
    }
    
    @Post('/')
    @ApiOperation({summary: '로그인', description: '로그인'})
    @ApiCreatedResponse({description:'엑세스 토큰 보내줄거임 형식은 accessToken : "토큰값"'})
    login(@Body(ValidationPipe) userDto: UserDto): Promise<{accessToken: string}> {
        return this.userService.login(userDto);
    }

    @Post('/check')
    @ApiOperation({summary: 'accessToken 확인', description: '헤더에 access토큰 담을 것'})
    @ApiCreatedResponse({description:'유저 정보 보내줌', type: User})
    @ApiBearerAuth('access-token')
    @UseAuthGuard()
    check(@AuthUser()user: User){
        return user;
    }
    
    @Get('/:asset_id')
    @ApiOperation({summary: '유저 정보 불러오기', description: '유저 정보 불러오기'})
    @ApiCreatedResponse({description:'유저 정보가 갈거임', type: User})
    getUserByAssetID(@Param('asset_id') asset_id: string): Promise<User> {
        return this.userService.getUserByAssetID(asset_id);
    }

    @Post('/all')
    @ApiOperation({summary: '계정에 보유 중인 캐릭터 불러오기', description: 'asset_id를 배열에 담아 보낼 것'})
    @ApiCreatedResponse({description:'유저 정보가 배열로 갈거임', type: [User]})
    getAllUserByAssetID(@Body() asset_id: string[]): Promise<User[]> {
        return this.userService.getAllUserByAssetID(asset_id);
    }
    
    @Patch('/exp')
    @UseAuthGuard()
    @ApiBearerAuth('access-token')
    @ApiOperation({summary: '경험치 올리기', description: '경험치 올려줌'})
    @ApiCreatedResponse({type: User})
    expUp(
        @Body() expDto: ExpDTO,
        @AuthUser()user: User): Promise<User> {
        return this.userService.expUp(expDto,user);
    }


}
