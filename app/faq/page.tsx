import Image from "next/image";
import ScrollAnimations from "../components/ScrollAnimations";
import FAQCategoryIndex from "../components/FAQCategoryIndex";
import MobileMenu from "../components/MobileMenu";

export default function FAQPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#FFFAEF]">
      <style>{`
        /* Custom Accordion Styles for Premium Look */
        details > summary {
          list-style: none;
        }
        details > summary::-webkit-details-marker {
          display: none;
        }
        
        details {
          transition: all 0.5s ease-in-out;
        }
        
        details[open] summary ~ * {
          animation: slideDown 0.4s ease-out forwards;
        }

        @keyframes slideDown {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* The Plus/Minus Icon animation */
        .faq-icon-line {
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        details[open] .faq-icon-line-vertical {
          transform: rotate(90deg);
        }
        details[open] .faq-icon-bg {
          background-color: #A33132;
          border-color: #A33132;
        }
        details[open] .faq-icon-line {
          stroke: white;
        }
      `}</style>

      {/* Header */}
      <header data-anim-section="header" className="relative z-50 w-full pt-8 pb-4 px-6 md:px-12 flex items-center justify-between mx-auto max-w-[1400px]">
        <div data-anim="header-item" className="flex-shrink-0">
          <a href="/">
            <Image src="/images/header-logo-transparent.webp" alt="Morocco Visa Service" width={220} height={78} priority />
          </a>
        </div>
        {/* Navigation Pill */}
        <div data-anim="header-item" className="hidden lg:flex items-center bg-white/20 backdrop-blur-lg border border-white/30 rounded-full p-1.5 pl-8 shadow-sm">
          <nav className="flex items-center space-x-6 font-bold text-[14.5px] text-gray-700 mr-6">
            <a href="/" className="hover:text-brand-red transition">Home</a>
            <a href="/about" className="hover:text-brand-red transition">About Us</a>
            <a href="/services" className="hover:text-brand-red transition">Services</a>
            <a href="/how-it-works" className="hover:text-brand-red transition">How It Works</a>
            <a href="/faq" className="bg-white text-brand-red font-bold px-4 py-2 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100">FAQs</a>
            <a href="/track" className="hover:text-brand-red transition">Track Enquiry</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="/contact" className="text-gray-900 font-bold text-[14.5px] px-2 hover:text-brand-red transition">
              Contact Us
            </a>
            <a href="/contact" className="bg-white text-brand-red px-5 py-2.5 rounded-full font-bold text-[13px] hover:bg-gray-50 transition shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 flex items-center gap-2 inline-flex">
              Apply for Visa <span className="text-lg leading-none">&rarr;</span></a>
          </div>
        </div>
        <MobileMenu active="/faq" />
      </header>

      {/* Ambient Floating Elements */}
      <div data-anim="ticket-float" className="absolute top-[30%] right-[2%] z-0 pointer-events-none opacity-30 mix-blend-multiply blur-[1px] hidden lg:block">
        <Image src="/images/ticket.svg" alt="" width={350} height={150} className="rotate-12" />
      </div>

      {/* Hero Section */}
      <main className="relative z-10 w-full pt-20 pb-20 px-6 md:px-12 overflow-hidden flex flex-col items-center justify-center min-h-[45vh]">
        {/* Giant Watermark Background */}
        <div data-anim="parallax-bg" data-parallax-speed="0.3" className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] opacity-[0.02] pointer-events-none mix-blend-multiply">
          <Image src="/images/flag.webp" alt="" fill className="object-contain" />
        </div>
        
        <p data-anim="fade-up" className="text-[#E76C53] text-[10px] md:text-[12px] font-bold tracking-[0.3em] uppercase mb-8 z-10">Knowledge Base</p>
        
        <h1 data-anim="heading-split-up" className="font-playfair text-[#1a1a1a] text-center text-[50px] sm:text-[70px] md:text-[90px] lg:text-[110px] leading-[0.95] tracking-tight max-w-[1000px] z-10">
          Clarity for Your <br />
          <span className="italic text-brand-red">Journey</span>
        </h1>
      </main>

      {/* Main FAQ Content */}
      <section className="relative w-full px-4 md:px-8 lg:px-12 pb-32">
        <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24 relative items-start">
          
          {/* Left Column - Sticky Index */}
          <FAQCategoryIndex />

          {/* Right Column - Premium Accordions */}
          <div className="lg:w-8/12 flex flex-col gap-6 relative z-20 w-full">
            
            {/* Category 01 */}
            <div id="category-01" className="mb-12 scroll-mt-32">
              <h4 data-anim="fade-up" className="lg:hidden text-brand-red font-bold text-[11px] tracking-widest uppercase mb-6">01. Application Process</h4>
              
              <details data-anim="slide-card" data-slide-x="40" className="group bg-white rounded-[2rem] shadow-[0_15px_40px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden mb-5 cursor-pointer hover:shadow-[0_20px_50px_rgb(0,0,0,0.06)] transition-shadow duration-300">
                <summary className="p-8 md:p-10 flex items-center justify-between outline-none select-none">
                  <h3 className="font-playfair text-2xl md:text-[30px] text-gray-900 pr-8 leading-snug">How long does the Morocco visa process take?</h3>
                  <div className="faq-icon-bg w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0 transition-colors duration-300 bg-gray-50">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="stroke-gray-900">
                      <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2.5" strokeLinecap="round" className="faq-icon-line"></line>
                      <line x1="12" y1="5" x2="12" y2="19" strokeWidth="2.5" strokeLinecap="round" className="faq-icon-line faq-icon-line-vertical"></line>
                    </svg>
                  </div>
                </summary>
                <div className="px-8 md:px-10 pb-10 text-gray-500 font-medium text-[15px] leading-relaxed max-w-[750px]">
                  Typically, our initial review of your documents takes 24-48 hours. Once submitted to the official authorities, the processing time can vary between 7 to 15 business days depending on your nationality and the type of visa. We highly recommend starting the process at least 3-4 weeks before your intended travel date.
                </div>
              </details>

              <details data-anim="slide-card" data-slide-x="40" className="group bg-white rounded-[2rem] shadow-[0_15px_40px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden mb-5 cursor-pointer hover:shadow-[0_20px_50px_rgb(0,0,0,0.06)] transition-shadow duration-300">
                <summary className="p-8 md:p-10 flex items-center justify-between outline-none select-none">
                  <h3 className="font-playfair text-2xl md:text-[30px] text-gray-900 pr-8 leading-snug">Do I need to book my flights before applying?</h3>
                  <div className="faq-icon-bg w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0 transition-colors duration-300 bg-gray-50">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="stroke-gray-900">
                      <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2.5" strokeLinecap="round" className="faq-icon-line"></line>
                      <line x1="12" y1="5" x2="12" y2="19" strokeWidth="2.5" strokeLinecap="round" className="faq-icon-line faq-icon-line-vertical"></line>
                    </svg>
                  </div>
                </summary>
                <div className="px-8 md:px-10 pb-10 text-gray-500 font-medium text-[15px] leading-relaxed max-w-[750px]">
                  No. In fact, we strongly advise against purchasing non-refundable flight tickets or accommodation before your visa is officially approved. You may provide a preliminary flight itinerary or reservation hold as part of your application.
                </div>
              </details>
            </div>

            {/* Category 02 */}
            <div id="category-02" className="mb-12 scroll-mt-32">
              <h4 data-anim="fade-up" className="lg:hidden text-[#E76C53] font-bold text-[11px] tracking-widest uppercase mb-6">02. Requirements</h4>
              
              <details data-anim="slide-card" data-slide-x="40" className="group bg-white rounded-[2rem] shadow-[0_15px_40px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden mb-5 cursor-pointer hover:shadow-[0_20px_50px_rgb(0,0,0,0.06)] transition-shadow duration-300">
                <summary className="p-8 md:p-10 flex items-center justify-between outline-none select-none">
                  <h3 className="font-playfair text-2xl md:text-[30px] text-gray-900 pr-8 leading-snug">Can I apply if my passport expires in 3 months?</h3>
                  <div className="faq-icon-bg w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0 transition-colors duration-300 bg-gray-50">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="stroke-gray-900">
                      <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2.5" strokeLinecap="round" className="faq-icon-line"></line>
                      <line x1="12" y1="5" x2="12" y2="19" strokeWidth="2.5" strokeLinecap="round" className="faq-icon-line faq-icon-line-vertical"></line>
                    </svg>
                  </div>
                </summary>
                <div className="px-8 md:px-10 pb-10 text-gray-500 font-medium text-[15px] leading-relaxed max-w-[750px]">
                  Unfortunately, no. Moroccan immigration authorities strictly require that your passport must be valid for at least <strong>six months</strong> beyond your date of entry into Morocco. You will need to renew your passport before initiating the visa process.
                </div>
              </details>

              <details data-anim="slide-card" data-slide-x="40" className="group bg-white rounded-[2rem] shadow-[0_15px_40px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden mb-5 cursor-pointer hover:shadow-[0_20px_50px_rgb(0,0,0,0.06)] transition-shadow duration-300">
                <summary className="p-8 md:p-10 flex items-center justify-between outline-none select-none">
                  <h3 className="font-playfair text-2xl md:text-[30px] text-gray-900 pr-8 leading-snug">What documents are required for a tourist visa?</h3>
                  <div className="faq-icon-bg w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0 transition-colors duration-300 bg-gray-50">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="stroke-gray-900">
                      <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2.5" strokeLinecap="round" className="faq-icon-line"></line>
                      <line x1="12" y1="5" x2="12" y2="19" strokeWidth="2.5" strokeLinecap="round" className="faq-icon-line faq-icon-line-vertical"></line>
                    </svg>
                  </div>
                </summary>
                <div className="px-8 md:px-10 pb-10 text-gray-500 font-medium text-[15px] leading-relaxed max-w-[750px]">
                  Generally, you will need a valid passport, recent passport-sized photographs, proof of legal residence in your current country, recent bank statements showing sufficient funds, and proof of accommodation in Morocco. Our team will provide you with a tailored, exact checklist based on your specific situation.
                </div>
              </details>
            </div>

            {/* Category 03 */}
            <div id="category-03" className="mb-12 scroll-mt-32">
              <h4 data-anim="fade-up" className="lg:hidden text-gray-500 font-bold text-[11px] tracking-widest uppercase mb-6">03. Post-Approval</h4>
              
              <details data-anim="slide-card" data-slide-x="40" className="group bg-white rounded-[2rem] shadow-[0_15px_40px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden mb-5 cursor-pointer hover:shadow-[0_20px_50px_rgb(0,0,0,0.06)] transition-shadow duration-300">
                <summary className="p-8 md:p-10 flex items-center justify-between outline-none select-none">
                  <h3 className="font-playfair text-2xl md:text-[30px] text-gray-900 pr-8 leading-snug">How will I receive my visa?</h3>
                  <div className="faq-icon-bg w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0 transition-colors duration-300 bg-gray-50">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="stroke-gray-900">
                      <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2.5" strokeLinecap="round" className="faq-icon-line"></line>
                      <line x1="12" y1="5" x2="12" y2="19" strokeWidth="2.5" strokeLinecap="round" className="faq-icon-line faq-icon-line-vertical"></line>
                    </svg>
                  </div>
                </summary>
                <div className="px-8 md:px-10 pb-10 text-gray-500 font-medium text-[15px] leading-relaxed max-w-[750px]">
                  If you are eligible for the eVisa program, it will be delivered directly to your email as a downloadable PDF document, which you must print and present at the border. If you require a traditional sticker visa, it will be affixed to your physical passport by the consulate.
                </div>
              </details>
            </div>

          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer data-anim-section="footer" className="relative w-full rounded-t-[4rem] md:rounded-t-[6rem] overflow-hidden text-white mt-0">
        <div className="absolute inset-0 z-0">
          <Image src="/images/footer-bg.webp" alt="Morocco from airplane" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 pt-32 pb-10 flex flex-col">
          <div className="flex flex-col items-center text-center mb-24 md:mb-32">
            <p data-anim="fade-up" className="text-white/80 text-[10px] font-bold tracking-[0.25em] uppercase mb-4">Start Your Journey</p>
            <h2 data-anim="heading-split-up" className="font-playfair text-white text-[42px] sm:text-[56px] md:text-[76px] leading-[1.05] tracking-tight mb-8 md:mb-10 drop-shadow-lg">
              Still Have <span className="italic text-[#A33132]">Questions?</span>
            </h2>
            <div data-anim="fade-up" className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a href="/services" className="w-full sm:w-auto bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-sm tracking-wide flex justify-center items-center gap-2 hover:bg-gray-100 transition shadow-lg">
                Contact Our Team <span>&rarr;</span>
              </a>
              <a href="/contact" className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border border-white/50 text-white px-8 py-4 rounded-full font-bold text-sm tracking-wide hover:bg-white/20 transition shadow-lg text-center">
                Apply for Visa
              </a>
            </div>
          </div>

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
                <li><a href="/faq" className="text-white font-bold text-[14px]">FAQs</a></li>
                <li><a href="/contact" className="text-white/70 hover:text-white text-[14px] transition">Contact</a></li>
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
            <p className="text-white/50 text-[13px]">Designed & Developed with ❤️ by TSN &copy; 2026 Morocco Visa Service. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <ScrollAnimations />
    </div>
  );
}
