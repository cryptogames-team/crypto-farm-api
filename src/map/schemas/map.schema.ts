import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type MapDocument = Map & Document;

@Schema({versionKey : false})
export class Map {
    @Prop()
    name: string;

    @Prop()
    age: number;

    @Prop()
    breed: string;

}

export const MapSchema = SchemaFactory.createForClass(Map);