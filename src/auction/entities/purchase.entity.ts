import { Item } from "src/item/entities/item.entity";
import { User } from "src/user/entities/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Auction } from "./auction.entity";

@Entity({name: 'purchase'})
export class Purchase extends BaseEntity {
    @PrimaryGeneratedColumn()
    purchase_id: number;

    @Column()
    purchase_count: number;

    @ManyToOne(() => User, user => user.purchase, { eager: false })
    @JoinColumn({ name: "user_id" })
    user_id: number;

    @Column()
    purchase_date: string;

    @ManyToOne(() => Auction, auction => auction.purchase,{eager: false})
    @JoinColumn({name: "auction_id"})
    auction_id: number;
}