import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserSeed1568189449224 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "INSERT INTO `user` (`id`, `userId`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES ('2efbf8ac-d298-4b56-ba1b-46cb9dda50a7', 'USRYHAKAX1SQ2', 'user@testaa.com', '$2a$12$fJPxIv3pqft9luuPV2CdiexTWze9/DhssFhnl7/0qSdb4EC1kWFDe', X'55534552', '2019-09-08 10:08:30.421657', '2019-09-08 10:08:30.421657'), ('d9be5fa7-aee8-43c2-b884-1f65a2f92a11', 'ADMC12IV9WKD9', 'admin@test.com', '$2a$12$fQE3skJWF.NFX2k1cm8Dk.svp7NDVyhjek92PX92xga09fQb6p/Ne', X'41444d494e', '2019-09-08 10:31:17.464179', '2019-09-08 10:31:17.464179')"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
