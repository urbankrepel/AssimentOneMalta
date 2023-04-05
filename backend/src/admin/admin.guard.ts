import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.cookies['token'];
    if (!token) return false;
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      if (decoded.id) {
        return true;
      }
    } catch (e) {
      return false;
    }
  }
}
