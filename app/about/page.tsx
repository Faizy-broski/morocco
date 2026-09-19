import Image from "next/image";
import ScrollAnimations from "../components/ScrollAnimations";
import MobileMenu from "../components/MobileMenu";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#F9F9F7]">
      {/* Background Hero Image */}
      <div data-anim="hero-bg" className="absolute top-0 left-0 right-0 h-[650px] z-0 overflow-hidden">
        <Image
          src="/images/Detailed arches in a peaceful Moroccan riad.webp"
          alt="Moroccan Riad"
          fill
          className="object-cover object-center opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-[#F9F9F7]"></div>
      </div>

      {/* Header */}
      <header data-anim-section="header" className="relative z-20 w-full pt-8 pb-4 px-6 md:px-12 flex items-center justify-between mx-auto max-w-[1400px]">
        {/* Logo */}
        <div data-anim="header-item" className="flex-shrink-0">
          <a href="/">
            <Image src="/images/header-logo-transparent.webp" alt="Morocco Visa Service" width={220} height={78} priority />
          </a>
        </div>
        {/* Navigation Pill */}
        <div data-anim="header-item" className="hidden lg:flex items-center bg-white/20 backdrop-blur-lg border border-white/30 rounded-full p-1.5 pl-8 shadow-sm">
          <nav className="flex items-center space-x-6 font-bold text-[14.5px] text-gray-700 mr-6 whitespace-nowrap">
            <a href="/" className="hover:text-brand-red transition">Home</a>
            <a href="/about" className="bg-white text-brand-red font-bold px-4 py-2 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100">About Us</a>
            <a href="/services" className="hover:text-brand-red transition">Services</a>
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
        <MobileMenu active="/about" />
      </header>

      {/* Hero Content */}
      <main data-anim-section="hero" className="relative z-10 flex-1 flex flex-col items-center pt-24 px-4 pb-20">
        <div data-anim="hero-badge" className="bg-white/95 backdrop-blur-sm px-5 py-2 rounded-full text-[11px] font-bold tracking-widest text-brand-red flex items-center gap-2 mb-8 shadow-sm uppercase">
          <span className="text-sm">🌟</span> WHO WE ARE
        </div>
        
        <h1 data-anim="hero-heading" className="font-playfair text-[#1a1a1a] max-w-4xl text-center text-[42px] sm:text-[56px] md:text-[72px] lg:text-[85px] leading-[1.05] font-medium drop-shadow-md">
          Your Trusted Partner for <span className="italic text-brand-red font-medium">Morocco</span>
        </h1>
        
        <p data-anim="hero-sub" className="mt-8 text-gray-800 max-w-[500px] text-center text-[16px] sm:text-[18px] leading-relaxed font-medium">
          We simplify the visa process, turning complex requirements into a seamless journey to the heart of North Africa.
        </p>
      </main>

      {/* Our Mission Section */}
      <section className="relative w-full bg-white pt-24 pb-24 px-6 md:px-12 overflow-hidden rounded-t-[3rem] md:rounded-t-[5rem] -mt-10 z-20 shadow-[0_-20px_40px_rgba(0,0,0,0.03)]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col">
            <p data-anim="fade-up" className="text-[#E76C53] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">Our Mission</p>
            <h2 data-anim="heading-split-up" className="font-playfair text-[#1a1a1a] text-[40px] md:text-[56px] leading-[1.05] mb-6">
              Making Travel <span className="italic text-brand-red">Effortless</span>
            </h2>
            <p data-anim="fade-up" className="text-gray-600 leading-relaxed font-medium text-[16px] mb-6">
              At Morocco Visa Service, our mission is to remove the barriers between you and your Moroccan adventure. We believe that applying for a visa shouldn't be a source of stress, confusion, or delay.
            </p>
            <p data-anim="fade-up" className="text-gray-600 leading-relaxed font-medium text-[16px]">
              By combining cutting-edge technology with dedicated human support, we ensure every application is reviewed meticulously and processed swiftly, giving you the peace of mind to focus on planning your trip.
            </p>
          </div>
          <div data-anim="clip-wipe-up" className="relative h-[500px] w-full rounded-[2rem] overflow-hidden shadow-2xl">
            <Image src="/images/Blue streets of Chefchaouen.webp" alt="Chefchaouen" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="relative w-full bg-[#F9F9F7] py-24 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto text-center mb-16">
          <p data-anim="fade-up" className="text-[#E76C53] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">What we stand for</p>
          <h2 data-anim="heading-blur-in" className="font-playfair text-[#1a1a1a] text-[40px] md:text-[56px] leading-[1.05]">
            Our Core <span className="italic text-brand-red">Values</span>
          </h2>
        </div>

        <div data-anim-group="values-cards" className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div data-anim="card" className="bg-white p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center group hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-[#FFF2F2] text-brand-red rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-4">Accuracy</h3>
            <p className="text-gray-500 font-medium text-[15px] leading-relaxed">
              We meticulously review every document and form, ensuring your application is flawless before submission.
            </p>
          </div>
          <div data-anim="card" className="bg-white p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center group hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-[#FFF2F2] text-brand-red rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-4">Speed</h3>
            <p className="text-gray-500 font-medium text-[15px] leading-relaxed">
              Time is of the essence. Our streamlined processes are designed to secure your visa in the shortest possible time.
            </p>
          </div>
          <div data-anim="card" className="bg-white p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center group hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-[#FFF2F2] text-brand-red rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-4">Empathy</h3>
            <p className="text-gray-500 font-medium text-[15px] leading-relaxed">
              We treat every traveler's journey as our own, providing dedicated human support whenever you need it.
            </p>
          </div>
        </div>
      </section>

      {/* Our Visa Services Section */}
      <section className="relative w-full bg-white py-24 px-6 md:px-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.03] pointer-events-none">
          <Image src="/images/plane.webp" alt="" fill className="object-contain" />
        </div>
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          <div className="lg:col-span-5 flex flex-col">
            <p data-anim="fade-up" className="text-[#E76C53] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">What we do</p>
            <h2 data-anim="heading-clip-wipe" className="font-playfair text-[#1a1a1a] text-[40px] md:text-[56px] leading-[1.05] mb-6">
              Our Visa <span className="italic text-brand-red">Services</span>
            </h2>
            <p data-anim="fade-up" className="text-gray-600 leading-relaxed font-medium text-[16px] mb-8">
              Whether you're traveling for leisure, business, or family, we offer tailored support for every visa category to ensure your application meets all Moroccan requirements.
            </p>
            <ul data-anim-group="services-list" className="flex flex-col gap-4">
              <li data-anim="card" className="flex items-center gap-4 bg-[#F9F9F7] p-4 rounded-xl border border-gray-100">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-red font-bold shadow-sm">01</div>
                <div>
                  <h4 className="font-bold text-gray-900 text-[15px]">Tourist Visa Processing</h4>
                  <p className="text-gray-500 text-[13px] font-medium">Fast-tracked applications for holidays.</p>
                </div>
              </li>
              <li data-anim="card" className="flex items-center gap-4 bg-[#F9F9F7] p-4 rounded-xl border border-gray-100">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-red font-bold shadow-sm">02</div>
                <div>
                  <h4 className="font-bold text-gray-900 text-[15px]">Business Visa Support</h4>
                  <p className="text-gray-500 text-[13px] font-medium">Dedicated handling for corporate travel.</p>
                </div>
              </li>
              <li data-anim="card" className="flex items-center gap-4 bg-[#F9F9F7] p-4 rounded-xl border border-gray-100">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-red font-bold shadow-sm">03</div>
                <div>
                  <h4 className="font-bold text-gray-900 text-[15px]">Document Verification</h4>
                  <p className="text-gray-500 text-[13px] font-medium">Pre-submission audits by our experts.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <div data-anim="slide-card" data-slide-x="40" className="relative h-[300px] md:h-[400px] rounded-[2rem] overflow-hidden mt-8">
              <Image src="/images/Moroccan destination.webp" alt="Service 1" fill className="object-cover" />
            </div>
            <div data-anim="slide-card" data-slide-x="40" className="relative h-[300px] md:h-[400px] rounded-[2rem] overflow-hidden">
              <Image src="/images/Moroccan destination (1).webp" alt="Service 2" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA & Footer Section */}
      <div className="w-full bg-white">
        <footer data-anim-section="footer" className="relative w-full rounded-t-[4rem] md:rounded-t-[6rem] overflow-hidden text-white mt-0">
        <div className="absolute inset-0 z-0">
          <Image src="/images/footer-bg.webp" alt="Morocco from airplane" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 pt-32 pb-10 flex flex-col">
          {/* Top CTA */}
          <div className="flex flex-col items-center text-center mb-24 md:mb-32">
            <p data-anim="fade-up" className="text-white/80 text-[10px] font-bold tracking-[0.25em] uppercase mb-4">Start Your Journey</p>
            <h2 data-anim="heading-slide-left" className="font-playfair text-white text-[42px] sm:text-[56px] md:text-[76px] leading-[1.05] tracking-tight mb-8 md:mb-10 drop-shadow-lg">
              Let's Make It<br />
              <span className="italic text-[#A33132]">Happen</span>
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
                <Image src="/images/footer-logo.webp" alt="Morocco Visa Service" fill className="object-contain object-left" />
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
                <li><a href="/how-it-works" className="text-white/70 hover:text-white text-[14px] transition">How It Works</a></li>
                <li><a href="/about" className="text-white font-bold text-[14px]">About Us</a></li>
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
            <p className="text-white/50 text-[13px]">Designed & Developed with ❤️ by TSN &copy; 2026 Morocco Visa Service. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>

      <ScrollAnimations />
    </div>
  );
}
