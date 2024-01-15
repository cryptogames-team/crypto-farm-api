import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { MapService } from './map.service';
import { MapDto } from './dto/map.dto';
import { Map } from './schemas/map.schema';
import UseAuthGuard from 'src/user/auth-guards/user-auth';
import AuthUser from 'src/core/auth-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('맵 API')
@Controller('map')
export class MapController {
    constructor(
        private mapService: MapService
    ){}
    
    @Post('/')
    @ApiBearerAuth('access-token')
    @ApiOperation({summary: '맵 데이터 추가 및 수정', description: '맵 데이터 추가 및 수정'})
    @ApiCreatedResponse({description:'맵 정보가 걸거임'})
    @UseAuthGuard()
    Create(
        @Body()mapDto: MapDto,
        @AuthUser()user: User) {
        return this.mapService.Create(mapDto,user);
    }

    @Get('/:asset_id')
    @ApiOperation({summary: '맵 데이터 불러오기', description: '맵 데이터 불러오기'})
    @ApiCreatedResponse({description:'맵 정보가 걸거임'})
    findDataByID(
        @Param('asset_id')asset_id: string
    ){
        return this.mapService.findDataByID(asset_id);
    }
}
