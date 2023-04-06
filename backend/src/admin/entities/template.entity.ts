import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('templates')
export class TemplateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  path: string;
}
