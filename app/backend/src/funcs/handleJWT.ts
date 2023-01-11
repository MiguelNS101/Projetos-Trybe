import { sign, verify } from 'jsonwebtoken';
import { JWTInterface, TokenData } from '../interfaces/userInterface';

export default class HandleJWT {
  public jwtSecret = 'jwt_secret';

  genToken(user: JWTInterface): string {
    const { jwtSecret } = this;
    const token = sign({ data: user }, jwtSecret, {
      expiresIn: '7d',
      algorithm: 'HS256',
    });
    return token;
  }

  verifyToken(token: string): TokenData | null {
    try {
      const { jwtSecret } = this;
      const res = verify(token, jwtSecret);
      return res as TokenData;
    } catch (err) {
      return null;
    }
  }
}
