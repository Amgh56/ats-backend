import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJobsDto {
  @ApiProperty({
    example: 'Backend Developer',
    description: 'The job title for the post.',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'We are looking for experienced software engineers.',
    description: 'A brief description of the job responsibilities and requirements.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 15000,
    description: 'Monthly salary offered for the job.',
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  salary: number;

  @ApiProperty({
    example: 'Riyadh',
    description: 'Job location.',
  })
  @IsString()
  @IsNotEmpty()
  location: string;
}
