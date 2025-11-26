import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateJobsDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  salary: number;

  @IsString()
  @IsNotEmpty()
  location: string;
}
