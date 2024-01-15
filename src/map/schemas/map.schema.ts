import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type MapDocument = Map & Document;

@Schema({versionKey : false})
export class Map {
    @Prop()
    asset_id: string;

    @Prop()
    objects: [];

    @Prop()
    crops: [];

}

export const MapSchema = SchemaFactory.createForClass(Map);