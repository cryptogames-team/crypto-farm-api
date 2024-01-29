import { CustomRepository } from "src/core/typeorm-ex.decorator";
import { CFTAuction } from "../entities/cft.entity";
import { Repository } from "typeorm";
import { AddCftAuctionDTO, GetCFTAuctionByFilter } from "../dto/cft.dto";
import { User } from "src/user/entities/user.entity";
import DateUtils from "src/utils/date-util";
import { ForbiddenException, InternalServerErrorException } from "@nestjs/common";

@CustomRepository(CFTAuction)
export class CFTAuctionRepository extends Repository<CFTAuction>{

    async addAuction(addCftAuctionDTO: AddCftAuctionDTO, user: User):Promise<CFTAuction> {
        addCftAuctionDTO.user = user;
        addCftAuctionDTO.date = DateUtils.momentNow();
        addCftAuctionDTO.is_sale = 1;
        const new_auction = this.create(addCftAuctionDTO);
        try{
            await this.save(new_auction);
            return await this.getAuctionById(new_auction.cft_auction_id);
        }catch(error){
            console.log(error)
            throw new InternalServerErrorException();
        }
        
    }

    async getAuctionById(cft_auction_id: number):Promise<CFTAuction> {
        return this.createQueryBuilder('cft_auction')
        .leftJoinAndSelect('cft_auction.user','user')
        .where('cft_auction.cft_auction_id = :cft_auction_id', { cft_auction_id })
        .getOne();
    }

    async buyCftInAuction(cft: number,cft_auction_id: number){
        const auction = await this.getAuctionById(cft_auction_id);

        if(auction.cft < cft){
            throw new ForbiddenException(`Not enought Auction CFT`);
        }
        auction.cft -= cft;
        if(auction.cft === 0){
            auction.is_sale = 0;
        }
        await this.update(cft_auction_id,auction);
        return 'buy success';

    }
    
    async cancelAuction(cft_auction_id: number){
        const auction = await this.getAuctionById(cft_auction_id);
        auction.cft = 0;
        auction.is_sale = 0;
        await this.update(cft_auction_id,auction);
        return 'cancel success';
    }

    async getAuctionByFilter(params: GetCFTAuctionByFilter) {
        const { cft_count, cft_price, register_date, page } = params;

        const query = this.createQueryBuilder('cft_auction')
            .leftJoinAndSelect('cft_auction.user','user')
            .andWhere('cft_auction.is_sale = 1')
            .andWhere('cft_auction.item_count != 0');

        if(cft_count) {
            if(+cft_count === 0){
                query.orderBy('cft_auction.cft', 'DESC');
            }
            if(+cft_count === 1){
                query.orderBy('cft_auction.cft', 'ASC');
            }
        }

        if(cft_price){
            if(+cft_price === 0){
                query.orderBy('cft_auction.price', 'DESC');
            }
            if(+cft_price === 1){
                query.orderBy('cft_auction.price', 'ASC');
            }
        }

        if(register_date){
            if(+register_date === 0){
                query.orderBy('cft_auction.date', 'DESC');
            }
            if(+register_date === 1){
                query.orderBy('cft_auction.date', 'ASC');
            }
        }

        const count = await query.getCount();

        const skip = (page-1) * 6;
        query.skip(skip).take(6);

        const auctions = await query.getMany();
        return {auctions,count};
    }

    async getMySell(user: User,page: number){
        const {user_id} = user;
        const query = this.createQueryBuilder('cft_auction')
        .andWhere('cft_auction.user_id = :user_id', { user_id })
        .andWhere('cft_auction.cft != 0')
        .andWhere('cft_auction.is_sale = 1')
        .orderBy('cft_auction.date', 'DESC');
        const count = await query.getCount();

        const skip = (page-1) * 9;
        query.skip(skip).take(9);
        const result = await query.getMany();
        return {count,result};
    }
}