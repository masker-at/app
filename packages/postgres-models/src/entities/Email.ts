import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Alias from './Alias';

@Entity()
export default class Email extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  messageID: string;

  @Column()
  from: string;

  @ManyToOne(() => Alias, { nullable: false })
  alias: Alias;

  @CreateDateColumn()
  date: Date;
}
