/*
  Warnings:

  - You are about to drop the column `codeSnippets` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `referenceSolutions` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `testcases` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `playListId` on the `ProblemInPlaylist` table. All the data in the column will be lost.
  - The `status` column on the `Submission` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `TestCaseResult` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[playlistId,problemId]` on the table `ProblemInPlaylist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codeSnippet` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referenceSolution` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `testCases` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playlistId` to the `ProblemInPlaylist` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "status" AS ENUM ('Accepted', 'WrongAnswer');

-- DropForeignKey
ALTER TABLE "ProblemInPlaylist" DROP CONSTRAINT "ProblemInPlaylist_playListId_fkey";

-- DropIndex
DROP INDEX "ProblemInPlaylist_playListId_problemId_key";

-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "codeSnippets",
DROP COLUMN "referenceSolutions",
DROP COLUMN "testcases",
ADD COLUMN     "codeSnippet" JSONB NOT NULL,
ADD COLUMN     "referenceSolution" JSONB NOT NULL,
ADD COLUMN     "testCases" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "ProblemInPlaylist" DROP COLUMN "playListId",
ADD COLUMN     "playlistId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "status",
ADD COLUMN     "status" "status" NOT NULL DEFAULT 'WrongAnswer';

-- AlterTable
ALTER TABLE "TestCaseResult" DROP COLUMN "status",
ADD COLUMN     "status" "status" NOT NULL DEFAULT 'WrongAnswer';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isEmailVerified" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "ProblemInPlaylist_playlistId_problemId_key" ON "ProblemInPlaylist"("playlistId", "problemId");

-- AddForeignKey
ALTER TABLE "ProblemInPlaylist" ADD CONSTRAINT "ProblemInPlaylist_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
