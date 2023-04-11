import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from './entities/admin.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TemplateEntity } from './entities/template.entity';
import * as fs from 'fs';
import { AdminInputEntity } from './entities/adminInput.entity';
import { CreateAdminInputsDto } from './dto/createAdminInputs.dto';
import { Express } from 'express';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
    private readonly jwtService: JwtService,
    @InjectRepository(TemplateEntity)
    private readonly templateRepository: Repository<TemplateEntity>,
    @InjectRepository(AdminInputEntity)
    private readonly adminInputRepository: Repository<AdminInputEntity>,
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
    try {
      fs.rmSync(template.path);
    } catch (e) {}
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

  async addInputs(body: CreateAdminInputsDto) {
    const inputs = body.inputs.map((input) => {
      return {
        name: input.name,
        placeholder: input.placeholder,
        type: input.type,
        template: {
          id: body.templateId,
        },
      };
    });
    await this.adminInputRepository.save(inputs);
  }

  async getInputs(templateId: number) {
    const inputs = await this.adminInputRepository.find({
      where: {
        template: {
          id: templateId,
        },
      },
    });
    return inputs;
  }
}
