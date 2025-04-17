import { IsString, IsInt, Min, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchQueryDto {
  @IsInt()
  @Min(1)
  @Type(() => Number) // Transforms string query param to number
  page: number;

  @IsInt()
  @Min(1)
  @Type(() => Number) // Transforms string query param to number
  limit: number;

}