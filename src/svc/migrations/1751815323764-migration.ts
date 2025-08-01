import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1751815323764 implements MigrationInterface {
  name = "Migration1751815323764";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "book_metadata" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "summary" text NOT NULL,
                CONSTRAINT "PK_f205bf3645857fedd6e054d877d" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_1bf8c04b4b3deb7d02214c7f13" ON "book_metadata" ("createdAt")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_a71b186364529bd6fd7def3ae1" ON "book_metadata" ("updatedAt")
        `);
    await queryRunner.query(`
            ALTER TABLE "book"
            ADD "bookMetadataId" integer
        `);
    await queryRunner.query(`
            ALTER TABLE "book"
            ADD CONSTRAINT "UQ_ad7f67d4a85052a82fab26fe065" UNIQUE ("bookMetadataId")
        `);
    await queryRunner.query(`
            ALTER TABLE "book"
            ADD CONSTRAINT "FK_ad7f67d4a85052a82fab26fe065" FOREIGN KEY ("bookMetadataId") REFERENCES "book_metadata"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "book" DROP CONSTRAINT "FK_ad7f67d4a85052a82fab26fe065"
        `);
    await queryRunner.query(`
            ALTER TABLE "book" DROP CONSTRAINT "UQ_ad7f67d4a85052a82fab26fe065"
        `);
    await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "bookMetadataId"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_a71b186364529bd6fd7def3ae1"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_1bf8c04b4b3deb7d02214c7f13"
        `);
    await queryRunner.query(`
            DROP TABLE "book_metadata"
        `);
  }
}
