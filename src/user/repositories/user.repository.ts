import { Injectable, ConflictException, InternalServerErrorException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { UserDto } from "../dto/user.dto";
import { CustomRepository } from "src/core/typeorm-ex.decorator";

@CustomRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(userDto: UserDto): Promise<User>{
        const {asset_id,user_name} = userDto;

        const user = this.create({asset_id,user_name,level:0,exp:0,skill_point:0,cft:0})

        try{
            await this.save(user)
            return user;
        }catch(error){
            console.log(error)
            if(error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('Existing username');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}