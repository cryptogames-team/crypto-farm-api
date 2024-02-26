import { Controller, Get, Param, Patch, Body, ValidationPipe } from '@nestjs/common';
import { ItemService } from './item.service';
import { OwnItem } from './entities/own_item.entity';
import UseAuthGuard from 'src/user/auth-guards/user-auth';
import { AddItemDto } from './dto/add_item.dto';
import AuthUser from 'src/core/auth-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { BuyItemDto } from './dto/buy_item.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OwnItemType } from './swaggerType/item.swagger';
import { Item } from './entities/item.entity';
import { UseItemDto } from './dto/use_item.dto';

@ApiTags('아이템 API')
@Controller('item')
export class ItemController {
    constructor(
        private itemService: ItemService
    ){}
    
    @Get('/own-item/:user_id')
    @ApiOperation({summary: '내 아이템 불러오기', description: '내 아이템 불러오기'})
    @ApiCreatedResponse({description:'아이템 배열로 갈거임', type: [OwnItemType]})
    getMyItems(@Param('user_id') user_id: number): Promise<OwnItem[]> {
        return this.itemService.getMyItems(user_id);
    }

    @Get('/item/all')
    @ApiOperation({summary: '모든 아이템 불러오기', description: '모든 아이템 불러오기'})
    @ApiCreatedResponse({description:'아이템 배열로 갈거임', type: [Item]})
    getAllItem(): Promise<Item[]> {
        return this.itemService.getAllItem();
    }

    @Patch('/add')
    @UseAuthGuard()
    @ApiBearerAuth('access-token')
    @ApiOperation({summary: '아이템 추가', description: '아이템 추가'})
    @ApiCreatedResponse({description:'성공하면 결과값 "success"로 갈거임'})
    addItem(
        @Body(ValidationPipe) addItemDTO: AddItemDto,
        @AuthUser()user: User):Promise<string> {
            return this.itemService.addItem(user,addItemDTO);
    }

    @Patch('/use')
    @UseAuthGuard()
    @ApiBearerAuth('access-token')
    @ApiOperation({summary: '아이템 사용', description: '아이템 사용'})
    @ApiCreatedResponse({description:'성공하면 결과값 "use success"로 갈거임'})
    useItem(
        @Body(ValidationPipe) useItemDTO: UseItemDto,
        @AuthUser()user: User):Promise<string> {
            return this.itemService.useItem(user,useItemDTO);
    }

    @Patch('/buyItem')
    @UseAuthGuard()
    @ApiBearerAuth('access-token')
    @ApiOperation({summary: '아이템 구매', description: '아이템 구매'})
    @ApiCreatedResponse({description:'아이템 배열로 갈거임', type: OwnItem})
    buyItem(
        @Body(ValidationPipe) buyItemDto: BuyItemDto,
        @AuthUser()user: User): Promise<OwnItem> {
            return this.itemService.buyItem(user,buyItemDto);
    }

    @Patch('sellItem')
    @UseAuthGuard()
    @ApiBearerAuth('access-token')
    @ApiOperation({summary: '아이템 판매', description: '아이템 판매'})
    @ApiCreatedResponse({description:'성공하면 결과값 "success"로 갈거임'})
    sellItem(
        @Body(ValidationPipe) sellItemDto: BuyItemDto,
        @AuthUser()user: User){
            return this.itemService.sellItem(user,sellItemDto);
    }

    @Patch('/move/:item_id/:item_index')
    @UseAuthGuard()
    @ApiBearerAuth('access-token')
    @ApiOperation({summary: '아이템 이동', description: '아이템 이동'})
    @ApiCreatedResponse({description:'성공하면 결과값 "success"로 갈거임'})
    moveItem(
        @Param('item_id')item_id: number,
        @Param('item_index')item_index: number,
        @AuthUser()user: User){
            return this.itemService.moveItem(user,item_id,item_index);
    }

    
}
