import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CookService } from './cook.service';
import UseAuthGuard from 'src/user/auth-guards/user-auth';
import { cookDto } from './dto/cook.dto';
import AuthUser from 'src/core/auth-user.decorator';
import { User } from 'src/user/entities/user.entity';

@ApiTags('요리 API')
@Controller('cook')
export class CookController {
    constructor(
        private cookService: CookService
    ){}

    @UseAuthGuard()
    @ApiOperation({summary: '요리'})
    @ApiCreatedResponse({description:'성공하면 결과값 "success"로 갈거임'})
    @ApiBearerAuth('access-token')
    @Post('/')
    cook(
        @Body(ValidationPipe)cookDto: cookDto,
        @AuthUser()user: User
    ){
        return this.cookService.cook(user,cookDto);
    }

}
