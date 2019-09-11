import {MigrationInterface, QueryRunner} from "typeorm";

export class TodoTable1568186721734 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `todo` (`id` varchar(36) NOT NULL, `todoId` varchar(255) NOT NULL, `title` varchar(255) NOT NULL, `description` text NULL, `completed` tinyint NOT NULL DEFAULT 0, `userId` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_32c10cf78b9d9301f7ea34e48a` (`todoId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `todo` ADD CONSTRAINT `FK_1e982e43f63a98ad9918a86035c` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `todo` DROP FOREIGN KEY `FK_1e982e43f63a98ad9918a86035c`");
        await queryRunner.query("DROP INDEX `IDX_32c10cf78b9d9301f7ea34e48a` ON `todo`");
        await queryRunner.query("DROP TABLE `todo`");
    }

}
