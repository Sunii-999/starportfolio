"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  time: string;
  thumbnail: string;
  featured: boolean;
  location?: string;
  category?: string;
}

interface ProjectProps {
  project: Project;
  pairs: { floorplan: string; atmos: string | null }[];
  details: string[];
  model: string[];
  sketch: string[];
  moodboard: string[];
  renders: string[];
}

export default function ProjectDetailClient({ 
  project, 
  pairs, 
  details, 
  model, 
  sketch, 
  moodboard, 
  renders 
}: ProjectProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = gsap.utils.toArray<HTMLElement>("section");
    sections.forEach((section) => {
      const reveals = section.querySelectorAll(".reveal");
      if (reveals.length > 0) {
        gsap.fromTo(reveals, 
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 1,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
            }
          }
        );
      }
    });

    gsap.to(".hero-image", {
      yPercent: 10,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-container",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-[#0a0a0a] min-h-screen text-white selection:bg-white selection:text-black">
      <nav className="fixed top-25 w-full z-50 flex justify-between p-6 md:p-10 mix-blend-difference">
        <Link href="/projects" className="text-[10px] uppercase tracking-[0.3em] hover:opacity-60 transition-opacity">
          ← Index
        </Link>
        <span className="text-[10px] uppercase tracking-[0.3em] font-mono">
          {project.time}
        </span>
      </nav>

      <section className="hero-container relative h-[80vh] md:h-screen overflow-hidden flex items-center justify-center bg-[#0a0a0a]">
        <div className="hero-image absolute inset-0 w-full h-[110%]">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            priority
            className="object-contain grayscale opacity-60"
          />
        </div>
        <div className="relative z-10 px-6 pointer-events-none">
          <h1 className="reveal text-[12vw] md:text-[10vw] font-bold uppercase tracking-tighter leading-[0.8] text-center">
            {project.title}
          </h1>
        </div>
      </section>

      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-450 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-4 space-y-12 reveal">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-8">
              <div>
                <h3 className="text-zinc-500 text-[10px] uppercase tracking-widest mb-3">Location</h3>
                <p className="text-lg font-light">{project.location || "Berlin, Germany"}</p>
              </div>
              <div>
                <h3 className="text-zinc-500 text-[10px] uppercase tracking-widest mb-3">Category</h3>
                <p className="text-lg font-light">{project.category || "Architecture"}</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8">
            <p className="reveal text-xl md:text-2xl lg:text-3xl font-light leading-[1.1] tracking-tight text-zinc-200">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {(sketch.length > 0 || moodboard.length > 0) && (
        <section className="py-20 bg-stone-100 text-neutral-900 px-6">
          <div className="max-w-7xl mx-auto">
             <h2 className="reveal text-[10px] uppercase tracking-[0.4em] text-zinc-400 mb-16 text-center">Process & Inspiration</h2>
             <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {sketch.map((img, i) => (
                  <div key={`sketch-${i}`} className="reveal break-inside-avoid">
                    <img 
                      src={img} 
                      alt="Sketch" 
                      className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 rounded-sm" 
                    />
                  </div>
                ))}
                {moodboard.map((img, i) => (
                  <div key={`mood-${i}`} className="reveal break-inside-avoid">
                    <img 
                      src={img} 
                      alt="Moodboard" 
                      className="w-full h-auto rounded-sm" 
                    />
                  </div>
                ))}
             </div>
          </div>
        </section>
      )}

      {/* Main Content: Pairs (Floorplans + Atmosphere) */}
      <section className="py-20 md:py-40 bg-stone-100 text-neutral-900 border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6 space-y-32 md:space-y-48">
          {pairs.map((pair, i) => (
            <div key={i} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Technical Drawing */}
              <div className={`lg:col-span-7 reveal ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <div className="relative bg-white/80 p-4 md:p-12 shadow-sm rounded-sm">
                  <img src={pair.floorplan} alt={`Floorplan ${i + 1}`} className="w-full h-auto" />
                </div>
                <div className="mt-6 flex justify-between items-baseline border-t border-black/10 pt-4">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-400">0{i + 1} — Technical Drawing</span>
                  <span className="text-[9px] font-mono italic">Scale 1:100</span>
                </div>
              </div>
              
              {/* Atmosphere / Render */}
              <div className={`lg:col-span-5 reveal ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
                {pair.atmos ? (
                  <img src={pair.atmos} alt={`Atmosphere ${i + 1}`} className="w-full h-auto shadow-2xl rounded-sm" />
                ) : (
                  <div className="aspect-square bg-zinc-200 flex items-center justify-center italic text-zinc-400 text-sm">
                    Work in progress
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Renders Section - Gallery layout */}
      {renders.length > 0 && (
        <section className="py-20 bg-stone-100 text-neutral-900">
          <div className="px-6 md:px-12 lg:px-24 max-w-[1800px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {renders.map((img, i) => (
                <div key={i} className={`reveal ${i === 0 ? 'md:col-span-2' : ''}`}>
                  <img src={img} alt="Render" className="w-full h-auto rounded-sm" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Details & Models - Dense natural grid */}
      {(details.length > 0 || model.length > 0) && (
        <section className="py-32 bg-stone-100 text-neutral-900 border-t border-black/5">
          <div className="max-w-7xl mx-auto px-6">
             <h2 className="reveal text-[10px] uppercase tracking-[0.4em] text-zinc-400 mb-16">Details & Physical Models</h2>
             <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {details.map((img, i) => (
                <div key={`detail-${i}`} className="reveal break-inside-avoid group overflow-hidden bg-white">
                  <img src={img} alt="Detail" className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-1000" />
                </div>
              ))}
              {model.map((img, i) => (
                <div key={`model-${i}`} className="reveal break-inside-avoid bg-white p-2 shadow-sm">
                  <img src={img} alt="Model" className="w-full h-auto" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer / Next Project */}
      <footer className="py-32 md:py-56 text-center bg-[#0a0a0a]">
        <Link 
          href="/projects" 
          className="group inline-block"
        >
          <span className="text-5xl md:text-[8vw] font-bold uppercase leading-none block transition-all duration-500">
            Back to Index
          </span>
          <div className="h-0.5 w-0 group-hover:w-full bg-white transition-all duration-700 mx-auto mt-4" />
        </Link>
      </footer>
    </div>
  );
}