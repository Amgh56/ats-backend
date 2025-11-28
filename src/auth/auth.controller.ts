import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import {ApiUnauthorizedResponse, ApiOkResponse,ApiTags, ApiOperation, ApiResponse, ApiBearerAuth ,ApiBody,ApiCreatedResponse,ApiBadRequestResponse} from '@nestjs/swagger';


// An auth route this route will be responsible for all the authorized actions like job creation deletion login etc.
@ApiTags('Auth')  
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // Register route: checks the register input using register.dto.ts,
    // and then pass it to the register method in authservice 
    @Post('register')
    @ApiOperation({ summary: 'Register a new user',description: 'How to use this endpoint:\n' +
    '1. Fill in email, password, and role (business or talent).\n' +
    '2. Submit the form to create your account.\n' +
    '3. After registration, use /auth/login to get your JWT token.'})
    @ApiBody({type: RegisterDto,description: 'User registration payload',})
    @ApiCreatedResponse({ description: 'User registered successfully',schema: {
    example: {
      id: "6730dd1c4a07cf5ae14de5f2",
      email: "abdullah@gmail.com",
      role: "business"
    }
  }
})
  @ApiBadRequestResponse({description: 'Invalid input or email already registered',
    schema: {
      example: {
        statusCode: 400,
        message: 'Email is already registered',
        error: 'Bad Request',
      }
    }
  })
    register(@Body() dto: RegisterDto){
        return this.authService.register(dto)
    }

    // Login route: checks the login input using login.dto.ts,
    // and then pass it to authservices to verify the user.
    @Post('login')
    @ApiOperation({ summary: 'Login and receive a JWT token', description: 'How to use this endpoint:\n' +
    '1. Enter your registered email and password.\n' +
    '2. Submit the request to receive your access_token.\n' +
    '3. Use the access_token in the Swagger Authorize button for protected endpoints.' })
    @ApiBody({type: LoginDto,description: 'User login credentials',})
    @ApiOkResponse({description: 'Login successful. Returns JWT token.',
    schema: {
    example: {
      access_token: " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OTI4NmY0MmY5OGIzNWY1ZjFlMDg2NWUiLCJlbWFpbCI6Im93bmVyQHRlc3QuY29tIiwicm9sZSI6ImJ1c2luZXNzIiwiaWF0IjoxNzY0MjU4ODQwLCJleHAiOjE3NjQyNjA2NDB9.PuMz922TNI9HtANVaiyr0teHkwXizF4Jm755U1PXucQ",
      user: {
        id: "6730dd1c4a07cf5ae14de5f2",
        email: "abdullah@gmail.com",
        role: "business"
        }
      }
    }
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials',
  schema: {
      example: {
        statusCode: 401,
        message: "Invalid credentials",
        error: "Unauthorized"
      }
    }
  })
    login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
  // Returns the logged in user info based on the JWT they send.
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  @ApiOperation({ summary: 'Get the currently authenticated user',description: 
  'How to use this endpoint:\n' +
  '1. Login using /auth/login and copy the access_token.\n' +
  '2. Click the Swagger Authorize button and paste: Bearer <token>.\n' +
  '3. Call this endpoint to get your user information.\n' +
  '4. This well be used later to make sure only logged in business users can do actions.' })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Returns the user data extracted from the JWT token',
    schema: {
      example: {
        id: "6730dd1c4a07cf5ae14de5f2",
        email: "abdullah@gmail.com",
        role: "business"
      }
    }
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Missing or invalid JWT token',
    schema: {
      example: {
        statusCode: 401,
        message: "Unauthorized",
        error: "Unauthorized"
      }
    }
  })
  getMe(@Req() req: any) {
    return req.user;
  }
    
}
