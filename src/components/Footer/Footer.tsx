'use client'

import Link from "next/link";
import { profile } from "@/data/profile"; // Importing your data

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black text-white font-sans border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-block">
              <p className="font-bold tracking-tight text-2xl">{profile.name}.</p>
            </Link>
            <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
              {profile.title} based in {profile.location}. 
              Focusing on sustainable and experimental spatial solutions.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold">
              Explore
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link href="/about" className="hover:text-zinc-400 transition-colors">About</Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-zinc-400 transition-colors">Projects</Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-zinc-400 transition-colors">Contact</Link>
              </li>
              <li>
                <a 
                  href="/resume.pdf" 
                  download="Linda_Zaeske_Resume.pdf"
                  className="hover:text-zinc-400 transition-colors font-medium"
                >
                  Download CV ↓
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold">
              Connect
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <a href={`mailto:${profile.emails.personal}`} className="hover:text-zinc-400 transition-colors">
                  {profile.emails.personal}
                </a>
              </li>
              <li>
                <a href={`mailto:${profile.emails.academic}`} className="hover:text-zinc-400 transition-colors">
                  {profile.emails.academic}
                </a>
              </li>
              <li>
                <a 
                  href={profile.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-zinc-400 transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-zinc-600">
          <p>© {currentYear} {profile.name}. Built by Sunii</p>
          <div className="flex gap-6">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-white transition-colors"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}