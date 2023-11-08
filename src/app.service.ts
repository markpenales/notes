import { Injectable } from '@nestjs/common';
import { connect } from './db/connection';
@Injectable()
export class AppService {
  getHello(): string {
    return '<a href="/auth"> Login </a>';
  }

  async googleLogin(req) {
    const { User } = await connect();

    if (!req.user) {
      return 'No user from google';
    }
    const existingUser = await User.findOne({ email: req.user.email });

    if (existingUser) {
      await User.updateOne({ email: req.user.email }, req.user);
    } else {
      await new User(req.user).save();
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
