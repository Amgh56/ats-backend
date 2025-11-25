import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

// an auth route this route will be responsible for all the authorized actions like job creation deletion login etc. 
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // Register route: checks the register input using register.dto.ts,
    // and then pass it to the register method in authservice 
    @Post('register')
    register(@Body() dto: RegisterDto){
        return this.authService.register(dto)
    }

    // Login route: checks the login input using login.dto.ts,
    // and then pass it to authservices to verify the user.
    @Post('login')
    login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
  // Returns the logged in user info based on the JWT they send.
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(@Req() req: any) {
    return req.user;
  }
    
}
