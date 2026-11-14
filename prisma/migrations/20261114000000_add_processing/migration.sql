-- Processing speed chosen on the enquiry form; existing rows are standard
ALTER TABLE "Enquiry" ADD COLUMN "processing" TEXT NOT NULL DEFAULT 'standard';
