import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

@Expose()
export class UserAccount {
  @ApiProperty()
  id: number;
  @ApiProperty()
  supertokensuserid: string;
  @ApiProperty()
  firstname: string;
  @ApiProperty()
  lastname: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  phonenumber: string;
  @ApiProperty()
  isactive: boolean;

  @ApiProperty()
  role: string;
}
@Expose()
export class GetUserAccountApiResponseDto {
  @ApiProperty()
  apiVersion: string;
  @ApiProperty({ type: [UserAccount] })
  data: UserAccount[];
}
