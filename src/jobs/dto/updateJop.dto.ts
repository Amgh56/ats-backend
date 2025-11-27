import { IsString, IsNumber, IsOptional, Min, IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

// DTO used to validate updates to a job post
export class UpdateJobDto {
  @ApiPropertyOptional({
    example: 'Senior Backend Developer',
    description: 'Updated job title. Optional field.',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  title?: string;
  @ApiPropertyOptional({
    example: 'Updated description: 5+ years experience required.',
    description: 'Updated job description. Optional field.',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @ApiPropertyOptional({
    example: 20000,
    description: 'Updated salary amount. Must be 0 or higher. Optional field.',
    minimum: 0,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  salary?: number;

  @ApiPropertyOptional({
    example: 'Jeddah',
    description: 'Updated job location. Optional field.',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  location?: string;
}
