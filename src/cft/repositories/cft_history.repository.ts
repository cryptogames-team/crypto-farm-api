import { CustomRepository } from "src/core/typeorm-ex.decorator";
import { CFTHistory } from "../entities/cft_history.entity";
import { Repository } from "typeorm";
import { AddCftHistoryDTO } from "../dto/history.dto";
import { User } from "src/user/entities/user.entity";

@CustomRepository(CFTHistory)
export class CFTHistoryRepository extends Repository<CFTHistory>{
    async createHistory(addCftHistoryDTO: AddCftHistoryDTO): Promise<CFTHistory>{
        const new_history = this.create(addCftHistoryDTO);
        await this.save(new_history);
        return new_history;
    }

    async getMyHistory(user: User,page: number){
        const {user_id} = user;
        const query = this.createQueryBuilder('cft_history')
        .leftJoinAndSelect('cft_history.cft_auction','cft_auction')
        .leftJoinAndSelect('cft_auction.user','seller')
        .where('cft_history.user_id = :user_id', { user_id })
        .orderBy('cft_history.date', 'DESC');
        const count = await query.getCount();

        const skip = (page-1) * 6;
        query.skip(skip).take(6);
        const result = await query.getMany();
        return {count,result};
    }



    async getMySellComplete(user: User,page: number){
        const {user_id} = user;
        const query = this.createQueryBuilder('cft_history')
        .leftJoinAndSelect('cft_history.cft_auction','cft_auction')
        .leftJoinAndSelect('cft_history.user','buyer')
        .andWhere('cft_auction.user_id = :user_id', { user_id })
        .orderBy('cft_history.date', 'DESC');
        const count = await query.getCount();

        const skip = (page-1) * 6;
        query.skip(skip).take(6);
        const result = await query.getMany();
        return {count,result};
    }

    async getTransactionAll(user: User,page: number){
        const {user_id} = user;
        const query = this.createQueryBuilder('cft_history')
        .leftJoinAndSelect('cft_history.cft_auction','cft_auction')
        .leftJoinAndSelect('cft_history.user','buyer')
        .leftJoinAndSelect('cft_auction.user','seller')
        .where('cft_history.user_id= :user_id', { user_id })
        .orWhere('cft_auction.user_id = :user_id', { user_id })
        .orderBy('cft_history.date', 'DESC');
        const count = await query.getCount();

        const skip = (page-1) * 6;
        query.skip(skip).take(6);
        const result = await query.getMany();
        return {count,result};
    }
}