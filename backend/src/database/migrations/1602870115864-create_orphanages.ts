import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createOrphanages1602870115864 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // realizar as alterações desejadas no banco de dados
    // criar tabela, novo campo, deletar campo...

    await queryRunner.createTable(new Table({
      name: 'orphanages',
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
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'latitude',
          type: 'decimal',
          scale: 10,
          precision: 2,
        },
        {
          name: 'longitude',
          type: 'decimal',
          scale: 10,
          precision: 2,
        },
        {
          name: 'aboute',
          type: 'text',
        },
        {
          name: 'instructions',
          type: 'text',
        },
        {
          name: 'opening_hours',
          type: 'varchar',
        },
        {
          name: 'open_on_weekends',
          type: 'boolean',
          default: false,
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Desfazer o que foi feito em UP

    await queryRunner.dropTable('orphanages')
  }

}
