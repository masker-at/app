import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import User from './User';

@Entity()
export default class Session extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => User)
  user: User;

  @Column()
  userId: number;

  @Column()
  csrfToken: string;

  @CreateDateColumn()
  createdAt: Date;
}
