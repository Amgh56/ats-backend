import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

// DTO for login requests. Used to validate the email and password fields.
export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(12)
  password: string;
}