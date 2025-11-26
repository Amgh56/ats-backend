import { IsString, IsNumber, IsOptional, Min, IsNotEmpty } from 'class-validator';

// DTO used to validate updates to a job post
export class UpdateJobDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  salary?: number;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  location?: string;
}
