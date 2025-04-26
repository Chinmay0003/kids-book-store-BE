import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1745647774566 implements MigrationInterface {
    name = 'Migration1745647774566'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."book_quality_enum" AS ENUM(
                'New',
                'Like new',
                'Excellent',
                'Very Good',
                'Good'
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "quality" "public"."book_quality_enum"
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."book_type_enum" AS ENUM('Hard cover', 'Paperback')
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "type" "public"."book_type_enum"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "type"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."book_type_enum"
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "quality"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."book_quality_enum"
        `);
    }

}
