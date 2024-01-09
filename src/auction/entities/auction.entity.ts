import { Item } from "src/item/entities/item.entity";
import { User } from "src/user/entities/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Purchase } from "./purchase.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'auction'})
export class Auction extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    auction_id: number;

    @ApiProperty()
    @Column()
    item_count: number;

    @ApiProperty()
    @Column()
    item_price: number;

    @ApiProperty()
    @Column()
    register_date: string;

    @ApiProperty()
    @ManyToOne(() => User, user => user.auction, { eager: true })
    @JoinColumn({ name: "user_id" })
    user_id: number;

    @ApiProperty()
    @ManyToOne(() => Item, item => item.auction,{eager: false})
    @JoinColumn({name: "item_id"})
    item_id: number;

    @OneToMany(type => Purchase, purchase => purchase.auction_id, {eager: false})
    purchase: Purchase[];
}