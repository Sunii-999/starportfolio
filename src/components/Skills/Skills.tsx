"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { skills } from "@/data/skill";

export default function Skills() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const items = gsap.utils.toArray(".skill-item");
    const lines = gsap.utils.toArray(".skill-line");

    // Animate the horizontal lines first
    gsap.from(lines, {
      scaleX: 0,
      transformOrigin: "left center",
      stagger: 0.1,
      duration: 1.5,
      ease: "expo.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    });

    // Animate the text sliding up
    gsap.from(items, {
      y: 50,
      opacity: 0,
      stagger: 0.05,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-zinc-950 py-32 md:py-56 px-6 md:px-16 text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
          <h2 className="text-6xl md:text-9xl font-bold uppercase tracking-tighter leading-none">
            Skills
          </h2>
          <p className="text-zinc-500 uppercase tracking-[0.3em] text-[10px] md:text-xs max-w-62.5 leading-relaxed">
            A technical breakdown of digital capabilities and creative frameworks.
          </p>
        </div>

=        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
          {skills.map((skill, index) => (
            <div key={skill.id || index} className="group overflow-hidden">
              <div className="skill-line h-px w-full bg-white/10 mb-6" />
              <div className="skill-item flex justify-between items-start">
                <div className="flex gap-6 md:gap-10">
                  <span className="text-[10px] font-mono text-zinc-600 mt-1">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-2xl md:text-4xl font-bold uppercase tracking-tight group-hover:italic transition-all duration-300">
                      {skill.name}
                    </h3>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest mt-2">
                      {skill.category || "Framework"}
                    </p>
                  </div>
                </div>
                {/* Visual Accent */}
                <div className="h-2 w-2 rounded-full bg-zinc-800 group-hover:bg-white transition-colors duration-500 mt-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}