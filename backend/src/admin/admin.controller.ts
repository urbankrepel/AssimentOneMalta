import { Controller, Post, Body, Res, HttpCode } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.adminService.login(body.email, body.password);
    res.cookie('token', token, {
      httpOnly: true,
    });
    return {
      message: 'success',
    };
  }
}
