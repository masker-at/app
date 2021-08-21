import {MigrationInterface, QueryRunner} from "typeorm";

export class AddLastPasswordResetSentDateDefault1629565835800 implements MigrationInterface {
    name = 'AddLastPasswordResetSentDateDefault1629565835800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "lastPasswordResetSentDate" TIMESTAMP NOT NULL DEFAULT '"1970-01-01T00:00:00.000Z"'`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "lastEmailVerificationSentDate" SET DEFAULT '"1970-01-01T00:00:00.000Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "lastEmailVerificationSentDate" SET DEFAULT '1970-01-01 00:00:00'`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "lastPasswordResetSentDate"`);
    }

}
