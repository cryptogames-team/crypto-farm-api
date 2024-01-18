import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { AddAuctionDTO, BuyAuctionDTO, GetAuctionByFilter } from './dto/auction.dto';
import AuthUser from 'src/core/auth-user.decorator';
import { User } from 'src/user/entities/user.entity';
import UseAuthGuard from 'src/user/auth-guards/user-auth';
import { Auction } from './entities/auction.entity';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuctionFilterType, AuctionType } from './swaggerType/auction.swagger';
import { Purchase } from './entities/purchase.entity';

@ApiTags('경매장 API')
@Controller('auction')
export class AuctionController {

    constructor(private auctionService: AuctionService){}

    @Post('/')
    @UseAuthGuard()
    @ApiOperation({summary: '경매장 등록', description: '경매장 등록'})
    @ApiCreatedResponse({type: AuctionType})
    @ApiBearerAuth('access-token')
    addAuction(
        @Body()addAuctionDTO: AddAuctionDTO,
        @AuthUser()user: User
    ):Promise<Auction> {
        return this.auctionService.addAuction(addAuctionDTO,user);
    }

    @Get('/')
    @ApiOperation({summary: '경매장 불러오기(필터링)', description: '경매장 불러오기'})
    @ApiCreatedResponse({type: AuctionFilterType})
    getAuctionByFilter(
        @Query()params: GetAuctionByFilter
    ){
        return this.auctionService.getAuctionByFilter(params);
    }

    @Get('/purchase/:page')
    @UseAuthGuard()
    @ApiBearerAuth('access-token')
    @ApiOperation({summary: '구매내역 불러오기', description: '구매 내역 불러오기'})
    @ApiCreatedResponse({type: [Purchase]})
    getMyPurchase(
        @AuthUser()user: User,
        @Param('page')page: number
    ){
        return this.auctionService.getMyPurchase(user,page)
    }

    @Get('/sell/:page')
    @UseAuthGuard()
    @ApiBearerAuth('access-token')
    @ApiOperation({summary: '판매내역 불러오기', description: '판매 내역 불러오기'})
    @ApiCreatedResponse({type: [Purchase]})
    getMySell(
        @AuthUser()user: User,
        @Param('page')page: number
    ){
        return this.auctionService.getMySell(user,page)
    }

    @Get('/transaction-all/:page')
    @UseAuthGuard()
    @ApiBearerAuth('access-token')
    @ApiOperation({summary: '거래내역 모두 불러오기', description: '거래내역 모두 불러오기'})
    @ApiCreatedResponse({type: [Purchase]})
    getTransactionAll(
        @AuthUser()user: User,
        @Param('page')page: number
    ){
        return this.auctionService.getTransactionAll(user,page)
    }

    @Get('/sell-complete/:page')
    @UseAuthGuard()
    @ApiBearerAuth('access-token')
    @ApiOperation({summary: '판매완료내역 불러오기', description: '판매 내역 불러오기'})
    @ApiCreatedResponse({type: [Purchase]})
    getMySellComplete(
        @AuthUser()user: User,
        @Param('page')page: number
    ){
        return this.auctionService.getMySellComplete(user,page)
    }

    @Delete('/:auction_id/:item_index')
    @UseAuthGuard()
    @ApiBearerAuth('access-token')
    @ApiOperation({summary: '경매장 취소', description: 'body에 item_index: 값 넣어주기'})
    @ApiCreatedResponse({description:'성공하면 cancel success 보낼거임',schema: {example: 'cancel success'}})
    cancelAuction(
        @AuthUser()user: User,
        @Param('auction_id')auction_id: number,
        @Param('item_index')item_index: number
    ){
        return this.auctionService.cancelAuction(auction_id,user,item_index);
    }

    @Patch('/buy')
    @UseAuthGuard()
    @ApiBearerAuth('access-token')
    @ApiOperation({summary: '구매', description: '구매'})
    @ApiCreatedResponse({description:'성공하면 cancel success 보낼거임',schema: {example: 'buy success'}})
    buyItemInAuction(
        @Body()buyAuctionDTO: BuyAuctionDTO,
        @AuthUser()user: User
    ){
        return this.auctionService.buyItemInAuction(buyAuctionDTO,user);
    }
}
