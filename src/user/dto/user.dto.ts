import { IsString, MaxLength } from "class-validator";

export class UserDto {
    
    @IsString()
    asset_id: string;

    @IsString()
    @MaxLength(12)
    user_name: string;
}