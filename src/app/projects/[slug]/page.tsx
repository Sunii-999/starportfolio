"use client";

import { projects } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!project) notFound();

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".reveal", {
      y: 40,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power4.out",
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
    <div ref={containerRef} className="bg-[#0a0a0a] min-h-screen text-white">
      <nav className="fixed top-10 w-full z-50 flex justify-between p-6 md:p-10 mix-blend-difference">
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
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-center px-6">
          <h1 className="reveal text-[12vw] md:text-[8vw] font-bold uppercase tracking-tighter leading-none text-center">
            {project.title}
          </h1>
        </div>
      </section>

      <section className="py-24 md:py-40 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <div className="reveal space-y-8">
              <div>
                <h3 className="text-zinc-500 text-[10px] uppercase tracking-widest mb-2">Location</h3>
                <p className="text-lg">Tokyo, Japan</p>
              </div>
              <div>
                <h3 className="text-zinc-500 text-[10px] uppercase tracking-widest mb-2">Category</h3>
                <p className="text-lg">Architecture / Digital</p>
              </div>
              <div>
                <h3 className="text-zinc-500 text-[10px] uppercase tracking-widest mb-2">Year</h3>
                <p className="text-lg">{project.time}</p>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-8">
            <p className="reveal text-xl md:text-2xl font-light leading-snug text-zinc-300">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-40 px-4 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
          <div className="relative aspect-3/4 md:aspect-square bg-zinc-900 overflow-hidden reveal">
            <Image
              src={project.thumbnail}
              alt="Detail 1"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-3/4 md:mt-32 bg-zinc-900 overflow-hidden reveal">
            <Image
              src={project.thumbnail}
              alt="Detail 2"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <footer className="py-32 border-t border-white/10 text-center">
        <p className="text-zinc-500 uppercase tracking-widest text-[10px] mb-4">Next Project</p>
        <Link 
          href="/projects" 
          className="text-4xl md:text-7xl font-bold uppercase hover:italic transition-all"
        >
          View All Works
        </Link>
      </footer>
    </div>
  );
}