import { Module } from '@nestjs/common';
import { DispenserTypeController } from './dispenser-type.controller';
import { DispenserTypeService } from './dispenser-type.service';

@Module({
  controllers: [DispenserTypeController],
  providers: [DispenserTypeService]
})
export class DispenserTypeModule {}
