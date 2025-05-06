import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1746401518909 implements MigrationInterface {
  name = "Migration1746401518909";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "cart_book_topology" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "cartId" integer,
                "bookId" integer,
                CONSTRAINT "PK_5e4e80c2add720c59305a2f1bd9" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_feb05fef6c57291531c9423fb5" ON "cart_book_topology" ("createdAt")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_6822cadf97567e6d017465c328" ON "cart_book_topology" ("updatedAt")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_125cabb27750fb2901361397ca" ON "cart_book_topology" ("cartId")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_8cc0a517ca7d077b411f4e2edf" ON "cart_book_topology" ("bookId")
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."cart_status_enum" AS ENUM('ACTIVE', 'BOUGHT')
        `);
    await queryRunner.query(`
            CREATE TABLE "cart" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "status" "public"."cart_status_enum" NOT NULL,
                "appUserId" integer,
                CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_8af054e0d37fd0cf08bd97ec77" ON "cart" ("createdAt")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_2730c0c8bc7092e4c4154edc53" ON "cart" ("updatedAt")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_a069bc2c15b5e513b59d9b9027" ON "cart" ("appUserId")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_959262c755bb278373f789cc37" ON "cart" ("status")
        `);
    await queryRunner.query(`
            ALTER TABLE "cart_book_topology"
            ADD CONSTRAINT "FK_125cabb27750fb2901361397ca2" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "cart_book_topology"
            ADD CONSTRAINT "FK_8cc0a517ca7d077b411f4e2edf3" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "cart"
            ADD CONSTRAINT "FK_a069bc2c15b5e513b59d9b90279" FOREIGN KEY ("appUserId") REFERENCES "app_user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "cart" DROP CONSTRAINT "FK_a069bc2c15b5e513b59d9b90279"
        `);
    await queryRunner.query(`
            ALTER TABLE "cart_book_topology" DROP CONSTRAINT "FK_8cc0a517ca7d077b411f4e2edf3"
        `);
    await queryRunner.query(`
            ALTER TABLE "cart_book_topology" DROP CONSTRAINT "FK_125cabb27750fb2901361397ca2"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_959262c755bb278373f789cc37"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_a069bc2c15b5e513b59d9b9027"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_2730c0c8bc7092e4c4154edc53"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_8af054e0d37fd0cf08bd97ec77"
        `);
    await queryRunner.query(`
            DROP TABLE "cart"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."cart_status_enum"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_8cc0a517ca7d077b411f4e2edf"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_125cabb27750fb2901361397ca"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_6822cadf97567e6d017465c328"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_feb05fef6c57291531c9423fb5"
        `);
    await queryRunner.query(`
            DROP TABLE "cart_book_topology"
        `);
  }
}
