import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreatePermissionStationDTO {
  @IsNumber()
  userId: number;
  @IsNumber()
  stationId: number;
  @IsString()
  permissionName: string;
  @IsBoolean()
  permissionValue: boolean;
}
