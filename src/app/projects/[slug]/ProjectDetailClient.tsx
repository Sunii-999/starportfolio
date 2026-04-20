"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// 1. Define the Project interface based on your data
interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  time: string;
  thumbnail: string;
  featured: boolean;
  // Optional fields in case you add them to your data later
  location?: string;
  category?: string;
}

interface ProjectProps {
  project: Project; // Replaced 'any' with the new interface
  pairs: { floorplan: string; atmos: string | null }[];
  details: string[];
}

export default function ProjectDetailClient({ project, pairs, details }: ProjectProps) {

  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const revealElements = gsap.utils.toArray<HTMLElement>(".reveal");
    revealElements.forEach((el) => {
      gsap.fromTo(el, 
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          }
        }
      );
    });

    gsap.to(".hero-image", {
      yPercent: 20,
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
      <nav className="fixed top-0 w-full z-50 flex justify-between p-6 md:p-10 mix-blend-difference">
        <Link href="/projects" className="text-[10px] uppercase tracking-[0.3em] hover:opacity-60 transition-opacity">
          ← Back to Index
        </Link>
        <span className="text-[10px] uppercase tracking-[0.3em] font-mono">
          {project.time}
        </span>
      </nav>

      <section className="hero-container relative h-[80vh] md:h-screen overflow-hidden">
        <div className="hero-image absolute inset-0 w-full h-[120%]">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            priority
            className="object-cover grayscale brightness-50"
          />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-center px-6">
          <h1 className="reveal text-[12vw] md:text-[8vw] font-bold uppercase tracking-tighter leading-none text-center">
            {project.title}
          </h1>
        </div>
      </section>

      <section className="py-24 md:py-40 px-6 md:px-16 max-w-7xl mx-auto border-b border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4 space-y-8 reveal">
            <div>
              <h3 className="text-zinc-500 text-[10px] uppercase tracking-widest mb-2">Location</h3>
              <p className="text-lg">{project.location || "Berlin, Germany"}</p>
            </div>
            <div>
              <h3 className="text-zinc-500 text-[10px] uppercase tracking-widest mb-2">Category</h3>
              <p className="text-lg">{project.category || "Interior Architecture"}</p>
            </div>
          </div>
          <div className="md:col-span-8">
            <p className="reveal text-xl md:text-3xl font-light leading-snug text-zinc-300">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-40 px-6 md:px-16 max-w-7xl mx-auto space-y-32 md:space-y-64">
        {pairs.map((pair, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            <div className="reveal">
              <div className="relative aspect-4/3 bg-zinc-900 overflow-hidden">
                <Image src={pair.floorplan} alt={`Floorplan ${i + 1}`} fill className="object-contain p-8 md:p-12" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mt-6">Plan / Technical {i + 1}</p>
            </div>
            
            <div className="reveal md:mb-20">
              {pair.atmos ? (
                <>
                  <div className="relative aspect-4/5 bg-zinc-900 overflow-hidden">
                    <Image src={pair.atmos} alt={`Atmosphere ${i + 1}`} fill className="object-cover" />
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mt-6">Visualization {i + 1}</p>
                </>
              ) : (
                <div className="aspect-4/5 bg-zinc-950 flex items-center justify-center border border-white/5">
                  <span className="text-zinc-700 text-[10px] uppercase tracking-widest">No Visual Attached</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </section>

      {details.length > 0 && (
        <section className="py-24 md:py-40 px-6 md:px-16 bg-zinc-950/50">
          <h2 className="reveal text-[10px] uppercase tracking-[0.4em] text-zinc-500 mb-16 text-center">Detail Studies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {details.map((img, i) => (
              <div key={i} className="reveal relative aspect-square group overflow-hidden">
                <Image 
                  src={img} 
                  alt="Material Detail" 
                  fill 
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <footer className="py-40 text-center border-t border-white/5">
        <p className="text-zinc-500 uppercase tracking-widest text-[10px] mb-8">End of Project</p>
        <Link 
          href="/projects" 
          className="text-4xl md:text-8xl font-bold uppercase hover:italic transition-all duration-500"
        >
          Index
        </Link>
      </footer>
    </div>
  );
}