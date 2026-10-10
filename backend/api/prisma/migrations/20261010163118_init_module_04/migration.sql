-- CreateEnum
CREATE TYPE "DrawStatus" AS ENUM ('DRAFT', 'PENDING_VERIFICATION', 'VERIFIED', 'PUBLISHED', 'CANCELLED', 'REVISED');

-- CreateTable
CREATE TABLE "DrawSession" (
    "id" TEXT NOT NULL,
    "lotteryTypeId" TEXT NOT NULL,
    "stationId" TEXT,
    "drawDate" TIMESTAMP(3) NOT NULL,
    "drawCode" TEXT,
    "status" "DrawStatus" NOT NULL DEFAULT 'DRAFT',
    "dataSourceId" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DrawSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrizeResult" (
    "id" TEXT NOT NULL,
    "drawSessionId" TEXT NOT NULL,
    "prizeCode" TEXT NOT NULL,
    "prizeName" TEXT NOT NULL,
    "winningNumbers" TEXT[],
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrizeResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResultRevision" (
    "id" TEXT NOT NULL,
    "drawSessionId" TEXT NOT NULL,
    "previousData" JSONB NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResultRevision_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DrawSession_lotteryTypeId_stationId_drawDate_key" ON "DrawSession"("lotteryTypeId", "stationId", "drawDate");

-- CreateIndex
CREATE UNIQUE INDEX "PrizeResult_drawSessionId_prizeCode_key" ON "PrizeResult"("drawSessionId", "prizeCode");

-- AddForeignKey
ALTER TABLE "DrawSession" ADD CONSTRAINT "DrawSession_lotteryTypeId_fkey" FOREIGN KEY ("lotteryTypeId") REFERENCES "LotteryType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DrawSession" ADD CONSTRAINT "DrawSession_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DrawSession" ADD CONSTRAINT "DrawSession_dataSourceId_fkey" FOREIGN KEY ("dataSourceId") REFERENCES "DataSource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrizeResult" ADD CONSTRAINT "PrizeResult_drawSessionId_fkey" FOREIGN KEY ("drawSessionId") REFERENCES "DrawSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultRevision" ADD CONSTRAINT "ResultRevision_drawSessionId_fkey" FOREIGN KEY ("drawSessionId") REFERENCES "DrawSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
