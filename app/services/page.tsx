import Image from "next/image";
import ScrollAnimations from "../components/ScrollAnimations";
import MobileMenu from "../components/MobileMenu";

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#F9F9F7]">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrolldown {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
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
          <nav className="flex items-center space-x-6 font-bold text-[14.5px] text-gray-700 mr-6 whitespace-nowrap">
            <a href="/" className="hover:text-brand-red transition">Home</a>
            <a href="/about" className="hover:text-brand-red transition">About Us</a>
            <a href="/services" className="bg-white text-brand-red font-bold px-4 py-2 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100">Services</a>
            <a href="/how-it-works" className="hover:text-brand-red transition">How It Works</a>
            <a href="/faq" className="hover:text-brand-red transition">FAQs</a>
            <a href="/track" className="hover:text-brand-red transition">Track</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="/contact" className="text-gray-900 font-bold text-[14.5px] px-2 hover:text-brand-red transition">
              Contact Us
            </a>
            <a href="/contact" className="bg-white text-brand-red px-5 py-2.5 rounded-full font-bold text-[13px] hover:bg-gray-50 transition shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 flex items-center gap-2 inline-flex">
              Apply for Visa <span className="text-lg leading-none">&rarr;</span></a>
          </div>
        </div>
        <MobileMenu active="/services" />
      </header>

      {/* Hero Section */}
      <main className="relative z-10 w-full pt-20 pb-32 px-6 md:px-12 overflow-hidden flex flex-col items-center justify-center min-h-[50vh] md:min-h-[60vh]">
        <div className="absolute top-[10%] right-[-10%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-[#E76C53]/5 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#A33132]/5 rounded-full blur-[80px] pointer-events-none"></div>
        
        <p data-anim="fade-up" className="text-[#E76C53] text-[10px] md:text-[12px] font-bold tracking-[0.3em] uppercase mb-8 z-10">Beyond Boundaries</p>
        
        <h1 data-anim="heading-clip-wipe" className="font-playfair text-[#1a1a1a] text-center text-[50px] sm:text-[70px] md:text-[100px] lg:text-[130px] leading-[0.9] tracking-tight max-w-[1200px] z-10">
          Tailored <span className="italic text-brand-red">Pathways</span><br />
          to Morocco
        </h1>
      </main>

      {/* Sticky Scroll Services Section */}
      <section className="relative w-full px-4 md:px-8 lg:px-12 pb-24 md:pb-40">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24 relative items-start">
          
          {/* Left Column - Sticky Typography */}
          <div className="lg:w-5/12 lg:sticky lg:top-[20vh] z-10 h-auto flex flex-col justify-center py-4 lg:py-0">
            <h2 data-anim="heading-blur-in" className="font-playfair text-[#1a1a1a] text-[36px] md:text-[56px] leading-[1.05] mb-6">
              Expertise for Every <span className="italic text-[#E76C53]">Journey</span>
            </h2>
            <p data-anim="fade-up" className="text-gray-500 font-medium text-[15px] md:text-[17px] leading-relaxed max-w-[400px] mb-12">
              Whether you're exploring the medinas, attending a business summit, or reuniting with loved ones, our specialized visa services ensure your paperwork is the last thing on your mind.
            </p>
            
            {/* Scroll Indicator */}
            <div data-anim="fade-up" className="hidden lg:flex items-center gap-4 opacity-70">
              <div className="w-[1px] h-[60px] bg-gradient-to-b from-brand-red to-transparent relative overflow-hidden">
                <div className="w-full h-[15px] bg-brand-red absolute top-0 animate-[scrolldown_1.5s_ease-in-out_infinite]"></div>
              </div>
              <span className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase origin-left rotate-90 translate-y-6">Scroll</span>
            </div>
          </div>

          {/* Right Column - Stacking Cards */}
          <div className="w-full lg:w-7/12 flex flex-col pb-[25vh] relative z-20">
            
            {/* Card 1: Tourist */}
            <div className="sticky top-[6vh] lg:top-[12vh] w-full bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgb(0,0,0,0.04)] overflow-hidden border border-gray-100 flex flex-col md:flex-row min-h-[420px] mb-[25vh] lg:mb-[35vh] transition-transform duration-500 hover:scale-[1.02]">
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between relative bg-white z-10">
                <div>
                  <span className="text-brand-red font-bold text-[10px] tracking-[0.2em] uppercase mb-4 block">01 / Leisure</span>
                  <h3 className="font-playfair text-3xl md:text-4xl text-[#1a1a1a] mb-4">Tourist Visa</h3>
                  <p className="text-gray-500 text-[14px] md:text-[15px] leading-relaxed font-medium mb-8">
                    Designed for explorers and holidaymakers. We handle the intricacies of your application so you can focus on planning your itinerary through the souks and the Sahara.
                  </p>
                </div>
                <a href="/contact" className="self-start group flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-brand-red group-hover:border-brand-red group-hover:text-white transition-all duration-300">
                    <span className="text-lg leading-none">&rarr;</span>
                  </div>
                  <span className="font-bold text-[10px] tracking-widest uppercase text-gray-900 group-hover:text-brand-red transition-colors">Apply Now</span>
                </a>
              </div>
              <div className="w-full md:w-1/2 relative min-h-[250px] md:min-h-full">
                <Image src="/images/Marrakech architecture.webp" alt="Tourist" fill className="object-cover" />
              </div>
            </div>

            {/* Card 2: Business */}
            <div className="sticky top-[10vh] lg:top-[18vh] w-full bg-[#1a1a1a] text-white rounded-[2.5rem] shadow-[0_30px_60px_rgb(0,0,0,0.15)] overflow-hidden flex flex-col md:flex-row min-h-[420px] mb-[25vh] lg:mb-[35vh] transition-transform duration-500 hover:scale-[1.02]">
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between relative z-10">
                <div>
                  <span className="text-[#E76C53] font-bold text-[10px] tracking-[0.2em] uppercase mb-4 block">02 / Corporate</span>
                  <h3 className="font-playfair text-3xl md:text-4xl text-white mb-4">Business Visa</h3>
                  <p className="text-gray-400 text-[14px] md:text-[15px] leading-relaxed font-medium mb-8">
                    Time is money. Our fast-track business service ensures your corporate travel documentation is processed with priority, accuracy, and absolute confidentiality.
                  </p>
                </div>
                <a href="/contact" className="self-start group flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-white group-hover:bg-[#E76C53] group-hover:border-[#E76C53] transition-all duration-300">
                    <span className="text-lg leading-none">&rarr;</span>
                  </div>
                  <span className="font-bold text-[10px] tracking-widest uppercase text-white group-hover:text-[#E76C53] transition-colors">Apply Now</span>
                </a>
              </div>
              <div className="w-full md:w-1/2 relative min-h-[250px] md:min-h-full">
                <Image src="/images/Moroccan destination (1).webp" alt="Business" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/30 mix-blend-multiply"></div>
              </div>
            </div>

            {/* Card 3: Visit */}
            <div className="sticky top-[14vh] lg:top-[24vh] w-full bg-[#5E1A1A] text-white rounded-[2.5rem] shadow-[0_40px_70px_rgb(0,0,0,0.2)] overflow-hidden flex flex-col md:flex-row min-h-[420px] mb-[25vh] lg:mb-[35vh] transition-transform duration-500 hover:scale-[1.02]">
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between relative z-10">
                <div>
                  <span className="text-[#E5B3B3] font-bold text-[10px] tracking-[0.2em] uppercase mb-4 block">03 / Personal</span>
                  <h3 className="font-playfair text-3xl md:text-4xl text-white mb-4">Visit Visa</h3>
                  <p className="text-white/80 text-[14px] md:text-[15px] leading-relaxed font-medium mb-8">
                    Reuniting with friends and family shouldn't be stressful. We provide careful, empathetic support to help you compile the right invitations and supporting documents.
                  </p>
                </div>
                <a href="/contact" className="self-start group flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-white group-hover:border-white group-hover:text-[#5E1A1A] transition-all duration-300">
                    <span className="text-lg leading-none">&rarr;</span>
                  </div>
                  <span className="font-bold text-[10px] tracking-widest uppercase text-white transition-colors">Apply Now</span></a>
              </div>
              <div className="w-full md:w-1/2 relative min-h-[250px] md:min-h-full">
                <Image src="/images/Moroccan destination (2).webp" alt="Visit" fill className="object-cover" />
                <div className="absolute inset-0 bg-[#5E1A1A]/30 mix-blend-multiply"></div>
              </div>
            </div>

            {/* Card 4: Transit */}
            <div className="sticky top-[18vh] lg:top-[30vh] w-full bg-[#0B4A5D] text-white rounded-[2.5rem] shadow-[0_50px_80px_rgb(0,0,0,0.25)] overflow-hidden flex flex-col md:flex-row min-h-[420px] transition-transform duration-500 hover:scale-[1.02]">
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between relative z-10">
                <div>
                  <span className="text-[#A2C7D4] font-bold text-[10px] tracking-[0.2em] uppercase mb-4 block">04 / Journey</span>
                  <h3 className="font-playfair text-3xl md:text-4xl text-white mb-4">Transit Visa</h3>
                  <p className="text-white/80 text-[14px] md:text-[15px] leading-relaxed font-medium mb-8">
                    Passing through the Kingdom? Ensure a seamless layover experience with our rapid transit visa service, letting you step out and explore instantly.
                  </p>
                </div>
                <a href="/contact" className="self-start group flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-white group-hover:border-white group-hover:text-[#0B4A5D] transition-all duration-300">
                    <span className="text-lg leading-none">&rarr;</span>
                  </div>
                  <span className="font-bold text-[10px] tracking-widest uppercase text-white transition-colors">Apply Now</span></a>
              </div>
              <div className="w-full md:w-1/2 relative min-h-[250px] md:min-h-full">
                <Image src="/images/Blue streets of Chefchaouen.webp" alt="Transit" fill className="object-cover" />
                <div className="absolute inset-0 bg-[#0B4A5D]/40 mix-blend-multiply"></div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Aesthetic Marquee Divider */}
      <section className="w-full bg-[#A33132] py-10 md:py-16 overflow-hidden flex flex-col justify-center shadow-inner">
        <div className="flex w-[200%] overflow-hidden relative">
          <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite] items-center gap-8" style={{ width: '200%' }}>
             <h2 className="font-playfair text-transparent text-[60px] md:text-[100px] uppercase font-bold tracking-wider" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.4)' }}>
               FAST TRACK &nbsp;&bull;&nbsp; NO HASSLE &nbsp;&bull;&nbsp; EXPERT REVIEW &nbsp;&bull;&nbsp; FAST TRACK &nbsp;&bull;&nbsp; NO HASSLE &nbsp;&bull;&nbsp; EXPERT REVIEW &nbsp;&bull;&nbsp;
             </h2>
          </div>
        </div>
      </section>

      {/* CTA & Footer */}
      <footer data-anim-section="footer" className="relative w-full rounded-t-[4rem] md:rounded-t-[6rem] overflow-hidden text-white mt-0">
        <div className="absolute inset-0 z-0">
          <Image src="/images/footer-bg.webp" alt="Morocco from airplane" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 pt-32 pb-10 flex flex-col">
          <div className="flex flex-col items-center text-center mb-24 md:mb-32">
            <p data-anim="fade-up" className="text-white/80 text-[10px] font-bold tracking-[0.25em] uppercase mb-4">Start Your Journey</p>
            <h2 data-anim="heading-split-up" className="font-playfair text-white text-[42px] sm:text-[56px] md:text-[76px] leading-[1.05] tracking-tight mb-8 md:mb-10 drop-shadow-lg">
              Ready to <span className="italic text-[#A33132]">Begin?</span>
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
                <li><a href="/services" className="text-white font-bold text-[14px]">Services</a></li>
                <li><a href="/faq" className="text-white/70 hover:text-white text-[14px] transition">FAQs</a></li>
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
