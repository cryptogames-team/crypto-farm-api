import { CustomRepository } from "src/core/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { Auction } from "../entities/auction.entity";
import { User } from "src/user/entities/user.entity";
import { AddAuctionDTO, GetAuctionByFilter } from "../dto/auction.dto";
import { ForbiddenException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import DateUtils from "src/utils/date-util";

@CustomRepository(Auction)
export class AuctionRepository extends Repository<Auction>{

    async getAuctionById(auction_id: number):Promise<Auction> {
        return this.createQueryBuilder('auction')
        .leftJoinAndSelect('auction.item','item')
        .leftJoinAndSelect('auction.user','user')
        .where('auction.auction_id = :auction_id', { auction_id })
        .getOne();
    }

    async getAuctionByIdNotUserJoin(auction_id: number):Promise<Auction> {
        return this.createQueryBuilder('auction')
        .leftJoinAndSelect('auction.item','item')
        .where('auction.auction_id = :auction_id', { auction_id })
        .getOne();
    }

    async getAuctionByFilter(params: GetAuctionByFilter) {
        const { search_keyword, item_count, item_price, item_name, min_price, max_price, page } = params;

        const query = this.createQueryBuilder('auction')
            .leftJoinAndSelect('auction.user','user')
            .leftJoinAndSelect('auction.item','item');

        if(search_keyword){
            query.andWhere('item.item_name LIKE :item_name', { item_name: `%${search_keyword}%`});
        }

        if(max_price){
            if(!min_price){
                query.andWhere('auction.item_price >= :min_price', { min_price : 0 })
                .andWhere('auction.item_price <= :max_price', { max_price });
            }else {
                query.andWhere('auction.item_price >= :min_price', { min_price })
                .andWhere('auction.item_price <= :max_price', { max_price });
            }
        }

        if(item_count) {
            if(+item_count === 0){
                query.orderBy('auction.item_count', 'DESC');
            }
            if(+item_count === 1){
                query.orderBy('auction.item_count', 'ASC');
            }
        }

        if(item_price){
            if(+item_price === 0){
                query.orderBy('auction.item_price', 'DESC');
            }
            if(+item_price === 1){
                query.orderBy('auction.item_price', 'ASC');
            }
        }

        if(item_name){
            if(+item_name === 0){
                query.orderBy('item.item_name', 'DESC');
            }
            if(+item_name === 1){
                query.orderBy('item.item_name', 'ASC');
            }
        }

        const count = await query.getCount();

        const skip = (page-1) * 6;
        query.skip(skip).take(6);

        const auctions = await query.getMany();
        return {auctions,count};
    }
    
    async addAuction(addAuctionDTO: AddAuctionDTO, user: User):Promise<Auction> {
        addAuctionDTO.user = user;
        addAuctionDTO.register_date = DateUtils.momentNow();

        const new_auction = this.create(addAuctionDTO);
        try{
            await this.save(new_auction);
            return await this.getAuctionById(new_auction.auction_id);
        }catch(error){
            console.log(error)
            throw new InternalServerErrorException();
        }
        
    }

    async buyItemInAuction(item_count: number,auction_id: number){
        const auction = await this.getAuctionById(auction_id);
        auction.item_count -= item_count;
        await this.update(auction_id,auction);
        return 'buy success';

    }
    
    async cancelAuction(auction_id: number){
        await this.delete({auction_id});
    }

    async getMySell(user: User,page: number){
        const {user_id} = user;
        const query = this.createQueryBuilder('auction')
        .leftJoinAndSelect('auction.user','seller')
        .leftJoinAndSelect('auction.item','item')
        .andWhere('auction.user_id = :user_id', { user_id })
        .orderBy('auction.register_date', 'DESC');
        const count = await query.getCount();

        const skip = (page-1) * 6;
        query.skip(skip).take(6);
        const result = await query.getMany();
        return {count,result};
    }
}