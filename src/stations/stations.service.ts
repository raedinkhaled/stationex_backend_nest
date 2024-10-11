import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Station } from './station.entity';
import { CreateStationDTO } from './dtos/create-station.dto';
import { CompaniesService } from 'src/companies/companies.service';

@Injectable()
export class StationsService {
  constructor(
    @InjectRepository(Station)
    private stationRepository: Repository<Station>,

    private readonly companyService: CompaniesService,
  ) {}

  public async createStation(createStationDto: CreateStationDTO) {
    //find company from database
    const company = await this.companyService.findOneByID(
      createStationDto.companyID,
    );
    const createdStation = this.stationRepository.create({
      ...createStationDto,
      company: company,
    });
    await this.stationRepository.save(createdStation);
    return createdStation;
  }

  public async findOneByID(id: number) {
    return await this.stationRepository.findOne({
      where: { id },
    });
  }

  public async findOneByIDandLoadCompany(id: number) {
    return await this.stationRepository.findOne({
      where: { id },
      relations: ['company', 'company.owner'],
    });
  }
}
