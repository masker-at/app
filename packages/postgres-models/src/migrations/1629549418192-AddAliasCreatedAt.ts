import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAliasCreatedAt1629549418192 implements MigrationInterface {
    name = 'AddAliasCreatedAt1629549418192'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."alias" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "lastEmailVerificationSentDate" SET DEFAULT '"1970-01-01T00:00:00.000Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "lastEmailVerificationSentDate" SET DEFAULT '1970-01-01 00:00:00'`);
        await queryRunner.query(`ALTER TABLE "public"."alias" DROP COLUMN "createdAt"`);
    }

}
