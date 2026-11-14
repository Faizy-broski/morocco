import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/app/lib/prisma";
import ApplicationForm from "@/app/components/ApplicationForm";
import { toSavedTravellers } from "@/app/lib/applicationSaved";
import type { ProcessingValue } from "@/app/lib/constants";

export const metadata: Metadata = {
  title: "Complete Your Application | Morocco Visa Service",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function ApplyPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const enquiry = await prisma.enquiry.findUnique({
    where: { accessToken: token },
    include: { travellerDetails: { orderBy: { position: "asc" } } },
  });
  if (!enquiry) notFound();

  if (enquiry.paymentStatus !== "unpaid") {
    return (
      <main className="min-h-screen bg-[#E8E8E8] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-10 text-center shadow-sm">
          <h1 className="font-playfair text-3xl text-gray-900 mb-3">Application submitted</h1>
          <p className="text-gray-600 mb-6">
            This application ({enquiry.trackingCode}) has already been paid for and is with our team.
          </p>
          <Link
            href={`/track?code=${enquiry.trackingCode}`}
            className="inline-block bg-[#006233] text-white px-8 py-3 font-bold hover:opacity-90 transition"
          >
            Track my application
          </Link>
        </div>
      </main>
    );
  }

  return (
    <ApplicationForm
      token={token}
      saved={toSavedTravellers(enquiry.travellerDetails)}
      initialEnquiry={{
        email: enquiry.email,
        processing: enquiry.processing as ProcessingValue,
        travellers: enquiry.travellers,
      }}
    />
  );
}
