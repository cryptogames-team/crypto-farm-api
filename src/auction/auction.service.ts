import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { AuctionRepository } from './repositories/auction.repository';
import { PurchaseRepository } from './repositories/purchase.repository';
import { AddAuctionDTO, BuyAuctionDTO, GetAuctionByFilter } from './dto/auction.dto';
import { User } from 'src/user/entities/user.entity';
import { Auction } from './entities/auction.entity';
import { OwnItemRepository } from 'src/item/repositories/own_item.repository';
import { ItemRepository } from 'src/item/repositories/item.repository';
import { UserRepository } from 'src/user/repositories/user.repository';
import DateUtils from 'src/utils/date-util';

@Injectable()
export class AuctionService {

    constructor(
        private auctionRepository: AuctionRepository,
        private purchaseRepository: PurchaseRepository,
        private ownItemRepository: OwnItemRepository,
        private itemRepository: ItemRepository,
        private userRepository: UserRepository
    ){}

    async addAuction(addAuctionDTO: AddAuctionDTO, user: User):Promise<Auction> {
        const { item_id, item_count } = addAuctionDTO;
        const addOwnItemDto = { item_id, item_count }
        const item = await this.itemRepository.getItemByID(item_id);
        await this.ownItemRepository.useItem(user,addOwnItemDto,item);
        return this.auctionRepository.addAuction(addAuctionDTO,user);
    }

    getAuctionByFilter(params: GetAuctionByFilter){
        return this.auctionRepository.getAuctionByFilter(params);
    }

    async cancelAuction(auction_id:number,user:User,item_index: number ){
        const { user_id } = user;
        const auction = await this.auctionRepository.getAuctionById(+auction_id);
        console.log('dd')
        if(auction.user.user_id !== user_id) {
            throw new ForbiddenException(`auction_id : ${auction_id} isn't your auction`);
        }
        const item_id = auction.item.item_id;
        const item_count = auction.item_count;
        const addItemDto = { item_id, item_count, item_index};
        const item = await this.itemRepository.getItemByID(item_id);
        await this.ownItemRepository.addItem(user,addItemDto,item);
        await this.auctionRepository.cancelAuction(auction_id);
        return 'cancel success';
    }

    async buyItemInAuction(buyAuctionDTO: BuyAuctionDTO,user:User) {
        const { auction_id, item_count, item_index } = buyAuctionDTO;
        const auction = await this.auctionRepository.getAuctionById(auction_id);
        if(!auction){
            throw new NotFoundException(`auction : ${auction_id} is not found`)
        }
        if(auction.item_count < item_count){
            throw new InternalServerErrorException(`auction item is not enought`);
        }
        const total_price = auction.item_price * item_count;
        if(await this.userRepository.useCFT(total_price,user)){
            const seller = await this.userRepository.getUserByID(auction.user.user_id);
            await this.userRepository.getCFT(total_price,seller);
            const purchase_data = {
                purchase_count : item_count,
                purchase_date : DateUtils.momentNow(),
                user,
                auction
            }
            await this.purchaseRepository.createPurchase(purchase_data);
            const addItemDto = { item_id : auction.item.item_id, item_count, item_index};
            const item = await this.itemRepository.getItemByID(auction.item.item_id);
            await this.ownItemRepository.addItem(user,addItemDto,item);
            return await this.auctionRepository.buyItemInAuction(item_count,auction_id);
        }else {
            throw new InternalServerErrorException(`not enought cft`);
        }
    
    }

    getMyPurchase(user: User,page: number){
        return this.purchaseRepository.getMyPurchase(user,page);
    }

    getMySell(user: User,page: number){
        return this.auctionRepository.getMySell(user,page);
    }

    getMySellComplete(user: User,page: number){
        return this.purchaseRepository.getMySellComplete(user,page);
    }

    getTransactionAll(user: User,page: number){
        return this.purchaseRepository.getTransactionAll(user,page);
    }
}
