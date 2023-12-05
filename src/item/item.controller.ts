import { Controller, Get, Param, Patch, Body, ValidationPipe } from '@nestjs/common';
import { ItemService } from './item.service';
import { OwnItem } from './entities/own_item.entity';
import UseAuthGuard from 'src/user/auth-guards/user-auth';
import { AddItemDto } from './dto/add_item.dto';
import AuthUser from 'src/core/auth-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { BuyItemDto } from './dto/buy_item.dto';

@Controller('item')
export class ItemController {
    constructor(
        private itemService: ItemService
    ){}
    
    @Get('/:user_id')
    getMyItems(@Param('user_id') user_id: number): Promise<OwnItem[]> {
        return this.itemService.getMyItems(user_id);
    }

    @Patch('/add')
    @UseAuthGuard()
    addItem(
        @Body(ValidationPipe) addItemDTO: AddItemDto,
        @AuthUser()user: User):Promise<string> {
            return this.itemService.addItem(user,addItemDTO);
    }

    @Patch('/buyItem')
    @UseAuthGuard()
    buyItem(
        @Body(ValidationPipe) buyItemDto: BuyItemDto,
        @AuthUser()user: User): Promise<OwnItem> {
            return this.itemService.buyItem(user,buyItemDto);
    }

    @Patch('sellItem')
    @UseAuthGuard()
    sellItem(
        @Body(ValidationPipe) sellItemDto: BuyItemDto,
        @AuthUser()user: User){
            this.itemService.sellItem(user,sellItemDto);
    }

    

    
}
