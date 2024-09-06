import { Module } from '@nestjs/common';
import { TpetypeService } from './tpetype.service';
import { TpetypeController } from './tpetype.controller';

@Module({
  providers: [TpetypeService],
  controllers: [TpetypeController]
})
export class TpetypeModule {}
