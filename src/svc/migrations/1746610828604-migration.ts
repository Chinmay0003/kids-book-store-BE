import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1746610828604 implements MigrationInterface {
  name = "Migration1746610828604";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."address_country_enum" AS ENUM('INDIA')
        `);
    await queryRunner.query(`
            CREATE TABLE "address" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "firstName" character varying(255) NOT NULL,
                "lastName" character varying(255) NOT NULL,
                "country" "public"."address_country_enum" NOT NULL,
                "streetAddress" text NOT NULL,
                "city" character varying(255) NOT NULL,
                "state" character varying(255) NOT NULL,
                "pincode" integer NOT NULL,
                "phoneNumber" character varying(255) NOT NULL,
                "appUserId" integer,
                CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_b0ef5bbd388628e6df422d2953" ON "address" ("createdAt")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_380edf9075c1ba3bedf571c8c5" ON "address" ("updatedAt")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_9f11738e1922babaadf998b93e" ON "address" ("appUserId")
        `);
    await queryRunner.query(`
            ALTER TABLE "cart"
            ADD "addressId" integer
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_5ad17e3bf3749fdddc6e8050d6" ON "cart" ("addressId")
        `);
    await queryRunner.query(`
            ALTER TABLE "address"
            ADD CONSTRAINT "FK_9f11738e1922babaadf998b93ef" FOREIGN KEY ("appUserId") REFERENCES "app_user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "cart"
            ADD CONSTRAINT "FK_5ad17e3bf3749fdddc6e8050d6e" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "cart" DROP CONSTRAINT "FK_5ad17e3bf3749fdddc6e8050d6e"
        `);
    await queryRunner.query(`
            ALTER TABLE "address" DROP CONSTRAINT "FK_9f11738e1922babaadf998b93ef"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_5ad17e3bf3749fdddc6e8050d6"
        `);
    await queryRunner.query(`
            ALTER TABLE "cart" DROP COLUMN "addressId"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_9f11738e1922babaadf998b93e"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_380edf9075c1ba3bedf571c8c5"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_b0ef5bbd388628e6df422d2953"
        `);
    await queryRunner.query(`
            DROP TABLE "address"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."address_country_enum"
        `);
  }
}
