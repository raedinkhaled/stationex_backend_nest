import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserAccount } from './user-account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserAccountDTO } from './dtos/create-user-account.dto';

@Injectable()
export class UserAccountService {
  constructor(
    @InjectRepository(UserAccount)
    private readonly userAccountRepo: Repository<UserAccount>,
  ) {}

  public async createUserAccount(createUserAccountDto: CreateUserAccountDTO) {
    const createdUserAccount =
      this.userAccountRepo.create(createUserAccountDto);

    return await this.userAccountRepo.save(createdUserAccount);
  }
}
