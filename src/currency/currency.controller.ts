import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrencyService } from './currency.service';
import { CreateCurrencyDto } from './dtos/create-currency.dto';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';

@Controller('currency')
@ApiTags('Currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new Currency',
  })
  @ApiResponse({
    status: 201,
    description: 'Currency created successfully',
  })
  public createCurrency(@Body() createCurrencyDto: CreateCurrencyDto) {
    return this.currencyService.createCurrency(createCurrencyDto);
  }

  @Get(':name')
  @ApiOperation({
    summary: 'Get a Currency by name',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  public getCurrency(@Param('name') name: any) {
    return this.currencyService.getCurrency(name);
  }

  @Get()
  @ApiOperation({
    summary: 'Get a all currencies',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  public getAllCurrencies(@Query() currencyQuery: PaginationQueryDto) {
    return this.currencyService.findAll(currencyQuery);
  }
}
