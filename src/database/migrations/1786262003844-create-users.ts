import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateUserAuth1786100000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            primaryKeyConstraintName: 'PK_users_id',
          },
          { name: 'email', type: 'varchar', length: '255' },
          { name: 'password', type: 'varchar', length: '255' },
          { name: 'full_name', type: 'varchar', length: '255' },
          {
            name: 'role',
            type: 'enum',
            enum: ['ADMIN', 'USER'],
            default: "'USER'",
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['ACTIVE', 'BANNED'],
            default: "'ACTIVE'",
          },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
      }),
    );

    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'UK_users_email',
        columnNames: ['email'],
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users', true, true);
  }
}
