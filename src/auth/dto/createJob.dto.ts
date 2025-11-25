import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

// DTO for create job requests. Used to validate the title,description,salary, location fields.
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
