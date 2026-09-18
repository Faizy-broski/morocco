import Image from "next/image";
import ScrollAnimations from "../components/ScrollAnimations";
import ContactBookingForm from "../components/ContactBookingForm";
import MobileMenu from "../components/MobileMenu";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#F9F9F7]">
      {/* Main Split Container */}
      <section className="relative w-full flex flex-col lg:flex-row min-h-screen">
        
        {/* Mobile Header (Hidden on LG) */}
        <header className="lg:hidden w-full pt-8 pb-4 px-6 flex items-center justify-between z-50 bg-[#F9F9F7] sticky top-0 border-b border-gray-100">
          <a href="/">
            <Image src="/images/header-logo-transparent.png" alt="Morocco Visa Service" width={160} height={57} priority />
          </a>
          <MobileMenu active="/contact" />
        </header>

        {/* LEFT COLUMN - matches right column's height, inner content stays pinned via sticky */}
        <div className="lg:w-5/12 relative overflow-hidden text-white rounded-b-[3rem] lg:rounded-b-none lg:rounded-r-[3rem] shadow-2xl min-h-[60vh] lg:min-h-0">
          {/* Background Image with Dark Red Overlay (covers the full stretched height) */}
          <div className="absolute inset-0 z-0">
            <Image src="/images/Detailed arches in a peaceful Moroccan riad.svg" alt="Riad" fill className="object-cover" />
            <div className="absolute inset-0 bg-[#5E1A1A]/90 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
          </div>

          {/* Sticky content: pinned to the viewport for as long as the right column scrolls */}
          <div className="relative z-10 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-between p-8 md:p-12 lg:p-16">
            {/* Top: Logo (Desktop only) */}
            <div className="hidden lg:block" data-anim="fade-up">
              <a href="/">
                <Image src="/images/footer-logo.svg" alt="Logo" width={200} height={60} />
              </a>
            </div>

            {/* Middle: Huge Typography */}
            <div className="my-auto lg:my-0 lg:mt-32">
              <p data-anim="fade-up" className="text-[#E5B3B3] font-bold text-[11px] tracking-[0.3em] uppercase mb-6">Get in Touch</p>
              <h1 data-anim="heading-clip-wipe" className="font-playfair text-[60px] md:text-[80px] lg:text-[100px] leading-[0.95] tracking-tight drop-shadow-lg">
                Let's <span className="italic">Talk</span><br />
                Morocco.
              </h1>
            </div>

            {/* Bottom: Contact Info */}
            <div className="mt-12 lg:mt-auto flex flex-col gap-6" data-anim="fade-up">
              <div className="flex flex-col gap-1">
                <span className="text-white/60 font-bold text-[10px] tracking-[0.2em] uppercase">Email Us</span>
                <a href="mailto:info@saudivisaservice.co.uk" className="text-xl md:text-2xl font-playfair hover:text-[#E5B3B3] transition-colors">
                  info@saudivisaservice.co.uk
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/60 font-bold text-[10px] tracking-[0.2em] uppercase">Call Us</span>
                <a href="tel:02036339033" className="text-xl md:text-2xl font-playfair hover:text-[#E5B3B3] transition-colors">
                  020 3633 9033
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/60 font-bold text-[10px] tracking-[0.2em] uppercase">Address</span>
                <span className="text-lg md:text-xl font-playfair">
                  London, United Kingdom
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/60 font-bold text-[10px] tracking-[0.2em] uppercase">Hours</span>
                <span className="text-lg md:text-xl font-playfair">
                  Open 24/7, 365 days a year
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - SCROLLING */}
        <div className="lg:w-7/12 flex flex-col bg-[#F9F9F7] relative z-20">
          
          {/* Desktop Navigation Pill */}
          <div className="hidden lg:flex items-center justify-end p-12 relative z-30" data-anim="fade-up">
            <div className="flex items-center bg-white/20 backdrop-blur-lg border border-white/30 rounded-full p-1.5 pl-8 shadow-sm">
              <nav className="flex items-center space-x-6 font-bold text-[14.5px] text-gray-700 mr-6">
                <a href="/" className="hover:text-brand-red transition">Home</a>
                <a href="/about" className="hover:text-brand-red transition">About Us</a>
                <a href="/services" className="hover:text-brand-red transition">Services</a>
                <a href="/how-it-works" className="hover:text-brand-red transition">How It Works</a>
                <a href="/faq" className="hover:text-brand-red transition">FAQs</a>
              </nav>
              <div className="flex items-center gap-2">
                <a href="/contact" className="text-brand-red font-bold text-[13px] px-2">
                  Contact Us
                </a>
                <a href="/contact" className="bg-white text-brand-red px-5 py-2.5 rounded-full font-bold text-[13px] hover:bg-gray-50 transition shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 flex items-center gap-2 inline-flex">
                  Apply for Visa <span className="text-lg leading-none">&rarr;</span></a>
              </div>
            </div>
          </div>

          {/* Form Container */}
          <div className="p-6 md:p-12 lg:p-20 flex-1 flex flex-col justify-center mt-10 lg:mt-0">
            
            <div className="mb-12 lg:mb-16">
              <h2 data-anim="heading-blur-in" className="font-playfair text-[#1a1a1a] text-[36px] md:text-[50px] leading-[1.1] mb-6">
                Tell us about your <span className="italic text-brand-red">travel plans</span>
              </h2>
              <p data-anim="fade-up" className="text-gray-500 font-medium text-[15px] leading-relaxed max-w-[500px]">
                Skip the traditional forms. Write us a quick note about your journey, and our experts will get back to you with exactly what you need.
              </p>
            </div>

            <ContactBookingForm />

            {/* Support Info Cards */}
            <div data-anim-group="info-cards" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div data-anim="card" className="bg-[#FFFAEF] p-8 rounded-[2rem] border border-[#F2E8D5] hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red mb-6">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <h4 className="font-playfair text-2xl text-gray-900 mb-3">Response Time</h4>
                <p className="text-gray-500 text-[14px] font-medium leading-relaxed">
                  We aim to respond to all enquiries within 24 hours during regular business days.
                </p>
              </div>
              <div data-anim="card" className="bg-[#FFFAEF] p-8 rounded-[2rem] border border-[#F2E8D5] hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red mb-6">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h4 className="font-playfair text-2xl text-gray-900 mb-3">Secure & Private</h4>
                <p className="text-gray-500 text-[14px] font-medium leading-relaxed">
                  Your information is strictly confidential. We never share your details with third parties.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer data-anim-section="footer" className="relative w-full overflow-hidden text-white mt-0 z-30 rounded-t-[4rem] md:rounded-t-[6rem]">
        <div className="absolute inset-0 z-0">
          <Image src="/images/footer-bg.png" alt="Morocco from airplane" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 pt-32 pb-10 flex flex-col">
          <div data-anim-group="footer-columns" className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div data-anim="card" className="col-span-1 md:col-span-5 flex flex-col">
              <div className="relative h-[80px] w-[260px] mb-6">
                <Image src="/images/footer-logo.svg" alt="Morocco Visa Service" fill className="object-contain object-left" />
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
                  <a href="mailto:info@saudivisaservice.co.uk" className="text-white/70 text-[14px] hover:text-white transition">info@saudivisaservice.co.uk</a>
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
            <p className="text-white/50 text-[13px]">&copy; 2026 Morocco Visa Service. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <ScrollAnimations />
    </div>
  );
}
