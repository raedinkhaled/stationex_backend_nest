import { Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { PermissioncompanyController } from './permission/permissioncompany/permissioncompany.controller';
import { PermissioncompanyController } from './permission/permissioncompany.controller';
import { PermissioncompanyService } from './permission/permissioncompany.service';

@Module({
  controllers: [CompaniesController, PermissioncompanyController],
  providers: [CompaniesService, PermissioncompanyService],
  exports: [CompaniesService],
  imports: [TypeOrmModule.forFeature([Company])],
})
export class CompaniesModule {}
