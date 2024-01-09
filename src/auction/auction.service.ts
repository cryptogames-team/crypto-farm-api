import { Injectable } from '@nestjs/common';
import { AuctionRepository } from './repositories/auction.repository';
import { PurchaseRepository } from './repositories/purchase.repository';
import { AddAuctionDTO } from './dto/auction.dto';
import { User } from 'src/user/entities/user.entity';
import { Auction } from './entities/auction.entity';

@Injectable()
export class AuctionService {

    constructor(
        private auctionRepository: AuctionRepository,
        private purchaseRepository: PurchaseRepository
    ){}

    addAuction(addAuctionDTO: AddAuctionDTO, user: User):Promise<Auction> {
        return this.auctionRepository.addAuction(addAuctionDTO,user);
    }
}
