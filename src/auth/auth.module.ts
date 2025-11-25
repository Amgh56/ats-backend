import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

// This module sets everything needed for authentication.
@Module({
  imports: [UsersModule,
  PassportModule,
  JwtModule.register({secret: process.env.JWT_SECRET || 'dev-secret',
  signOptions: {expiresIn: '30m'},
  }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
