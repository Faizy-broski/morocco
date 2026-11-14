CREATE TYPE "PaymentStatus" AS ENUM ('unpaid', 'paid', 'refunded');

ALTER TABLE "Enquiry"
  ADD COLUMN "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'unpaid',
  ADD COLUMN "amountPence" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "stripeSessionId" TEXT,
  ADD COLUMN "stripePaymentIntentId" TEXT,
  ADD COLUMN "paidAt" TIMESTAMP(3);

-- Pre-payment enquiries: price at the standard rate (GBP 120 per traveller) so they can still be paid
UPDATE "Enquiry" SET "amountPence" = 12000 * "travellers" WHERE "amountPence" = 0;

CREATE UNIQUE INDEX "Enquiry_stripeSessionId_key" ON "Enquiry"("stripeSessionId");
CREATE INDEX "Enquiry_stripePaymentIntentId_idx" ON "Enquiry"("stripePaymentIntentId");
CREATE INDEX "Enquiry_paymentStatus_idx" ON "Enquiry"("paymentStatus");
