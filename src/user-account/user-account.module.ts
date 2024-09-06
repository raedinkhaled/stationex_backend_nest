import { Module } from '@nestjs/common';
import { UserAccountController } from './user-account.controller';
import { UserAccountService } from './user-account.service';
import { UserAccount } from './user-account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UserAccountController],
  providers: [UserAccountService],
  exports: [UserAccountService],
  imports: [TypeOrmModule.forFeature([UserAccount])],
})
export class UserAccountModule {}
