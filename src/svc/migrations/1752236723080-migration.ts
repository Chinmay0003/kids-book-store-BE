import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1752236723080 implements MigrationInterface {
  name = "Migration1752236723080";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."business_type_enum" AS ENUM('Play School', 'Play Area')
        `);
    await queryRunner.query(`
            CREATE TABLE "business" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "name" character varying(255) NOT NULL,
                "address" character varying(255) NOT NULL,
                "phone" character varying(15) NOT NULL,
                "type" "public"."business_type_enum" NOT NULL,
                "defaultCut" double precision NOT NULL DEFAULT '20',
                CONSTRAINT "PK_0bd850da8dafab992e2e9b058e5" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_2e2ad0ca4e77cd06658c20d456" ON "business" ("createdAt")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_476aea5dea7a3019ad2511b366" ON "business" ("updatedAt")
        `);
    await queryRunner.query(`
            CREATE TABLE "business_book_topology" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "cut" double precision NOT NULL DEFAULT '20',
                "isPaymentRecieved" boolean NOT NULL DEFAULT false,
                "bookId" integer,
                "businessId" integer,
                CONSTRAINT "REL_a0a6efd38d3feb0a6ccd751f6d" UNIQUE ("businessId"),
                CONSTRAINT "PK_8021a55b1781cbf1749a2619276" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_da742a32e0dd5950e926f11303" ON "business_book_topology" ("createdAt")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_5578c10ee1cb7c78472d128647" ON "business_book_topology" ("updatedAt")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_a0a6efd38d3feb0a6ccd751f6d" ON "business_book_topology" ("businessId")
        `);
    await queryRunner.query(`
            ALTER TABLE "business_book_topology"
            ADD CONSTRAINT "FK_c51ef678c412bfa91e803673855" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "business_book_topology"
            ADD CONSTRAINT "FK_a0a6efd38d3feb0a6ccd751f6db" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "business_book_topology" DROP CONSTRAINT "FK_a0a6efd38d3feb0a6ccd751f6db"
        `);
    await queryRunner.query(`
            ALTER TABLE "business_book_topology" DROP CONSTRAINT "FK_c51ef678c412bfa91e803673855"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_a0a6efd38d3feb0a6ccd751f6d"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_5578c10ee1cb7c78472d128647"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_da742a32e0dd5950e926f11303"
        `);
    await queryRunner.query(`
            DROP TABLE "business_book_topology"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_476aea5dea7a3019ad2511b366"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_2e2ad0ca4e77cd06658c20d456"
        `);
    await queryRunner.query(`
            DROP TABLE "business"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."business_type_enum"
        `);
  }
}
