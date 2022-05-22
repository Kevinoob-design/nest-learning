const { MigrationInterface, QueryRunner, Table } = require("typeorm");

module.exports = class initialSchema1653245769337 {
    name = 'initialSchema1653245769337'

    async up(queryRunner) {
        await queryRunner.createTable(
            new Table({
                name: 'user',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                    },
                    {
                        name: 'admin',
                        type: 'boolean',
                        default: 'true',
                    },
                ],
            }),
        );

        await queryRunner.createTable(
            new Table({
                name: 'report',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    { name: 'approved', type: 'boolean', default: 'false' },
                    { name: 'price', type: 'decimal' },
                    { name: 'make', type: 'varchar' },
                    { name: 'model', type: 'varchar' },
                    { name: 'year', type: 'date' },
                    { name: 'lng', type: 'float' },
                    { name: 'lat', type: 'float' },
                    { name: 'mileage', type: 'float' },
                    { name: 'userId', type: 'integer' },
                ],
            }),
        );
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "report"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
