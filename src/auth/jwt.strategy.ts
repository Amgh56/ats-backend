import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// This class is responsible for validating incoming jwt tokens.
// it gets the token from the authentication header and make sure
// its signature and expiration before allowing access to protected routes.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'dev-secret',
    });
  }

  // this method runs automatically if a token is valid  
  async validate(payload: any) {

    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
