import { Module } from '@nestjs/common';
import { StationsService } from './stations.service';
import { StationsController } from './stations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Station } from './station.entity';
import { CompaniesModule } from 'src/companies/companies.module';
import { PermissionstationService } from './permission/permissionstation.service';
import { PermissionstationController } from './permission/permissionstation.controller';

@Module({
  providers: [StationsService, PermissionstationService],
  controllers: [StationsController, PermissionstationController],
  imports: [TypeOrmModule.forFeature([Station]), CompaniesModule],
})
export class StationsModule {}
