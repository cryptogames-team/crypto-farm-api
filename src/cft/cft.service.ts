import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CFTHistoryRepository } from './repositories/cft_history.repository';
import { CFTAuctionRepository } from './repositories/cft.repository';
import { UserRepository } from 'src/user/repositories/user.repository';
import { User } from 'src/user/entities/user.entity';
import { AddCftAuctionDTO, BuyCFTDTO, GetCFTAuctionByFilter } from './dto/cft.dto';
import DateUtils from 'src/utils/date-util';
import { CFTHistory } from './entities/cft_history.entity';
import { CFTAuction } from './entities/cft.entity';

@Injectable()
export class CftService {

    constructor(
        private cftHistoryRepository: CFTHistoryRepository,
        private cftAuctionRepository: CFTAuctionRepository,
        private userRepository: UserRepository
    ){}

    async create(user: User, addCftAuctionDTO: AddCftAuctionDTO): Promise<CFTAuction> {
        const my_cft = user.cft;
        const upload_cft = addCftAuctionDTO.cft;

        if(addCftAuctionDTO.cft > my_cft){
            throw new ForbiddenException('Not enought your cft');
        }
        await this.userRepository.useCFT(upload_cft,user);
        return this.cftAuctionRepository.addAuction(addCftAuctionDTO,user);
    }

    getAuctionByFilter(params: GetCFTAuctionByFilter){
        return this.cftAuctionRepository.getAuctionByFilter(params);
    }

    async cancelAuction(cft_auction_id:number,user:User){
        const { user_id } = user;
        const auction = await this.cftAuctionRepository.getAuctionById(+cft_auction_id);
        if(auction.user.user_id !== user_id) {
            throw new ForbiddenException(`auction_id : ${cft_auction_id} isn't your auction`);
        }

        await this.userRepository.getCFT(auction.cft,user);
        await this.cftAuctionRepository.cancelAuction(cft_auction_id);
        return 'cancel success';
    }

    async buyCftInAuction(buyCFTDTO: BuyCFTDTO,user:User):Promise<CFTHistory> {
        const { cft_auction_id, cft } = buyCFTDTO;
        const auction = await this.cftAuctionRepository.getAuctionById(cft_auction_id);
        if(!auction){
            throw new NotFoundException(`cft_auction : ${cft_auction_id} is not found`)
        }
        if(auction.cft < cft){
            throw new ForbiddenException(`auction cft is not enought`);
        }
        
        await this.userRepository.getCFT(cft,auction.user);
        const addHistoryDTO = {
            cft,
            cft_auction: auction,
            date: DateUtils.momentNow(),
            user
        }
        return await this.cftHistoryRepository.createHistory(addHistoryDTO)
    }

    getMyHistory(user: User,page: number){
        return this.cftHistoryRepository.getMyHistory(user,page);
    }

    getMySell(user: User,page: number){
        return this.cftAuctionRepository.getMySell(user,page);
    }

    getMySellComplete(user: User,page: number){
        return this.cftHistoryRepository.getMySellComplete(user,page);
    }

    getTransactionAll(user: User,page: number){
        return this.cftHistoryRepository.getTransactionAll(user,page);
    }
}
