import { Injectable } from '@nestjs/common';
import { MapRepository } from './repositories/map.repository';
import { MapDto } from './dto/map.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Map, MapDocument } from './schemas/map.schema';
import { Model } from 'mongoose';
@Injectable()
export class MapService {
    // constructor(
    //     private mapRepository: MapRepository
    // ){}
    constructor(
        @InjectModel(Map.name) 
        private mapModel: Model<MapDocument>
    ){}
    Create(mapDto: MapDto){
        const createdCat = new this.mapModel(mapDto);
        createdCat.save();
        return createdCat;
    }

    async findAll(){
        return this.mapModel.find().exec()
    }
}
