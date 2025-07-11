import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1749370010037 implements MigrationInterface {
  name = "Migration1749370010037";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "coupon" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "name" character varying(255) NOT NULL,
                "validityCriteria" jsonb NOT NULL,
                "discountAmount" jsonb NOT NULL,
                "isActive" boolean NOT NULL DEFAULT false,
                CONSTRAINT "PK_fcbe9d72b60eed35f46dc35a682" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_1a401c50dd077726d24b82c8bd" ON "coupon" ("createdAt")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_b5671cfa93c13aed47092a5fee" ON "coupon" ("updatedAt")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_0ecadaa094a214e25334625f69" ON "coupon" ("name")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX "public"."IDX_0ecadaa094a214e25334625f69"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_b5671cfa93c13aed47092a5fee"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_1a401c50dd077726d24b82c8bd"
        `);
    await queryRunner.query(`
            DROP TABLE "coupon"
        `);
  }
}
