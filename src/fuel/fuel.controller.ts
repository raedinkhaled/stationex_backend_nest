import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FuelService } from './fuel.service';
import { CreateFuelDto } from './dtos/create-fuel.dto';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';

@Controller('fuel')
@ApiTags('Fuel')
export class FuelController {
  constructor(private readonly fuelService: FuelService) {}
  @Post()
  @ApiOperation({
    summary: 'Create a new Fuel',
  })
  @ApiResponse({
    status: 201,
    description: 'Fuel created successfully',
  })
  public createFuel(@Body() createFuelDto: CreateFuelDto) {
    return this.fuelService.createFuel(createFuelDto);
  }

  @Get(':name')
  @ApiOperation({
    summary: 'Get a Fuel by name',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  public getFuel(@Param('name') name: any) {
    return this.fuelService.getFuel(name);
  }

  @Get()
  @ApiOperation({
    summary: 'Get a all Fuels',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  public getFuels(@Query() fuelQuery: PaginationQueryDto) {
    return this.fuelService.findAll(fuelQuery);
  }
}
