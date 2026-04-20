"use client";

import { useRef } from "react";
import { profile } from "@/data/profile";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const revealElements = gsap.utils.toArray<HTMLElement>(".reveal");

    revealElements.forEach((el) => {
      gsap.fromTo(el, 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-[#0a0a0a] min-h-screen text-white font-sans selection:bg-white selection:text-black">
      <main className="pt-32 md:pt-56 pb-32 px-6 md:px-16 max-w-7xl mx-auto">
        
        {/* Hero Header */}
        <header className="mb-24 md:mb-40 border-b border-white/10 pb-12">
          <h1 className="reveal text-[15vw] md:text-[12rem] font-bold uppercase tracking-[-0.04em] leading-[0.8] mb-12">
            Profile
          </h1>
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="reveal max-w-2xl">
              <p className="text-2xl md:text-4xl font-light leading-snug text-zinc-300">
                {profile.description}
              </p>
            </div>
            <div className="reveal space-y-6 min-w-50">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 block mb-1">Based in</span>
                <p className="text-lg">{profile.location}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 block mb-1">Languages</span>
                <p className="text-lg">{profile.languages.join(" / ")}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Career & Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 md:gap-40">
          
          {/* Education */}
          <section>
            <h2 className="reveal text-[10px] uppercase tracking-[0.4em] text-zinc-500 mb-12 border-b border-white/10 pb-4">
              Education / Academic History
            </h2>
            <div className="space-y-16">
              {profile.education.map((edu, i) => (
                <div key={i} className="reveal group">
                  <span className="text-xs font-mono text-zinc-600 mb-2 block">{edu.duration}</span>
                  <h3 className="text-2xl font-bold uppercase tracking-tight mb-2 group-hover:text-zinc-400 transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="text-zinc-500 uppercase tracking-widest text-[10px]">
                    {edu.institution}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section>
            <h2 className="reveal text-[10px] uppercase tracking-[0.4em] text-zinc-500 mb-12 border-b border-white/10 pb-4">
              Experience / Professional
            </h2>
            <div className="space-y-16">
              {profile.experience.map((exp, i) => (
                <div key={i} className="reveal group">
                  <span className="text-xs font-mono text-zinc-600 mb-2 block">{exp.duration}</span>
                  <h3 className="text-2xl font-bold uppercase tracking-tight mb-2 group-hover:text-zinc-400 transition-colors">
                    {exp.role}
                  </h3>
                  <p className="text-zinc-500 uppercase tracking-widest text-[10px]">
                    {exp.company}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Contact Links Footer */}
        <footer className="mt-40 pt-24 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            <div>
              <h2 className="reveal text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8">
                Connect.
              </h2>
              <div className="flex flex-col gap-4">
                <a href={`mailto:${profile.emails.academic}`} className="reveal text-zinc-400 hover:text-white transition-colors uppercase tracking-widest text-xs">
                  Academic: {profile.emails.academic}
                </a>
                <a href={`mailto:${profile.emails.personal}`} className="reveal text-zinc-400 hover:text-white transition-colors uppercase tracking-widest text-xs">
                  Personal: {profile.emails.personal}
                </a>
                <a href={profile.linkedin} target="_blank" className="reveal text-zinc-400 hover:text-white transition-colors uppercase tracking-widest text-xs">
                  LinkedIn Profile ↗
                </a>
              </div>
            </div>
            <div className="reveal text-right">
                <Link href="/#contact" className="inline-block text-zinc-600 hover:text-white transition-colors uppercase tracking-widest text-xs">
                    Back to Contact
                </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}