/*
  Warnings:

  - You are about to drop the column `thumbnail` on the `Post` table. All the data in the column will be lost.
  - Added the required column `tags` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "summary" TEXT NOT NULL,
    "tags" TEXT NOT NULL
);
INSERT INTO "new_Post" ("content", "createdAt", "id", "summary", "title", "updatedAt") SELECT "content", "createdAt", "id", "summary", "title", "updatedAt" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
