import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from './entities/admin.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const admin = await this.adminRepository.findOne({
      where: {
        email,
      },
    });
    if (!admin) {
      throw new BadRequestException('Invalid credentials');
    }
    const isPasswordValid = await this.isPasswordValid(
      password,
      admin.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const jwt = {
      id: admin.id,
    };

    const token = await this.jwtSign(jwt);
    return token;
  }

  async jwtSign(body: any) {
    return await this.jwtService.signAsync({
      body,
    });
  }

  async isPasswordValid(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
