import Image from 'next/image'
import React from 'react'

export default function Header() {
  return (
<div className="relative w-full h-screen">
    <Image
        src="/images/header.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
        width={1280}
        height={720}
        loading="eager"
      />

      <div className="absolute inset-0 bg-zinc-950/80" />

      <div className="relative z-10 flex flex-col justify-between items-center h-full text-white text-center px-4">
        
        <div className="flex flex-col items-center justify-center flex-1">
          <h1 className="text-4xl md:text-6xl font-bold">
            Linda Zaske
          </h1>
          <p className="text-lg md:text-2xl mt-4">
            Interior Architect & Designer
          </p>
        </div>

        <div className="mb-10">
          <button className="px-6 py-3 bg-zinc-950 text-white rounded-full font-semibold hover:bg-zinc-900 transition">
            Get in Touch
          </button>
        </div>

      </div>
    </div>
  )
}