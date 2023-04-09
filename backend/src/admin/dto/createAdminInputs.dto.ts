import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { CreateAdminInputDto } from './createAdminInput.dto';

export class CreateAdminInputsDto {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAdminInputDto)
  inputs: CreateAdminInputDto[];

  @IsNotEmpty()
  @IsNumber()
  templateId: number;
}
