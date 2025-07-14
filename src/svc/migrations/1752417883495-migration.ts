import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1752417883495 implements MigrationInterface {
    name = 'Migration1752417883495'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "isBusinessBook" boolean NOT NULL DEFAULT false
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "isBusinessBook"
        `);
    }

}
