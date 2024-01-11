import { CustomRepository } from "src/core/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { Purchase } from "../entities/purchase.entity";
import { PurcahseDTO } from "../dto/auction.dto";
import { User } from "src/user/entities/user.entity";

@CustomRepository(Purchase)
export class PurchaseRepository extends Repository<Purchase>{
    async createPurchase(purchaseDTO: PurcahseDTO){
        const new_purchase = this.create(purchaseDTO);
        await this.save(new_purchase);
    }

    async getMyPurchase(user: User,page: number){
        const {user_id} = user;
        const query = this.createQueryBuilder('purchase')
        .leftJoinAndSelect('purchase.auction','auction')
        .leftJoinAndSelect('auction.user','seller')
        .leftJoinAndSelect('auction.item','item')
        .where('purchase.user_id = :user_id', { user_id })
        .orderBy('purchase.purchase_date', 'DESC');
        const count = await query.getCount();

        const skip = (page-1) * 6;
        query.skip(skip).take(6);
        const result = await query.getMany();
        return {count,result};
    }



    async getMySellComplete(user: User,page: number){
        const {user_id} = user;
        const query = this.createQueryBuilder('purchase')
        .leftJoinAndSelect('purchase.auction','auction')
        .leftJoinAndSelect('purchase.user','buyer')
        .leftJoinAndSelect('auction.item','item')
        .leftJoinAndSelect('auction.user','seller')
        .andWhere('auction.user_id = :user_id', { user_id })
        .orderBy('purchase.purchase_date', 'DESC');
        const count = await query.getCount();

        const skip = (page-1) * 6;
        query.skip(skip).take(6);
        const result = await query.getMany();
        return {count,result};
    }

    async getTransactionAll(user: User,page: number){
        const {user_id} = user;
        const query = this.createQueryBuilder('purchase')
        .leftJoinAndSelect('purchase.auction','auction')
        .leftJoinAndSelect('purchase.user','buyer')
        .leftJoinAndSelect('auction.item','item')
        .leftJoinAndSelect('auction.user','seller')
        .where('purchase.user_id= :user_id', { user_id })
        .orWhere('auction.user_id = :user_id', { user_id })
        .orderBy('purchase.purchase_date', 'DESC');
        const count = await query.getCount();

        const skip = (page-1) * 6;
        query.skip(skip).take(6);
        const result = await query.getMany();
        return {count,result};
    }
}