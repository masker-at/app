import {MigrationInterface, QueryRunner} from "typeorm";

export class AddEmailVerificationFields1629006727222 implements MigrationInterface {
    name = 'AddEmailVerificationFields1629006727222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "isEmailVerified" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "lastEmailVerificationSentDate" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "lastEmailVerificationSentDate"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "isEmailVerified"`);
    }

}
