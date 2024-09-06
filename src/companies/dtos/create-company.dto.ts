import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCompanyDTO {
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
  @MinLength(8)
  @MaxLength(13)
  phoneFirst: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
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
