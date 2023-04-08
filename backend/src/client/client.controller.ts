import {
  Controller,
  Body,
  Post,
  HttpCode,
  Get,
  UseGuards,
  Res,
  Param,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateDto } from './dto/create.dto';
import { AdminGuard } from 'src/admin/admin.guard';
import { Response } from 'express';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}
  @Post('create')
  @HttpCode(201)
  async create(@Body() createDto: CreateDto) {
    return await this.clientService.create(createDto);
  }

  @UseGuards(AdminGuard)
  @Get('all')
  @HttpCode(200)
  async getAll() {
    return await this.clientService.getAll();
  }

  @UseGuards(AdminGuard)
  @Post('generate/admin/template/:template_id/client/:client_id')
  @HttpCode(200)
  async generateDocxAdmin(
    @Param('template_id') template_id: number,
    @Param('client_id') client_id: number,
    @Body() adminData: any,
    @Res() res: Response,
  ) {
    const { pdfBuf, templateName } = await this.clientService.generateDocx(
      template_id,
      client_id,
      adminData,
    );

    res.setHeader('Content-Type', 'application/pdf');
    const fileName = templateName.split('.')[0];
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=' + fileName + '.pdf',
    );
    res.send(pdfBuf);
  }

  @Get('generate/template/:template_id/client/:client_id')
  @HttpCode(200)
  async generateDocx(
    @Param('template_id') template_id: number,
    @Param('client_id') client_id: number,
    @Res() res: Response,
  ) {
    const { pdfBuf } = await this.clientService.generateDocx(
      template_id,
      client_id,
    );

    res.setHeader('Content-Type', 'application/pdf');
    // res.setHeader('Content-Disposition', 'attachment; filename=template.docx');
    res.send(pdfBuf);
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  @HttpCode(200)
  async getOne(@Param('id') id: number) {
    return await this.clientService.getOne(id);
  }
}
