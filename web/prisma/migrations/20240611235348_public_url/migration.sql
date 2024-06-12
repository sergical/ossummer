/*
  Warnings:

  - You are about to drop the column `url` on the `PullRequest` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[apiUrl]` on the table `PullRequest` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[publicUrl]` on the table `PullRequest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `apiUrl` to the `PullRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicUrl` to the `PullRequest` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "PullRequest_url_key";

-- AlterTable
ALTER TABLE "PullRequest" DROP COLUMN "url",
ADD COLUMN     "apiUrl" TEXT NOT NULL,
ADD COLUMN     "publicUrl" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PullRequest_apiUrl_key" ON "PullRequest"("apiUrl");

-- CreateIndex
CREATE UNIQUE INDEX "PullRequest_publicUrl_key" ON "PullRequest"("publicUrl");
