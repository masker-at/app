import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveUnnecessaryEmailFields1630701113030 implements MigrationInterface {
    name = 'RemoveUnnecessaryEmailFields1630701113030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."email" DROP CONSTRAINT "FK_79457ac85ff180182c744fc4957"`);
        await queryRunner.query(`ALTER TABLE "public"."email" DROP CONSTRAINT "PK_1e7ed8734ee054ef18002e29b1c"`);
        await queryRunner.query(`ALTER TABLE "public"."email" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "public"."email" DROP COLUMN "from"`);
        await queryRunner.query(`ALTER TABLE "public"."email" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "public"."email" DROP COLUMN "aliasId"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "lastEmailVerificationSentDate" SET DEFAULT '"1970-01-01T00:00:00.000Z"'`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "lastPasswordResetSentDate" SET DEFAULT '"1970-01-01T00:00:00.000Z"'`);
        await queryRunner.query(`ALTER TABLE "public"."email" ADD CONSTRAINT "PK_6df8b47fb5b37777c0da2965007" PRIMARY KEY ("messageID")`);
        await queryRunner.query(`ALTER TABLE "public"."email" DROP CONSTRAINT "UQ_6df8b47fb5b37777c0da2965007"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."email" ADD CONSTRAINT "UQ_6df8b47fb5b37777c0da2965007" UNIQUE ("messageID")`);
        await queryRunner.query(`ALTER TABLE "public"."email" DROP CONSTRAINT "PK_6df8b47fb5b37777c0da2965007"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "lastPasswordResetSentDate" SET DEFAULT '1970-01-01 00:00:00'`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "lastEmailVerificationSentDate" SET DEFAULT '1970-01-01 00:00:00'`);
        await queryRunner.query(`ALTER TABLE "public"."email" ADD "aliasId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."email" ADD "date" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."email" ADD "from" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."email" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."email" ADD CONSTRAINT "PK_1e7ed8734ee054ef18002e29b1c" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "public"."email" ADD CONSTRAINT "FK_79457ac85ff180182c744fc4957" FOREIGN KEY ("aliasId") REFERENCES "alias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
