import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1750605307358 implements MigrationInterface {
  name = "Migration1750605307358";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "book"
            ADD "sendWhatsappMsg" boolean NOT NULL DEFAULT false
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_2cc67973b3a1ae7dafc6400457" ON "book" ("sendWhatsappMsg")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX "public"."IDX_2cc67973b3a1ae7dafc6400457"
        `);
    await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "sendWhatsappMsg"
        `);
  }
}
