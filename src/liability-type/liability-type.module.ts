import { Module } from '@nestjs/common';
import { LiabilityTypeController } from './liability-type.controller';
import { LiabilityTypeService } from './liability-type.service';

@Module({
  controllers: [LiabilityTypeController],
  providers: [LiabilityTypeService]
})
export class LiabilityTypeModule {}
