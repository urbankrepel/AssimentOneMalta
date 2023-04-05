import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @IsNotEmpty()
  @IsString()
  lastName: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  phone: string;
  @IsNotEmpty()
  @IsString()
  address: string;
  @IsNotEmpty()
  @IsString()
  city: string;
  @IsNotEmpty()
  @IsString()
  zip: string;
  @IsNotEmpty()
  @IsString()
  country: string;
  @IsNotEmpty()
  @IsString()
  dateOfBirth: string;
  @IsNotEmpty()
  @IsString()
  id_card_number: string;
  @IsNotEmpty()
  @IsString()
  tax_number: string;
  @IsNotEmpty()
  @IsString()
  bank_account_number: string;
  @IsNotEmpty()
  @IsString()
  vat_number: string;
}
