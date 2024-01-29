import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CFTHistory } from "./cft_history.entity";

@Entity({name: 'cft_auction'})
export class CFTAuction extends BaseEntity {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    cft_auction_id: number;

    @ApiProperty()
    @Column()
    cft: number;

    @ApiProperty()
    @Column()
    price: number;
    
    @ApiProperty()
    @Column()
    date: string;

    @ApiProperty()
    @Column()
    is_sale: number;

    @ApiProperty()
    @ManyToOne(() => User, user => user.cft_auction, { eager: false })
    @JoinColumn({ name: "user_id" })
    user: User;

    @OneToMany(type => CFTHistory, cft_history => cft_history.cft_auction, {eager: false})
    cft_history: CFTHistory[]
}