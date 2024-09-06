import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  limit?: number = 10;

  @IsOptional()
  @IsPositive()
  // @Type(() => Number)  Implicit conversion is setup on validation pipe on main.ts file
  page?: number = 1;
}
