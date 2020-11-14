import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class usersLoginData1605347795580 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users_login',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'userEmail',
          type: 'varchar',
        },
        {
          name: 'password',
          type: 'varchar',
        },
      ]
    })) 
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users_login')
  }

}
