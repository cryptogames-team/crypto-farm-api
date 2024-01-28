import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
export type MapDocument = Map & Document;

@Schema({versionKey : false})
export class Map {

    @IsNotEmpty()
    @IsString()
    @Prop()
    asset_id: string;

    @IsArray()
    @Prop()
    objects: [];

    @IsArray()
    @Prop()
    crops: [];

}

export const MapSchema = SchemaFactory.createForClass(Map);