import { Item } from "src/item/entities/item.entity";
import { User } from "src/user/entities/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Purchase } from "./purchase.entity";

@Entity({name: 'auction'})
export class Auction extends BaseEntity {
    @PrimaryGeneratedColumn()
    auction_id: number;

    @Column()
    item_count: number;

    @Column()
    item_price: number;

    @Column()
    register_date: string;

    @ManyToOne(() => User, user => user.auction, { eager: false })
    @JoinColumn({ name: "user_id" })
    user_id: number;

    @ManyToOne(() => Item, item => item.auction,{eager: false})
    @JoinColumn({name: "item_id"})
    item_id: number;

    @OneToMany(type => Purchase, purchase => purchase.auction_id, {eager: false})
    purchase: Purchase[];
}