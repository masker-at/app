import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserHasChangedEmail1629565220241 implements MigrationInterface {
    name = 'AddUserHasChangedEmail1629565220241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "hasChangedEmail" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "lastEmailVerificationSentDate" SET DEFAULT '"1970-01-01T00:00:00.000Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "lastEmailVerificationSentDate" SET DEFAULT '1970-01-01 00:00:00'`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "hasChangedEmail"`);
    }

}
