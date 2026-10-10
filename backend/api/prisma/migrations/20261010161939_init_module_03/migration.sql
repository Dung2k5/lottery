-- CreateTable
CREATE TABLE "DrawSchedule" (
    "id" TEXT NOT NULL,
    "stationId" TEXT,
    "lotteryTypeId" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "drawTime" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DrawSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduleException" (
    "id" TEXT NOT NULL,
    "stationId" TEXT,
    "lotteryTypeId" TEXT NOT NULL,
    "exceptionDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "newDrawTime" TEXT,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScheduleException_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DrawSchedule_stationId_lotteryTypeId_dayOfWeek_key" ON "DrawSchedule"("stationId", "lotteryTypeId", "dayOfWeek");

-- CreateIndex
CREATE UNIQUE INDEX "ScheduleException_stationId_lotteryTypeId_exceptionDate_key" ON "ScheduleException"("stationId", "lotteryTypeId", "exceptionDate");

-- AddForeignKey
ALTER TABLE "DrawSchedule" ADD CONSTRAINT "DrawSchedule_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DrawSchedule" ADD CONSTRAINT "DrawSchedule_lotteryTypeId_fkey" FOREIGN KEY ("lotteryTypeId") REFERENCES "LotteryType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleException" ADD CONSTRAINT "ScheduleException_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleException" ADD CONSTRAINT "ScheduleException_lotteryTypeId_fkey" FOREIGN KEY ("lotteryTypeId") REFERENCES "LotteryType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
