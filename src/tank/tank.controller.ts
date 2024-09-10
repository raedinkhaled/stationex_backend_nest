import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TankService } from './tank.service';
import { CreateTankDto } from './dtos/create-tank.dto';

@Controller('tank')
@ApiTags('Tanks')
export class TankController {
  constructor(private readonly tankService: TankService) {}
  @Post()
  @ApiOperation({
    summary: 'Create a new Tank',
  })
  @ApiResponse({
    status: 201,
    description: 'Tank created successfully',
  })
  public createTank(@Body() createTankDto: CreateTankDto) {
    return this.tankService.createTank(createTankDto);
  }
}
