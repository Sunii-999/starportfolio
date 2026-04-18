import Image from 'next/image'
import React from 'react'

export default function Header() {
  return (
<div className="relative w-full h-[calc(100vh-4rem)]">
    <Image
        src="/header.png" // put your image in /public
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />

      <div className="absolute inset-0 bg-black/80" />

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
          <button className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition">
            Get in Touch
          </button>
        </div>

      </div>
    </div>
  )
}