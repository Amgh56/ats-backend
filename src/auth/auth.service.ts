import { Injectable,BadRequestException,UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

// AuthServices handles all the authentication actions. like registering , password hashing and the jwt sign 
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // handles the registeration logic 
  // and check some rules for example like if this email is already there it gives a bad request. 
  // if the user registered pass all the conditions we create a document with his information.
  async register(dto: RegisterDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new BadRequestException('Email is already registered');
    }

   const password_hash = await bcrypt.hash(dto.password, 10);

   
   const user = await this.usersService.createUser(
    dto.email,
    password_hash,
    dto.role,
  );

  return {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  }

  // Handles the login logic
  // how it works it check some rules like if the user is already there by checking his email and password.
  // if he exsist it returns the users access_token and user information .
  async login(dto: LoginDto ){
    const user = await this.usersService.findByEmail(dto.email);
    if(!user){
        throw new UnauthorizedException("Invalid credentials");
    }

    const match = await bcrypt.compare(dto.password,user.password_hash);
    if(!match){
        throw new UnauthorizedException("Invalid credentials");
    }
    const payload = {
        sub: user._id,       
        email: user.email,
        role: user.role,
      };
    
      const accessToken = await this.jwtService.signAsync(payload);
    
      return {
        access_token: accessToken,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
      };


  }

}
