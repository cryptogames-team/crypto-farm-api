import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { OwnItem } from "./own_item.entity";
import { Auction } from "src/auction/entities/auction.entity";

@Entity({name: 'item'})
export class Item extends BaseEntity {
    @PrimaryGeneratedColumn()
    item_id: number;

    @Column()
    item_type: number;

    @Column()
    item_name: string;

    @Column()
    item_des: string;

    @Column()
    seed_time: number;

    @Column()
    item_price: number;

    @Column()
    use_level: number;

    @OneToMany(type => OwnItem, own_item => own_item.item_id, {eager: false})
    own_items: OwnItem[];

    @OneToMany(type => Auction, auction => auction.item_id, {eager: false})
    auction: Auction[];
}