ALTER TABLE "Enquiry"
  ADD COLUMN "abandonedAt" TIMESTAMP(3),
  ADD COLUMN "abandonReason" TEXT,
  ADD COLUMN "lastError" TEXT,
  ADD COLUMN "lastErrorAt" TIMESTAMP(3),
  ADD COLUMN "failureAlertAt" TIMESTAMP(3),
  ADD COLUMN "reminderSentAt" TIMESTAMP(3);

CREATE INDEX "Enquiry_abandonedAt_idx" ON "Enquiry"("abandonedAt");
