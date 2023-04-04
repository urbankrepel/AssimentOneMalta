import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from './client/client.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'FormsApp',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ClientModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
