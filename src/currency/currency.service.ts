import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Currency } from './currency.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCurrencyDto } from './dtos/create-currency.dto';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(Currency)
    private currencyRepository: Repository<Currency>,
  ) {}

  public async createCurrency(createCurrencyDto: CreateCurrencyDto) {
    const createdCurrency = this.currencyRepository.create(createCurrencyDto);

    return await this.currencyRepository.save(createdCurrency);
  }

  public async getCurrency(name: string) {
    return await this.currencyRepository.find({
      where: {
        currencyname: name,
      },
    });
  }

  public async findAll(paginationQuery: PaginationQueryDto) {
    const currencies = await this.currencyRepository.find({
      skip: (paginationQuery.page - 1) * paginationQuery.limit,
      take: paginationQuery.limit,
    });
  }
}
