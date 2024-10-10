import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { CreateCompanyDTO } from './dtos/create-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { UserAccountService } from 'src/user-account/user-account.service';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    private readonly paginationProvider: PaginationProvider,
    private readonly userAccountService: UserAccountService,
  ) {}

  public async createCompany(createCompanyDto: CreateCompanyDTO) {
    const userowner = await this.userAccountService.findOneByID(
      createCompanyDto.userID,
    );

    const createdCompany = this.companyRepository.create({
      ...createCompanyDto,
      user: userowner,
    });
    return await this.companyRepository.save(createdCompany);
  }

  public async findOneByID(id: number) {
    return await this.companyRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  public async getCompaniesByUserID(userID: number) {
    return await this.companyRepository.find({
      where: {
        user: { id: userID },
      },
      relations: ['user', 'stations'],
    });
  }

  public async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<Paginated<Company>> {
    const companies = await this.paginationProvider.paginateQuery(
      {
        limit: paginationQuery.limit,
        page: paginationQuery.page,
      },
      this.companyRepository,
    );

    return companies;
  }
}
