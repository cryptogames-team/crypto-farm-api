import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, MaxLength } from "class-validator";

export class UserDto {
    
    @ApiProperty({description: 'asset_id'})
    @IsString()
    asset_id: string;

    @ApiProperty({description: 'user_name'})
    @IsString()
    @MaxLength(12)
    user_name: string;
}

export class ExpDTO {
    @ApiProperty({description: 'exp'})
    @IsNumber()
    exp: number;
}