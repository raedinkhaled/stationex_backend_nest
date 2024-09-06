import { Module } from '@nestjs/common';
import { DispenserController } from './dispenser.controller';
import { DispenserService } from './dispenser.service';

@Module({
  controllers: [DispenserController],
  providers: [DispenserService]
})
export class DispenserModule {}
