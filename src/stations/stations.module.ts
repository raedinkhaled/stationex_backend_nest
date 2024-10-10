import { Module } from '@nestjs/common';
import { StationsService } from './stations.service';
import { StationsController } from './stations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Station } from './station.entity';
import { CompaniesModule } from 'src/companies/companies.module';
import { PermissionstationService } from './permission/permissionstation.service';
import { PermissionstationController } from './permission/permissionstation.controller';
import { UserAccountModule } from 'src/user-account/user-account.module';
import { PermissionStation } from './permission/PermissionStation.entity';

@Module({
  providers: [StationsService, PermissionstationService],
  controllers: [StationsController, PermissionstationController],
  imports: [TypeOrmModule.forFeature([Station]), CompaniesModule, UserAccountModule, TypeOrmModule.forFeature([PermissionStation])],
  exports: [StationsService],
})
export class StationsModule { }
