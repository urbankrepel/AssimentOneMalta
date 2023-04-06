import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from './entities/client.entity';
import { Repository } from 'typeorm';
import { CreateDto } from './dto/create.dto';
import { AdminService } from 'src/admin/admin.service';
import * as fs from 'fs';
import * as path from 'path';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import libre from 'libreoffice-convert';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    private readonly adminService: AdminService,
  ) {}
  async create(data: CreateDto) {
    const client = await this.clientRepository.save({
      first_name: data.firstName,
      last_name: data.lastName,
      phone_number: data.phone,
      zip_code: data.zip,
      date_of_birth: data.dateOfBirth,
      ...data,
    });
    return client;
  }

  async getAll() {
    return await this.clientRepository.find();
  }

  async getById(id: number) {
    return await this.clientRepository.findOne({
      where: {
        id,
      },
    });
  }

  async generateDocx(template_id: number, client_id: number) {
    const template = await this.adminService.getTemplate(template_id);
    const client = await this.getById(client_id);

    const contentTemplate = fs.readFileSync(template.path, 'binary');

    const zip = new PizZip(contentTemplate);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.setData({
      ...client,
    });

    doc.render();

    const docxBuf = doc.getZip().generate({ type: 'nodebuffer' });

    return docxBuf;
  }
}
