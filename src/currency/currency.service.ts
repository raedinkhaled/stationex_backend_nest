import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Currency } from './currency.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCurrencyDto } from './dtos/create-currency.dto';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(Currency)
    private currencyRepository: Repository<Currency>,

    private readonly paginationProvider: PaginationProvider,
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

  public async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<Paginated<Currency>> {
    const currencies = await this.paginationProvider.paginateQuery(
      {
        limit: paginationQuery.limit,
        page: paginationQuery.page,
      },
      this.currencyRepository,
    );

    return currencies;
  }
}
