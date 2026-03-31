"use client"

import { useState, useRef, useCallback } from "react"
import { Download } from "lucide-react"
import { Archivo, Space_Grotesk } from "next/font/google"
import {
  Calendar, Bell, Zap, Layout, Globe,
  Check, ArrowRight, MessageCircle,
} from "lucide-react"
import type { ComponentType, CSSProperties } from "react"

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

// ─── Post 1: "Did You Know?" fact post ──────────────────────────────────────

function Post1() {
  return (
    <div className="relative w-[1080px] h-[1350px] bg-[#0a0a0a] overflow-hidden flex flex-col">
      {/* Ambient glows */}
      <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-cyan-400/8 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-violet-500/6 rounded-full blur-[120px]" />

      {/* Top bar */}
      <div className="px-20 pt-16 flex items-center justify-between">
        <span className={`${archivo.className} text-[28px] font-black text-white tracking-tight`}>
          &lt;flux<span className="text-cyan-400">el.rs/&gt;</span>
        </span>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col justify-center px-20">
        <div className="rounded-[32px] border border-white/12 bg-[linear-gradient(145deg,rgba(8,14,22,0.88),rgba(13,13,18,0.74))] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl p-10">
          {/* Big stat */}
          <div className="mb-10">
            <span className={`${archivo.className} text-[220px] font-black leading-[0.85] bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent`}>
              67%
            </span>
            <div className="mt-4 h-1.5 w-48 bg-gradient-to-r from-cyan-400 to-transparent rounded-full" />
          </div>

          {/* Explanation */}
          <h2 className={`${archivo.className} text-[64px] font-black text-white leading-[1.05] mb-6 max-w-[800px]`}>
            Klijenata radije zakazuje
            <span className="text-cyan-400"> online</span>
            <br />
            nego telefonom
          </h2>

          <p className={`${spaceGrotesk.className} text-[30px] text-white/75 leading-relaxed max-w-[760px]`}>
            Bez online zakazivanja,
            <br />
            gubite 2 od 3 klijenta.
          </p>
        </div>
      </div>

      {/* Bottom CTA strip */}
      <div className="px-20 pb-16">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-cyan-400 flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-black" />
            </div>
            <div>
              <p className={`${spaceGrotesk.className} text-[26px] text-white font-semibold`}>Besplatan razgovor</p>
              <p className={`${spaceGrotesk.className} text-[20px] text-white/60`}>fluxel.rs</p>
            </div>
          </div>
          <div className="flex gap-2">
            {[1,2,3,4,5].map(i => (
              <div key={i} className={`w-3 h-3 rounded-full ${i === 1 ? 'bg-cyan-400' : 'bg-white/20'}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  )
}

// ─── Post 2: "3 Tips" listicle post ─────────────────────────────────────────

function Post2() {
  const tips = [
    {
      icon: Calendar,
      title: "Online zakazivanje 24/7",
      body: "Klijenti zakazuju uveče. Ako ne mogu - odlaze.",
      color: "cyan",
    },
    {
      icon: Bell,
      title: "Automatska podsećanja",
      body: "SMS 24h ranije - do 50% manje no-show.",
      color: "blue",
    },
    {
      icon: Globe,
      title: "Google Vas mora videti",
      body: "80% klijenata traži usluge online.",
      color: "violet",
    },
  ]

  const colorMap: Record<string, { icon: string; border: string; num: string }> = {
    cyan:   { icon: "text-cyan-400", border: "border-cyan-400/25", num: "bg-cyan-400 text-black" },
    blue:   { icon: "text-blue-400", border: "border-blue-400/25", num: "bg-blue-400 text-black" },
    violet: { icon: "text-violet-400", border: "border-violet-400/25", num: "bg-violet-400 text-black" },
  }

  return (
    <div className="relative w-[1080px] h-[1350px] bg-[#0a0a0a] overflow-hidden flex flex-col">
      {/* Ambient glows */}
      <div className="absolute top-[200px] left-[-150px] w-[400px] h-[400px] bg-cyan-400/6 rounded-full blur-[100px]" />
      <div className="absolute bottom-[200px] right-[-150px] w-[400px] h-[400px] bg-violet-500/6 rounded-full blur-[100px]" />

      {/* Top bar */}
      <div className="px-20 pt-16 flex items-center justify-between">
        <span className={`${archivo.className} text-[28px] font-black text-white tracking-tight`}>
          &lt;flux<span className="text-cyan-400">el.rs/&gt;</span>
        </span>
      </div>

      {/* Title */}
      <div className="px-20 pt-12 pb-6">
        <div className="rounded-[28px] border border-cyan-400/12 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.12),transparent_34%),linear-gradient(145deg,rgba(10,14,22,0.9),rgba(14,12,20,0.76))] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl p-8">
          <h2 className={`${archivo.className} text-[64px] font-black text-white leading-[1.05]`}>
            3 stvari koje
            <br />
            Vaš biznis
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent"> mora imati</span>
            <br />
            u 2026.
          </h2>
        </div>
      </div>

      {/* Tips */}
      <div className="flex-1 flex flex-col justify-center px-20 gap-8">
        {tips.map(({ icon: Icon, title, body, color }, i) => (
          <div key={i} className={`relative p-8 rounded-[28px] bg-white/[0.06] border ${colorMap[color].border} backdrop-blur-sm`}>
            <div className="flex items-start gap-6">
              <div className={`shrink-0 w-[72px] h-[72px] rounded-2xl ${colorMap[color].num} flex items-center justify-center`}>
                <span className={`${archivo.className} text-[32px] font-black`}>0{i + 1}</span>
              </div>
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <Icon className={`h-9 w-9 ${colorMap[color].icon}`} />
                  <h3 className={`${archivo.className} text-[30px] font-bold text-white leading-none whitespace-nowrap`}>{title}</h3>
                </div>
                <p className={`${spaceGrotesk.className} text-[24px] text-white/70 leading-snug whitespace-nowrap`}>{body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA strip */}
      <div className="px-20 pb-16">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-cyan-400 flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-black" />
            </div>
            <div>
              <p className={`${spaceGrotesk.className} text-[26px] text-white font-semibold`}>Besplatan razgovor</p>
              <p className={`${spaceGrotesk.className} text-[20px] text-white/60`}>fluxel.rs</p>
            </div>
          </div>
          <div className="flex gap-2">
            {[1,2,3,4,5].map(i => (
              <div key={i} className={`w-3 h-3 rounded-full ${i === 2 ? 'bg-cyan-400' : 'bg-white/20'}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Post 3: Problem → Solution post ────────────────────────────────────────

function Post3() {
  const items = [
    {
      problem: "Klijenti zovu dok ste zauzeti",
      solution: "Online zakazivanje radi 24/7",
      icon: Calendar,
    },
    {
      problem: "Termini se gube u Viber porukama",
      solution: "Automatski kalendar bez greške",
      icon: Layout,
    },
    {
      problem: "Klijenti ne dolaze bez podsećanja",
      solution: "SMS podsetnik 24h pre termina",
      icon: Bell,
    },
  ]

  return (
    <div className="relative w-[1080px] h-[1350px] bg-[#0a0a0a] overflow-hidden flex flex-col">
      {/* Ambient */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-cyan-400/8 rounded-full blur-[120px]" />

      {/* Top bar */}
      <div className="px-20 pt-16 flex items-center justify-between">
        <span className={`${archivo.className} text-[28px] font-black text-white tracking-tight`}>
          &lt;flux<span className="text-cyan-400">el.rs/&gt;</span>
        </span>
      </div>

      {/* Title */}
      <div className="px-20 pt-12">
        <div className="rounded-[28px] border border-rose-400/12 bg-[radial-gradient(circle_at_top_left,rgba(248,113,113,0.12),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.10),transparent_34%),linear-gradient(145deg,rgba(18,12,14,0.9),rgba(14,15,22,0.76))] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl p-8">
          <h2 className={`${archivo.className} text-[62px] font-black text-white leading-[1.05] mb-4`}>
            Prepoznajete li
            <span className="bg-gradient-to-r from-red-400 to-rose-500 bg-clip-text text-transparent"> ove probleme?</span>
          </h2>
          <p className={`${spaceGrotesk.className} text-[28px] text-white/70`}>Svaki ima jasno rešenje.</p>
        </div>
      </div>

      {/* Items */}
      <div className="flex-1 flex flex-col justify-center px-20 gap-8">
        {items.map(({ problem, solution }, i) => (
          <div key={i} className="flex items-stretch gap-6">
            {/* Problem */}
            <div className="flex-1 p-7 rounded-3xl bg-red-500/[0.08] border border-red-500/25">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <span className={`${archivo.className} text-red-400 text-[18px] font-black`}>✕</span>
                </div>
                <span className={`${spaceGrotesk.className} text-[16px] text-red-400/70 uppercase tracking-widest font-semibold`}>Problem</span>
              </div>
              <p className={`${spaceGrotesk.className} text-[26px] text-white/80 leading-snug`}>{problem}</p>
            </div>
            {/* Arrow */}
            <div className="flex items-center">
              <ArrowRight className="w-9 h-9 text-white/35" />
            </div>
            {/* Solution */}
            <div className="flex-1 p-7 rounded-3xl bg-cyan-400/[0.08] border border-cyan-400/25">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-400/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-cyan-400" />
                </div>
                <span className={`${spaceGrotesk.className} text-[16px] text-cyan-400/70 uppercase tracking-widest font-semibold`}>Rešenje</span>
              </div>
              <p className={`${spaceGrotesk.className} text-[26px] text-white/90 leading-snug`}>{solution}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="px-20 pb-16">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-cyan-400 flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-black" />
            </div>
            <div>
              <p className={`${spaceGrotesk.className} text-[26px] text-white font-semibold`}>Besplatan razgovor</p>
              <p className={`${spaceGrotesk.className} text-[20px] text-white/60`}>fluxel.rs</p>
            </div>
          </div>
          <div className="flex gap-2">
            {[1,2,3,4,5].map(i => (
              <div key={i} className={`w-3 h-3 rounded-full ${i === 3 ? 'bg-cyan-400' : 'bg-white/20'}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Post 4: Step-by-step process post ──────────────────────────────────────

function Post4() {
  const steps = [
    {
      n: "01",
      title: "Razgovor",
      body: "Javite nam se. Kratak razgovor i jasan plan.",
      icon: MessageCircle,
      color: "cyan",
    },
    {
      n: "02",
      title: "Izrada sistema",
      body: "Gradimo sajt + zakazivanje + automatizaciju.",
      icon: Layout,
      color: "blue",
    },
    {
      n: "03",
      title: "Lansiranje",
      body: "Sistem ide uživo. Podrška je uključena.",
      icon: Zap,
      color: "violet",
    },
  ]

  const colorMap: Record<string, { bg: string; border: string; text: string; line: string }> = {
    cyan:   { bg: "bg-cyan-400/10", border: "border-cyan-400/25", text: "text-cyan-400", line: "from-cyan-400" },
    blue:   { bg: "bg-blue-400/10", border: "border-blue-400/25", text: "text-blue-400", line: "from-blue-400" },
    violet: { bg: "bg-violet-400/10", border: "border-violet-400/25", text: "text-violet-400", line: "from-violet-400" },
  }

  return (
    <div className="relative w-[1080px] h-[1350px] bg-[#0a0a0a] overflow-hidden flex flex-col">
      {/* Ambient */}
      <div className="absolute top-[300px] left-[-100px] w-[400px] h-[600px] bg-cyan-400/5 rounded-full blur-[120px]" />

      {/* Top bar */}
      <div className="px-20 pt-16 flex items-center justify-between">
        <span className={`${archivo.className} text-[28px] font-black text-white tracking-tight`}>
          &lt;flux<span className="text-cyan-400">el.rs/&gt;</span>
        </span>
      </div>

      {/* Title */}
      <div className="px-20 pt-12 pb-6">
        <div className="rounded-[28px] border border-cyan-400/12 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.10),transparent_34%),linear-gradient(145deg,rgba(8,13,22,0.9),rgba(14,14,20,0.76))] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl p-8">
          <h2 className={`${archivo.className} text-[62px] font-black text-white leading-[1.05]`}>
            Kako do sistema koji
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent"> radi za Vas</span>
          </h2>
          <p className={`${spaceGrotesk.className} text-[28px] text-white/70 mt-4`}>
            Samo 3 koraka. Bez komplikacija.
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="flex-1 flex flex-col justify-center px-20 gap-9">
        {steps.map(({ n, title, body, icon: Icon, color }, i) => (
          <div key={n} className="relative">
            {/* Connecting line */}
            {i < steps.length - 1 && (
              <div className={`absolute left-11 top-[134px] w-px h-8 bg-gradient-to-b ${colorMap[color].line} to-transparent`} />
            )}
            <div className={`px-8 py-7 rounded-[28px] bg-white/[0.06] border ${colorMap[color].border}`}>
              <div className="flex items-start gap-6">
                <div className={`shrink-0 w-[84px] h-[84px] rounded-2xl ${colorMap[color].bg} border ${colorMap[color].border} flex items-center justify-center`}>
                  <Icon className={`w-9 h-9 ${colorMap[color].text}`} />
                </div>
                <div className="min-w-0 flex-1 pt-1 pr-2">
                  <div className="flex items-center gap-4 mb-2">
                    <span className={`${archivo.className} text-[18px] font-black ${colorMap[color].text} uppercase tracking-[0.15em]`}>
                      Korak {n}
                    </span>
                  </div>
                  <h3 className={`${archivo.className} text-[34px] font-bold text-white leading-[1.08] mb-2 max-w-[540px]`}>{title}</h3>
                  <p className={`${spaceGrotesk.className} text-[23px] text-white/72 leading-[1.35] max-w-[560px]`}>{body}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="px-20 pb-16">
        <div className="flex justify-end px-2">
          <div className="flex gap-2">
            {[1,2,3,4,5].map(i => (
              <div key={i} className={`w-3 h-3 rounded-full ${i === 4 ? 'bg-cyan-400' : 'bg-white/20'}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Post 5: Quote / insight post ───────────────────────────────────────────

function Post5() {
  return (
    <div className="relative w-[1080px] h-[1350px] bg-[#0a0a0a] overflow-hidden flex flex-col">
      {/* Ambient */}
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-400/6 rounded-full blur-[150px]" />

      {/* Top bar */}
      <div className="px-20 pt-16 flex items-center justify-between">
        <span className={`${archivo.className} text-[28px] font-black text-white tracking-tight`}>
          &lt;flux<span className="text-cyan-400">el.rs/&gt;</span>
        </span>
      </div>

      {/* Main quote area */}
      <div className="flex-1 flex flex-col justify-center px-20">
        <div className="rounded-[32px] border border-cyan-400/12 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.10),transparent_34%),linear-gradient(145deg,rgba(8,14,22,0.9),rgba(12,12,18,0.8))] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-2xl p-10">
          {/* Opening quote mark */}
          <div className="mb-6">
            <span className={`${archivo.className} text-[220px] leading-[0.6] font-black bg-gradient-to-b from-cyan-400/40 to-cyan-400/10 bg-clip-text text-transparent`}>
              &ldquo;
            </span>
          </div>

          <h2 className={`${archivo.className} text-[66px] font-black text-white leading-[1.1] mb-8 max-w-[900px]`}>
            Vaš sajt nije trošak.
            <br />
            Vaš sajt je
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"> radnik koji ne spava.</span>
          </h2>

          <div className="h-px w-full bg-gradient-to-r from-cyan-400/40 via-white/10 to-transparent mb-8" />

          <p className={`${spaceGrotesk.className} text-[30px] text-white/75 leading-relaxed max-w-[780px]`}>
            Dok Vi spavate, Vaš sajt
            <br />
            zakazuje termine i šalje podsećanja.
          </p>

          {/* Stats row */}
          <div className="flex gap-14 mt-12">
            {[
              { value: "24/7", label: "Dostupnost" },
              { value: "-50%", label: "Manje no-show" },
              { value: "+2h", label: "Ušteda dnevno" },
            ].map(({ value, label }) => (
              <div key={label}>
                <span className={`${archivo.className} text-[64px] font-black text-cyan-400`}>{value}</span>
                <p className={`${spaceGrotesk.className} text-[20px] text-white/50 mt-1`}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-20 pb-16">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-cyan-400 flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-black" />
            </div>
            <div>
              <p className={`${spaceGrotesk.className} text-[26px] text-white font-semibold`}>Besplatan razgovor</p>
              <p className={`${spaceGrotesk.className} text-[20px] text-white/60`}>fluxel.rs</p>
            </div>
          </div>
          <div className="flex gap-2">
            {[1,2,3,4,5].map(i => (
              <div key={i} className={`w-3 h-3 rounded-full ${i === 5 ? 'bg-cyan-400' : 'bg-white/20'}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Logo variants ──────────────────────────────────────────────────────────

function LogoFull() {
  return (
    <div className="w-[2000px] h-[2000px] bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-[-200px] left-[-200px] w-[800px] h-[800px] bg-cyan-400/8 rounded-full blur-[200px]" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[800px] h-[800px] bg-violet-500/5 rounded-full blur-[200px]" />

      <div className="text-center">
        {/* Code bracket mark */}
        <div className="mb-16">
          <span className={`${archivo.className} text-[280px] font-black text-white leading-none`}>
            &lt;f<span className="text-cyan-400">x</span>/&gt;
          </span>
        </div>
        {/* Wordmark */}
        <span className={`${archivo.className} text-[140px] font-black text-white tracking-tight`}>
          flux<span className="text-cyan-400">el</span>
        </span>
        <div className="mt-8 h-1.5 w-80 mx-auto bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent rounded-full" />
        <p className={`${spaceGrotesk.className} text-[40px] text-white/40 mt-10 tracking-[0.3em] uppercase`}>
          web systems agency
        </p>
      </div>
    </div>
  )
}

function LogoMark() {
  return (
    <div className="w-[1000px] h-[1000px] bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-cyan-400/5 rounded-full blur-[150px] m-auto w-[600px] h-[600px]" />
      <span className={`${archivo.className} text-[320px] font-black text-white leading-none relative`}>
        &lt;f<span className="text-cyan-400">x</span>/&gt;
      </span>
    </div>
  )
}

function LogoWordmark() {
  return (
    <div className="w-[2000px] h-[600px] bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden">
      <div className="absolute left-[-100px] w-[500px] h-[500px] bg-cyan-400/6 rounded-full blur-[150px]" />
      <div className="flex items-center gap-16">
        <span className={`${archivo.className} text-[200px] font-black text-white leading-none`}>
          &lt;f<span className="text-cyan-400">x</span>/&gt;
        </span>
        <div className="h-32 w-px bg-white/15" />
        <div>
          <span className={`${archivo.className} text-[120px] font-black text-white tracking-tight leading-none`}>
            flux<span className="text-cyan-400">el</span>
          </span>
          <p className={`${spaceGrotesk.className} text-[32px] text-white/40 tracking-[0.25em] uppercase mt-2`}>
            web systems agency
          </p>
        </div>
      </div>
    </div>
  )
}

function LogoTransparent() {
  return (
    <div className="w-[2000px] h-[2000px] flex items-center justify-center relative overflow-hidden" style={{ background: "transparent" }}>
      <div className="text-center">
        <div className="mb-16">
          <span className={`${archivo.className} text-[280px] font-black text-white leading-none`}>
            &lt;f<span className="text-cyan-400">x</span>/&gt;
          </span>
        </div>
        <span className={`${archivo.className} text-[140px] font-black text-white tracking-tight`}>
          flux<span className="text-cyan-400">el</span>
        </span>
        <div className="mt-8 h-1.5 w-80 mx-auto bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent rounded-full" />
        <p className={`${spaceGrotesk.className} text-[40px] text-white/40 mt-10 tracking-[0.3em] uppercase`}>
          web systems agency
        </p>
      </div>
    </div>
  )
}

const logos = [
  { id: "full", label: "Full Logo (dark bg)", component: LogoFull, w: 2000, h: 2000, filename: "fluxel-logo-full.png" },
  { id: "mark", label: "Logo Mark", component: LogoMark, w: 1000, h: 1000, filename: "fluxel-logomark.png" },
  { id: "wordmark", label: "Horizontal Wordmark", component: LogoWordmark, w: 2000, h: 600, filename: "fluxel-wordmark.png" },
  { id: "transparent", label: "Full Logo (transparent)", component: LogoTransparent, w: 2000, h: 2000, filename: "fluxel-logo-transparent.png" },
]

type Asset = {
  id: string
  label: string
  component: ComponentType
  w: number
  h: number
  filename: string
}

const posts: Asset[] = [
  { id: "post-1", label: "Post 1: Did You Know?", component: Post1, w: 1080, h: 1350, filename: "fluxel-post-1.png" },
  { id: "post-2", label: "Post 2: 3 Tips", component: Post2, w: 1080, h: 1350, filename: "fluxel-post-2.png" },
  { id: "post-3", label: "Post 3: Problem to Solution", component: Post3, w: 1080, h: 1350, filename: "fluxel-post-3.png" },
  { id: "post-4", label: "Post 4: Process", component: Post4, w: 1080, h: 1350, filename: "fluxel-post-4.png" },
  { id: "post-5", label: "Post 5: Insight", component: Post5, w: 1080, h: 1350, filename: "fluxel-post-5.png" },
]

const logoAssets: Asset[] = logos
const allAssets: Asset[] = [...posts, ...logoAssets]

function AssetGrid({
  title,
  description,
  assets,
  downloading,
  onDownload,
  registerRef,
}: {
  title: string
  description: string
  assets: Asset[]
  downloading: string | null
  onDownload: (asset: Asset) => void
  registerRef: (id: string, el: HTMLDivElement | null) => void
}) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className={`${archivo.className} text-3xl font-bold text-white`}>{title}</h2>
        <p className="max-w-2xl text-sm leading-relaxed text-white/50">{description}</p>
      </div>

      <div className="grid gap-10">
        {assets.map((asset) => {
          const AssetComponent = asset.component
          const previewStyle = {
            "--asset-scale": `calc(100cqw / ${asset.w})`,
          } as CSSProperties

          return (
            <article key={asset.id} className="rounded-[28px] border border-white/10 bg-white/[0.03] p-4 sm:p-6">
              <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className={`${archivo.className} text-lg font-bold text-white/85 sm:text-xl`}>{asset.label}</h3>
                  <p className="mt-1 text-xs text-white/35 sm:text-sm">
                    {asset.w} x {asset.h}px · {asset.filename}
                  </p>
                </div>

                <button
                  onClick={() => onDownload(asset)}
                  disabled={downloading === asset.id}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-all hover:border-cyan-400 hover:bg-cyan-400 hover:text-black disabled:opacity-50 sm:w-auto"
                >
                  <Download className="h-4 w-4" />
                  {downloading === asset.id ? "Saving..." : "Save PNG"}
                </button>
              </div>

              <div className="mx-auto w-full max-w-[40rem]">
                <div
                  className={`overflow-hidden rounded-[22px] ring-1 ring-white/10 transition-all hover:ring-cyan-400/40 ${asset.id === "transparent" ? "bg-[repeating-conic-gradient(#222_0%_25%,#1a1a1a_0%_50%)]" : "bg-neutral-950"}`}
                  style={{ backgroundSize: asset.id === "transparent" ? "20px 20px" : undefined }}
                >
                  <div
                    className="[container-type:inline-size] relative w-full"
                    style={{ aspectRatio: `${asset.w} / ${asset.h}` }}
                  >
                    <div
                      ref={(el) => registerRef(asset.id, el)}
                      className="absolute left-0 top-0 origin-top-left"
                      style={{
                        ...previewStyle,
                        width: asset.w,
                        height: asset.h,
                        transform: "scale(var(--asset-scale))",
                      }}
                    >
                      <AssetComponent />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function InstagramPage() {
  const [downloading, setDownloading] = useState<string | null>(null)
  const [downloadingAll, setDownloadingAll] = useState(false)
  const assetRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const registerRef = useCallback((id: string, el: HTMLDivElement | null) => {
    assetRefs.current[id] = el
  }, [])

  const downloadAsset = useCallback(async (asset: Asset) => {
    const el = assetRefs.current[asset.id]
    if (!el) return

    setDownloading(asset.id)
    try {
      const { domToPng } = await import("modern-screenshot")
      const dataUrl = await domToPng(el, {
        width: asset.w,
        height: asset.h,
        backgroundColor: asset.id === "transparent" ? undefined : "#0a0a0a",
      })
      const link = document.createElement("a")
      link.download = asset.filename
      link.href = dataUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      console.error("Download failed:", err)
    } finally {
      setDownloading(null)
    }
  }, [])

  const downloadAll = useCallback(async () => {
    setDownloadingAll(true)
    for (const asset of allAssets) {
      await downloadAsset(asset)
      await new Promise(r => setTimeout(r, 800))
    }
    setDownloadingAll(false)
  }, [downloadAsset])

  return (
    <div className={`min-h-screen bg-neutral-950 text-white ${spaceGrotesk.className}`}>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className={`${archivo.className} text-2xl font-bold`}>Fluxel Instagram Kit</h1>
            <p className="text-white/40 text-sm mt-1">Posts and logo assets, ready to preview and export.</p>
          </div>
          <button
            onClick={downloadAll}
            disabled={downloadingAll || downloading !== null}
            className="flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-sm px-6 py-3 rounded-full transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            {downloadingAll ? "Saving..." : "Download all assets"}
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-16 px-6 py-10">
        <AssetGrid
          title="Instagram Posts"
          description="Five ready-made square-to-portrait social concepts for the Fluxel offer. Each preview renders directly on the page and can be exported as a PNG."
          assets={posts}
          downloading={downloading}
          onDownload={downloadAsset}
          registerRef={registerRef}
        />

        <AssetGrid
          title="Logo Variants"
          description="Brand assets for profile images, story covers, and external use."
          assets={logoAssets}
          downloading={downloading}
          onDownload={downloadAsset}
          registerRef={registerRef}
        />
      </div>
    </div>
  )
}
