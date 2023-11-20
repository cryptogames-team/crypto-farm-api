import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({name: 'user'})
@Unique(['asset_id','user_name'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    asset_id: number;

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
}