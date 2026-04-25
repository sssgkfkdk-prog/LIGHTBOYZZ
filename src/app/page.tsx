import Image from 'next/image';
import Link from 'next/link';
import LeafAnimation from '@/components/LeafAnimation';
import ReviewForm from '@/components/ReviewForm';
import { Sparkles, Maximize2, Star, Disc, Menu, X } from 'lucide-react';

import prisma from '@/lib/prisma';

export default async function Home() {
  const projects = await prisma.project.findMany({
    orderBy: { orderIndex: 'asc' },
  });

  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return (
    <main className="min-h-screen relative font-sans selection:bg-[#e76f51] selection:text-white pb-20">
      <LeafAnimation />
      <div className="bg-glow"></div>
      
      {/* Header */}
      <header className="relative z-10 container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#f4a261] shadow-[0_0_15px_rgba(231,111,81,0.3)]">
            <img src="/avatar.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-xl font-heading font-bold tracking-wider text-[#fcf6f0]">LIGHTBOYZ THUMBNAILS</h1>
            <p className="text-xs text-[#f4a261] font-medium">Minecraft · Cinematic · Extreme Detailing · Autumn Aesthetics</p>
          </div>
        </div>

        <nav className="hidden md:flex gap-4">
          <a href="#samples" className="btn-pill btn-pill-dark">Samples</a>
          <a href="#info" className="btn-pill btn-pill-dark">Info</a>
          <a href="#contact" className="btn-pill btn-pill-dark">Contact</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="btn-pill btn-pill-orange text-sm font-bold tracking-wider hidden sm:block">ORDER THUMBNAIL</button>
          <div className="w-10 h-10 rounded-full border border-[#e76f51] shadow-[0_0_15px_rgba(231,111,81,0.4)] overflow-hidden hidden md:block">
            <img src="/avatar.jpg" alt="Small avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 pt-16 pb-24 flex flex-col items-center text-center">
        <div className="w-16 h-16 text-[#e76f51] mb-6 animate-pulse">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full drop-shadow-[0_0_10px_rgba(231,111,81,0.5)]">
             <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
          </svg>
        </div>
        
        <h2 className="text-6xl md:text-8xl font-heading font-normal mb-4 tracking-normal gradient-text max-w-5xl drop-shadow-lg leading-none">
          Minecraft Thumbnail Freelance Legend
        </h2>
        
        <p className="text-xl text-[#f4a261] mb-10 italic font-medium">
          Lost In The Art Of Thumbnails 🍁
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="card px-6 py-3 flex flex-col sm:flex-row items-center gap-2">
            <span className="text-[#fcf6f0] font-medium">Member Since: Sep 26, 2025</span>
            <span className="hidden sm:inline text-[#e76f51]">|</span>
            <a href="https://www.behance.net/lightboyz1" target="_blank" rel="noreferrer" className="text-[#f4a261] hover:text-[#e76f51] font-medium transition-colors">
              Behance Profile
            </a>
          </div>
          <div className="card px-6 py-3 flex items-center">
            <span className="text-green-400 font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse drop-shadow-[0_0_5px_rgba(74,222,128,0.8)]"></span>
              24h Rush Available
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-12">
          <div className="card p-6 flex flex-col items-center justify-center border-t-4 border-t-[#e76f51]">
            <h3 className="text-4xl font-heading font-bold text-[#fcf6f0] mb-2">150+</h3>
            <p className="text-[#f4a261] uppercase text-sm font-bold tracking-widest">Happy Clients</p>
          </div>
          <div className="card p-6 flex flex-col items-center justify-center border-t-4 border-t-[#f4a261]">
            <h3 className="text-4xl font-heading font-bold text-[#fcf6f0] mb-2">24h</h3>
            <p className="text-[#f4a261] uppercase text-sm font-bold tracking-widest">Turnaround</p>
          </div>
          <div className="card p-6 flex flex-col items-center justify-center border-t-4 border-t-[#e9c46a]">
            <h3 className="text-4xl font-heading font-bold text-[#fcf6f0] mb-2 flex items-center gap-2">
              5.0 <Star className="text-yellow-400 fill-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]" size={28} />
            </h3>
            <p className="text-[#f4a261] uppercase text-sm font-bold tracking-widest">Rating</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 items-center">
          <div className="btn-pill bg-[#2d1b11] text-[#f4a261] font-bold px-8 py-3 border border-[#e76f51]/40">
            Rs Starting ₹200 only
          </div>
          <div className="btn-pill bg-[#5865F2] text-white font-bold px-8 py-3 hover:bg-[#4752C4] flex items-center gap-2 transition-colors shadow-lg">
            <Disc size={20} /> lightboyz0152_51128
          </div>
          <div className="btn-pill bg-[#fcf6f0] text-[#1c110a] font-black px-8 py-3 hover:bg-[#e9c46a] transition-colors shadow-xl">
            DM FOR ORDERS
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="samples" className="relative z-10 container mx-auto px-6 pt-10 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h3 className="text-4xl md:text-5xl font-heading font-normal text-[#fcf6f0] tracking-wide flex items-center gap-3">
              <span className="text-[#e76f51] animate-pulse">✦</span> 
              MASTERPIECE GALLERY
            </h3>
            <p className="text-[#f4a261] mt-2 font-medium">Explore the finest selection of cinematic Minecraft art</p>
          </div>
          <p className="text-sm text-[#e76f51] font-bold tracking-widest uppercase border border-[#e76f51]/30 px-4 py-2 rounded-full">Hover to interact</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className={`group relative overflow-hidden rounded-2xl cursor-pointer shadow-2xl transition-all duration-500 
                          hover:shadow-[0_20px_40px_rgba(231,111,81,0.25)] hover:-translate-y-2
                          ${index % 3 === 1 ? 'lg:translate-y-12' : ''} 
                          ${index % 2 === 1 ? 'md:translate-y-8 lg:translate-y-0' : ''}`}
            >
              <div className="relative aspect-video w-full overflow-hidden bg-[#1c110a]">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-75"
                />
                
                {/* Always-on subtle gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c110a]/90 via-[#1c110a]/20 to-transparent opacity-60"></div>
                
                {/* Hover Reveal Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                  <div className="backdrop-blur-md bg-[#2d1b11]/70 border border-[#f4a261]/30 rounded-xl p-4 flex items-center justify-between shadow-lg">
                    <div>
                      <h4 className="text-[#fcf6f0] font-heading font-normal text-2xl tracking-wide">{project.title}</h4>
                      <p className="text-[#f4a261] text-xs font-semibold uppercase tracking-widest mt-1 flex items-center gap-1">
                        <Sparkles size={12} /> High Definition
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-[#e76f51] text-white flex items-center justify-center shadow-[0_0_15px_rgba(231,111,81,0.6)] transform scale-90 group-hover:scale-100 transition-transform duration-500 delay-100">
                      <Maximize2 size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="relative z-10 py-24 overflow-hidden">
        <div className="container mx-auto px-6 mb-12 text-center">
          <h3 className="text-4xl md:text-5xl font-heading font-normal text-[#fcf6f0] tracking-wide mb-4">
            <span className="text-[#f4a261]">TRUSTED BY</span> THE LEGENDS
          </h3>
          <p className="text-[#e76f51] font-bold tracking-widest uppercase mb-12">Real feedback from top creators</p>
        </div>

        {reviews.length > 0 && (
          /* Infinite Marquee Wrapper */
          <div className="relative flex overflow-x-hidden mb-20">
            <div className="animate-marquee flex gap-8 whitespace-nowrap">
              {[...reviews, ...reviews].map((review, idx) => (
                <div 
                  key={`${review.id}-${idx}`} 
                  className="w-[400px] bg-[#2d1b11]/40 backdrop-blur-xl border-2 border-[#4a2e1b] hover:border-[#f4a261] p-8 rounded-3xl transition-all duration-500 hover:shadow-[0_10px_40px_rgba(244,162,97,0.15)] group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#e76f51]/10 blur-3xl rounded-full -mr-12 -mt-12 transition-all duration-500 group-hover:bg-[#e76f51]/20"></div>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-[#4a2e1b] group-hover:border-[#e76f51] transition-colors shadow-lg">
                      <img src={review.avatarUrl} alt={review.name} className="w-full h-full object-cover pixelated" />
                    </div>
                    <div>
                      <h4 className="text-[#fcf6f0] font-heading font-normal text-2xl m-0 leading-tight">{review.name}</h4>
                      <span className="text-[#e76f51] text-xs font-bold tracking-widest uppercase">{review.channel}</span>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#f4a261" className="text-[#f4a261]" />
                    ))}
                  </div>

                  <p className="text-[#f4a261]/90 text-lg leading-relaxed whitespace-normal italic">
                    "{review.text}"
                  </p>
                </div>
              ))}
            </div>
            
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#1c110a] to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#1c110a] to-transparent z-10"></div>
          </div>
        )}

        <div className="container mx-auto px-6">
          <ReviewForm />
        </div>
      </section>

      {/* Info Section */}
      <section id="info" className="relative z-10 container mx-auto px-6 pt-24 pb-10 flex justify-center">
        <div className="max-w-4xl w-full text-center">
          <h3 className="text-4xl md:text-5xl font-heading font-normal text-[#fcf6f0] mb-8 tracking-wide flex items-center justify-center gap-3">
            <span className="text-[#e76f51] animate-pulse">✦</span> ABOUT THE ARTIST
          </h3>
          <div className="space-y-6 text-[#f4a261] text-lg leading-relaxed bg-[#2d1b11]/50 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-[#4a2e1b] shadow-2xl">
            <p>
              Hey! I'm <strong className="text-[#fcf6f0]">Lightboyz</strong>, a professional 3D artist specializing in high-end, cinematic Minecraft thumbnails. 
              With over a hundred satisfied clients and a track record of delivering eye-catching visuals, my goal is to make your content stand out.
            </p>
            <p>
              My process involves extreme detailing, advanced lighting, and deep color grading to achieve an autumn/cinematic aesthetic that viewers can't ignore. 
              Whether you need a thumbnail for a survival let's play, a massive SMP event, or a custom mod review, I've got you covered.
            </p>
            
            <div id="contact" className="pt-10 mt-10 border-t border-[#4a2e1b]/50">
              <h4 className="text-3xl font-heading font-normal text-[#fcf6f0] mb-4">READY TO COMMISSION?</h4>
              <p className="mb-8">The fastest way to reach me and discuss your vision is directly through Discord.</p>
              
              <a 
                href="https://discord.com/users/lightboyz0152_51128" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-4 bg-[#5865F2] hover:bg-[#4752C4] text-white px-8 py-5 rounded-2xl font-bold transition-all duration-300 shadow-[0_10px_30px_rgba(88,101,242,0.3)] hover:shadow-[0_15px_40px_rgba(88,101,242,0.5)] transform hover:-translate-y-1"
              >
                <Disc size={32} /> 
                <div className="text-left">
                  <span className="block text-xs text-[#c3c8fa] font-medium uppercase tracking-wider mb-1">Add me on Discord</span>
                  <span className="block text-xl tracking-wide">lightboyz0152_51128</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 container mx-auto px-6 mt-12 pt-8 border-t border-[#4a2e1b] flex flex-col md:flex-row justify-between items-center text-[#f4a261] text-sm font-medium">
        <p>&copy; {new Date().getFullYear()} Lightboyz Thumbnails. All rights reserved.</p>
        <Link href="/admin" className="hover:text-[#e76f51] transition-colors opacity-50 hover:opacity-100 mt-4 md:mt-0">
          Artist Login
        </Link>
      </footer>
    </main>
  );
}
