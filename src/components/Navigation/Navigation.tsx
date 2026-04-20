'use client';

import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { label: "About me", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Contact",  href: "/#contact" },
  ];

  return (
    <nav className="w-full bg-black text-white font-sans sticky top-0 z-50">
      <div className="flex items-center justify-between h-16 px-6">
        <Link href="/" className="flex items-center gap-2">
          <p className="font-bold tracking-tight text-xl">Linda Zaeske.</p>
        </Link>

        <ul className="hidden md:flex gap-8 uppercase text-xs tracking-widest">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link 
                href={item.href} 
                className="hover:opacity-60 transition-opacity"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <a 
              href="/resume.pdf" 
              download="Linda_Zaeske_Resume.pdf"
              className="bg-white text-black px-4 py-2 rounded-full font-bold hover:bg-zinc-200 transition-colors"
            >
              Download portfolio
            </a>
          </li>
        </ul>

        <button className="md:hidden text-2xl" onClick={() => setOpen(true)}>
          ☰
        </button>
      </div>

      <div className={`
        fixed inset-0 bg-[#0a0a0a] z-50 flex flex-col transition-transform duration-300
        ${open ? "translate-y-0" : "-translate-y-full"} 
      `}>
        <div className="flex justify-end p-6">
          <button onClick={() => setOpen(false)} className="text-3xl font-light">✕</button>
        </div>

        <div className="px-6 flex-1">
          <h2 className="text-zinc-800 text-5xl font-black mb-8 leading-none">
            Linda Zaeske
          </h2>

          {/* Menu Links */}
          <ul className="flex flex-col border-t border-zinc-800">
            {menuItems.map((item) => (
              <li key={item.label} className="border-b border-zinc-800">
                <Link 
                  href={item.href}
                  className="flex justify-between items-center py-5 text-2xl font-medium group"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                  <span className="text-zinc-500 text-sm group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </li>
            ))}
            
          </ul>
        </div>

        <div className="p-6 pb-12 flex flex-col items-center gap-8">
          <a 
              href="/resume.pdf" 
              download="Linda_Zaeske_Portfolio.pdf"
            className="w-full bg-white text-black py-4 text-center rounded-full font-semibold text-lg hover:bg-zinc-200 transition-colors"
          >
            Download Portfolio
          </a>
        </div>
      </div>
    </nav>
  );
}