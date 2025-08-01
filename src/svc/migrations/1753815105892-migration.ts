import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1753815105892 implements MigrationInterface {
  name = "Migration1753815105892";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "book_metadata"
            ADD "defaultKeywords" jsonb
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "book_metadata" DROP COLUMN "defaultKeywords"
        `);
  }
}
