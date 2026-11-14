import { PROCESSING_OPTIONS } from "@/app/lib/constants";

export default function PricingSection() {
  return (
    <section className="w-full bg-white py-20 md:py-28 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <p className="text-brand-red text-[11px] font-bold tracking-widest uppercase mb-3 text-center">Pricing</p>
        <h2 className="font-playfair text-4xl md:text-5xl font-medium text-gray-900 text-center mb-12">Morocco Visa Fees</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROCESSING_OPTIONS.map((o) => (
            <div key={o.value} className="rounded-[1.5rem] border border-gray-100 bg-[#FFFAEF] p-8 shadow-[0_20px_60px_rgb(0,0,0,0.05)]">
              <h3 className="font-playfair text-2xl text-gray-900">Morocco Visa – {o.name}</h3>
              <p className="mt-2 text-gray-600 text-[15px]">{o.time}</p>
              <p className="mt-6 font-playfair text-5xl text-brand-red">£{o.price}</p>
              <p className="mt-1 text-sm text-gray-500">per applicant</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
