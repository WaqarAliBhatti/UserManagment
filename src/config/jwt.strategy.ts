// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_Secret_key, // Use the same secret key used in JwtService
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
// Could not find a declaration file for module 'passport-jwt'. 'd:/Practice-App/my-crud-app/node_modules/passport-jwt/lib/index.js' implicitly has an 'any' type.
//   Try `npm i --save-dev @types/passport-jwt` if it exists or add a new declaration (.d.ts) file containing `declare module 'passport-jwt';`ts(7016)