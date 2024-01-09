import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class UseItemDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    item_id: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    item_count: number;
}