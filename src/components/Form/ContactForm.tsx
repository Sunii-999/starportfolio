"use client";

import { useRef, useState } from "react";
import { sendEmail } from "@/app/actions";
import gsap from "gsap";

export default function ContactForm() {
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    const result = await sendEmail(formData);
    setIsPending(false);

    if (result.success) {
      setStatus("success");
      formRef.current?.reset();
      gsap.from(".success-msg", { opacity: 0, y: 10, duration: 0.5 });
    } else {
      setStatus("error");
    }
  }

  return (
    <section className="bg-zinc-950 py-32 px-6 md:px-16 text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
        
        <div>
          <h2 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter mb-12">
            Inquiries
          </h2>
          <div className="space-y-6 text-zinc-500 uppercase tracking-widest text-xs">
            <p>Available for freelance worldwide</p>
            <p>Tokyo / London / Remote</p>
            <a href="mailto:anastasiazaeske@aol.com" className="block text-white hover:italic transition-all">
              anastasiazaeske@aol.com
            </a>
          </div>
        </div>

        <form ref={formRef} action={handleSubmit} className="flex flex-col gap-12">
          <div className="group border-b border-white/10 focus-within:border-white transition-colors pb-4">
            <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 block mb-2">Full Name</label>
            <input 
              name="name"
              required 
              type="text" 
              className="w-full bg-transparent outline-none text-xl font-light placeholder:text-zinc-800"
              placeholder="John Doe"
            />
          </div>

          <div className="group border-b border-white/10 focus-within:border-white transition-colors pb-4">
            <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 block mb-2">Email Address</label>
            <input 
              name="email"
              required 
              type="email" 
              className="w-full bg-transparent outline-none text-xl font-light placeholder:text-zinc-800"
              placeholder="john@example.com"
            />
          </div>

          <div className="group border-b border-white/10 focus-within:border-white transition-colors pb-4">
            <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 block mb-2">Message</label>
            <textarea 
              name="message"
              required 
              rows={4}
              className="w-full bg-transparent outline-none text-xl font-light placeholder:text-zinc-800 resize-none"
              placeholder="Tell me about your project"
            />
          </div>

          <button 
            type="submit" 
            disabled={isPending}
            className="w-fit px-12 py-4 border border-white/20 hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-widest text-xs disabled:opacity-50"
          >
            {isPending ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p className="success-msg text-emerald-500 uppercase tracking-widest text-[10px]">
              Message received. I will reach out shortly.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}