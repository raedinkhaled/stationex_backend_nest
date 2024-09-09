import { Injectable } from '@nestjs/common';
import { DispenserType } from './dispenser-type.entity';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { Repository } from 'typeorm';
import { CreateDispenserTypeDto } from './dtos/create-dispenser-type.dto';

@Injectable()
export class DispenserTypeService {
  constructor(
    @InjectRepository(DispenserType)
    private dispenserTypeRepository: Repository<DispenserType>,

    private readonly paginationProvider: PaginationProvider,
  ) {}

  public async createDispenserType(
    createDispenserType: CreateDispenserTypeDto,
  ) {
    const createdDispenserType =
      this.dispenserTypeRepository.create(createDispenserType);

    return await this.dispenserTypeRepository.save(createdDispenserType);
  }

  public async getDispenserType(name: string) {
    return await this.dispenserTypeRepository.find({
      where: {
        name: name,
      },
    });
  }

  public async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<Paginated<DispenserType>> {
    const dispensertypes = await this.paginationProvider.paginateQuery(
      {
        limit: paginationQuery.limit,
        page: paginationQuery.page,
      },
      this.dispenserTypeRepository,
    );

    return dispensertypes;
  }
}
