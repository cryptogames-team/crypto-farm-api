import { Auction } from "src/auction/entities/auction.entity";
import { Purchase } from "src/auction/entities/purchase.entity";
import { OwnItem } from "src/item/entities/own_item.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({name: 'user'})
@Unique(['asset_id','user_name'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    asset_id: string;

    @Column()
    user_name: string;

    @Column()
    level: number;

    @Column()
    exp: number;

    @Column()
    skill_point: number;

    @Column()
    cft: number;

    @OneToMany(type => OwnItem, cart => cart.user_id, {eager: false})
    own_item: OwnItem[]

    @OneToMany(type => Auction, auction => auction.user_id, {eager: false})
    auction: Auction[]

    @OneToMany(type => Purchase, purchase => purchase.user_id, {eager: false})
    purchase: Purchase[]
}