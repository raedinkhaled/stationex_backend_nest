import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { PermissionstationService } from './permissionstation.service';

@Injectable()
export class PermissionStationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly permissionStationService: PermissionstationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const session: SessionContainer = request.session;

    const userId = session.getAccessTokenPayload().accountid;
    const stationId = request.params.stationId; // stationId from route params

    const requiredPermissionName = this.reflector.get<string>(
      'permission',
      context.getHandler(),
    );

    if (!requiredPermissionName) {
      return false; // No permission required for this route
    }

    // Check if user has the required permission for the station
    const hasPermission =
      await this.permissionStationService.hasPermissionForStation(
        +userId,
        stationId,
        requiredPermissionName,
      );

    return hasPermission;
  }
}
