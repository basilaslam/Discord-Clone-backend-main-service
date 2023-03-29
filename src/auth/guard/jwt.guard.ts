import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async createToken(user) {
    return await this.authService.createToken(
      user.email,
      user._id,
      user.password,
    );
  }

  async validateToken(token: string) {
    return await this.authService.validateToken(token);
  }

  async extractToken(token: string) {
    return this.authService.extractToken(token);
  }
}
