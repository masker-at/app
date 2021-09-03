import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export default class Email extends BaseEntity {
  @PrimaryColumn()
  messageID: string;
}
