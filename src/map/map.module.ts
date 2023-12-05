import { Module } from '@nestjs/common';
import { MapController } from './map.controller';
import { MapService } from './map.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Map, MapSchema } from './schemas/map.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Map.name, schema: MapSchema}])
  ],
  controllers: [MapController],
  providers: [MapService]
})
export class MapModule {}
