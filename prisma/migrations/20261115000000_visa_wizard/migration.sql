-- Rebuild Traveller for the multi-step e-visa application (previous test data is discarded)
DROP TABLE "Traveller";
UPDATE "Enquiry" SET "detailsCompletedAt" = NULL;

CREATE TABLE "Traveller" (
  "id" TEXT NOT NULL,
  "enquiryId" TEXT NOT NULL,
  "position" INTEGER NOT NULL,
  "nationality" TEXT NOT NULL,
  "countryOfResidence" TEXT NOT NULL,
  "dateOfBirth" TIMESTAMP(3) NOT NULL,
  "documentType" TEXT NOT NULL,
  "purposeOfTrip" TEXT NOT NULL,
  "hasOtherVisa" BOOLEAN NOT NULL,
  "conditionsAcceptedAt" TIMESTAMP(3) NOT NULL,
  "familyName" TEXT NOT NULL,
  "firstName" TEXT NOT NULL,
  "placeOfBirth" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "occupation" TEXT NOT NULL,
  "passportNumber" TEXT NOT NULL,
  "issuedBy" TEXT NOT NULL,
  "dateOfIssue" TIMESTAMP(3) NOT NULL,
  "expiryDate" TIMESTAMP(3) NOT NULL,
  "additionalVisaType" TEXT,
  "additionalVisaFrom" TIMESTAMP(3),
  "additionalVisaUntil" TIMESTAMP(3),
  "additionalVisaEntries" TEXT,
  "additionalVisaNumber" TEXT,
  "arrivalDate" TIMESTAMP(3) NOT NULL,
  "departureDate" TIMESTAMP(3) NOT NULL,
  "ukShareCode" TEXT,
  "photoPath" TEXT NOT NULL,
  "passportPath" TEXT NOT NULL,
  "additionalVisaPath" TEXT,
  "eVisaPath" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Traveller_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Traveller_enquiryId_position_key" ON "Traveller"("enquiryId", "position");
ALTER TABLE "Traveller" ADD CONSTRAINT "Traveller_enquiryId_fkey"
  FOREIGN KEY ("enquiryId") REFERENCES "Enquiry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
