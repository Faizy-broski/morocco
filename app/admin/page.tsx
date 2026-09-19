import { verifySession } from "@/app/lib/dal";
import { prisma } from "@/app/lib/prisma";
import { logout } from "@/app/actions/auth";
import { VISA_TYPES } from "@/app/lib/constants";
import StatusSelect from "./StatusSelect";
import RefreshButton from "./RefreshButton";
import DeleteButton from "./DeleteButton";

const PAGE_SIZE = 20;

const STATUS_STYLES: Record<string, string> = {
  new: "bg-brand-red/10 text-brand-red",
  contacted: "bg-amber-100 text-amber-700",
  closed: "bg-gray-100 text-gray-500",
};

type SearchParams = {
  status?: string;
  visaType?: string;
  page?: string;
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  await verifySession();

  const params = await searchParams;
  const status = params.status && params.status !== "all" ? params.status : undefined;
  const visaType = params.visaType && params.visaType !== "all" ? params.visaType : undefined;
  const page = Math.max(1, Number(params.page) || 1);

  const where = {
    ...(status ? { status: status as "new" | "contacted" | "closed" } : {}),
    ...(visaType ? { visaType } : {}),
  };

  const [enquiries, total, totalCount, newCount, contactedCount, closedCount] = await Promise.all([
    prisma.enquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.enquiry.count({ where }),
    prisma.enquiry.count(),
    prisma.enquiry.count({ where: { status: "new" } }),
    prisma.enquiry.count({ where: { status: "contacted" } }),
    prisma.enquiry.count({ where: { status: "closed" } }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const rangeStart = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, total);

  const buildPageHref = (targetPage: number) => {
    const sp = new URLSearchParams();
    if (status) sp.set("status", status);
    if (visaType) sp.set("visaType", visaType);
    sp.set("page", String(targetPage));
    return `/admin?${sp.toString()}`;
  };

  // Windowed page numbers around the current page, e.g. 1 ... 4 5 [6] 7 8 ... 12
  const pageNumbers = (() => {
    const windowSize = 1;
    const pages: (number | "ellipsis")[] = [];
    const add = (p: number) => pages.push(p);
    add(1);
    if (page - windowSize > 2) pages.push("ellipsis");
    for (let p = Math.max(2, page - windowSize); p <= Math.min(totalPages - 1, page + windowSize); p++) {
      add(p);
    }
    if (page + windowSize < totalPages - 1) pages.push("ellipsis");
    if (totalPages > 1) add(totalPages);
    return pages;
  })();

  const stats = [
    {
      label: "Total Enquiries",
      value: totalCount,
      accent: "text-gray-900",
      bg: "bg-gray-100",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
    },
    {
      label: "New",
      value: newCount,
      accent: "text-brand-red",
      bg: "bg-brand-red/10",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
    },
    {
      label: "Contacted",
      value: contactedCount,
      accent: "text-amber-700",
      bg: "bg-amber-100",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
    {
      label: "Closed",
      value: closedCount,
      accent: "text-green-700",
      bg: "bg-green-100",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9F9F7] px-4 py-10 lg:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-brand-red text-[11px] font-bold tracking-widest uppercase mb-2">Booking Enquiry</p>
            <h1 className="font-playfair text-4xl font-medium text-gray-900">Enquiries</h1>
          </div>
          <div className="flex items-center gap-3">
            <RefreshButton />
            <form action={logout}>
              <button
                type="submit"
                className="text-sm font-semibold text-white bg-brand-red hover:bg-[#8A2728] transition rounded-full px-5 py-2.5 flex items-center gap-2"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Log out
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-[1.5rem] shadow-[0_20px_60px_rgb(0,0,0,0.04)] p-5 flex items-center gap-4"
            >
              <div className={`w-11 h-11 rounded-full flex items-center justify-center ${stat.bg} ${stat.accent}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
                <p className={`font-playfair text-2xl font-medium ${stat.accent}`}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <form className="bg-white rounded-[1.5rem] shadow-[0_20px_60px_rgb(0,0,0,0.04)] p-5 mb-6 flex flex-wrap gap-4 items-end">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Status</label>
            <select
              name="status"
              defaultValue={status ?? "all"}
              className="bg-[#F9F9F7] border border-gray-100 rounded-xl px-3 py-2 text-sm text-gray-900"
            >
              <option value="all">All</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Visa Type</label>
            <select
              name="visaType"
              defaultValue={visaType ?? "all"}
              className="bg-[#F9F9F7] border border-gray-100 rounded-xl px-3 py-2 text-sm text-gray-900"
            >
              <option value="all">All</option>
              {VISA_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-gray-900 text-white text-sm font-medium rounded-xl px-5 py-2.5 hover:bg-gray-800 transition"
          >
            Apply Filters
          </button>
        </form>

        <div className="bg-white rounded-[1.5rem] shadow-[0_20px_60px_rgb(0,0,0,0.04)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Email</th>
                  <th className="px-5 py-4">Visa Type</th>
                  <th className="px-5 py-4">Travel Date</th>
                  <th className="px-5 py-4">Travellers</th>
                  <th className="px-5 py-4">Source</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Submitted</th>
                  <th className="px-5 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="border-b border-gray-50 last:border-0">
                    <td className="px-5 py-4 font-medium text-gray-900">{enquiry.fullName}</td>
                    <td className="px-5 py-4 text-gray-600">{enquiry.email}</td>
                    <td className="px-5 py-4 text-gray-600">{enquiry.visaType}</td>
                    <td className="px-5 py-4 text-gray-600">
                      {new Intl.DateTimeFormat("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }).format(enquiry.travelDate)}
                    </td>
                    <td className="px-5 py-4 text-gray-600">{enquiry.travellers}</td>
                    <td className="px-5 py-4 text-gray-600 capitalize">{enquiry.source}</td>
                    <td className="px-5 py-4">
                      <StatusSelect
                        id={enquiry.id}
                        currentStatus={enquiry.status}
                        className={STATUS_STYLES[enquiry.status]}
                      />
                    </td>
                    <td className="px-5 py-4 text-gray-400 whitespace-nowrap">
                      {new Intl.DateTimeFormat("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }).format(enquiry.createdAt)}
                    </td>
                    <td className="px-5 py-4">
                      <DeleteButton id={enquiry.id} fullName={enquiry.fullName} />
                    </td>
                  </tr>
                ))}
                {enquiries.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-5 py-10 text-center text-gray-400">
                      No enquiries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {total > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <p className="text-sm text-gray-400">
              Showing <span className="font-medium text-gray-700">{rangeStart}–{rangeEnd}</span> of{" "}
              <span className="font-medium text-gray-700">{total}</span> enquiries
            </p>

            {totalPages > 1 && (
              <div className="flex items-center gap-1.5">
                <a
                  href={page > 1 ? buildPageHref(page - 1) : undefined}
                  aria-disabled={page <= 1}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition ${
                    page <= 1
                      ? "text-gray-300 pointer-events-none"
                      : "text-gray-500 hover:bg-white hover:text-gray-900"
                  }`}
                >
                  &larr;
                </a>

                {pageNumbers.map((p, i) =>
                  p === "ellipsis" ? (
                    <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-sm text-gray-300">
                      &hellip;
                    </span>
                  ) : (
                    <a
                      key={p}
                      href={buildPageHref(p)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition ${
                        p === page
                          ? "bg-brand-red text-white"
                          : "text-gray-600 hover:bg-white"
                      }`}
                    >
                      {p}
                    </a>
                  )
                )}

                <a
                  href={page < totalPages ? buildPageHref(page + 1) : undefined}
                  aria-disabled={page >= totalPages}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition ${
                    page >= totalPages
                      ? "text-gray-300 pointer-events-none"
                      : "text-gray-500 hover:bg-white hover:text-gray-900"
                  }`}
                >
                  &rarr;
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
