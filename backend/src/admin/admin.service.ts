import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from './entities/admin.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TemplateEntity } from './entities/template.entity';
import * as fs from 'fs';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
    private readonly jwtService: JwtService,
    @InjectRepository(TemplateEntity)
    private readonly templateRepository: Repository<TemplateEntity>,
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

  async addTemplate(file: Express.Multer.File) {
    return await this.templateRepository.save({
      name: file.originalname,
      path: file.path,
    });
  }

  async getTemplate(id: number) {
    const template = await this.templateRepository.findOne({
      where: {
        id,
      },
    });
    return template;
  }

  async getTemplates() {
    const templates = await this.templateRepository.find();
    return templates;
  }

  async deleteTemplate(id: number) {
    const template = await this.templateRepository.findOne({
      where: {
        id,
      },
    });
    fs.rmSync(template.path);
    await this.templateRepository.remove(template);
  }

  async renameTemplate(id: number, name: string) {
    const template = await this.templateRepository.findOne({
      where: {
        id,
      },
    });
    template.name = name;
    await this.templateRepository.save(template);
  }
}
