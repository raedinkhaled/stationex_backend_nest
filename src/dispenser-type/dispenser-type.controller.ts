import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DispenserTypeService } from './dispenser-type.service';
import { CreateDispenserTypeDto } from './dtos/create-dispenser-type.dto';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';

@Controller('dispenser-type')
@ApiTags('Dispenser Type')
export class DispenserTypeController {
  constructor(private readonly dispenserTypeService: DispenserTypeService) {}
  @Post()
  @ApiOperation({
    summary: 'Create a new Dispenser Type',
  })
  @ApiResponse({
    status: 201,
    description: 'Dispenser Type created successfully',
  })
  public createDispenserType(
    @Body() createDispenserTypeDto: CreateDispenserTypeDto,
  ) {
    return this.dispenserTypeService.createDispenserType(
      createDispenserTypeDto,
    );
  }

  @Get(':name')
  @ApiOperation({
    summary: 'Get a Dispenser Type by name',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  public getDispenserType(@Param('name') name: any) {
    return this.dispenserTypeService.getDispenserType(name);
  }

  @Get()
  @ApiOperation({
    summary: 'Get a all Dispenser Types',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  public getDispenserTypes(@Query() dispenserTypeQuery: PaginationQueryDto) {
    return this.dispenserTypeService.findAll(dispenserTypeQuery);
  }
}
