import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TpeType } from './tpetype-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { CreateTpeTypeDTO } from './dtos/create-tpe-type.dto';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';

@Injectable()
export class TpetypeService {
  constructor(
    @InjectRepository(TpeType)
    private tpetypeRepository: Repository<TpeType>,
    private readonly paginationProvider: PaginationProvider,
  ) {}

  public async createTpeType(createTpeTypeDto: CreateTpeTypeDTO) {
    const createdTpeType = this.tpetypeRepository.create(createTpeTypeDto);

    return await this.tpetypeRepository.save(createdTpeType);
  }

  public async getTpeType(name: string) {
    return await this.tpetypeRepository.find({
      where: {
        name: name,
      },
    });
  }

  public async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<Paginated<TpeType>> {
    const tpetypes = await this.paginationProvider.paginateQuery(
      {
        limit: paginationQuery.limit,
        page: paginationQuery.page,
      },
      this.tpetypeRepository,
    );

    return tpetypes;
  }
}
