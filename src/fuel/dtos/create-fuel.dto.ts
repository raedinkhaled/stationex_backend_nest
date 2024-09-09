import { IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateFuelDto {
  @IsString()
  @IsNotEmpty()
  @Min(3)
  @Max(30)
  fuelname: string;

  @IsString()
  @IsNotEmpty()
  @Min(3)
  @Max(30)
  color: string;

  @IsString()
  @IsOptional()
  @Max(200)
  informations?: string;
}
