import { Module } from '@nestjs/common';
import { TankService } from './tank.service';
import { TankController } from './tank.controller';
import { FuelModule } from 'src/fuel/fuel.module';
import { StationsModule } from 'src/stations/stations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tank } from './tank.entity';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
  providers: [TankService],
  controllers: [TankController],
  imports: [
    FuelModule,
    StationsModule,
    TypeOrmModule.forFeature([Tank]),
    PaginationModule,
  ],
})
export class TankModule {}
