import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

//Login Dto here we check that the data we recieved is within our rules.
export class LoginDto {
  @ApiProperty({
    example: 'Abdullah@gmail.com',
    description: 'The registered email address of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '121212',
    description: 'Password must be between 6 and 12 characters long',
    minLength: 6,
    maxLength: 12,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  password: string;
}
