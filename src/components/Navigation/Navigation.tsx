'use client';

import { useState } from "react";

export default function Navigation() {
  const [open, setOpen] = useState(false);

  const menuItems = ["Properties", "About me", "Contact"];

  return (
    <nav className="w-full bg-black text-white font-sans">
      <div className="flex items-center justify-between h-16 px-6">
        <p className="font-bold tracking-tight text-xl">Linda Zaeske.</p>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-8 uppercase text-xs tracking-widest">
          {['About', 'Projects', 'Contact'].map((item) => (
            <li key={item}><a href={`#${item.toLowerCase()}`} className="hover:opacity-60 transition-opacity">{item}</a></li>
          ))}
        </ul>

        {/* Hamburger Button */}
        <button className="md:hidden text-2xl" onClick={() => setOpen(true)}>
          ☰
        </button>
      </div>

      {/* Full Screen Mobile Overlay */}
      <div className={`
        fixed inset-0 bg-[#0a0a0a] z-50 flex flex-col transition-transform duration-300
        ${open ? "translate-y-0" : "translate-y-full"} 
      `}>
        {/* Header inside overlay */}
        <div className="flex justify-end p-6">
          <button onClick={() => setOpen(false)} className="text-3xl font-light">✕</button>
        </div>

        <div className="px-6 flex-1">
          {/* Subtle Background Logo */}
          <h2 className="text-zinc-800 text-5xl font-black mb-8 leading-none">
            Linda Zaeske
          </h2>

          {/* Menu Links */}
          <ul className="flex flex-col border-t border-zinc-800">
            {menuItems.map((item) => (
              <li key={item} className="border-b border-zinc-800">
                <a 
                  href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
                  className="flex justify-between items-center py-5 text-2xl font-medium group"
                  onClick={() => setOpen(false)}
                >
                  {item}
                  <span className="text-zinc-500 text-sm group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Actions */}
        <div className="p-6 pb-12 flex flex-col items-center gap-8">
          <button className="w-full bg-white text-black py-4 rounded-full font-semibold text-lg hover:bg-zinc-200 transition-colors">
            Enquire
          </button>
          
          <button className="flex items-center gap-1 text-sm text-zinc-400">
            🌐 EN <span className="text-[10px]">▼</span>
          </button>
        </div>
      </div>
    </nav>
  );
}