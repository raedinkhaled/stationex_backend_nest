import { Module } from '@nestjs/common';
import { PistolController } from './pistol.controller';
import { PistolService } from './pistol.service';

@Module({
  controllers: [PistolController],
  providers: [PistolService]
})
export class PistolModule {}
