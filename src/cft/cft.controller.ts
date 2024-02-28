import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { CftService } from './cft.service';
import UseAuthGuard from 'src/user/auth-guards/user-auth';
import { AddCftAuctionDTO, BuyCFTDTO, GetCFTAuctionByFilter } from './dto/cft.dto';
import AuthUser from 'src/core/auth-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { CFTAuction } from './entities/cft.entity';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CFTHistory } from './entities/cft_history.entity';

@ApiTags('CFT거래소')
@Controller('cft')
export class CftController {

    constructor(
        private cftService: CftService
    ){}

    @UseAuthGuard()
    @ApiOperation({summary: 'CFT 경매장 등록', description: 'CFT 경매장 등록'})
    @ApiCreatedResponse({type: CFTAuction})
    @ApiBearerAuth('access-token')
    @Post('/')
    create(
        @Body()addCftAuctionDTO: AddCftAuctionDTO,
        @AuthUser()user: User
    ): Promise<CFTAuction>{
        return this.cftService.create(user,addCftAuctionDTO);
    }

    @Get('/')
    @ApiOperation({summary: 'CFT 경매장 불러오기(필터링)', description: 'CFT 경매장 불러오기'})
    @ApiCreatedResponse({type: [CFTAuction]})
    getAuctionByFilter(
        @Query()params: GetCFTAuctionByFilter
    ){
        return this.cftService.getAuctionByFilter(params);
    }

    @Get('/history/:page')
    @UseAuthGuard()
    @ApiBearerAuth('access-token')
    @ApiOperation({summary: 'CFT 구매내역 불러오기', description: 'CFT 구매 내역 불러오기'})
    @ApiCreatedResponse({type: [CFTHistory]})
    getMyPurchase(
        @AuthUser()user: User,
        @Param('page')page: number
    ){
        return this.cftService.getMyHistory(user,page)
    }

    @Get('/sell/:page')
    @UseAuthGuard()
    @ApiBearerAuth('access-token')
    @ApiOperation({summary: 'CFT 판매내역 불러오기', description: 'CFT 판매 내역 불러오기'})
    @ApiCreatedResponse({type: [CFTHistory]})
    getMySell(
        @AuthUser()user: User,
        @Param('page')page: number
    ){
        return this.cftService.getMySell(user,page)
    }

    @Get('/transaction-all/:page')
    @UseAuthGuard()
    @ApiBearerAuth('access-token')
    @ApiOperation({summary: 'CFT 거래내역 모두 불러오기', description: '거래내역 모두 불러오기'})
    @ApiCreatedResponse({type: [CFTHistory]})
    getTransactionAll(
        @AuthUser()user: User,
        @Param('page')page: number
    ){
        return this.cftService.getTransactionAll(user,page)
    }

    @Get('/sell-complete/:page')
    @UseAuthGuard()
    @ApiBearerAuth('access-token')
    @ApiOperation({summary: 'CFT 판매완료내역 불러오기', description: '판매 내역 불러오기'})
    @ApiCreatedResponse({type: [CFTHistory]})
    getMySellComplete(
        @AuthUser()user: User,
        @Param('page')page: number
    ){
        return this.cftService.getMySellComplete(user,page)
    }

    @Delete('/:auction_id')
    @UseAuthGuard()
    @ApiBearerAuth('access-token')
    @ApiOperation({summary: 'CFT 경매장 취소', description: ''})
    @ApiCreatedResponse({description:'성공하면 cancel success 보낼거임',schema: {example: 'cancel success'}})
    cancelAuction(
        @AuthUser()user: User,
        @Param('auction_id')auction_id: number,
        @Param('item_index')item_index: number
    ){
        return this.cftService.cancelAuction(auction_id,user);
    }

    @Patch('/')
    @UseAuthGuard()
    @ApiBearerAuth('access-token')
    @ApiOperation({summary: 'CFT 구매', description: 'CFT 구매'})
    @ApiCreatedResponse({description:'성공하면 cancel success 보낼거임',schema: {example: 'buy success'}})
    buyItemInAuction(
        @Body(ValidationPipe)buyCFTDTO: BuyCFTDTO,
        @AuthUser()user: User
    ){
        return this.cftService.buyCftInAuction(buyCFTDTO,user);
    }

}
