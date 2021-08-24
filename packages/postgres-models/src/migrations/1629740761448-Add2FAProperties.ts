import {MigrationInterface, QueryRunner} from "typeorm";

export class Add2FAProperties1629740761448 implements MigrationInterface {
    name = 'Add2FAProperties1629740761448'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "is2FAEnabled" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "twoFactorToken" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "twoFactorRecoveryCodes" text NOT NULL DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "twoFactorRecoveryCodes"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "twoFactorToken"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "is2FAEnabled"`);
    }

}
