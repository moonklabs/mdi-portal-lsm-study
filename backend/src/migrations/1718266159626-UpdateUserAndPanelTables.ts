import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserAndPanelTables1718266159626
  implements MigrationInterface
{
  name = 'UpdateUserAndPanelTables1718266159626';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "panel" DROP CONSTRAINT "FK_398271cdc4abfb54144d6cc0642"`,
    );
    await queryRunner.query(`ALTER TABLE "panel" DROP COLUMN "title"`);
    await queryRunner.query(
      `ALTER TABLE "panel" ADD "title" varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "panel" DROP COLUMN "action"`);
    await queryRunner.query(
      `ALTER TABLE "panel" ADD "action" varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "panel" DROP COLUMN "timezone"`);
    await queryRunner.query(
      `ALTER TABLE "panel" ADD "timezone" varchar(255) NOT NULL`,
    );
    await queryRunner.query(`DROP INDEX "IDX_78a916df40e02a9deb1c4b75ed"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "username" varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_78a916df40e02a9deb1c4b75ed" ON "user" ("username")`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "panel" ADD CONSTRAINT "FK_398271cdc4abfb54144d6cc0642" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "panel" DROP CONSTRAINT "FK_398271cdc4abfb54144d6cc0642"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP INDEX "IDX_78a916df40e02a9deb1c4b75ed"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "username" varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_78a916df40e02a9deb1c4b75ed" ON "user" ("username")`,
    );
    await queryRunner.query(`ALTER TABLE "panel" DROP COLUMN "timezone"`);
    await queryRunner.query(
      `ALTER TABLE "panel" ADD "timezone" varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "panel" DROP COLUMN "action"`);
    await queryRunner.query(
      `ALTER TABLE "panel" ADD "action" varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "panel" DROP COLUMN "title"`);
    await queryRunner.query(
      `ALTER TABLE "panel" ADD "title" varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "panel" ADD CONSTRAINT "FK_398271cdc4abfb54144d6cc0642" FOREIGN KEY ("userId") REFERENCES "mdi_study"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
