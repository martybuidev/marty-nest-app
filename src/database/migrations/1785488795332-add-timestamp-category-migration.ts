import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTimestampCategoryMigration1785488795332 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE "categories" 
    ADD COLUMN created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ADD COLUMN updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE "categories"
    DROP COLUMN created_at,
    DROP COLUMN updated_at;
    `);
  }
}
