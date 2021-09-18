import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

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

  @Column({ default: new Date(0) })
  lastPasswordResetSentDate: Date;

  @Column({ default: false })
  is2FAEnabled: boolean;

  @Column('character varying', { nullable: true })
  twoFactorToken?: string | null;

  @Column('simple-array', { default: [] })
  twoFactorRecoveryCodes: string[];

  @Column('integer', { nullable: true })
  paddleID?: number | null;
}
