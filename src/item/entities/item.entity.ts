import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { OwnItem } from "./own_item.entity";
import { Auction } from "src/auction/entities/auction.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'item'})
export class Item extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    item_id: number;

    @ApiProperty()
    @Column()
    item_type: number;

    @ApiProperty()
    @Column()
    item_name: string;

    @ApiProperty()
    @Column()
    item_des: string;

    @ApiProperty()
    @Column()
    seed_time: number;

    @ApiProperty()
    @Column()
    item_price: number;

    @ApiProperty()
    @Column()
    use_level: number;

    
    @OneToMany(type => OwnItem, own_item => own_item.item_id, {eager: false})
    own_items: OwnItem[];

    @OneToMany(type => Auction, auction => auction.item_id, {eager: false})
    auction: Auction[];
}