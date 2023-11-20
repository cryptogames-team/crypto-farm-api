import { IsNumber, IsString, MaxLength } from "class-validator";

export class UserDto {
    
    @IsNumber()
    asset_id: number;

    @IsString()
    @MaxLength(12)
    user_name: string;
}