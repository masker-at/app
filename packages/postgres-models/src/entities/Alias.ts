import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './User';

@Entity()
export default class Alias extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  address: string;

  @Column({ nullable: true, type: 'character varying' })
  name?: string | null;

  @ManyToOne(() => User, { nullable: true })
  user?: User | null;

  @Column({ nullable: true, type: 'integer' })
  userId?: number | null;

  @Column({ default: true })
  isActive: boolean;
}
