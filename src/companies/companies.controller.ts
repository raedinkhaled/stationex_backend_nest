import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  Get,
  Query,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCompanyDTO } from './dtos/create-company.dto';
import { CompaniesService } from './companies.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import { Session } from 'src/auth/session/session.decorator';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { UserAccountService } from 'src/user-account/user-account.service';
import { GetCompaniesApiResponseDto } from './dtos/get-companies.dto';
import { plainToInstance } from 'class-transformer';
import { CreateCompanyApiResponseDto } from './dtos/create-company-response.dto';
import { GetCompanyApiResponseDto } from './dtos/get-company-response.dto';

@Controller('companies')
@ApiTags('Companies')
export class CompaniesController {
  constructor(
    private readonly companyService: CompaniesService,
    private readonly userAccountrService: UserAccountService,
  ) {}
  @Post()
  @ApiOperation({
    summary: 'Create a new Company',
  })
  @ApiResponse({
    status: 201,
    description: 'Company created successfully',
    type: CreateCompanyApiResponseDto,
  })
  @UseGuards(new AuthGuard())
  public createCompany(
    @Body() createCompanyDto: CreateCompanyDTO,
  ): CreateCompanyApiResponseDto {
    const createdCompany = this.companyService.createCompany(createCompanyDto);
    return plainToInstance(CreateCompanyApiResponseDto, createdCompany);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a Company by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: GetCompanyApiResponseDto,
  })
  @UseGuards(new AuthGuard())
  public async getCompanyById(
    @Session() session: SessionContainer,
    @Param('id') id: number,
  ): Promise<GetCompanyApiResponseDto> {
    const accessTokenPayload = session.getAccessTokenPayload();
    try {
      // Await the company data since findOneByID returns a Promise
      const company = await this.companyService.findOneByID(id);

      // Check if the company exists
      if (!company) {
        throw new NotFoundException('Company not found');
      }
      // Check if the logged-in user owns the company
      if (accessTokenPayload.accountid === company.user.id) {
        return plainToInstance(GetCompanyApiResponseDto, company);
      } else {
        throw new ForbiddenException('You do not have access to this company');
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      console.log(err);
      throw new NotFoundException('Company not found or an error occurred');
    }
  }

  @Get('/user/:userid')
  @ApiOperation({
    summary: 'Get all Companies by UserID',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: GetCompaniesApiResponseDto,
  })
  @UseGuards(new AuthGuard())
  public async getCompaniesbyUser(
    @Param('userid') userid: number,
    @Session() session: SessionContainer,
  ): Promise<GetCompaniesApiResponseDto> {
    const userId = session.getUserId();
    const user = await this.userAccountrService.getUserAccount(userId);

    if (user[0].id == userid) {
      const companies = this.companyService.getCompaniesByUserID(userid);

      return plainToInstance(GetCompaniesApiResponseDto, companies);
    } else {
      throw new UnauthorizedException(
        'You are not authorized to access this resource',
      );
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Get a all Companies',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  public getCompanies(@Query() companyQuery: PaginationQueryDto) {
    return this.companyService.findAll(companyQuery);
  }
}
