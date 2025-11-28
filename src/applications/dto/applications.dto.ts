import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// Validates data sent by applicants 
export class CreateApplicationDto {
  @ApiProperty({
    example: 'Abdullah',
    description: 'name of the job applicant.',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Abdullahmmmaghrabi@gmail.com',
    description: 'Email of the applicant. Used to prevent duplicate applications.',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '69273371b4ce7f9daa70957c',
    description: 'The id of the job the applicant is applying to.',
  })
  @IsNotEmpty()
  @IsString()
  jobId: string;
}
