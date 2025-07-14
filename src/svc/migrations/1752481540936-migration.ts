import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1752481540936 implements MigrationInterface {
    name = 'Migration1752481540936'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "business_book_topology" DROP CONSTRAINT "FK_c51ef678c412bfa91e803673855"
        `);
        await queryRunner.query(`
            ALTER TABLE "business_book_topology" DROP CONSTRAINT "FK_a0a6efd38d3feb0a6ccd751f6db"
        `);
        await queryRunner.query(`
            ALTER TABLE "business_book_topology"
            ADD CONSTRAINT "UQ_c51ef678c412bfa91e803673855" UNIQUE ("bookId")
        `);
        await queryRunner.query(`
            ALTER TABLE "business_book_topology" DROP CONSTRAINT "REL_a0a6efd38d3feb0a6ccd751f6d"
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
            ALTER TABLE "business_book_topology"
            ADD CONSTRAINT "REL_a0a6efd38d3feb0a6ccd751f6d" UNIQUE ("businessId")
        `);
        await queryRunner.query(`
            ALTER TABLE "business_book_topology" DROP CONSTRAINT "UQ_c51ef678c412bfa91e803673855"
        `);
        await queryRunner.query(`
            ALTER TABLE "business_book_topology"
            ADD CONSTRAINT "FK_a0a6efd38d3feb0a6ccd751f6db" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "business_book_topology"
            ADD CONSTRAINT "FK_c51ef678c412bfa91e803673855" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

}
