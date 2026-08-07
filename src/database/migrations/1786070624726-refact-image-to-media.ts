import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactImageToStorage1786070624726 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('images', 'medias');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('medias', 'images');
  }
}
