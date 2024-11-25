import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Station } from 'src/stations/station.entity';
import { UserAccount } from 'src/user-account/user-account.entity';

@Expose()
export class Companies {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;
  @ApiProperty()
  phoneFirst: string;
  @ApiProperty()
  phoneSecond: string;
  @ApiProperty()
  address: string;

  @ApiProperty()
  city: string;
  @ApiProperty()
  state: string;
  @ApiProperty()
  zip: string;
  @ApiProperty({ type: [Station] })
  stations: Station[];
  @ApiProperty({ type: UserAccount })
  owner: UserAccount;
  @ApiProperty({ type: [UserAccount] })
  users: UserAccount[];
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

@Expose()
export class GetCompanyApiResponseDto {
  @ApiProperty()
  apiVersion: string;
  @ApiProperty({ type: Companies })
  data: Companies;
}
