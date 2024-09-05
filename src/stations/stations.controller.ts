import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StationsService } from './stations.service';
import { CreateStationDTO } from './dtos/create-station.dto';

@Controller('stations')
@ApiTags('Stations')
export class StationsController {
  constructor(private readonly stationService: StationsService) {}
  @Post()
  @ApiOperation({
    summary: 'Create a new Station',
  })
  @ApiResponse({
    status: 201,
    description: 'Station created successfully',
  })
  public createStation(@Body() createStationDto: CreateStationDTO) {
    return this.stationService.createStation(createStationDto);
  }
}
