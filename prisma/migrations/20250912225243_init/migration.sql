-- CreateTable
CREATE TABLE "Sol" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "earthDate" TEXT,
    "minTemp" REAL,
    "maxTemp" REAL,
    "avgTemp" REAL,
    "pressure" REAL,
    "windSpeed" REAL,
    "rawJson" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
