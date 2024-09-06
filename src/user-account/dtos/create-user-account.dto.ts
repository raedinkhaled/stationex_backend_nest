import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserAccountDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(12)
  @MaxLength(36)
  superTokensUserId: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(36)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(36)
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(92)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(20)
  phoneNumber: string;
}
