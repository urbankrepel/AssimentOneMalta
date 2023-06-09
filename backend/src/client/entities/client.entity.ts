import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('clients')
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  id_card_number: string;

  @Column()
  phone_number: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
  zip_code: string;

  @Column()
  date_of_birth: Date;

  @Column()
  tax_number: string;

  @Column()
  vat_number: string;

  @Column()
  bank_account_number: string;

  @CreateDateColumn()
  created_at: Date;
}
