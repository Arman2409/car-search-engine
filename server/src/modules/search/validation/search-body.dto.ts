import { IsOptional, IsString, IsNumber, Min, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchBodyDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(1900) // Assuming cars weren't really a thing before 1900
  @Type(() => Number) // For query parameters to be correctly typed as numbers
  year?: number;

  @IsOptional()
  @IsString()
  body_type?: string;
}