import Image from "next/image";
import ScrollAnimations from "./components/ScrollAnimations";
import FAQAccordion from "./components/FAQAccordion";
import DocumentsAccordion from "./components/DocumentsAccordion";
import BookingEnquiryForm from "./components/BookingEnquiryForm";
import MobileMenu from "./components/MobileMenu";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#F9F9F7]">
      {/* Background Hero Image */}
      <div data-anim="hero-bg" className="absolute top-0 left-0 right-0 h-[850px] z-0 overflow-hidden">
        <Image
          src="/images/hero.webp"
          alt="Hero Background"
          fill
          className="object-cover object-top opacity-90"
          priority
        />
      </div>

      {/* Header */}
      <header data-anim-section="header" className="relative z-20 w-full pt-8 pb-4 px-6 md:px-12 flex items-center justify-between mx-auto max-w-[1400px]">
        {/* Logo */}
        <div data-anim="header-item" className="flex-shrink-0">
          <a href="/">
            <Image src="/images/header-logo-transparent.png" alt="Morocco Visa Service" width={220} height={78} priority />
          </a>
        </div>
        {/* Navigation Pill */}
        <div data-anim="header-item" className="hidden lg:flex items-center bg-white/20 backdrop-blur-lg border border-white/30 rounded-full p-1.5 pl-8 shadow-sm">
          <nav className="flex items-center space-x-6 font-bold text-[14.5px] text-gray-700 mr-6">
            <a href="/" className="bg-white text-brand-red font-bold px-4 py-2 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100">Home</a>
            <a href="/about" className="hover:text-brand-red transition">About Us</a>
            <a href="/services" className="hover:text-brand-red transition">Services</a>
            <a href="/how-it-works" className="hover:text-brand-red transition">How It Works</a>
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
        <MobileMenu active="/" />
      </header>

      {/* Hero Content */}
      <main data-anim-section="hero" className="relative z-10 flex-1 flex flex-col items-center pt-20 px-4">
        {/* Badge */}
        <div data-anim="hero-badge" className="bg-white/95 backdrop-blur-sm px-5 py-2 rounded-full text-[11px] font-bold tracking-widest text-brand-red flex items-center gap-2 mb-8 shadow-sm uppercase">
          <span className="text-sm">✈️</span> TRUSTED VISA ASSISTANCE • CLEAR GUIDANCE • DEDICATED SUPPORT
        </div>

        {/* Heading */}
        <h1
          data-anim="hero-heading"
          className="font-playfair text-[#1a1a1a] max-w-[1000px] text-center text-[36px] min-[400px]:text-[42px] sm:text-[56px] md:text-[68px] lg:text-[85.42px] leading-[1.1] lg:leading-[78.39px] font-medium"
        >
          Your Journey to <span className="italic text-brand-red font-medium">Morocco</span> Starts Here
        </h1>

        {/* Subtitle */}
        <p data-anim="hero-sub" className="mt-8 text-gray-800 max-w-[320px] sm:max-w-2xl text-center text-[15px] sm:text-[17px] leading-relaxed font-medium">
          Professional Morocco visa assistance for UK travellers — simple guidance, accurate documents and dedicated support from application to approval.
        </p>

        {/* Buttons */}
        <div data-anim="hero-cta" className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <button className="bg-brand-red text-white px-8 py-4 rounded-full font-medium hover:bg-[#8A2728] transition flex items-center gap-2 shadow-lg text-[15px]">
            Start Your Application <span className="text-xl leading-none">&rarr;</span>
          </button>
          <button className="bg-white text-brand-red px-8 py-4 rounded-full font-medium hover:bg-gray-50 transition shadow-lg text-[15px]">
            Check Visa Requirements
          </button>
        </div>
      </main>

      {/* Ticket SVG (floating to the right) */}
      <div data-anim="ticket-float" className="absolute right-0 top-[550px] transform -translate-y-1/2 z-20 hidden xl:block pointer-events-none">
        <Image src="/images/ticket.svg" alt="Boarding Pass" width={380} height={180} className="object-contain drop-shadow-2xl" />
      </div>

      {/* Widget / Booking Enquiry */}
      <div className="relative z-30 w-full max-w-[1100px] mx-auto px-4 mt-28 mb-16">
        <BookingEnquiryForm />
      </div>

      {/* Bottom Stats */}
      <div data-anim-section="stats" className="relative z-10 w-full max-w-[1000px] mx-auto px-4 pb-24 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4 text-center divide-x divide-gray-200">
        <div className="flex flex-col items-center justify-center px-4">
          <div className="text-brand-red font-playfair text-[40px] font-medium mb-1"><span data-anim="count-up">10,000+</span></div>
          <div className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">Applications Assisted</div>
        </div>
        <div className="flex flex-col items-center justify-center px-4">
          <div className="text-brand-red font-playfair text-[40px] font-medium mb-1"><span data-anim="count-up">98%</span></div>
          <div className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">Customer Satisfaction</div>
        </div>
        <div className="flex flex-col items-center justify-center px-4 border-l-0 md:border-l border-gray-200">
          <div className="text-brand-red font-playfair text-[40px] font-medium mb-1">24-48 hrs</div>
          <div className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">Response Support</div>
        </div>
        <div className="flex flex-col items-center justify-center px-4">
          <div className="text-brand-red font-playfair text-[40px] font-medium mb-1 flex items-center justify-center gap-1">
            <span data-anim="count-up">5</span> <span className="text-3xl pb-1">★</span>
          </div>
          <div className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">Customer Service</div>
        </div>
      </div>

      {/* Destinations Section */}
      <section data-anim-section="destinations" className="relative w-full bg-white pt-24 pb-32 px-6 md:px-12 overflow-hidden shadow-[0_-20px_40px_rgba(0,0,0,0.015)] mt-[-20px]">
        {/* Background Flags */}
        <div data-anim="parallax-bg" data-parallax-speed="0.6" className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1600px] h-[800px] z-0 flex items-start justify-center pt-0 pointer-events-none opacity-60">
          <Image src="/images/flags.svg" alt="" fill className="object-contain object-top" />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto">
          {/* Top text area */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <p className="text-[#E76C53] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">The Land of Light</p>
              <h2 data-anim="heading-blur-in" className="font-playfair text-[#1a1a1a] text-[56px] md:text-[80px] leading-[1.05] tracking-tight">
                Morocco Is<br />
                <span className="italic text-[#A33132]">Waiting</span> For You
              </h2>
            </div>
            <div className="max-w-sm text-left md:text-right text-gray-500 font-medium leading-relaxed pb-4 text-[15px]">
              From blue mountain lanes to Atlantic horizons, your visa is the first step towards somewhere remarkable.
            </div>
          </div>

          {/* Mobile Image Stack (Hidden on Desktop) */}
          <div className="flex lg:hidden flex-col gap-6 mt-12 relative z-20">
            <div data-anim="clip-wipe-up" className="relative w-full h-[400px] rounded-tr-[4rem] overflow-hidden shadow-md">
              <Image src="/images/Marrakech architecture.svg" alt="Marrakech" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="font-playfair text-[32px] mb-1 tracking-wide">MARRAKECH</h3>
                <p className="text-[14px] text-gray-200">The red city</p>
              </div>
            </div>
            
            <div data-anim="clip-wipe-up" className="relative w-full h-[350px] rounded-tl-[4rem] overflow-hidden shadow-md">
              <Image src="/images/Moroccan destination.svg" alt="Chefchaouen" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="font-playfair text-[28px] mb-1 tracking-wide">CHEFCHAOUEN</h3>
                <p className="text-[14px] text-gray-200">Find your horizon</p>
              </div>
            </div>
            
            <div data-anim="clip-wipe-up" className="relative w-full h-[250px] rounded-tl-[3rem] rounded-br-[3rem] overflow-hidden shadow-xl border-4 border-white">
              <Image src="/images/Sahara dunes.svg" alt="Sahara" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-8 text-white">
                <h3 className="font-playfair text-[28px] mb-1 tracking-wide">SAHARA</h3>
                <p className="text-[14px] text-gray-200">Find your horizon</p>
              </div>
            </div>
            
            <div className="mt-4 flex flex-col items-center">
              <h4 className="text-brand-red font-bold tracking-widest text-[12px] mb-2 uppercase">6 Destinations</h4>
              <p className="text-gray-500 text-[14px] mb-6">one unforgettable country</p>
              <a href="/services" className="bg-brand-red text-white px-8 py-3.5 rounded-full font-medium hover:bg-[#8A2728] transition flex items-center justify-center gap-2 text-[14px] shadow-lg">
                View All <span className="text-xl leading-none">&rarr;</span>
              </a>
            </div>
          </div>

          {/* Desktop Exact Overlap Layout (Hidden on Mobile) */}
          <div className="hidden lg:block relative w-full h-[680px] mt-20 mb-10 z-20">
            {/* Marrakech (Left) */}
            <div data-anim="fade-up" className="absolute top-0 left-0 w-[45%] h-[520px] rounded-tr-[5rem] overflow-hidden z-10 group cursor-pointer shadow-md">
              <Image src="/images/Marrakech architecture.svg" alt="Marrakech" fill className="object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-10 left-10 text-white">
                <h3 className="font-playfair text-[38px] mb-1 tracking-wide">MARRAKECH</h3>
                <p className="text-[15px] font-medium text-gray-200">The red city</p>
              </div>
            </div>

            {/* Chefchaouen (Right) */}
            <div data-anim="fade-up" data-anim-delay="0.2" className="absolute top-0 right-0 w-[42%] h-[440px] rounded-tl-[5rem] overflow-hidden z-10 group cursor-pointer shadow-md">
              <Image src="/images/Moroccan destination.svg" alt="Chefchaouen" fill className="object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-10 left-10 text-white">
                <h3 className="font-playfair text-[32px] mb-1 tracking-wide">CHEFCHAOUEN</h3>
                <p className="text-[15px] font-medium text-gray-200">Find your horizon</p>
              </div>
            </div>

            {/* Sahara (Center Overlay) */}
            <div data-anim="scale-in" data-anim-delay="0.4" className="absolute bottom-0 right-[28%] w-[42%] h-[280px] rounded-tl-[4rem] rounded-br-[4rem] overflow-hidden z-20 group cursor-pointer shadow-2xl border-[6px] border-white">
              <Image src="/images/Sahara dunes.svg" alt="Sahara" fill className="object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-10 text-white">
                <h3 className="font-playfair text-[30px] mb-1 tracking-wide">SAHARA</h3>
                <p className="text-[14px] font-medium text-gray-200">Find your horizon</p>
              </div>
            </div>

            {/* Call to action (Bottom Right) */}
            <div data-anim="fade-up" data-anim-delay="0.6" className="absolute bottom-10 right-0 w-[24%] z-20 flex flex-col items-start pl-8">
              <h4 className="text-brand-red font-bold tracking-widest text-[12px] mb-2 uppercase">6 Destinations</h4>
              <p className="text-gray-500 font-medium mb-6 text-[14px] leading-relaxed max-w-[150px]">one unforgettable country</p>
              <a href="/services" className="bg-brand-red text-white px-8 py-3.5 rounded-full font-medium hover:bg-[#8A2728] transition flex items-center justify-center gap-2 text-[14px] shadow-lg">
                View All <span className="text-xl leading-none">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Which Morocco Visa Do You Need? Section */}
      <section data-anim-section="visa" className="relative w-full bg-[#FFFAEF] py-24 md:py-32 px-6 md:px-12">
        <div className="relative z-10 max-w-[1000px] mx-auto">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-16 md:mb-24">
            <h2 data-anim="heading-clip-wipe" className="font-playfair text-[#1a1a1a] text-[38px] sm:text-[48px] md:text-[64px] leading-[1.05] tracking-tight">
              Which Morocco Visa<br />
              <span className="italic text-[#A33132]">Do You Need?</span>
            </h2>
          </div>

          {/* Cards List with Sticky Stacking */}
          <div className="flex flex-col gap-6 lg:gap-0 relative z-20 pb-[25vh]">

            {/* Card 01 */}
            <div className="lg:sticky lg:top-[12vh] mb-6 lg:mb-[40vh] bg-white rounded-[2rem] p-8 md:px-10 md:py-8 shadow-[0_8px_40px_rgb(0,0,0,0.06)] relative overflow-hidden flex flex-col justify-between group transition-transform duration-500 hover:scale-[1.01]">
              <div className="border-b border-gray-100 pb-4 mb-6">
                <span className="text-brand-red font-bold tracking-widest">01</span>
              </div>
              
              <div className="absolute top-8 right-8 rotate-[-8deg] bg-brand-red text-white px-5 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase shadow-sm z-10">
                Tourist Visa
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8 relative z-10">
                <div className="flex-1">
                  <h3 className="font-playfair text-4xl text-[#1a1a1a] mb-2">TOURIST VISA</h3>
                  <p className="text-gray-500 font-medium text-[15px] mb-6">For holidays, discovery and time well spent.</p>
                  <a href="/services" className="text-brand-red font-bold text-xs tracking-wide flex items-center gap-1.5 uppercase hover:text-[#8A2728] transition">
                    View Requirements <span className="text-lg leading-none">&rarr;</span>
                  </a>
                </div>
                {/* Image Pill that Extends on Hover */}
                <div className="relative w-full md:w-[450px] group-hover:md:w-[600px] h-[110px] group-hover:h-[130px] rounded-full group-hover:rounded-3xl overflow-hidden flex-shrink-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-sm group-hover:shadow-2xl">
                  <Image src="/images/Moroccan destination.svg" alt="Tourist Visa" fill className="object-cover transition duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700"></div>
                </div>
              </div>

              <div className="w-full h-[6px] opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(to right, #9CA3AF, #9CA3AF 2px, transparent 2px, transparent 8px)' }}></div>
            </div>

            {/* Card 02 */}
            <div className="lg:sticky lg:top-[17vh] mb-6 lg:mb-[40vh] bg-white rounded-[2rem] p-8 md:px-10 md:py-8 shadow-[0_15px_50px_rgb(0,0,0,0.08)] border border-gray-50 relative overflow-hidden flex flex-col justify-between group transition-transform duration-500 hover:scale-[1.01]">
              <div className="border-b border-gray-100 pb-4 mb-6">
                <span className="text-brand-red font-bold tracking-widest">02</span>
              </div>
              
              <div className="absolute top-8 right-8 rotate-[-8deg] border-2 border-brand-red text-brand-red bg-white px-5 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase shadow-sm z-10">
                Business Visa
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8 relative z-10">
                <div className="flex-1">
                  <h3 className="font-playfair text-4xl text-[#1a1a1a] mb-2">BUSINESS VISA</h3>
                  <p className="text-gray-500 font-medium text-[15px] mb-6">For meetings, trade and new opportunities.</p>
                  <a href="/services" className="text-brand-red font-bold text-xs tracking-wide flex items-center gap-1.5 uppercase hover:text-[#8A2728] transition">
                    View Requirements <span className="text-lg leading-none">&rarr;</span>
                  </a>
                </div>
                <div className="relative w-full md:w-[450px] group-hover:md:w-[600px] h-[110px] group-hover:h-[130px] rounded-full group-hover:rounded-3xl overflow-hidden flex-shrink-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-sm group-hover:shadow-2xl">
                  <Image src="/images/Moroccan destination (1).svg" alt="Business Visa" fill className="object-cover transition duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700"></div>
                </div>
              </div>

              <div className="w-full h-[6px] opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(to right, #9CA3AF, #9CA3AF 2px, transparent 2px, transparent 8px)' }}></div>
            </div>

            {/* Card 03 */}
            <div className="lg:sticky lg:top-[22vh] mb-6 lg:mb-[40vh] bg-white rounded-[2rem] p-8 md:px-10 md:py-8 shadow-[0_20px_60px_rgb(0,0,0,0.1)] border border-gray-50 relative overflow-hidden flex flex-col justify-between group transition-transform duration-500 hover:scale-[1.01]">
              <div className="border-b border-gray-100 pb-4 mb-6">
                <span className="text-brand-red font-bold tracking-widest">03</span>
              </div>
              
              <div className="absolute top-8 right-8 rotate-[-8deg] border-2 border-brand-red text-brand-red bg-white px-5 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase shadow-sm z-10">
                Visit Visa
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8 relative z-10">
                <div className="flex-1">
                  <h3 className="font-playfair text-4xl text-[#1a1a1a] mb-2">VISIT VISA</h3>
                  <p className="text-gray-500 font-medium text-[15px] mb-6">For reconnecting with family and friends.</p>
                  <a href="/services" className="text-brand-red font-bold text-xs tracking-wide flex items-center gap-1.5 uppercase hover:text-[#8A2728] transition">
                    View Requirements <span className="text-lg leading-none">&rarr;</span>
                  </a>
                </div>
                <div className="relative w-full md:w-[450px] group-hover:md:w-[600px] h-[110px] group-hover:h-[130px] rounded-full group-hover:rounded-3xl overflow-hidden flex-shrink-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-sm group-hover:shadow-2xl">
                  <Image src="/images/Moroccan destination (2).svg" alt="Visit Visa" fill className="object-cover transition duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700"></div>
                </div>
              </div>

              <div className="w-full h-[6px] opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(to right, #9CA3AF, #9CA3AF 2px, transparent 2px, transparent 8px)' }}></div>
            </div>

            {/* Card 04 (Transit) */}
            <div className="lg:sticky lg:top-[27vh] bg-white rounded-[2rem] p-8 md:px-10 md:py-8 shadow-[0_25px_70px_rgb(0,0,0,0.12)] border border-gray-50 relative overflow-hidden flex flex-col justify-between group transition-transform duration-500 hover:scale-[1.01]">
              <div className="border-b border-gray-100 pb-4 mb-6">
                <span className="text-brand-red font-bold tracking-widest">04</span>
              </div>
              
              <div className="absolute top-8 right-8 rotate-[-8deg] bg-[#1a1a1a] text-white px-5 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase shadow-sm z-10">
                Transit Visa
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8 relative z-10">
                <div className="flex-1">
                  <h3 className="font-playfair text-4xl text-[#1a1a1a] mb-2">TRANSIT VISA</h3>
                  <p className="text-gray-500 font-medium text-[15px] mb-6">Passing through? Make the most of your layover.</p>
                  <a href="/services" className="text-brand-red font-bold text-xs tracking-wide flex items-center gap-1.5 uppercase hover:text-[#8A2728] transition">
                    View Requirements <span className="text-lg leading-none">&rarr;</span>
                  </a>
                </div>
                <div className="relative w-full md:w-[450px] group-hover:md:w-[600px] h-[110px] group-hover:h-[130px] rounded-full group-hover:rounded-3xl overflow-hidden flex-shrink-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-sm group-hover:shadow-2xl">
                  <Image src="/images/Blue streets of Chefchaouen.svg" alt="Transit Visa" fill className="object-cover transition duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700"></div>
                </div>
              </div>

              <div className="w-full h-[6px] opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(to right, #9CA3AF, #9CA3AF 2px, transparent 2px, transparent 8px)' }}></div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section data-anim-section="why-choose" className="relative w-full bg-white pt-32 pb-40 px-6 md:px-12 overflow-hidden">
        {/* Background Plane & Clouds */}
        <div data-anim="parallax-bg" data-parallax-speed="0.6" className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <Image src="/images/plane.svg" alt="Plane Background" fill className="object-cover object-center opacity-100" />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Column: Image & Floating Card */}
          <div className="relative w-full max-w-[480px] mx-auto lg:mx-0 mb-12 lg:mb-0">
            {/* Main Image */}
            <div data-anim="scale-in" className="relative w-full h-[450px] md:h-[680px] rounded-tl-[6rem] md:rounded-tl-[8rem] rounded-tr-xl rounded-br-xl rounded-bl-xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/images/Detailed arches in a peaceful Moroccan riad.svg"
                alt="Moroccan Riad"
                fill
                className="object-cover"
              />
            </div>

            {/* Floating Card */}
            <div data-anim="fade-up" data-anim-delay="0.2" className="absolute -bottom-6 -right-2 md:-bottom-8 md:-right-12 bg-white p-6 md:p-8 w-[240px] md:w-[260px] shadow-[0_20px_40px_rgba(0,0,0,0.12)] rounded-tl-[2rem] rounded-tr-[2rem] rounded-bl-[2rem] rounded-br-none border border-gray-100 flex flex-col gap-4 md:gap-5 z-20">
              <div className="w-9 h-9 rounded-full border-[1.5px] border-brand-red flex items-center justify-center text-brand-red">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h3 className="font-playfair text-[22px] text-brand-red leading-tight">
                Careful review.<br />
                Clear next steps.
              </h3>
            </div>
          </div>
          
          <div className="flex flex-col relative z-20">
            <p className="text-[#E76C53] text-[10px] font-bold tracking-[0.25em] lowercase mb-4">Why choose us</p>
            <h2 data-anim="heading-split-up" className="font-playfair text-[#1a1a1a] text-[48px] md:text-[64px] leading-[1.05] tracking-tight mb-6">
              Visa Support<br />
              Without <span className="italic text-[#A33132]">Confusion</span>
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed text-[15px] max-w-[420px] mb-12">
              A calm, considered service built around accurate preparation and responsive, human support.
            </p>

            {/* Features Grid */}
            <div data-anim-group="feature-cards" className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Feature 1 */}
              <div data-anim="card" className="bg-white/80 backdrop-blur-md border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 rounded-tl-[3rem] rounded-tr-[1.5rem] rounded-bl-[1.5rem] rounded-br-[1.5rem] hover:shadow-lg transition duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div className="text-brand-red">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      <polyline points="9 12 11 14 15 10"></polyline>
                    </svg>
                  </div>
                  <span className="text-brand-red font-bold text-[10px] tracking-widest">01</span>
                </div>
                <h4 className="text-gray-900 font-bold text-sm mb-3">Professional Guidance</h4>
                <p className="text-gray-500 text-[13px] leading-relaxed font-medium">Clear assistance throughout your visa application.</p>
              </div>

              {/* Feature 2 */}
              <div data-anim="card" className="bg-white/80 backdrop-blur-md border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 rounded-tr-[3rem] rounded-tl-[1.5rem] rounded-bl-[1.5rem] rounded-br-[1.5rem] hover:shadow-lg transition duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div className="text-brand-red">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </div>
                  <span className="text-brand-red font-bold text-[10px] tracking-widest">02</span>
                </div>
                <h4 className="text-gray-900 font-bold text-sm mb-3">Document Checking</h4>
                <p className="text-gray-500 text-[13px] leading-relaxed font-medium">We help ensure your documents are prepared correctly.</p>
              </div>

              {/* Feature 3 */}
              <div data-anim="card" className="bg-white/80 backdrop-blur-md border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 rounded-bl-[3rem] rounded-tl-[1.5rem] rounded-tr-[1.5rem] rounded-br-[1.5rem] hover:shadow-lg transition duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div className="text-brand-red">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <span className="text-brand-red font-bold text-[10px] tracking-widest">03</span>
                </div>
                <h4 className="text-gray-900 font-bold text-sm mb-3">Fast Communication</h4>
                <p className="text-gray-500 text-[13px] leading-relaxed font-medium">Get clear updates and responses throughout the process.</p>
              </div>

              {/* Feature 4 */}
              <div data-anim="card" className="bg-white/80 backdrop-blur-md border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 rounded-br-[3rem] rounded-tl-[1.5rem] rounded-tr-[1.5rem] rounded-bl-[1.5rem] hover:shadow-lg transition duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div className="text-brand-red">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                    </svg>
                  </div>
                  <span className="text-brand-red font-bold text-[10px] tracking-widest">04</span>
                </div>
                <h4 className="text-gray-900 font-bold text-sm mb-3">Dedicated Support</h4>
                <p className="text-gray-500 text-[13px] leading-relaxed font-medium">A real point of contact from application to completion.</p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3 Steps Process Section */}
      <section data-anim-section="steps" className="relative w-full bg-[#5E1A1A] text-white py-24 md:py-32 px-6 md:px-12 overflow-hidden">
        {/* Dark Red Overlay with subtle blend */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#712223] to-[#4A1414] opacity-90 pointer-events-none"></div>

        {/* Faded Background Pattern (Palm trees and Riad) */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-overlay">
          <Image src="/images/Detailed arches in a peaceful Moroccan riad.svg" alt="Moroccan pattern" fill className="object-cover" />
        </div>



        <div className="relative z-10 max-w-[1200px] mx-auto">
          {/* Top text area */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
            <div className="max-w-2xl">
              <p className="text-white/60 text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase mb-6">Three simple steps</p>
              <h2 data-anim="heading-slide-left" className="font-playfair text-white text-[48px] md:text-[64px] leading-[1.05] tracking-tight">
                From Application to <span className="italic">Morocco</span>
              </h2>
            </div>
            <div className="max-w-sm text-left md:text-right text-white/90 font-medium leading-relaxed pb-4 text-[15px]">
              Professional support from your first question to the next step in your journey.
            </div>
          </div>

          {/* Timeline steps */}
          <div className="relative mt-16 md:mt-24">
            {/* Connecting Line (desktop only) */}
            <div data-anim="draw-line" className="hidden md:block absolute top-[28px] left-[16%] right-[16%] h-[1px] bg-white/20"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 relative z-10 text-center">

              {/* Step 1 */}
              <div data-anim="scale-pop" data-anim-delay="0" className="flex flex-col items-center">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-6 shadow-[0_10px_20px_rgba(0,0,0,0.2)]">
                  <span className="text-[#A33132] font-playfair font-bold text-lg">01</span>
                </div>
                <h3 className="font-playfair text-[26px] font-medium mb-4">Choose Your Visa</h3>
                <p className="text-white/70 text-[14px] leading-relaxed max-w-[280px]">
                  Tell us about your travel plans and select the appropriate visa service.
                </p>
              </div>

              {/* Step 2 */}
              <div data-anim="scale-pop" data-anim-delay="0.25" className="flex flex-col items-center">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-6 shadow-[0_10px_20px_rgba(0,0,0,0.2)]">
                  <span className="text-[#A33132] font-playfair font-bold text-lg">02</span>
                </div>
                <h3 className="font-playfair text-[26px] font-medium mb-4">Submit Your Documents</h3>
                <p className="text-white/70 text-[14px] leading-relaxed max-w-[280px]">
                  Provide your required information and supporting documents.
                </p>
              </div>

              {/* Step 3 */}
              <div data-anim="scale-pop" data-anim-delay="0.5" className="flex flex-col items-center">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-6 shadow-[0_10px_20px_rgba(0,0,0,0.2)]">
                  <span className="text-[#A33132] font-playfair font-bold text-lg">03</span>
                </div>
                <h3 className="font-playfair text-[26px] font-medium mb-4">Get Your Visa Support</h3>
                <p className="text-white/70 text-[14px] leading-relaxed max-w-[280px]">
                  Our team reviews your application and guides you through the next steps.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* From Application to Arrival Section (Animated) */}
      <section data-anim-section="arrival" className="relative w-full bg-white pt-24 pb-32 px-6 md:px-12 overflow-hidden">
        {/* Background Plane (Faded silhouette, spans the full section) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image src="/images/raw-plane.svg" alt="" fill className="object-cover object-top" />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto">
          {/* Top text area */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
            <div className="max-w-2xl">
              <p className="text-[#E76C53] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">A clearer way to travel</p>
              <h2 data-anim="heading-blur-in" className="font-playfair text-[#1a1a1a] text-[56px] md:text-[72px] leading-[1.05] tracking-tight">
                From Application<br />
                <span className="italic text-[#A33132]">to Arrival</span>
              </h2>
            </div>
            <div className="max-w-sm text-left md:text-right text-gray-500 font-medium leading-relaxed pb-4 text-[15px]">
              From the first question to the first step in Morocco, we keep your journey moving.
            </div>
          </div>

          {/* Animated Flight Path Diagram */}
          <div data-anim-group="flight-path" data-anim="fade-up" className="relative w-full max-w-[900px] mx-auto h-[250px] mb-16 hidden md:block">
            {/* SVG Path & Plane */}
            <svg viewBox="0 0 1000 200" className="absolute top-0 left-0 w-full h-[200px] overflow-visible">
              <path
                id="flightPath"
                d="M 0 100 C 80 100, 150 40, 250 40 C 350 40, 400 160, 500 160 C 600 160, 650 40, 750 40 C 850 40, 920 100, 1000 100"
                fill="none"
                stroke="#E5B3B3"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              
              {/* Animated Plane */}
              <g fill="#A33132">
                {/* The plane icon needs to point along the positive X axis for rotate="auto" to work correctly. */}
                {/* We use a standard plane icon path rotated 90 degrees */}
                <g transform="scale(1.2)">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" transform="translate(-12, -12) rotate(90)" />
                </g>
                <animateMotion dur="8s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#flightPath" />
                </animateMotion>
              </g>
            </svg>

            {/* Path Nodes / HTML Overlays */}
            <div data-anim-group="waypoints" data-anim="card" className="absolute left-[0%] top-[40%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-12 h-12 bg-white rounded-full border border-[#E5B3B3] flex items-center justify-center text-brand-red font-medium text-[13px] shadow-sm z-10">UK</div>
              <span className="text-[9px] font-bold mt-4 text-gray-800 tracking-wider absolute top-full whitespace-nowrap">UNITED KINGDOM</span>
            </div>

            <div data-anim-group="waypoints" data-anim="card" className="absolute left-[25%] top-[16%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-10 h-10 bg-white rounded-full border border-gray-200 flex items-center justify-center text-gray-400 font-medium text-[11px] shadow-sm z-10 bg-opacity-80 backdrop-blur-sm">01</div>
              <span className="text-[9px] font-bold mt-3 text-gray-400 tracking-wider absolute top-full whitespace-nowrap">APPLICATION</span>
            </div>

            <div data-anim-group="waypoints" data-anim="card" className="absolute left-[50%] top-[64%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-10 h-10 bg-white rounded-full border border-gray-200 flex items-center justify-center text-gray-400 font-medium text-[11px] shadow-sm z-10 bg-opacity-80 backdrop-blur-sm">02</div>
              <span className="text-[9px] font-bold mt-3 text-gray-400 tracking-wider absolute top-full whitespace-nowrap">DOCUMENT REVIEW</span>
            </div>

            <div data-anim-group="waypoints" data-anim="card" className="absolute left-[75%] top-[16%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-10 h-10 bg-white rounded-full border border-gray-200 flex items-center justify-center text-gray-400 font-medium text-[11px] shadow-sm z-10 bg-opacity-80 backdrop-blur-sm">03</div>
              <span className="text-[9px] font-bold mt-3 text-gray-400 tracking-wider absolute top-full whitespace-nowrap">VISA PROCESS</span>
            </div>

            <div data-anim-group="waypoints" data-anim="card" className="absolute left-[100%] top-[40%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-[72px] h-[72px] bg-[#CBA9A9] rounded-full border-[6px] border-white flex items-center justify-center shadow-md z-10">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                  <polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" />
                </svg>
              </div>
              <span className="text-[9px] font-bold mt-3 text-gray-500 tracking-wider absolute top-full whitespace-nowrap">MOROCCO</span>
            </div>
          </div>

          {/* Bottom Steps Text Grid */}
          <div data-anim-group="arrival-steps" className="w-full border-t border-gray-100 pt-12 mt-4 grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Step 01 */}
            <div data-anim="card" className="flex flex-col">
              <span className="text-brand-red font-bold text-xs tracking-widest mb-4">01</span>
              <h3 className="font-playfair text-[22px] text-brand-red mb-3">Tell Us About Your Trip</h3>
              <p className="text-gray-500 text-[14px] leading-relaxed font-medium">
                Share your plans and we'll point you in the right direction.
              </p>
            </div>

            {/* Step 02 */}
            <div data-anim="card" className="flex flex-col">
              <span className="text-brand-red font-bold text-xs tracking-widest mb-4">02</span>
              <h3 className="font-playfair text-[22px] text-brand-red mb-3">Prepare Your Documents</h3>
              <p className="text-gray-500 text-[14px] leading-relaxed font-medium">
                Get a tailored checklist and support reviewing what you need.
              </p>
            </div>

            {/* Step 03 */}
            <div data-anim="card" className="flex flex-col">
              <span className="text-brand-red font-bold text-xs tracking-widest mb-4">03</span>
              <h3 className="font-playfair text-[22px] text-brand-red mb-3">Travel With Confidence</h3>
              <p className="text-gray-500 text-[14px] leading-relaxed font-medium">
                Submit with clarity, then get ready for the souks and sunshine.
              </p>
            </div>
          </div>

          {/* Giant Morocco Text with Image Mask */}
          <div className="relative w-full mt-20 md:mt-28 mb-10 flex justify-center items-center">
            <h2
              data-anim="clip-wipe-left"
              className="font-playfair font-bold text-[56px] min-[400px]:text-[72px] sm:text-[110px] md:text-[180px] lg:text-[260px] xl:text-[320px] leading-[0.8] tracking-tighter uppercase w-full text-center"
              style={{
                backgroundImage: "url('/images/morocco.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                WebkitBackgroundClip: "text",
                color: "transparent"
              }}
            >
              MOROCCO
            </h2>

            {/* Sticker */}
            <div data-anim="rotate-in" className="absolute right-[0%] sm:right-[5%] md:right-[12%] lg:right-[16%] bottom-[-5%] sm:bottom-[-10%] md:bottom-[-20%] w-[100px] sm:w-[140px] md:w-[240px] z-20 hover:scale-105 transition-transform duration-500 cursor-pointer drop-shadow-2xl">
              <Image src="/images/gate.svg" alt="Your Gate is Open" width={240} height={200} className="object-contain" />
            </div>
          </div>

          {/* Prepare Your Documents Block */}
          <div className="relative w-full mt-36 mb-10 flex flex-col lg:flex-row items-center justify-between gap-12 z-20">

            {/* Left Content */}
            <div className="w-full lg:w-1/3 flex flex-col">
              <p data-anim="fade-up" className="text-[#E76C53] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">The right papers</p>
              <h3 data-anim="heading-split-up" className="font-playfair text-[#1a1a1a] text-[40px] md:text-[46px] leading-[1.05] mb-6">
                Prepare Your<br />
                <span className="italic">Documents</span>
              </h3>
              <p data-anim="fade-up" className="text-gray-500 text-[15px] leading-relaxed font-medium mb-8 max-w-[280px]">
                Everything you need, nothing you don't. Your personal checklist starts here.
              </p>
              <a href="#" className="text-brand-red font-bold text-xs tracking-wide flex items-center gap-1.5 uppercase hover:text-[#8A2728] transition">
                View Requirements <span className="text-lg leading-none">&rarr;</span>
              </a>
            </div>

            {/* Center Image */}
            <div data-anim="fade-up" data-anim-delay="0.15" className="w-full lg:w-1/3 flex justify-center relative h-[250px] md:h-[350px]">
              <Image src="/images/files.svg" alt="Documents" fill className="object-contain drop-shadow-2xl" />
            </div>

            {/* Right List */}
            <div className="w-full lg:w-1/3 flex flex-col">
              <DocumentsAccordion />
            </div>

          </div>

        </div>
      </section>

      {/* Testimonials Section */}
      <section data-anim-section="testimonials" className="relative w-full bg-[#FFFAEF] pt-24 pb-32 px-6 md:px-12 overflow-hidden">
        <div className="max-w-[1100px] mx-auto">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <p className="text-[#E76C53] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">Client experiences</p>
              <h2 data-anim="heading-split-up" className="font-playfair text-[#1a1a1a] text-[56px] md:text-[64px] leading-[1.05] tracking-tight">
                What Clients <span className="italic text-[#A33132]">Say</span>
              </h2>
            </div>
            <div className="max-w-xs text-left md:text-right text-gray-500 font-medium leading-relaxed pb-4 text-[15px]">
              Guidance that feels personal, clear and considered.
            </div>
          </div>

          {/* Cards Grid */}
          <div data-anim-group="testimonial-cards" className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Card 1 */}
            <div data-anim="tilt-in" className="bg-white rounded-[1.5rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden flex flex-col justify-between group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-all duration-500 cursor-pointer">
              {/* Giant SVG Quote mark background */}
              <div className="absolute top-8 left-8 text-[#FFF2F2] z-0 transition-transform duration-700 group-hover:scale-110">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                </svg>
              </div>
              
              <div className="relative z-10 h-full flex flex-col">
                <p className="text-gray-600 font-medium leading-relaxed text-[15px] mb-12 pt-6 flex-grow">
                  "The document list was clear and the team answered every question quickly. I felt confident before submitting anything."
                </p>
                <div className="border-t border-gray-100 pt-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#E5B3B3] flex items-center justify-center text-white font-bold text-lg shadow-sm">
                    SM
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-bold text-sm mb-0.5">Sophie M.</h4>
                    <p className="text-gray-500 text-[11px] font-bold uppercase tracking-wider">Tourist Visa support</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div data-anim="tilt-in" className="bg-white rounded-[1.5rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden flex flex-col justify-between group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-all duration-500 cursor-pointer">
              <div className="absolute top-8 left-8 text-[#FFF2F2] z-0 transition-transform duration-700 group-hover:scale-110">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                </svg>
              </div>

              <div className="relative z-10 h-full flex flex-col">
                <p className="text-gray-600 font-medium leading-relaxed text-[15px] mb-12 pt-6 flex-grow">
                  "A professional, straightforward service. The review caught a detail I had missed and the communication was excellent."
                </p>
                <div className="border-t border-gray-100 pt-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#8A2728] flex items-center justify-center text-white font-bold text-lg shadow-sm">
                    DK
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-bold text-sm mb-0.5">Daniel K.</h4>
                    <p className="text-gray-500 text-[11px] font-bold uppercase tracking-wider">Business travel</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div data-anim="tilt-in" className="bg-white rounded-[1.5rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden flex flex-col justify-between group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-all duration-500 cursor-pointer">
              <div className="absolute top-8 left-8 text-[#FFF2F2] z-0 transition-transform duration-700 group-hover:scale-110">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                </svg>
              </div>
              
              <div className="relative z-10 h-full flex flex-col">
                <p className="text-gray-600 font-medium leading-relaxed text-[15px] mb-12 pt-6 flex-grow">
                  "The document list was clear and the team answered every question quickly. I felt confident before submitting anything."
                </p>
                <div className="border-t border-gray-100 pt-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#CBA9A9] flex items-center justify-center text-white font-bold text-lg shadow-sm">
                    AR
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-bold text-sm mb-0.5">Amina R.</h4>
                    <p className="text-gray-500 text-[11px] font-bold uppercase tracking-wider">Family visit</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section data-anim-section="faq" className="relative w-full bg-white pt-32 pb-20 md:pb-28 px-6 md:px-12 overflow-hidden">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-16 lg:gap-24 relative">

          {/* Left Column (Heading & Flag) */}
          <div className="w-full md:w-[45%] relative">
            {/* Background Flag */}
            <div data-anim="parallax-bg" data-parallax-speed="0.6" className="absolute -top-24 -left-[20%] md:-left-[50%] lg:-left-[30%] w-[800px] h-[700px] z-0 pointer-events-none opacity-90">
              <Image src="/images/flag.svg" alt="Flag" fill className="object-contain object-left" />
            </div>

            <div className="relative z-10 pt-4">
              <p className="text-[#E76C53] text-[10px] font-bold tracking-[0.2em] uppercase mb-6">Need to know</p>
                <h2 data-anim="heading-blur-in" className="font-playfair text-[#1a1a1a] text-[48px] sm:text-[60px] md:text-[76px] leading-[1] tracking-tight">
                Frequently<br />
                Asked<br />
                <span className="italic text-[#A33132]">Questions</span>
              </h2>
            </div>
          </div>

          {/* Right Column (Accordion) */}
          <FAQAccordion />
        </div>
      </section>

      {/* Footer Section */}
      <div className="w-full bg-white">
        <footer data-anim-section="footer" className="relative w-full rounded-t-[4rem] md:rounded-t-[6rem] overflow-hidden text-white mt-0">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image src="/images/footer-bg.png" alt="Morocco from airplane" fill className="object-cover" />
            {/* Subtle dark gradient overlay to ensure text contrast at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
          </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 pt-32 pb-10 flex flex-col">

          {/* Top CTA */}
          <div className="flex flex-col items-center text-center mb-24 md:mb-32">
            <p data-anim="fade-up" className="text-white/80 text-[10px] font-bold tracking-[0.25em] uppercase mb-4">Begin with confidence</p>
            <h2 data-anim="heading-split-up" className="font-playfair text-white text-[42px] sm:text-[56px] md:text-[76px] leading-[1.05] tracking-tight mb-8 md:mb-10 drop-shadow-lg">
              Ready to Start Your<br />
              <span className="italic text-[#A33132]">Morocco</span> Journey?
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
                <li><a href="/" className="text-white font-bold text-[14px]">Home</a></li>
                <li><a href="/how-it-works" className="text-white/70 hover:text-white text-[14px] transition">How It Works</a></li>
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
      <ScrollAnimations />
    </div>
  );
}
