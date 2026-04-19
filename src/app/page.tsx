"use client";

import { useEffect, useRef } from "react";
import Header from "@/components/Header/Header";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import Skills from "@/components/Skills/Skills";
import ContactForm from "@/components/Form/ContactForm";

export default function Home() {
  const horizontalRef = useRef<HTMLDivElement>(null);
const containerRef = useRef<HTMLDivElement>(null);

  const featuredProjects = projects.filter((project) => project.featured);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = gsap.utils.toArray(".horizontal-section");
    
    if (sections.length > 0) {
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: horizontalRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + horizontalRef.current?.offsetWidth,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [featuredProjects.length]);

  return (
    <div ref={containerRef} className="bg-zinc-50 font-google-sans overflow-x-hidden">
      <main>
        <section id="hero" className="h-screen">
          <Header />
        </section>

        <section id="projects" className="w-full font-bold text-4xl uppercase px-6 py-16 bg-zinc-950 text-white h-screen flex-col items-center justify-center">
          <h2>
          Featured Projects
          </h2>
          <Link href={`/projects`}>
      <button className="px-8 py-3 border border-white/30 hover:bg-white hover:text-black transition-colors duration-300 uppercase text-sm tracking-widest">
        View All Project
      </button>
      </Link>
        </section>

        <div ref={horizontalRef} className="overflow-hidden">
          <div 
            className="flex h-screen" 
            style={{ width: `${featuredProjects.length * 100}vw` }}
          >
           {featuredProjects.map((project) => (
  <section 
    key={project.id} 
    className="horizontal-section w-screen h-full flex flex-col items-center justify-center text-white relative"
  >
    <div className="absolute inset-0 -z-10 bg-zinc-950">
      <Image 
        src={project.thumbnail} 
        alt={project.title}
        className="w-full h-full object-cover opacity-50" 
        width={1080}
        height={720}
        loading="eager"
      />
      <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-zinc-950/50" />
    </div>

    <div className="max-w-4xl px-12 text-center z-10">
      <span className="text-sm tracking-[0.3em] uppercase opacity-70 mb-4 block">
        {project.time}
      </span>
      <h2 className="text-6xl md:text-8xl font-bold mb-6 uppercase tracking-tighter">
        {project.title}
      </h2>
      <p className="text-lg md:text-xl text-zinc-300 mb-8 line-clamp-3 max-w-2xl mx-auto font-light">
        {project.description}
      </p>
      
      <Link href={`/projects/${project.slug}`} className="inline-block">
      <button className="px-8 py-3 border border-white/30 hover:bg-white hover:text-black transition-colors duration-300 uppercase text-sm tracking-widest">
        View Project
      </button>
      </Link>
    </div>
  </section>
))}
          </div>
        </div>
        <Skills />
        <section className="h-screen bg-zinc-100 flex items-center justify-center">
          <ContactForm />
        </section>
      </main>
    </div>
  );
}