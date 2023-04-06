import {
  Controller,
  Body,
  Post,
  HttpCode,
  Get,
  UseGuards,
  Res,
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

  @Post('generate')
  @HttpCode(200)
  async generateDocx(
    @Body() body: { template_id: number; client_id: number },
    @Res() res: Response,
  ) {
    const pdfBuffer = await this.clientService.generateDocx(
      body.template_id,
      body.client_id,
    );

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=' + 'test.pdf');
    res.send(pdfBuffer);
  }
}
