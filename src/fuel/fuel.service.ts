import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Fuel } from './fuel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { CreateFuelDto } from './dtos/create-fuel.dto';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';

@Injectable()
export class FuelService {
  constructor(
    @InjectRepository(Fuel)
    private fuelRepository: Repository<Fuel>,

    private readonly paginationProvider: PaginationProvider,
  ) {}

  public async createFuel(createFuelDto: CreateFuelDto) {
    const createdFuel = this.fuelRepository.create(createFuelDto);

    return await this.fuelRepository.save(createdFuel);
  }

  public async getFuel(name: string) {
    return await this.fuelRepository.find({
      where: {
        fuelname: name,
      },
    });
  }

  public async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<Paginated<Fuel>> {
    const fuels = await this.paginationProvider.paginateQuery(
      {
        limit: paginationQuery.limit,
        page: paginationQuery.page,
      },
      this.fuelRepository,
    );

    return fuels;
  }

  public async findOneByID(id: number) {
    return await this.fuelRepository.findOneBy({
      id,
    });
  }
}
