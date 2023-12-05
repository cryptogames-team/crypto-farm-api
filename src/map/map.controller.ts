import { Controller, Post, Body, Get } from '@nestjs/common';
import { MapService } from './map.service';
import { MapDto } from './dto/map.dto';
import { Map } from './schemas/map.schema';

@Controller('map')
export class MapController {
    constructor(
        private mapService: MapService
    ){}
    
    @Post('/')
    Create(@Body()mapDto: MapDto) {
        return this.mapService.Create(mapDto);
    }

    @Get('/')
    findAll(){
        return this.mapService.findAll();
    }
}
