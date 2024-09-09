import { Module } from '@nestjs/common';
import { TpetypeService } from './tpetype.service';
import { TpetypeController } from './tpetype.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TpeType } from './tpetype-entity';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
  providers: [TpetypeService],
  controllers: [TpetypeController],
  imports: [TypeOrmModule.forFeature([TpeType]), PaginationModule],
})
export class TpetypeModule {}
