import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from './entities/client.entity';
import { Repository } from 'typeorm';
import { CreateDto } from './dto/create.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
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
}
