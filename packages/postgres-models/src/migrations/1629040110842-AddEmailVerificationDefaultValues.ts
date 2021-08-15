import {MigrationInterface, QueryRunner} from "typeorm";

export class AddEmailVerificationDefaultValues1629040110842 implements MigrationInterface {
    name = 'AddEmailVerificationDefaultValues1629040110842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "isEmailVerified" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "lastEmailVerificationSentDate" TIMESTAMP NOT NULL DEFAULT '"1970-01-01T00:00:00.000Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "lastEmailVerificationSentDate"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "isEmailVerified"`);
    }

}
