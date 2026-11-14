import Link from "next/link";
import { notFound } from "next/navigation";
import { verifySession } from "@/app/lib/dal";
import { prisma } from "@/app/lib/prisma";
import { processingLabel } from "@/app/lib/constants";

const fmtDate = (d: Date, withTime = false) =>
  new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", ...(withTime ? { timeStyle: "short" } : {}), timeZone: "UTC" }).format(d);

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{label}</dt>
      <dd className="mt-0.5 text-[15px] text-gray-900 break-words">{value}</dd>
    </div>
  );
}

export default async function EnquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await verifySession();
  const { id } = await params;
  const enquiry = await prisma.enquiry.findUnique({
    where: { id },
    include: { travellerDetails: { orderBy: { position: "asc" } } },
  });
  if (!enquiry) notFound();

  const payStyle =
    enquiry.paymentStatus === "paid" ? "bg-green-100 text-green-700" : enquiry.paymentStatus === "refunded" ? "bg-gray-200 text-gray-700" : "bg-amber-100 text-amber-700";

  return (
    <div className="min-h-screen bg-[#F9F9F7] px-4 py-10 lg:px-10">
      <div className="max-w-5xl mx-auto">
        <Link href="/admin" className="text-sm font-medium text-gray-500 hover:text-brand-red">&larr; All enquiries</Link>

        <div className="mt-4 mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-brand-red text-[11px] font-bold tracking-widest uppercase mb-1">Application</p>
            <h1 className="font-playfair text-4xl text-gray-900">{enquiry.fullName}</h1>
            <p className="mt-1 font-mono text-sm font-bold tracking-wider text-brand-red">{enquiry.trackingCode}</p>
          </div>
          <span className={`rounded-full px-4 py-1.5 text-sm font-medium ${payStyle}`}>
            {enquiry.paymentStatus === "paid" ? "Paid" : enquiry.paymentStatus === "refunded" ? "Refunded" : "Unpaid"} · £{(enquiry.amountPence / 100).toFixed(2)}
          </span>
        </div>

        <section className="bg-white rounded-[1.5rem] shadow-[0_20px_60px_rgb(0,0,0,0.04)] p-6 lg:p-8 mb-6">
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            <Row label="Contact email" value={enquiry.email} />
            <Row label="Visa type" value={enquiry.visaType} />
            <Row label="Processing" value={processingLabel(enquiry.processing)} />
            <Row label="Travel date" value={fmtDate(enquiry.travelDate)} />
            <Row label="Travellers" value={String(enquiry.travellers)} />
            <Row label="Source" value={enquiry.source} />
            <Row label="Submitted" value={fmtDate(enquiry.createdAt, true)} />
            <Row label="Paid on" value={enquiry.paidAt ? fmtDate(enquiry.paidAt, true) : "—"} />
            <Row label="Status" value={enquiry.status} />
            <Row
              label="Details"
              value={
                enquiry.detailsCompletedAt
                  ? `Complete (${fmtDate(enquiry.detailsCompletedAt, true)})`
                  : `${enquiry.travellerDetails.length} of ${enquiry.travellers} saved`
              }
            />
          </dl>
        </section>

        {enquiry.travellerDetails.length === 0 && (
          <p className="text-gray-500 text-center py-10">The customer hasn&apos;t entered passport details yet.</p>
        )}

        {enquiry.travellerDetails.map((t) => (
          <section key={t.id} className="bg-white rounded-[1.5rem] shadow-[0_20px_60px_rgb(0,0,0,0.04)] p-6 lg:p-8 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-gray-100">
              <h2 className="font-playfair text-2xl text-gray-900">Traveller {t.position}: {t.firstName} {t.familyName}</h2>
            </div>

            <h3 className="text-[11px] font-bold uppercase tracking-widest text-brand-red mb-3">Documents</h3>
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {(
                [
                  ["photo", "Photo", true],
                  ["passport", "Passport", true],
                  ["additional", "Additional visa", Boolean(t.additionalVisaPath)],
                  ["evisa", "UK e-Visa", Boolean(t.eVisaPath)],
                ] as const
              ).map(([kind, label, present]) => (
                <div key={kind} className="flex flex-col rounded-[1.25rem] border border-gray-100 bg-[#F9F9F7] p-4">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">{label}</p>
                  {present ? (
                    <>
                      {kind === "photo" && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={`/api/admin/files/${t.id}/photo`}
                          alt={`Photo of ${t.firstName} ${t.familyName}`}
                          className="mt-3 h-32 w-32 rounded-2xl bg-gray-100 object-cover"
                        />
                      )}
                      <div className="mt-auto flex gap-2 pt-4">
                        <a
                          href={`/api/admin/files/${t.id}/${kind}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 rounded-full border border-gray-200 bg-white px-3 py-2 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                        >
                          View
                        </a>
                        <a
                          href={`/api/admin/files/${t.id}/${kind}?download=1`}
                          download
                          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-brand-red px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#8A2728]"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                            <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
                          </svg>
                          Download
                        </a>
                      </div>
                    </>
                  ) : (
                    <p className="mt-3 text-sm text-gray-400">Not provided</p>
                  )}
                </div>
              ))}
            </div>

            <h3 className="text-[11px] font-bold uppercase tracking-widest text-brand-red mb-3">Eligibility</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
              <Row label="Nationality" value={t.nationality} />
              <Row label="Country of residence" value={t.countryOfResidence} />
              <Row label="Date of birth" value={fmtDate(t.dateOfBirth)} />
              <Row label="Document type" value={t.documentType} />
              <Row label="Purpose of trip" value={t.purposeOfTrip} />
              <Row label="Other valid visa" value={t.hasOtherVisa ? "Yes" : "No"} />
              <Row label="Travel conditions accepted" value={fmtDate(t.conditionsAcceptedAt, true)} />
            </dl>

            <h3 className="text-[11px] font-bold uppercase tracking-widest text-brand-red mb-3">Personal information</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
              <Row label="Family name" value={t.familyName} />
              <Row label="First name" value={t.firstName} />
              <Row label="Place of birth" value={t.placeOfBirth} />
              <Row label="Mobile" value={t.phone} />
              <Row label="Email" value={t.email} />
              <Row label="Occupation" value={t.occupation} />
              <Row label="Passport number" value={t.passportNumber} />
              <Row label="Issued by" value={t.issuedBy} />
              <Row label="Date of issue" value={fmtDate(t.dateOfIssue)} />
              <Row label="Expiry date" value={fmtDate(t.expiryDate)} />
            </dl>

            <h3 className="text-[11px] font-bold uppercase tracking-widest text-brand-red mb-3">Further information</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <Row label="Arrival in Morocco" value={fmtDate(t.arrivalDate)} />
              <Row label="Departure from Morocco" value={fmtDate(t.departureDate)} />
              <Row label="UK immigration status code" value={t.ukShareCode || "—"} />
              {t.hasOtherVisa && (
                <>
                  <Row label="Additional visa" value={t.additionalVisaType ?? "—"} />
                  <Row label="Valid" value={`${t.additionalVisaFrom ? fmtDate(t.additionalVisaFrom) : "—"} → ${t.additionalVisaUntil ? fmtDate(t.additionalVisaUntil) : "—"}`} />
                  <Row label="Entries" value={t.additionalVisaEntries ?? "—"} />
                  <Row label="Additional visa number" value={t.additionalVisaNumber ?? "—"} />
                </>
              )}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}
