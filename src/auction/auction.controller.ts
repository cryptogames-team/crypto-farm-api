import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { AddAuctionDTO, GetAuctionByFilter } from './dto/auction.dto';
import AuthUser from 'src/core/auth-user.decorator';
import { User } from 'src/user/entities/user.entity';
import UseAuthGuard from 'src/user/auth-guards/user-auth';
import { Auction } from './entities/auction.entity';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuctionFilterType, AuctionType } from './swaggerType/auction.swagger';

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

    @Delete('/:auction_id')
    @UseAuthGuard()
    @ApiBearerAuth('access-token')
    @ApiOperation({summary: '경매장 취소', description: '경매장 취소'})
    @ApiCreatedResponse({description:'성공하면 cancel success 보낼거임',schema: {example: 'cancel success'}})
    cancelAuction(
        @AuthUser()user: User,
        @Param('auction_id')auction_id: number
    ){
        return this.auctionService.cancelAuction(auction_id,user);
    }
}
