import Image from "next/image";
import ScrollAnimations from "../components/ScrollAnimations";
import ApplicationForm from "../components/ApplicationForm";
import MobileMenu from "../components/MobileMenu";


const CONTACT_CARDS = [
  { label: "Email Us", value: "services@moroccovisaservice.com", href: "mailto:services@moroccovisaservice.com", icon: "M3 6h18v12H3zM3 7l9 6 9-6" },
  { label: "Call Us", value: "020 3633 9033", href: "tel:02036339033", icon: "M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" },
  { label: "Address", value: "London, United Kingdom", href: undefined, icon: "M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" },
  { label: "Hours", value: "Open 24/7, 365 days a year", href: undefined, icon: "M12 22a10 10 0 100-20 10 10 0 000 20zM12 6v6l4 2" },
];

export default function ContactPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#F9F9F7]">
      {/* Top banner with navigation and title */}
      <section className="relative w-full overflow-hidden text-white rounded-b-[3rem] md:rounded-b-[4rem] shadow-2xl">
        <div className="absolute inset-0 z-0">
          <Image src="/images/Detailed arches in a peaceful Moroccan riad.webp" alt="" fill sizes="100vw" priority className="object-cover" />
          <div className="absolute inset-0 bg-[#5E1A1A]/90 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12 pt-8 pb-40 md:pb-48">
          <header className="flex items-center justify-between">
            <a href="/">
              <Image src="/images/footer-logo.webp" alt="Morocco Visa Service" width={200} height={60} priority />
            </a>
            <div className="hidden lg:flex items-center bg-white/20 backdrop-blur-lg border border-white/30 rounded-full p-1.5 pl-8 shadow-sm">
              <nav className="flex items-center space-x-6 font-bold text-[14.5px] text-white mr-6 whitespace-nowrap">
                <a href="/" className="hover:text-[#E5B3B3] transition">Home</a>
                <a href="/about" className="hover:text-[#E5B3B3] transition">About Us</a>
                <a href="/services" className="hover:text-[#E5B3B3] transition">Services</a>
                <a href="/how-it-works" className="hover:text-[#E5B3B3] transition">How It Works</a>
                <a href="/faq" className="hover:text-[#E5B3B3] transition">FAQs</a>
                <a href="/track" className="hover:text-[#E5B3B3] transition">Track</a>
              </nav>
              <div className="flex items-center gap-2">
                <a href="/contact" className="text-[#E5B3B3] font-bold text-[13px] px-2">Contact Us</a>
                <a href="/contact" className="bg-white text-brand-red px-5 py-2.5 rounded-full font-bold text-[13px] hover:bg-gray-50 transition inline-flex items-center gap-2">
                  Apply for Visa <span className="text-lg leading-none">&rarr;</span>
                </a>
              </div>
            </div>
            <div className="lg:hidden"><MobileMenu active="/contact" /></div>
          </header>

          <div className="mt-14 md:mt-20 max-w-3xl">
            <p data-anim="fade-up" className="text-[#E5B3B3] font-bold text-[11px] tracking-[0.3em] uppercase mb-5">Apply &amp; Get in Touch</p>
            <h1 data-anim="heading-clip-wipe" className="font-playfair text-[48px] md:text-[72px] leading-[1] tracking-tight drop-shadow-lg">
              Let&apos;s <span className="italic">Talk</span> Morocco.
            </h1>
            <p data-anim="fade-up" className="mt-5 text-white/80 text-[15px] md:text-[17px] leading-relaxed max-w-xl">
              Complete your whole application below, step by step: eligibility, travel conditions, personal details, documents and secure payment.
            </p>
          </div>
        </div>
      </section>

      {/* Full-width application form, overlapping the banner */}
      <section className="relative z-20 w-full px-4 md:px-8 -mt-28 md:-mt-36">
        <div className="mx-auto max-w-6xl" data-anim="fade-up">
          <div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-[0_30px_80px_rgb(0,0,0,0.15)] border border-gray-100 p-4 sm:p-8 md:p-12">
            <ApplicationForm
              embedded
              source="contact"
              initialEnquiry={{ email: "", processing: "standard", travellers: 1 }}
            />
          </div>
        </div>
      </section>

      {/* Contact details, below the form */}
      <section className="w-full px-4 md:px-8 pt-20 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <p className="text-brand-red font-bold text-[11px] tracking-[0.3em] uppercase mb-3">Prefer to talk first?</p>
            <h2 data-anim="heading-blur-in" className="font-playfair text-[#1a1a1a] text-[34px] md:text-[46px] leading-tight">
              We&apos;re here <span className="italic text-brand-red">whenever you need us</span>
            </h2>
          </div>

          <div data-anim-group="info-cards" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CONTACT_CARDS.map((c) => {
              const inner = (
                <>
                  <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={c.icon} /></svg>
                  </span>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-1.5">{c.label}</span>
                  <span className="block font-playfair text-xl text-gray-900 break-words">{c.value}</span>
                </>
              );
              const cls = "block h-full bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_10px_40px_rgb(0,0,0,0.04)] hover:-translate-y-2 transition-transform duration-300";
              return c.href ? (
                <a key={c.label} data-anim="card" href={c.href} className={cls}>{inner}</a>
              ) : (
                <div key={c.label} data-anim="card" className={cls}>{inner}</div>
              );
            })}
          </div>

          <div data-anim-group="info-cards" className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div data-anim="card" className="bg-[#FFFAEF] p-8 rounded-[2rem] border border-[#F2E8D5]">
              <h3 className="font-playfair text-2xl text-gray-900 mb-3">Response Time</h3>
              <p className="text-gray-500 text-[14px] font-medium leading-relaxed">
                We aim to respond to all enquiries within 24 hours during regular business days.
              </p>
            </div>
            <div data-anim="card" className="bg-[#FFFAEF] p-8 rounded-[2rem] border border-[#F2E8D5]">
              <h3 className="font-playfair text-2xl text-gray-900 mb-3">Secure &amp; Private</h3>
              <p className="text-gray-500 text-[14px] font-medium leading-relaxed">
                Your information is strictly confidential. We never share your details with third parties.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer data-anim-section="footer" className="relative w-full overflow-hidden text-white mt-0 z-30 rounded-t-[4rem] md:rounded-t-[6rem]">
        <div className="absolute inset-0 z-0">
          <Image src="/images/footer-bg.webp" alt="Morocco from airplane" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 pt-32 pb-10 flex flex-col">
          <div data-anim-group="footer-columns" className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div data-anim="card" className="col-span-1 md:col-span-5 flex flex-col">
              <div className="relative h-[80px] w-[260px] mb-6">
                <Image src="/images/footer-logo.webp" alt="Morocco Visa Service" fill className="object-contain object-left" />
              </div>
              <p className="text-white/70 text-[14px] leading-relaxed max-w-[320px]">
                Professional Morocco visa assistance for UK travellers. Clear guidance, careful document support and responsive communication.
              </p>
            </div>
            <div data-anim="card" className="col-span-1 md:col-span-2 flex flex-col">
              <h4 className="text-white font-bold text-[11px] tracking-[0.15em] uppercase mb-6">Quick Links</h4>
              <ul className="flex flex-col gap-4">
                <li><a href="/" className="text-white/70 hover:text-white text-[14px] transition">Home</a></li>
                <li><a href="/how-it-works" className="text-white/70 hover:text-white text-[14px] transition">How It Works</a></li>
                <li><a href="/about" className="text-white/70 hover:text-white text-[14px] transition">About Us</a></li>
              </ul>
            </div>
            <div data-anim="card" className="col-span-1 md:col-span-2 flex flex-col">
              <h4 className="text-white font-bold text-[11px] tracking-[0.15em] uppercase mb-6">Support</h4>
              <ul className="flex flex-col gap-4">
                <li><a href="/services" className="text-white/70 hover:text-white text-[14px] transition">Services</a></li>
                <li><a href="/faq" className="text-white/70 hover:text-white text-[14px] transition">FAQs</a></li>
                <li><a href="/contact" className="text-white font-bold text-[14px]">Contact</a></li>
              </ul>
            </div>
            <div data-anim="card" className="col-span-1 md:col-span-3 flex flex-col">
              <h4 className="text-white font-bold text-[11px] tracking-[0.15em] uppercase mb-6">Contact</h4>
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70 mt-0.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <a href="mailto:services@moroccovisaservice.com" className="text-white/70 text-[14px] hover:text-white transition">services@moroccovisaservice.com</a>
                </li>
                <li className="flex items-start gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70 mt-0.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <a href="tel:02036339033" className="text-white/70 text-[14px] hover:text-white transition">020 3633 9033</a>
                </li>
                <li className="flex items-start gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70 mt-0.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span className="text-white/70 text-[14px]">London, United Kingdom</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70 mt-0.5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span className="text-white/70 text-[14px]">Open 24/7, 365 days a year</span>
                </li>
              </ul>
            </div>
          </div>
          <div data-anim="fade-only" className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-[13px]">Designed & Developed with ❤️ by TSN &copy; 2026 Morocco Visa Service. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <ScrollAnimations />
    </div>
  );
}
