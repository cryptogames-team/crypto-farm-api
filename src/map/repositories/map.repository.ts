import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Map, MapDocument } from '../schemas/map.schema';
import { Model } from 'mongoose';
import { MapDto } from '../dto/map.dto';

export class MapRepository {
    constructor(
        @InjectModel(Map.name) 
        private mapModel: Model<MapDocument>
    ){}

    async findAll(){
        return this.mapModel.find().exec()
    }
    
      async Create(mapDto : MapDto): Promise<Map>{
        const createdCat = new this.mapModel(mapDto);
        createdCat.save();
        return createdCat;
      }

}