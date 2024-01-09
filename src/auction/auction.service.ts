import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuctionRepository } from './repositories/auction.repository';
import { PurchaseRepository } from './repositories/purchase.repository';
import { AddAuctionDTO, GetAuctionByFilter } from './dto/auction.dto';
import { User } from 'src/user/entities/user.entity';
import { Auction } from './entities/auction.entity';
import { OwnItemRepository } from 'src/item/repositories/own_item.repository';

@Injectable()
export class AuctionService {

    constructor(
        private auctionRepository: AuctionRepository,
        private purchaseRepository: PurchaseRepository,
        private ownItemRepository: OwnItemRepository
    ){}

    async addAuction(addAuctionDTO: AddAuctionDTO, user: User):Promise<Auction> {
        const { item_id, item_count } = addAuctionDTO;
        const addOwnItemDto = { item_id, item_count }
        await this.ownItemRepository.useItem(user,addOwnItemDto);
        return this.auctionRepository.addAuction(addAuctionDTO,user);
    }

    getAuctionByFilter(params: GetAuctionByFilter){
        return this.auctionRepository.getAuctionByFilter(params);
    }

    // async cancelAuction(auction_id:number,user:User ){
    //     const { user_id } = user;
    //     const auction = await this.auctionRepository.getAuctionByIdNotUserJoin(+auction_id);
    //     if(auction.user.user_id !== user_id) {
    //         throw new ForbiddenException(`auction_id : ${auction.user.user_id} isn't your auction`);
    //     }
    //     const item_count = auction.item_count;
    //     const addItemDto = { item_id : auction.item_id, item_count : auction.item_count};
    //     await this.ownItemRepository.addItem(user,addItemDto);
    //     await this.auctionRepository.cancelAuction(auction_id);
    //     return 'cancel success';
    // }
}
