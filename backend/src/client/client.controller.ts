import { Controller,Body,Post, HttpCode,Get } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateDto } from './dto/create.dto';


@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}
  @Post('create')
  @HttpCode(201)
  async create(@Body() createDto: CreateDto) {
    return await this.clientService.create(createDto);
  }

  @Get("all")
  @HttpCode(200)
  async getAll() {
    return await this.clientService.getAll();
  }
}
