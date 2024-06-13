/*
  Warnings:

  - Added the required column `title` to the `PullRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PullRequest" ADD COLUMN     "title" TEXT NOT NULL;
