/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Users_name_key` ON `Users`;

-- AlterTable
ALTER TABLE `Event` ADD COLUMN `code` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Event_code_key` ON `Event`(`code`);
