import { Module } from '@nestjs/common';
import { FuelService } from './fuel.service';
import { FuelController } from './fuel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fuel } from './fuel.entity';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
  providers: [FuelService],
  controllers: [FuelController],
  imports: [TypeOrmModule.forFeature([Fuel]), PaginationModule],
})
export class FuelModule {}
