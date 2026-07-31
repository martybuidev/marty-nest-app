import { MigrationInterface, QueryRunner } from 'typeorm';

export class CategoryMigration1785467314116 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "categories" (
            "id" SERIAL,
            "name" VARCHAR(255),
            "slug" VARCHAR(255),
            description TEXT NULL,
            CONSTRAINT "PK_category_id" PRIMARY KEY ("id"),
            CONSTRAINT "UK_category_slug" UNIQUE ("slug")   
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE  IF EXISTS "categories"`);
  }
}
