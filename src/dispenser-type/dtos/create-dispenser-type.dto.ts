import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateDispenserTypeDto {
  @IsString()
  @IsNotEmpty()
  @Min(3)
  @Max(96)
  name: string;

  @IsString()
  @IsOptional()
  @Max(200)
  informations?: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  pistolnumber: number;
}
