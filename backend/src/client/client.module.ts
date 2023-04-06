import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from './entities/client.entity';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity]), AdminModule],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
