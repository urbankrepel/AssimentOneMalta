import {
  Controller,
  Post,
  Body,
  Res,
  HttpCode,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UseGuards,
  Param,
  Get,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AdminGuard } from './admin.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.adminService.login(body.email, body.password);
    res.cookie('token', token, {
      httpOnly: true,
    });
    return {
      message: 'success',
    };
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');
    return {
      message: 'success',
    };
  }

  @UseGuards(AdminGuard)
  @Post('template/add')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
      }),
    }),
  )
  async addTemplate(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100000 }),
          new FileTypeValidator({
            fileType:
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    await this.adminService.addTemplate(file);
    return {
      message: 'success',
    };
  }

  @UseGuards(AdminGuard)
  @Get('template/all')
  async getTemplates() {
    return await this.adminService.getTemplates();
  }

  @UseGuards(AdminGuard)
  @Delete('template/:id')
  @HttpCode(200)
  async deleteTemplate(@Param('id') id: number) {
    await this.adminService.deleteTemplate(id);
    return {
      message: 'success',
    };
  }

  @UseGuards(AdminGuard)
  @Get('template/:id')
  async getTemplate(@Param('id') id: number, @Res() res: Response) {
    const template = await this.adminService.getTemplate(id);
    res.download(template.path, template.name);
  }

  @UseGuards(AdminGuard)
  @Post('template/:id')
  async renameTemplate(@Param('id') id: number, @Body('name') name: string) {
    if (!name) throw new BadRequestException('Name is required');
    await this.adminService.renameTemplate(id, name);
    return {
      message: 'success',
    };
  }
}
