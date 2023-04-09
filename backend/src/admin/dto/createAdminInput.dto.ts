import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAdminInputDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  placeholder: string;
}
