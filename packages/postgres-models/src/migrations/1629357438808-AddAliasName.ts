import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAliasName1629357438808 implements MigrationInterface {
    name = 'AddAliasName1629357438808'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."alias" ADD "name" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "lastEmailVerificationSentDate" SET DEFAULT '"1970-01-01T00:00:00.000Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "lastEmailVerificationSentDate" SET DEFAULT '1970-01-01 00:00:00'`);
        await queryRunner.query(`ALTER TABLE "public"."alias" DROP COLUMN "name"`);
    }

}
