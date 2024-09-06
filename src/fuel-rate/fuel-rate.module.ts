import { Module } from '@nestjs/common';
import { FuelRateController } from './fuel-rate.controller';
import { FuelRateService } from './fuel-rate.service';

@Module({
  controllers: [FuelRateController],
  providers: [FuelRateService]
})
export class FuelRateModule {}
