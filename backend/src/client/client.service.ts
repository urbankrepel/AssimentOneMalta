import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from './entities/client.entity';
import { Repository } from 'typeorm';
import { CreateDto } from './dto/create.dto';
import { AdminService } from 'src/admin/admin.service';
import * as fs from 'fs';
import * as PizZip from 'pizzip';
const Docxtemplater = require('docxtemplater');
const docxConverter = require('docx-pdf');
const temp = require('temp').track();

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

  async convertDocxToPdf(docxBuffer: Buffer) {
    return new Promise((resolve, reject) => {
      const docxPath = temp.path({ suffix: '.docx' });
      fs.writeFileSync(docxPath, docxBuffer);
      const pdfPath = temp.path({ suffix: '.pdf' });
      docxConverter(docxPath, pdfPath, (err: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(fs.readFileSync(pdfPath));
        }
      });
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

    const pdfBuf = await this.convertDocxToPdf(docxBuf);

    return pdfBuf;
  }
}
