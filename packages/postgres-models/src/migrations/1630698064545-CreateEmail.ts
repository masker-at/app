import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateEmail1630698064545 implements MigrationInterface {
    name = 'CreateEmail1630698064545'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "email" ("id" SERIAL NOT NULL, "messageID" character varying NOT NULL, "from" character varying NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "aliasId" integer NOT NULL, CONSTRAINT "UQ_6df8b47fb5b37777c0da2965007" UNIQUE ("messageID"), CONSTRAINT "PK_1e7ed8734ee054ef18002e29b1c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "lastEmailVerificationSentDate" SET DEFAULT '"1970-01-01T00:00:00.000Z"'`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "lastPasswordResetSentDate" SET DEFAULT '"1970-01-01T00:00:00.000Z"'`);
        await queryRunner.query(`ALTER TABLE "email" ADD CONSTRAINT "FK_79457ac85ff180182c744fc4957" FOREIGN KEY ("aliasId") REFERENCES "alias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "email" DROP CONSTRAINT "FK_79457ac85ff180182c744fc4957"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "lastPasswordResetSentDate" SET DEFAULT '1970-01-01 00:00:00'`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "lastEmailVerificationSentDate" SET DEFAULT '1970-01-01 00:00:00'`);
        await queryRunner.query(`DROP TABLE "email"`);
    }

}
