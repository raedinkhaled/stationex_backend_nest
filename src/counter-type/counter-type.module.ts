import { Module } from '@nestjs/common';
import { CounterTypeService } from './counter-type.service';
import { CounterTypeController } from './counter-type.controller';

@Module({
  providers: [CounterTypeService],
  controllers: [CounterTypeController]
})
export class CounterTypeModule {}
