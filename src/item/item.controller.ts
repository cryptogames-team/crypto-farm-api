import { Controller, Get, Param, Patch, Body, ValidationPipe } from '@nestjs/common';
import { ItemService } from './item.service';
import { OwnItem } from './entities/own_item.entity';
import UseAuthGuard from 'src/user/auth-guards/user-auth';
import { AddItemDto } from './dto/add_item.dto';
import AuthUser from 'src/core/auth-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { BuyItemDto } from './dto/buy_item.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OwnItemType } from './swaggerType/item.swagger';

@ApiTags('아이템 API')
@Controller('item')
export class ItemController {
    constructor(
        private itemService: ItemService
    ){}
    
    @Get('/:user_id')
    @ApiOperation({summary: '내 아이템 불러오기', description: '내 아이템 불러오기'})
    @ApiCreatedResponse({description:'아이템 배열로 갈거임', type: [OwnItemType]})
    getMyItems(@Param('user_id') user_id: number): Promise<OwnItem[]> {
        return this.itemService.getMyItems(user_id);
    }

    @Patch('/add')
    @UseAuthGuard()
    @ApiOperation({summary: '아이템 추가', description: '아이템 추가'})
    @ApiCreatedResponse({description:'성공하면 결과값 "success"로 갈거임'})
    addItem(
        @Body(ValidationPipe) addItemDTO: AddItemDto,
        @AuthUser()user: User):Promise<string> {
            return this.itemService.addItem(user,addItemDTO);
    }

    @Patch('/buyItem')
    @UseAuthGuard()
    @ApiOperation({summary: '아이템 구매', description: '아이템 구매'})
    @ApiCreatedResponse({description:'아이템 배열로 갈거임', type: OwnItem})
    buyItem(
        @Body(ValidationPipe) buyItemDto: BuyItemDto,
        @AuthUser()user: User): Promise<OwnItem> {
            return this.itemService.buyItem(user,buyItemDto);
    }

    @Patch('sellItem')
    @UseAuthGuard()
    @ApiOperation({summary: '아이템 판매', description: '아이템 판매'})
    @ApiCreatedResponse({description:'성공하면 결과값 "success"로 갈거임'})
    sellItem(
        @Body(ValidationPipe) sellItemDto: BuyItemDto,
        @AuthUser()user: User){
            this.itemService.sellItem(user,sellItemDto);
    }

    

    
}
