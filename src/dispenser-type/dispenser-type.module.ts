import { Module } from '@nestjs/common';
import { DispenserTypeController } from './dispenser-type.controller';
import { DispenserTypeService } from './dispenser-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DispenserType } from './dispenser-type.entity';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
  controllers: [DispenserTypeController],
  providers: [DispenserTypeService],
  imports: [TypeOrmModule.forFeature([DispenserType]), PaginationModule],
})
export class DispenserTypeModule {}
