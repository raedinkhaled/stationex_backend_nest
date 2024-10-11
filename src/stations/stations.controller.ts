import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StationsService } from './stations.service';
import { CreateStationDTO } from './dtos/create-station.dto';
import { plainToInstance } from 'class-transformer';
import {
  CreateStationApiResponseDto,
  StationR,
} from './dtos/create-station-response.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { GetStationApiResponseDto } from './dtos/get-station-response.dto';
import { PermissionStationGuard } from './permission/permissionstation.guard';
import { PermissionStationName } from './permission/permissionstation.decorator';

@Controller('stations')
@ApiTags('Stations')
@UseGuards(new AuthGuard())
export class StationsController {
  constructor(private readonly stationService: StationsService) {}
  @Post()
  @ApiOperation({
    summary: 'Create a new Station',
  })
  @ApiResponse({
    status: 201,
    description: 'Station created successfully',
    type: CreateStationApiResponseDto,
  })
  public createStation(
    @Session() session: SessionContainer,
    @Body() createStationDto: CreateStationDTO,
  ): CreateStationApiResponseDto {
    const station = this.stationService.createStation(createStationDto);
    const stationR = plainToInstance(StationR, station);
    return plainToInstance(CreateStationApiResponseDto, stationR);
  }

  @Get(':stationId')
  @ApiOperation({
    summary: 'Get a Station by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: GetStationApiResponseDto,
  })
  @UseGuards(PermissionStationGuard)
  @PermissionStationName('view_station')
  public async getStationByID(
    @Param('stationId') stationId: number,
  ): Promise<GetStationApiResponseDto> {
    try {
      const station = await this.stationService.findOneByID(stationId);

      if (!station) {
        throw new NotFoundException('Station not found');
      }

      return plainToInstance(GetStationApiResponseDto, station);
      /* if (accessTokenPayload.accountid === company.user.id) {
        return plainToInstance(GetCompanyApiResponseDto, company);
      } else {
        throw new ForbiddenException('You do not have access to this company');
      } */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      console.log(err);
      throw new NotFoundException('Station not found or an error occurred');
    }
  }
}
