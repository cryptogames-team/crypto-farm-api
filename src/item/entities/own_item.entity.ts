import { User } from "src/user/entities/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Item } from "./item.entity";

@Entity({name: 'own_item'})
export class OwnItem extends BaseEntity {
    @PrimaryGeneratedColumn()
    own_item_id: number;

    @Column()
    item_count: number;

    @ManyToOne(() => User, user => user.own_item, { eager: false })
    @JoinColumn({ name: "user_id" })
    user_id: number;

    @ManyToOne(() => Item, item => item.own_items,{eager: false})
    @JoinColumn({name: "item_id"})
    item_id: number;
}