-- Add trackingCode as nullable first so existing rows can be backfilled
ALTER TABLE "Enquiry" ADD COLUMN "trackingCode" TEXT;

-- Backfill a unique-enough code for any pre-existing rows
UPDATE "Enquiry"
SET "trackingCode" = 'MV-' || upper(substr(md5(random()::text || id), 1, 6))
WHERE "trackingCode" IS NULL;

-- Now enforce NOT NULL and uniqueness
ALTER TABLE "Enquiry" ALTER COLUMN "trackingCode" SET NOT NULL;
CREATE UNIQUE INDEX "Enquiry_trackingCode_key" ON "Enquiry"("trackingCode");
