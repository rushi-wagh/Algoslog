/*
  Warnings:

  - You are about to drop the column `codeSnippet` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `referenceSolution` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `testCases` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `playlistId` on the `ProblemInPlaylist` table. All the data in the column will be lost.
  - You are about to drop the column `isEmailVerified` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[playListId,problemId]` on the table `ProblemInPlaylist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codeSnippets` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referenceSolutions` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `testcases` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playListId` to the `ProblemInPlaylist` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Submission` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `TestCaseResult` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "public"."ProblemInPlaylist" DROP CONSTRAINT "ProblemInPlaylist_playlistId_fkey";

-- DropIndex
DROP INDEX "public"."ProblemInPlaylist_playlistId_problemId_key";

-- AlterTable
ALTER TABLE "public"."Problem" DROP COLUMN "codeSnippet",
DROP COLUMN "referenceSolution",
DROP COLUMN "testCases",
ADD COLUMN     "codeSnippets" JSONB NOT NULL,
ADD COLUMN     "referenceSolutions" JSONB NOT NULL,
ADD COLUMN     "testcases" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "public"."ProblemInPlaylist" DROP COLUMN "playlistId",
ADD COLUMN     "playListId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Submission" DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."TestCaseResult" DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "isEmailVerified";

-- DropEnum
DROP TYPE "public"."status";

-- CreateIndex
CREATE UNIQUE INDEX "ProblemInPlaylist_playListId_problemId_key" ON "public"."ProblemInPlaylist"("playListId", "problemId");

-- AddForeignKey
ALTER TABLE "public"."ProblemInPlaylist" ADD CONSTRAINT "ProblemInPlaylist_playListId_fkey" FOREIGN KEY ("playListId") REFERENCES "public"."Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
