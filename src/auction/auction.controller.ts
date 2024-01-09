import { Body, Controller, Post } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { AddAuctionDTO } from './dto/auction.dto';
import AuthUser from 'src/core/auth-user.decorator';
import { User } from 'src/user/entities/user.entity';
import UseAuthGuard from 'src/user/auth-guards/user-auth';
import { Auction } from './entities/auction.entity';

@Controller('auction')
export class AuctionController {

    constructor(private auctionService: AuctionService){}

    @Post('/')
    @UseAuthGuard()
    addAuction(
        @Body()addAuctionDTO: AddAuctionDTO,
        @AuthUser()user: User
    ):Promise<Auction> {
        return this.auctionService.addAuction(addAuctionDTO,user);
    }
}
