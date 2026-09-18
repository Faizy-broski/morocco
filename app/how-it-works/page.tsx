import Image from "next/image";
import ScrollAnimations from "../components/ScrollAnimations";
import MobileMenu from "../components/MobileMenu";

export default function HowItWorksPage() {
  return (
    <div className="relative bg-[#F9F9F7] min-h-screen selection:bg-brand-red selection:text-white">
      <ScrollAnimations />

      {/* Navigation Header */}
      <header data-anim-section="header" className="relative z-20 w-full pt-8 pb-4 px-6 md:px-12 flex items-center justify-between mx-auto max-w-[1400px]">
        <div className="flex-shrink-0">
          <a href="/">
            <Image src="/images/header-logo-transparent.png" alt="Morocco Visa Service" width={220} height={78} priority />
          </a>
        </div>
        
        <div className="hidden lg:flex items-center bg-gray-50/80 backdrop-blur-md border border-gray-200/60 rounded-full p-1.5 pl-8 shadow-sm">
          <nav className="flex items-center space-x-6 font-bold text-[14.5px] text-gray-700 mr-6">
            <a href="/" className="hover:text-brand-red transition">Home</a>
            <a href="/about" className="hover:text-brand-red transition">About Us</a>
            <a href="/services" className="hover:text-brand-red transition">Services</a>
            <a href="/how-it-works" className="bg-white text-brand-red font-bold px-4 py-2 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100">How It Works</a>
            <a href="/faq" className="hover:text-brand-red transition">FAQs</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="/contact" className="text-gray-900 font-bold text-[14.5px] px-2 hover:text-brand-red transition">
              Contact Us
            </a>
            <a href="/contact" className="bg-white text-brand-red px-5 py-2.5 rounded-full font-bold text-[13px] hover:bg-gray-50 transition shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 flex items-center gap-2 inline-flex">
              Apply for Visa <span className="text-lg leading-none">&rarr;</span></a>
          </div>
        </div>
        <MobileMenu active="/how-it-works" />
      </header>

      {/* FIXED CENTERPIECE (Desktop only) */}
      <div className="hidden lg:flex sticky top-0 h-screen w-full items-center justify-center overflow-hidden z-0">
        {/* Light subtle background */}
        <div className="absolute inset-0 opacity-40">
          <Image src="/images/Sahara dunes.svg" alt="Background" fill className="object-cover grayscale mix-blend-multiply" />
        </div>
        
        {/* Moroccan Arch Portal */}
        <div 
          className="relative w-[350px] lg:w-[450px] h-[550px] lg:h-[700px] overflow-hidden border border-gray-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
          style={{ borderRadius: '250px 250px 0 0' }}
        >
          <Image 
            src="/images/Detailed arches in a peaceful Moroccan riad.svg" 
            alt="Portal" 
            fill 
            className="object-cover"
          />
        </div>
      </div>

      {/* SCROLLING CONTENT */}
      <div className="relative z-10 w-full lg:-mt-[100vh]">
        
        {/* Title Screen */}
        <div className="py-12 sm:py-16 lg:py-0 lg:h-screen w-full flex flex-col items-center justify-center px-6 pointer-events-auto lg:pointer-events-none">
          <div className="bg-white/70 lg:bg-white/40 backdrop-blur-2xl p-8 sm:p-10 md:p-16 rounded-[2.5rem] border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.08)] flex flex-col items-center max-w-2xl text-center pointer-events-auto transition-transform hover:scale-[1.02] duration-500">
            <span data-anim="fade-up" className="text-brand-red font-bold text-[12px] md:text-[14px] tracking-[0.4em] uppercase mb-4 sm:mb-6 block">Our Process</span>
            <h1 data-anim="heading-clip-wipe" className="text-gray-900 text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-playfair tracking-wide text-center">
              How It Works
            </h1>
            <p data-anim="fade-up" className="text-gray-600 mt-6 sm:mt-8 max-w-md text-center text-sm md:text-base font-medium leading-relaxed">
              Scroll to explore our streamlined four-step journey to your Moroccan adventure.
            </p>

            {/* Arch Portal preview for Mobile */}
            <div 
              className="lg:hidden relative w-[220px] h-[300px] sm:w-[260px] sm:h-[350px] mt-8 overflow-hidden border border-gray-200 shadow-[0_15px_35px_rgba(0,0,0,0.08)]"
              style={{ borderRadius: '140px 140px 0 0' }}
            >
              <Image 
                src="/images/Detailed arches in a peaceful Moroccan riad.svg" 
                alt="Portal" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* The Steps Container */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-0 py-8 lg:py-0 lg:pb-40 flex flex-col gap-8 sm:gap-12 lg:gap-0">
          
          {/* STEP 01 */}
          <div className="lg:min-h-screen flex items-center justify-center lg:justify-start lg:px-12 xl:px-20">
            <div className="w-full lg:w-[420px] xl:w-[480px] bg-white/60 backdrop-blur-2xl p-8 sm:p-10 md:p-12 rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-transform hover:scale-[1.01] duration-300" data-anim="fade-up">
              <span className="text-brand-red font-bold text-sm md:text-lg tracking-[0.2em] mb-4 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-brand-red"></span> STEP 01
              </span>
              <h2 className="text-gray-900 font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6">Submit Details</h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                Fill out our beautifully designed, natural language application form. It takes less than 5 minutes and requires zero complex paperwork upfront. Your journey begins with a single click.
              </p>
            </div>
          </div>

          {/* STEP 02 */}
          <div className="lg:min-h-screen flex items-center justify-center lg:justify-end lg:px-12 xl:px-20">
            <div className="w-full lg:w-[420px] xl:w-[480px] bg-white/60 backdrop-blur-2xl p-8 sm:p-10 md:p-12 rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-transform hover:scale-[1.01] duration-300" data-anim="fade-up">
              <span className="text-brand-red font-bold text-sm md:text-lg tracking-[0.2em] mb-4 flex items-center gap-4 lg:flex-row-reverse">
                <span className="w-8 h-[1px] bg-brand-red"></span> STEP 02
              </span>
              <h2 className="text-gray-900 font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 lg:text-right">Verification</h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed font-medium lg:text-right">
                Our immigration specialists meticulously review every detail of your application. We cross-reference against all Kingdom of Morocco requirements to guarantee zero delays.
              </p>
            </div>
          </div>

          {/* STEP 03 */}
          <div className="lg:min-h-screen flex items-center justify-center lg:justify-start lg:px-12 xl:px-20">
            <div className="w-full lg:w-[420px] xl:w-[480px] bg-white/60 backdrop-blur-2xl p-8 sm:p-10 md:p-12 rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-transform hover:scale-[1.01] duration-300" data-anim="fade-up">
              <span className="text-brand-red font-bold text-sm md:text-lg tracking-[0.2em] mb-4 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-brand-red"></span> STEP 03
              </span>
              <h2 className="text-gray-900 font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6">Processing</h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                Your application is fast-tracked through our dedicated embassy channels. Sit back and relax while we handle the bureaucracy. You will receive real-time SMS and email updates at every milestone.
              </p>
            </div>
          </div>

          {/* STEP 04 */}
          <div className="lg:min-h-screen flex items-center justify-center lg:justify-end lg:px-12 xl:px-20">
            <div className="w-full lg:w-[420px] xl:w-[480px] bg-white/60 backdrop-blur-2xl p-8 sm:p-10 md:p-12 rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-transform hover:scale-[1.01] duration-300" data-anim="fade-up">
              <span className="text-brand-red font-bold text-sm md:text-lg tracking-[0.2em] mb-4 flex items-center gap-4 lg:flex-row-reverse">
                <span className="w-8 h-[1px] bg-brand-red"></span> STEP 04
              </span>
              <h2 className="text-gray-900 font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 lg:text-right">Visa Granted</h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed font-medium lg:text-right mb-6 sm:mb-10">
                Success! Your approved visa is securely delivered directly to your inbox. You are now fully prepared to experience the magic, culture, and beauty of Morocco.
              </p>
              <div className="flex lg:justify-end">
                <a href="/services" className="w-full sm:w-auto bg-brand-red text-white px-8 py-4 rounded-full font-bold text-[14px] tracking-wide hover:bg-[#8A2728] transition shadow-[0_4px_20px_rgba(163,49,50,0.4)] flex items-center justify-center gap-3">
                  Start Application <span>&rarr;</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer data-anim-section="footer" className="relative w-full rounded-t-[4rem] md:rounded-t-[6rem] overflow-hidden text-white mt-0">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image src="/images/footer-bg.png" alt="Morocco from airplane" fill className="object-cover" />
          {/* Subtle dark gradient overlay to ensure text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 pt-32 pb-10 flex flex-col">

          {/* Top CTA */}
          <div className="flex flex-col items-center text-center mb-24 md:mb-32">
            <p data-anim="fade-up" className="text-white/80 text-[10px] font-bold tracking-[0.25em] uppercase mb-4">Start Your Journey</p>
            <h2 data-anim="heading-split-up" className="font-playfair text-white text-[42px] sm:text-[56px] md:text-[76px] leading-[1.05] tracking-tight mb-8 md:mb-10 drop-shadow-lg">
              Ready to <span className="italic text-[#A33132]">Begin</span>?
            </h2>
            <div data-anim="fade-up" className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a href="/services" className="w-full sm:w-auto bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-sm tracking-wide flex justify-center items-center gap-2 hover:bg-gray-100 transition shadow-lg">
                Apply for Visa <span>&rarr;</span>
              </a>
              <a href="/contact" className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border border-white/50 text-white px-8 py-4 rounded-full font-bold text-sm tracking-wide hover:bg-white/20 transition shadow-lg text-center">
                Contact Us
              </a>
            </div>
          </div>

          {/* Bottom Grid */}
          <div data-anim-group="footer-columns" className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

            {/* Logo and Description */}
            <div data-anim="card" className="col-span-1 md:col-span-5 flex flex-col">
              <div className="relative h-[80px] w-[260px] mb-6">
                <Image src="/images/footer-logo.svg" alt="Morocco Visa Service" fill className="object-contain object-left" />
              </div>
              <p className="text-white/70 text-[14px] leading-relaxed max-w-[320px]">
                Professional Morocco visa assistance for UK travellers. Clear guidance, careful document support and responsive communication.
              </p>
            </div>

            {/* Quick Links */}
            <div data-anim="card" className="col-span-1 md:col-span-2 flex flex-col">
              <h4 className="text-white font-bold text-[11px] tracking-[0.15em] uppercase mb-6">Quick Links</h4>
              <ul className="flex flex-col gap-4">
                <li><a href="/" className="text-white/70 hover:text-white text-[14px] transition">Home</a></li>
                <li><a href="/how-it-works" className="text-white font-bold text-[14px]">How It Works</a></li>
                <li><a href="/about" className="text-white/70 hover:text-white text-[14px] transition">About Us</a></li>
              </ul>
            </div>

            {/* Support */}
            <div data-anim="card" className="col-span-1 md:col-span-2 flex flex-col">
              <h4 className="text-white font-bold text-[11px] tracking-[0.15em] uppercase mb-6">Support</h4>
              <ul className="flex flex-col gap-4">
                <li><a href="/services" className="text-white/70 hover:text-white text-[14px] transition">Services</a></li>
                <li><a href="/faq" className="text-white/70 hover:text-white text-[14px] transition">FAQs</a></li>
                <li><a href="/contact" className="text-white/70 hover:text-white text-[14px] transition">Contact</a></li>
              </ul>
            </div>

            {/* Contact */}
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

          {/* Bottom Bar */}
          <div data-anim="fade-only" className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-[13px]">
              &copy; 2026 Morocco Visa Service. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-gray-900 transition text-white">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-gray-900 transition text-white">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}