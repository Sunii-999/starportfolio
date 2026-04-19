"use client";

import { useRef } from "react";
import { projects } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray(".project-card");
    
    cards.forEach((card: any) => {
      gsap.fromTo(card, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-[#0a0a0a] min-h-screen text-white overflow-x-hidden">
      <main className="pt-24 md:pt-40 pb-20 px-4 md:px-16">
        
        <header className="mb-16 md:mb-32 border-b border-white/10 pb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div>
              <h1 className="text-[18vw] md:text-[10rem] font-bold uppercase tracking-[-0.04em] leading-[0.85]">
                Index
              </h1>
              <p className="mt-6 md:mt-8 text-zinc-500 uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs">
                Selected Works / 2024 — 2026
              </p>
            </div>
            <div className="max-w-xs md:text-right">
              <p className="text-sm text-zinc-400 leading-relaxed font-light italic">
                A collection of spaces and digital experiences defined by 
                minimalism and the luxury of silence.
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-20 md:gap-y-32">
          {projects.map((project, index) => {
            const isLarge = index % 3 === 0;
            const gridSpan = isLarge ? "md:col-span-8" : "md:col-span-4";
            
            const alignmentClass = index % 2 === 0 ? "md:mt-0" : "md:mt-24";

            return (
              <div 
                key={project.id} 
                className={`project-card ${gridSpan} ${alignmentClass} group`}
              >
                <Link href={`/projects/${project.slug}`}>
                  <div className="relative aspect-4/5 md:aspect-16/10 overflow-hidden bg-zinc-900 mb-6 md:mb-8">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      priority={index < 2}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out scale-105 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-baseline">
                      <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter">
                        {project.title}
                      </h2>
                      <span className="text-[9px] md:text-[10px] tracking-[0.2em] text-zinc-500 font-mono">
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                    </div>
                    {/* Progress line - hidden on touch devices as hover is tricky */}
                    <div className="hidden md:block h-px w-full bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                    <p className="text-zinc-500 text-[10px] md:text-sm uppercase tracking-[0.2em]">
                      {project.time}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </main>

      <footer className="py-24 md:py-40 px-6 text-center border-t border-white/5">
        <Link href="/" className="text-zinc-600 hover:text-white transition-colors uppercase tracking-widest text-[10px] md:text-xs">
          Back to Overview
        </Link>
      </footer>
    </div>
  );
}