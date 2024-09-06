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
  supertokensuserid: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(36)
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(36)
  lastname: string;

  @IsEmail()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(92)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(20)
  phonenumber: string;
}
