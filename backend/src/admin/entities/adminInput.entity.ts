import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TemplateEntity } from './template.entity';

@Entity('admin_inputs')
export class AdminInputEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  placeholder: string;

  @ManyToOne(() => TemplateEntity, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'template_id' })
  template: TemplateEntity;
}
