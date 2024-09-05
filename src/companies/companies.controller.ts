import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCompanyDTO } from './dtos/create-company.dto';
import { CompaniesService } from './companies.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Session } from 'src/auth/session/session.decorator';
import { SessionContainer } from 'supertokens-node/recipe/session';

@Controller('companies')
@ApiTags('Companies')
export class CompaniesController {
  constructor(private readonly companyService: CompaniesService) {}
  @Post()
  @ApiOperation({
    summary: 'Create a new Company',
  })
  @ApiResponse({
    status: 201,
    description: 'Company created successfully',
  })
  @UseGuards(new AuthGuard())
  public createCompany(
    @Session() session: SessionContainer,
    @Body() createCompanyDto: CreateCompanyDTO,
  ) {
    const userID = session.getUserId();
    console.log(userID);
    const createdCompanywithUserId = {
      ...createCompanyDto,
      createByUserId: userID,
    };

    return this.companyService.createCompany(createdCompanywithUserId);
  }
}
