/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `PullRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PullRequest_url_key" ON "PullRequest"("url");
