import { Injectable } from '@nestjs/common';
import { Tank } from './tank.entity';
import { CreateTankDto } from './dtos/create-tank.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Repository } from 'typeorm';
import { FuelService } from 'src/fuel/fuel.service';
import { StationsService } from 'src/stations/stations.service';

@Injectable()
export class TankService {
  constructor(
    @InjectRepository(Tank)
    private tankRepository: Repository<Tank>,
    private readonly fuelService: FuelService,
    private readonly stationService: StationsService,

    private readonly paginationProvider: PaginationProvider,
  ) {}

  public async createTank(createTankDto: CreateTankDto) {
    const fuel = await this.fuelService.findOneByID(createTankDto.fuelId);
    const station = await this.stationService.findOneByID(
      createTankDto.stationId,
    );

    const createdTank = this.tankRepository.create({
      ...createTankDto,
      station: station,
      fuel: fuel,
    });

    return await this.tankRepository.save(createdTank);
  }

  public async getTank(name: string) {
    return await this.tankRepository.find({
      where: {
        tankname: name,
      },
    });
  }

  public async getTankByID(id: number) {
    return await this.tankRepository.find({
      where: {
        id: id,
      },
    });
  }

  public async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<Paginated<Tank>> {
    const tanks = await this.paginationProvider.paginateQuery(
      {
        limit: paginationQuery.limit,
        page: paginationQuery.page,
      },
      this.tankRepository,
    );

    return tanks;
  }
}
