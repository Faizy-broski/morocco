-- Parents' places of birth are no longer collected; keep old data but stop requiring it
ALTER TABLE "Traveller"
  ALTER COLUMN "fatherPlaceOfBirth" DROP NOT NULL,
  ALTER COLUMN "motherPlaceOfBirth" DROP NOT NULL;
