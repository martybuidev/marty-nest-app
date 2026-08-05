import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateImage1785920784610 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'images',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            primaryKeyConstraintName: 'PK_images_id',
          },
          {
            name: 'product_id',
            type: 'int',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'url',
            type: 'text',
          },
          {
            name: 'alt',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'is_primary',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'images',
      new TableForeignKey({
        name: 'FK_images_products',
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images', true, true);
  }
}
