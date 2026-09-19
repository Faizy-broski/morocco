import Image from "next/image";
import ScrollAnimations from "../components/ScrollAnimations";
import MobileMenu from "../components/MobileMenu";

export default function VisaTypesPage() {
  const visas = [
    {
      id: "01",
      title: "Tourist Visa",
      desc: "Experience the vibrant souks, majestic mountains, and golden dunes. Perfect for explorers, holidaymakers, and those seeking the magic of Morocco.",
      image: "/images/Blue streets of Chefchaouen.webp",
      color: "bg-white", // Deep Blue
      textColor: "text-gray-900"
    },
    {
      id: "02",
      title: "Business Visa",
      desc: "Fast-track processing for corporate travelers. Attend conferences, meetings, and explore investment opportunities with zero friction.",
      image: "/images/Marrakech architecture.webp",
      color: "bg-[#F9F9F7]", // Dark Red
      textColor: "text-gray-900"
    },
    {
      id: "03",
      title: "Student Visa",
      desc: "Embark on an educational journey in one of North Africa's most culturally rich nations. We streamline your study documentation.",
      image: "/images/Moroccan destination (1).webp",
      color: "bg-[#F9F9F7]", // Cream
      textColor: "text-gray-900"
    },
    {
      id: "04",
      title: "Transit Visa",
      desc: "Passing through? Ensure a seamless layover experience with our rapid transit visa service.",
      image: "/images/Blue streets of Chefchaouen.webp",
      color: "bg-[#F2F2F0]", // Black
      textColor: "text-gray-900"
    }
  ];

  return (
    <div className="relative bg-[#F9F9F7]">
      <ScrollAnimations />

      {/* Header (Absolute/Sticky at top of page) */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <header data-anim-section="header" className="relative w-full pt-8 pb-4 px-6 md:px-12 flex items-center justify-between mx-auto max-w-[1400px]">
          <div data-anim="header-item" className="flex-shrink-0">
            <a href="/">
              <Image src="/images/header-logo-transparent.webp" alt="Morocco Visa Service" width={220} height={78} priority />
            </a>
          </div>
          
          <div data-anim="header-item" className="hidden lg:flex items-center bg-gray-50/80 backdrop-blur-md border border-gray-200/60 rounded-full p-1.5 pl-8 shadow-sm">
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
      </div>

      {/* Sticky Stacking Sections */}
      <div className="relative w-full">
        {visas.map((visa, index) => (
          <section 
            key={visa.id} 
            className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
            style={{ zIndex: index + 10 }}
          >
            {/* Split Screen Layout inside the sticky section */}
            <div className={`absolute inset-0 flex flex-col md:flex-row ${visa.color}`}>
              
              {/* Left Content */}
              <div className="w-full md:w-1/2 h-full p-8 md:p-20 flex flex-col justify-center relative z-20">
                <div data-anim-section="hero" className="max-w-xl">
                  <span data-anim="fade-up" className={`font-bold text-[12px] tracking-[0.3em] uppercase mb-6 block opacity-60 ${visa.textColor}`}>
                    {visa.id} &mdash; Category
                  </span>
                  <h1 data-anim="heading-clip-wipe" className={`font-playfair text-6xl md:text-7xl lg:text-8xl mb-8 ${visa.textColor}`}>
                    {visa.title}
                  </h1>
                  <p data-anim="fade-up" className={`text-lg md:text-xl leading-relaxed mb-12 opacity-80 ${visa.textColor}`}>
                    {visa.desc}
                  </p>
                  
                  <div data-anim="fade-up">
                    <a href="/contact" className={`group relative px-8 py-4 rounded-full font-bold text-[13px] tracking-widest uppercase overflow-hidden transition-all ${visa.textColor === 'text-white' ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-brand-red text-white hover:bg-[#8A2728]'}`}>
                      <span className="relative z-10 flex items-center gap-3">
                        Apply Now <span className="text-xl leading-none transform group-hover:translate-x-1 transition-transform">&rarr;</span></span></a>
                  </div>
                </div>
              </div>

              {/* Right Image */}
              <div className="w-full md:w-1/2 h-full relative">
                <div className="absolute inset-0 bg-black/20 z-10"></div>
                <Image 
                  src={visa.image}
                  alt={visa.title}
                  fill
                  className="object-cover object-center"
                  priority={index === 0}
                />
              </div>

            </div>
          </section>
        ))}
        {/* Spacer to allow the last section to remain sticky while the footer slides up over it */}
        <div className="h-screen w-full pointer-events-none"></div>
      </div>

      {/* Footer placed at the end, will scroll up over the last sticky section */}
      <footer className="relative z-50 bg-[#141414] pt-24 pb-12 border-t border-white/10" data-anim-section="footer">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-20">
            <div data-anim="card" className="col-span-1 md:col-span-4 flex flex-col gap-6">
              <a href="/">
                <Image src="/images/footer-logo.webp" alt="Morocco Visa Service" width={200} height={60} />
              </a>
              <p className="text-white/60 text-[14px] leading-relaxed max-w-sm mt-4">
                We simplify the visa process, turning complex requirements into a seamless journey to the heart of North Africa.
              </p>
            </div>
            
            {/* Quick Links */}
            <div data-anim="card" className="col-span-1 md:col-span-2 flex flex-col">
              <h4 className="text-white font-bold text-[11px] tracking-[0.15em] uppercase mb-6">Quick Links</h4>
              <ul className="flex flex-col gap-4">
                <li><a href="/" className="text-white/70 hover:text-white text-[14px] transition">Home</a></li>
                <li><a href="/how-it-works" className="text-white/70 hover:text-white text-[14px] transition">How It Works</a></li>
                <li><a href="/about" className="text-white/70 hover:text-white text-[14px] transition">About Us</a></li>
              </ul>
            </div>
            
            {/* Support */}
            <div data-anim="card" className="col-span-1 md:col-span-2 flex flex-col">
              <h4 className="text-white font-bold text-[11px] tracking-[0.15em] uppercase mb-6">Support</h4>
              <ul className="flex flex-col gap-4">
                <li><a href="/services" className="text-white font-bold text-[14px]">Services</a></li>
                <li><a href="/faq" className="text-white/70 hover:text-white text-[14px] transition">FAQs</a></li>
                <li><a href="/contact" className="text-white/70 hover:text-white text-[14px] transition">Contact</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div data-anim="card" className="col-span-1 md:col-span-4 flex flex-col">
              <h4 className="text-white font-bold text-[11px] tracking-[0.15em] uppercase mb-6">Contact</h4>
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70 mt-0.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  <a href="mailto:info@saudivisaservice.co.uk" className="text-white/70 text-[14px] hover:text-white transition">info@saudivisaservice.co.uk</a>
                </li>
                <li className="flex items-start gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70 mt-0.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  <a href="tel:02036339033" className="text-white/70 text-[14px] hover:text-white transition">020 3633 9033</a>
                </li>
                <li className="flex items-start gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70 mt-0.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <span className="text-white/70 text-[14px]">London, United Kingdom</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70 mt-0.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  <span className="text-white/70 text-[14px]">Open 24/7, 365 days a year</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-[12px]">Designed & Developed with ❤️ by TSN 
              &copy; {new Date().getFullYear()} Morocco Visa Service. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-white/40 hover:text-white text-[12px] transition">Privacy Policy</a>
              <a href="#" className="text-white/40 hover:text-white text-[12px] transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}