import { IsEmail, IsIn, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// DTO for Register requests. Used to validate email, password, and role fields.
export class RegisterDto {
  @ApiProperty({
    example: 'Abdullah@gmail.com',
    description: 'A valid and unique email address for the new user.',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '121212',
    description: 'Password must be between 6 and 12 characters long.',
    minLength: 6,
    maxLength: 12,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  password: string;

  @ApiProperty({
    example: 'business',
    description: 'user role while registering either (business) or (talent)',
    enum: ['business', 'talent'],
  })
  @IsIn(['business', 'talent'])
  role: 'business' | 'talent';
}
