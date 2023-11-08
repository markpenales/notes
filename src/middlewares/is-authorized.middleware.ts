import { Injectable, NestMiddleware } from '@nestjs/common';
import { connect } from 'src/db/connection';

@Injectable()
export class IsAuthorizedMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    const bearerToken = req.headers['authorization'];

    if (!bearerToken) {
      return res.status(401).send('Unauthorized: Missing Access');
    }

    const { User } = await connect();
    const user = await User.findOne({ accessToken: bearerToken.split(' ')[1] });

    if (!user) {
      return res.status(401).send('Unauthorized: User not found');
    }
    next();
  }
}
