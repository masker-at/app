import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './User';

@Entity()
export default class Alias extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  address: string;

  @Column({ nullable: true })
  name?: string;

  @ManyToOne(() => User, { nullable: true })
  user?: User;

  @Column({ default: true })
  isActive: boolean;
}
