import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateTankDto {
  @IsInt()
  @IsNotEmpty()
  stationId: number;
  @IsInt()
  @IsNotEmpty()
  fuelId: number;

  @IsString()
  @IsNotEmpty()
  @Min(3)
  @Max(36)
  tankname: string;

  @IsInt()
  @IsNotEmpty()
  capacity: number;

  @IsInt()
  @IsNotEmpty()
  alert: number;

  @IsOptional()
  @IsString()
  @Max(200)
  informations?: string;
}
