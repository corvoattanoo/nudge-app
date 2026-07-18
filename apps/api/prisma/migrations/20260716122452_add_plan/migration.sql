-- CreateEnum
CREATE TYPE "planStatus" AS ENUM ('UPCOMING', 'PAST');

-- CreateTable
CREATE TABLE "plan" (
    "id" SERIAL NOT NULL,
    "event_share_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,
    "meetTime" TIMESTAMP(3) NOT NULL,
    "meetLocation" TEXT,
    "outfitNotes" TEXT,
    "status" "planStatus" NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "plan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "plan_event_share_id_key" ON "plan"("event_share_id");

-- AddForeignKey
ALTER TABLE "plan" ADD CONSTRAINT "plan_event_share_id_fkey" FOREIGN KEY ("event_share_id") REFERENCES "event_shares"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan" ADD CONSTRAINT "plan_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan" ADD CONSTRAINT "plan_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
