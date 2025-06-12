import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1749638883214 implements MigrationInterface {
    name = 'Migration1749638883214'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cart"
            ADD "couponId" integer
        `);
        await queryRunner.query(`
            ALTER TYPE "public"."cart_status_enum"
            RENAME TO "cart_status_enum_old"
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."cart_status_enum" AS ENUM('ACTIVE', 'BOUGHT', 'UNPAID_BLOCK', 'PAID_BLOCK')
        `);
        await queryRunner.query(`
            ALTER TABLE "cart"
            ALTER COLUMN "status" TYPE "public"."cart_status_enum" USING "status"::"text"::"public"."cart_status_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."cart_status_enum_old"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_b587940e6e9cfec985552e6709" ON "cart" ("couponId")
        `);
        await queryRunner.query(`
            ALTER TABLE "cart"
            ADD CONSTRAINT "FK_b587940e6e9cfec985552e6709b" FOREIGN KEY ("couponId") REFERENCES "coupon"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cart" DROP CONSTRAINT "FK_b587940e6e9cfec985552e6709b"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_b587940e6e9cfec985552e6709"
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."cart_status_enum_old" AS ENUM('ACTIVE', 'BOUGHT')
        `);
        await queryRunner.query(`
            ALTER TABLE "cart"
            ALTER COLUMN "status" TYPE "public"."cart_status_enum_old" USING "status"::"text"::"public"."cart_status_enum_old"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."cart_status_enum"
        `);
        await queryRunner.query(`
            ALTER TYPE "public"."cart_status_enum_old"
            RENAME TO "cart_status_enum"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart" DROP COLUMN "couponId"
        `);
    }

}
