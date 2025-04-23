import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1745442514495 implements MigrationInterface {
  name = "Migration1745442514495";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."book-media_type_enum" AS ENUM('video', 'image')
        `);
    await queryRunner.query(`
            CREATE TABLE "book-media" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "metadata" jsonb,
                "type" "public"."book-media_type_enum" NOT NULL,
                "bookId" integer,
                CONSTRAINT "PK_b1e95faee43ed5cf9ecdc165795" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_0e5f97ac8fffb79839cd2de69a" ON "book-media" ("createdAt")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_6852c629573e525d4acc80c01f" ON "book-media" ("updatedAt")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_5eae55ed860e709da11341c705" ON "book-media" ("type")
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."book_category_enum" AS ENUM('Toddler', 'Playful', 'School Going')
        `);
    await queryRunner.query(`
            CREATE TABLE "book" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "name" character varying(255) NOT NULL,
                "category" "public"."book_category_enum" NOT NULL,
                "metadata" jsonb,
                "isSold" boolean NOT NULL DEFAULT false,
                "price" integer NOT NULL,
                CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_87ed05ff78316edaaa3930870d" ON "book" ("createdAt")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_4a6585f563d6a9a619753f431f" ON "book" ("updatedAt")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_94ce5afb055926a2569c8e5b83" ON "book" ("category")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_68744bbdb2768333726f045705" ON "book" ("isSold")
        `);
    await queryRunner.query(`
            ALTER TABLE "book-media"
            ADD CONSTRAINT "FK_447048f4b42e14892490d29d2b9" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "book-media" DROP CONSTRAINT "FK_447048f4b42e14892490d29d2b9"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_68744bbdb2768333726f045705"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_94ce5afb055926a2569c8e5b83"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_4a6585f563d6a9a619753f431f"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_87ed05ff78316edaaa3930870d"
        `);
    await queryRunner.query(`
            DROP TABLE "book"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."book_category_enum"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_5eae55ed860e709da11341c705"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_6852c629573e525d4acc80c01f"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_0e5f97ac8fffb79839cd2de69a"
        `);
    await queryRunner.query(`
            DROP TABLE "book-media"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."book-media_type_enum"
        `);
  }
}
