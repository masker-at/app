import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAlias1629310809804 implements MigrationInterface {
    name = 'CreateAlias1629310809804'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "alias" ("id" SERIAL NOT NULL, "address" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "userId" integer, CONSTRAINT "UQ_fb6cc5f518c73a96730df47e489" UNIQUE ("address"), CONSTRAINT "PK_b1848d04b41d10a5712fc2e673c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "lastEmailVerificationSentDate" SET DEFAULT '"1970-01-01T00:00:00.000Z"'`);
        await queryRunner.query(`ALTER TABLE "alias" ADD CONSTRAINT "FK_c51bda26f81f96e80ca0940d8ac" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "alias" DROP CONSTRAINT "FK_c51bda26f81f96e80ca0940d8ac"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "lastEmailVerificationSentDate" SET DEFAULT '1970-01-01 00:00:00'`);
        await queryRunner.query(`DROP TABLE "alias"`);
    }

}
