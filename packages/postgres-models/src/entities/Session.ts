import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import User from './User';

@Entity()
export default class Session extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => User, { nullable: false })
  user: User;

  @Column({ nullable: false })
  userId: number;

  @Column()
  csrfToken: string;

  @CreateDateColumn()
  createdAt: Date;
}
