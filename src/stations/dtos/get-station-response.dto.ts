import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

@Expose()
export class StationR {
  @ApiProperty()
  id: number;
  @ApiProperty()
  stationName: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  state: string;
  @ApiProperty()
  crn: string;
  @ApiProperty()
  nif: string;
  @ApiProperty()
  nis: string;
  @ApiProperty()
  article: string;
  @ApiProperty()
  active: boolean;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

@Expose()
export class GetStationApiResponseDto {
  @ApiProperty()
  apiVersion: string;
  @ApiProperty({ type: StationR })
  data: StationR;
}
