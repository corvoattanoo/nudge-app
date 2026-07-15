-- CreateEnum
CREATE TYPE "voteDecision" AS ENUM ('APPROVE', 'REJECT', 'PENDING');

-- CreateTable
CREATE TABLE "Vote" (
    "id" SERIAL NOT NULL,
    "event_share_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "status" "voteDecision" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vote_event_share_id_user_id_key" ON "Vote"("event_share_id", "user_id");

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_event_share_id_fkey" FOREIGN KEY ("event_share_id") REFERENCES "event_shares"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
