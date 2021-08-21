import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'citext' })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ default: new Date(0) })
  lastEmailVerificationSentDate: Date;

  @Column({ default: false })
  hasChangedEmail: boolean;
}
