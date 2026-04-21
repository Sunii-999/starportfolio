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

export default function ProjectDetailClient({ project, pairs, details, model, sketch, moodboard, renders }: ProjectProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Staggered reveal for grid items
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

    // Parallax Hero
    gsap.to(".hero-image", {
      yPercent: 15,
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

      {/* Hero Section */}
      <section className="hero-container relative h-[70vh] md:h-screen overflow-hidden">
        <div className="hero-image absolute inset-0 w-full h-[115%]">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            priority
            className="object-cover grayscale brightness-50"
          />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-center px-6">
          <h1 className="reveal text-[14vw] md:text-[10vw] font-bold uppercase tracking-tighter leading-[0.8] text-center">
            {project.title}
          </h1>
        </div>
      </section>

      {/* Project Info */}
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
            <p className="reveal text-2xl md:text-4xl lg:text-5xl font-light leading-[1.1] tracking-tight text-zinc-200">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {(sketch.length > 0 || moodboard.length > 0) && (
        <section className="py-20 bg-stone-100 text-neutral-900 px-4 md:px-10">
          <div className="max-w-450 mx-auto">
             <h2 className="reveal text-[10px] uppercase tracking-[0.4em] text-zinc-400 mb-12 text-center">Process & Inspiration</h2>
             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {sketch.map((img, i) => (
                  <div key={`sketch-${i}`} className={`reveal relative aspect-3/4 overflow-hidden ${i === 0 ? 'col-span-2 row-span-2' : ''}`}>
                    <Image src={img} alt="Sketch" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                  </div>
                ))}
                {moodboard.map((img, i) => (
                  <div key={`mood-${i}`} className="reveal relative aspect-square overflow-hidden">
                    <Image src={img} alt="Moodboard" fill className="object-cover" />
                  </div>
                ))}
             </div>
          </div>
        </section>
      )}

      {/* Main Content: Pairs (Floorplans + Atmosphere) */}
      <section className="py-20 md:py-40 bg-stone-100 text-neutral-900">
        <div className="max-w-450 mx-auto px-6 md:px-12 lg:px-24 space-y-32 md:space-y-64">
          {pairs.map((pair, i) => (
            <div key={i} className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${i % 2 !== 0 ? 'lg:direction-rtl' : ''}`}>
              <div className={`lg:col-span-7 reveal ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <div className="relative aspect-16/10 bg-white/50 rounded-sm overflow-hidden shadow-sm">
                  <Image src={pair.floorplan} alt={`Floorplan ${i + 1}`} fill className="object-contain p-6 md:p-16" />
                </div>
                <div className="mt-6 flex justify-between items-baseline border-t border-black/5 pt-4">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-400">0{i + 1} — Technical</span>
                  <span className="text-[9px] font-mono italic">Scale 1:50</span>
                </div>
              </div>
              
              <div className={`lg:col-span-5 reveal ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
                {pair.atmos ? (
                  <div className="relative aspect-4/5 shadow-2xl">
                    <Image src={pair.atmos} alt={`Atmosphere ${i + 1}`} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="aspect-4/5 bg-zinc-200 flex items-center justify-center italic text-zinc-400 text-sm">
                    Image in progress
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Renders Section - Large & Cinematic */}
      {renders.length > 0 && (
        <section className="py-20 bg-stone-100 text-neutral-900">
          <div className="px-4 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renders.map((img, i) => (
                <div key={i} className={`reveal relative overflow-hidden ${i === 0 ? 'md:col-span-2 aspect-21/9' : 'aspect-4/5'}`}>
                  <Image src={img} alt="Render" fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Details & Models - Dense Grid */}
      {(details.length > 0 || model.length > 0) && (
        <section className="py-32 bg-stone-100 text-neutral-900 border-t border-black/5">
          <div className="max-w-450] mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {details.map((img, i) => (
                <div key={`detail-${i}`} className="reveal relative aspect-square group overflow-hidden">
                  <Image src={img} alt="Detail" fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                </div>
              ))}
              {model.map((img, i) => (
                <div key={`model-${i}`} className="reveal relative aspect-square overflow-hidden bg-white p-4">
                  <Image src={img} alt="Model" fill className="object-contain" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-32 md:py-56 text-center bg-[#0a0a0a]">
        <Link 
          href="/projects" 
          className="group inline-block"
        >
          <span className="text-5xl md:text-[12vw] font-bold uppercase leading-none block transition-all duration-500">
            View All Projects
          </span>
          <div className="h-0.5 w-0 group-hover:w-full bg-white transition-all duration-700 mx-auto mt-4" />
        </Link>
      </footer>
    </div>
  );
}