import { Injectable, ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { ExpDTO, UserDto } from "../dto/user.dto";
import { CustomRepository } from "src/core/typeorm-ex.decorator";

@CustomRepository(User)
export class UserRepository extends Repository<User>{

    async getUser(user_name: string): Promise<User> {
        const user = await this.findOne({ where : { user_name} });

        if (!user) {
            throw new NotFoundException(`Cant't found user name by ${user_name}`);
        }

        return user;
    }

    async getUserByID(user_id: number): Promise<User> {
        const user = await this.findOne({ where : { user_id} });

        if (!user) {
            throw new NotFoundException(`Cant't found user name by ${user_id}`);
        }

        return user;
    }

    async getUserByAssetID(asset_id: string): Promise<User> {
        const user = await this.findOne({ where : { asset_id} });

        if (!user) {
            throw new NotFoundException(`Cant't found user asset_id by ${asset_id}`);
        }

        return user;
    }

    async getAllUserByAssetID(asset_id: string[]):Promise<User[]> {
        let users = [];
        for (const id of asset_id) {
            const user = await this.getUserByAssetID(id);
            users.push(user);
        }

        return users;
    }

    async checkUser(userDto: UserDto): Promise<Boolean> {
        const {user_name} = userDto;

        const user = await this.findOne({ where : { user_name} });

        return !!user;
    }
    async createUser(userDto: UserDto): Promise<User>{
        const {asset_id,user_name} = userDto;

        const user = this.create({asset_id,user_name,level:1,exp:0,skill_point:0,cft:100})

        try{
            return await this.save(user);
        }catch(error){
            console.log(error)
            if(error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('Existing username');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async expUp(expDto: ExpDTO, user: User): Promise<string> {
        const { user_name, user_id } = user;
        const { exp } = expDto;
        const get_user = await this.getUser(user_name);
        let user_level = get_user.level;
        let user_exp = get_user.exp;
        let user_skill_point = get_user.skill_point;

        let max_exp = user_level * 20;

        user_exp += exp;

        while(user_exp >= max_exp){
            user_exp -= max_exp;
            user_level++;
            max_exp = user_level * 20;
            user_skill_point++;
        }

        get_user.exp = user_exp;
        get_user.level = user_level;
        get_user.skill_point = user_skill_point;

        await this.update(user_id,get_user);
        
        return 'exp up';
    }

    async useSkillPoint(use_point: number, user: User): Promise<Boolean> {
        const { skill_point, user_id } = user;

        if(skill_point < use_point){
            return false;
        }

        user.skill_point -= use_point;

        await this.update(user_id,user);

        return true;
    }

    async useCFT(use_cft: number, user: User): Promise<Boolean> {
        const { cft, user_id, user_name } = user;
        const get_user = await this.getUser(user_name);
        if(cft < use_cft){
            return false;
        }
        get_user.cft -= use_cft;
        await this.update(user_id,get_user);
        
        return true;
    }

    async getCFT(get_cft: number, user: User): Promise<Boolean> {
        const { user_id } = user;

        user.cft += get_cft;

        await this.update(user_id,user);
        
        return true;
    }
}