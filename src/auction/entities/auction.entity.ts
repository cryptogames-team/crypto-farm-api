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
    @Column()
    is_sale: number;

    @ApiProperty({type : ()=> User})
    @ManyToOne(() => User, user => user.auction, { eager: true })
    @JoinColumn({ name: "user_id" })
    user: User;

    @ApiProperty({type : ()=> Item})
    @ManyToOne(() => Item, item => item.auction,{eager: false})
    @JoinColumn({name: "item_id"})
    item: Item;

    @OneToMany(() => Purchase, purchase => purchase.auction, {eager: false})
    purchase: Purchase[];
}