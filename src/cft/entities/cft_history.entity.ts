import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CFTAuction } from "./cft.entity";

@Entity({name: 'cft_hitory'})
export class CFTHistory extends BaseEntity {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    cft_history_id: number;

    @ApiProperty({type : ()=> User})
    @ManyToOne(() => User, user => user.cft_history, { eager: false })
    @JoinColumn({ name: "user_id" })
    user: User;

    @ApiProperty({type : ()=> CFTAuction})
    @ManyToOne(() => CFTAuction, cft_auction => cft_auction.cft_history, { eager: false })
    @JoinColumn({ name: "cft_auction_id" })
    cft_auction: CFTAuction;

    @ApiProperty()
    @Column()
    cft: number;

    @ApiProperty()
    @Column()
    date: string;

}