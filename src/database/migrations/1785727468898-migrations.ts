import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1785727468898 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE "categories" 
    ADD CONSTRAINT UK_name UNIQUE (name)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE "categories" 
    DROP CONSTRAINT UK_name
    `);
  }
}
