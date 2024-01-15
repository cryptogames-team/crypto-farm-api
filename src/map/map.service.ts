import { Injectable } from '@nestjs/common';
import { MapRepository } from './repositories/map.repository';
import { MapDto } from './dto/map.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Map, MapDocument } from './schemas/map.schema';
import { Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
@Injectable()
export class MapService {
    // constructor(
    //     private mapRepository: MapRepository
    // ){}
    constructor(
        @InjectModel(Map.name) 
        private mapModel: Model<MapDocument>
    ){}
    async Create(mapDto: MapDto,user: User){
        const { asset_id } = user;
        const { objects, crops } = mapDto;
        const checkData = await this.findDataByID(asset_id);
        console.log(checkData)
        if(!checkData){
            mapDto.asset_id = asset_id;
            const createdCat = new this.mapModel(mapDto);
            createdCat.save();
            return createdCat;
        }
        checkData.objects = objects;
        checkData.crops = crops;
        await checkData.save();
        return checkData;
    }

    async findDataByID(asset_id:string){
        return this.mapModel.findOne({ asset_id }).exec()
    }
}
