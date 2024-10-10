import { Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { PermissioncompanyController } from './permission/permissioncompany.controller';
import { PermissioncompanyService } from './permission/permissioncompany.service';

import { PaginationModule } from 'src/common/pagination/pagination.module';
import { UserAccountModule } from 'src/user-account/user-account.module';

@Module({
  controllers: [CompaniesController, PermissioncompanyController],
  providers: [CompaniesService, PermissioncompanyService],
  exports: [CompaniesService],
  imports: [
    TypeOrmModule.forFeature([Company]),
    PaginationModule,
    UserAccountModule,
  ],
})
export class CompaniesModule {}
