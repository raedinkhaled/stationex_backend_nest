import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserAccountService } from './user-account.service';
import { GetUserAccountApiResponseDto } from './dtos/get-user-account-response';
import { plainToInstance } from 'class-transformer';

@Controller('user-account')
@ApiTags('User Account')
export class UserAccountController {
  constructor(private readonly userAccountService: UserAccountService) {}

  @Get(':supertokensid')
  @ApiOperation({
    summary: 'Get a User Account info by supertokens ID',
  })
  @ApiOkResponse({
    description: 'OK',
    type: GetUserAccountApiResponseDto,
  })
  public getUser(
    @Param('supertokensid') supertokensid: string,
  ): GetUserAccountApiResponseDto {
    const user = this.userAccountService.getUserAccount(supertokensid);
    return plainToInstance(GetUserAccountApiResponseDto, user);
  }
}
