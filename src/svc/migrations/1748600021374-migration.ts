import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1748600021374 implements MigrationInterface {
    name = 'Migration1748600021374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."book_contentcategory_enum" AS ENUM(
                'Story Book',
                'Phonics Book',
                'Activity Book',
                'Sound Book',
                'Lift and Flap Book',
                'Push Pull Slide Book',
                'Rhyme Books',
                'Pop Up Books',
                'Sticker Book',
                'Colouring Book',
                'Touch and Feel Book'
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "contentCategory" "public"."book_contentcategory_enum"
        `);
        await queryRunner.query(`
            ALTER TYPE "public"."book_type_enum"
            RENAME TO "book_type_enum_old"
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."book_type_enum" AS ENUM('Hard cover', 'Paperback', 'Board book')
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ALTER COLUMN "type" TYPE "public"."book_type_enum" USING "type"::"text"::"public"."book_type_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."book_type_enum_old"
        `);
        await queryRunner.query(`
            ALTER TABLE "address" DROP CONSTRAINT "FK_9f11738e1922babaadf998b93ef"
        `);
        await queryRunner.query(`
            ALTER TABLE "address"
            ALTER COLUMN "appUserId"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "address"
            ADD CONSTRAINT "FK_9f11738e1922babaadf998b93ef" FOREIGN KEY ("appUserId") REFERENCES "app_user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "address" DROP CONSTRAINT "FK_9f11738e1922babaadf998b93ef"
        `);
        await queryRunner.query(`
            ALTER TABLE "address"
            ALTER COLUMN "appUserId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "address"
            ADD CONSTRAINT "FK_9f11738e1922babaadf998b93ef" FOREIGN KEY ("appUserId") REFERENCES "app_user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."book_type_enum_old" AS ENUM('Hard cover', 'Paperback')
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ALTER COLUMN "type" TYPE "public"."book_type_enum_old" USING "type"::"text"::"public"."book_type_enum_old"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."book_type_enum"
        `);
        await queryRunner.query(`
            ALTER TYPE "public"."book_type_enum_old"
            RENAME TO "book_type_enum"
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "contentCategory"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."book_contentcategory_enum"
        `);
    }

}
