import { IsEmail, IsIn, IsString, MaxLength, MinLength} from "class-validator";

// DTO for Register requests. Used to validate the email, password, role fields.
export class RegisterDto{
@IsEmail()
email:string;

@IsString()
@MinLength(6)
@MaxLength(12)
password:string;

@IsIn(["business","talent"])
role: "business"|"talent";
}