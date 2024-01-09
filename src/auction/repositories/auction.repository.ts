import { CustomRepository } from "src/core/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { Auction } from "../entities/auction.entity";
import { User } from "src/user/entities/user.entity";
import { AddAuctionDTO } from "../dto/auction.dto";
import { InternalServerErrorException } from "@nestjs/common";
import DateUtils from "src/utils/date-util";

@CustomRepository(Auction)
export class AuctionRepository extends Repository<Auction>{

    async getAuctionById(auction_id: number):Promise<Auction> {
        return this.createQueryBuilder('auction')
        .leftJoinAndSelect('auction.item_id','item')
        .leftJoinAndSelect('auction.user_id','user')
        .where('auction.auction_id = :auction_id', { auction_id })
        .getOne();
    }
    
    async addAuction(addAuctionDTO: AddAuctionDTO, user: User):Promise<Auction> {
        const { user_id } = user;
        addAuctionDTO.user_id = user_id;
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
}