import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { CreateCompanyDTO } from './dtos/create-company.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
  ) {}

  public async createCompany(createCompanyDto: CreateCompanyDTO) {
    const createdCompany = this.companyRepository.create(createCompanyDto);
    return await this.companyRepository.save(createdCompany);
  }

  public async findOneByID(id: number) {
    return await this.companyRepository.findOneBy({
      id,
    });
  }
}
