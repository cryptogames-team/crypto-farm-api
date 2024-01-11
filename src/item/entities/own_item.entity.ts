import { User } from "src/user/entities/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Item } from "./item.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'own_item'})
export class OwnItem extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    own_item_id: number;

    @ApiProperty()
    @Column()
    item_count: number;

    @ApiProperty()
    @Column()
    item_index: number;

    @ApiProperty()
    @ManyToOne(() => User, user => user.own_item, { eager: false })
    @JoinColumn({ name: "user_id" })
    user_id: number;

    @ApiProperty({type : ()=> Item})
    @ManyToOne(() => Item, item => item.own_items)
    @JoinColumn({name: "item_id"})
    item: Item;
}