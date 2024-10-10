import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCompanyDTO {
  @IsInt()
  @IsNotEmpty()
  userID: number;
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(96)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(13)
  @MinLength(3)
  phoneFirst: string;

  @IsOptional()
  @IsString()
  @MaxLength(13)
  phoneSecond?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(96)
  address: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(96)
  city: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(96)
  state: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(96)
  zip: string;
}
