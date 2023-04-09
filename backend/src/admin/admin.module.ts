import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './entities/admin.entity';
import { TemplateEntity } from './entities/template.entity';
import { AdminInputEntity } from './entities/adminInput.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity, TemplateEntity, AdminInputEntity]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
