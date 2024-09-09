import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TpetypeService } from './tpetype.service';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import { CreateTpeTypeDTO } from './dtos/create-tpe-type.dto';

@Controller('tpetype')
@ApiTags('Tpe Type')
export class TpetypeController {
  constructor(private readonly tpetypeService: TpetypeService) {}
  @Post()
  @ApiOperation({
    summary: 'Create a new TpeType',
  })
  @ApiResponse({
    status: 201,
    description: 'TpeType created successfully',
  })
  public createTpeType(@Body() createTpeTypeDto: CreateTpeTypeDTO) {
    return this.tpetypeService.createTpeType(createTpeTypeDto);
  }

  @Get(':name')
  @ApiOperation({
    summary: 'Get a TpeType by name',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  public getTpeType(@Param('name') name: any) {
    return this.tpetypeService.getTpeType(name);
  }

  @Get()
  @ApiOperation({
    summary: 'Get a all TpeTypes',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  public getAllTpeTypes(@Query() TpeTypeQuery: PaginationQueryDto) {
    return this.tpetypeService.findAll(TpeTypeQuery);
  }
}
