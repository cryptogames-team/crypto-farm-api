import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { User } from "src/user/entities/user.entity";
import { CFTAuction } from "../entities/cft.entity";

export class AddCftHistoryDTO {

    cft: number;

    cft_auction: CFTAuction;

    date: string;

    user: User;

}