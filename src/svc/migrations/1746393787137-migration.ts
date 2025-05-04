import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1746393787137 implements MigrationInterface {
    name = 'Migration1746393787137'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "app_user" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "name" character varying(255) NOT NULL,
                "googleId" character varying(255),
                "email" character varying(255) NOT NULL,
                CONSTRAINT "PK_22a5c4a3d9b2fb8e4e73fc4ada1" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_f5a0cf7cb8f8d2efb198c117ad" ON "app_user" ("createdAt")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_39ea5788f5fb2dc626677656b6" ON "app_user" ("updatedAt")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "public"."IDX_39ea5788f5fb2dc626677656b6"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_f5a0cf7cb8f8d2efb198c117ad"
        `);
        await queryRunner.query(`
            DROP TABLE "app_user"
        `);
    }

}
