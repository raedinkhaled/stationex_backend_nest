import { Module } from '@nestjs/common';
import { StationsService } from './stations.service';
import { StationsController } from './stations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Station } from './station.entity';
import { CompaniesModule } from 'src/companies/companies.module';

@Module({
  providers: [StationsService],
  controllers: [StationsController],
  imports: [TypeOrmModule.forFeature([Station]), CompaniesModule],
})
export class StationsModule {}
