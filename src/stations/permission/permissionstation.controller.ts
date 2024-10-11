import { Body, Controller, Post, Session, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePermissionStationDTO } from './dtos/create-permissionstation.dto';
import { PermissionstationService } from './permissionstation.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionContainer } from 'supertokens-node/recipe/session';

@Controller('permissionstation')
@ApiTags('Permission Station')
export class PermissionstationController {
  constructor(
    private readonly permissionStationService: PermissionstationService,
  ) {}
  @Post()
  @ApiOperation({
    summary: 'Create a new PermissionStation',
  })
  @ApiResponse({
    status: 201,
    description: 'PermissionStation created successfully',
  })
  @UseGuards(new AuthGuard())
  public createPermissionStation(
    @Session() session: SessionContainer,
    @Body() createPermissionStationDto: CreatePermissionStationDTO,
  ) {
    const user = session.getAccessTokenPayload();
    return this.permissionStationService.createPermission(
      createPermissionStationDto,
      user.accountid,
    );
  }
}
