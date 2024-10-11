import { SetMetadata } from '@nestjs/common';

export const PermissionStationName = (permissionName: string) =>
  SetMetadata('permission', permissionName);
