ALTER TABLE "Enquiry"
  ADD COLUMN "accessToken" TEXT,
  ADD COLUMN "detailsCompletedAt" TIMESTAMP(3);

-- Backfill an unguessable token for existing enquiries, then require it
UPDATE "Enquiry"
SET "accessToken" = replace(gen_random_uuid()::text || gen_random_uuid()::text, '-', '')
WHERE "accessToken" IS NULL;

ALTER TABLE "Enquiry" ALTER COLUMN "accessToken" SET NOT NULL;
CREATE UNIQUE INDEX "Enquiry_accessToken_key" ON "Enquiry"("accessToken");

CREATE TABLE "Traveller" (
  "id" TEXT NOT NULL,
  "enquiryId" TEXT NOT NULL,
  "position" INTEGER NOT NULL,
  "fullName" TEXT NOT NULL,
  "dateOfBirth" TIMESTAMP(3) NOT NULL,
  "address" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "passportNumber" TEXT NOT NULL,
  "nationality" TEXT NOT NULL,
  "fatherFullName" TEXT NOT NULL,
  "fatherPlaceOfBirth" TEXT NOT NULL,
  "fatherNationality" TEXT NOT NULL,
  "motherFullName" TEXT NOT NULL,
  "motherPlaceOfBirth" TEXT NOT NULL,
  "motherNationality" TEXT NOT NULL,
  "purposeOfVisa" TEXT NOT NULL,
  "passportPhotoPath" TEXT NOT NULL,
  "passportSizedPhotoPath" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Traveller_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Traveller_enquiryId_position_key" ON "Traveller"("enquiryId", "position");
ALTER TABLE "Traveller" ADD CONSTRAINT "Traveller_enquiryId_fkey"
  FOREIGN KEY ("enquiryId") REFERENCES "Enquiry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
