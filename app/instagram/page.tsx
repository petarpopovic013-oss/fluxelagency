"use client"

import { useState, useRef, useCallback } from "react"
import { domToJpeg } from "modern-screenshot"
import { Download } from "lucide-react"
import {
  Calendar, Bell, Zap, Layout, Globe, Clock,
  Check, ArrowRight, Sparkles, ChevronLeft, ChevronRight,
  Lightbulb, TrendingUp, AlertTriangle, BookOpen, MessageCircle,
} from "lucide-react"

const archivo = {
  className: "[font-family:var(--font-heading)]",
}

const spaceGrotesk = {
  className: "[font-family:var(--font-body)]",
}

// ─── Post 1: "Did You Know?" fact post ──────────────────────────────────────

function Post1() {
  return (
    <div className="relative w-[1080px] h-[1350px] bg-[#0a0a0a] overflow-hidden flex flex-col">
      {/* Ambient glows */}
      <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-cyan-400/8 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-violet-500/6 rounded-full blur-[120px]" />

      {/* Top bar */}
      <div className="px-16 pt-14 flex items-center justify-between">
        <span className={`${archivo.className} text-[28px] font-black text-white tracking-tight`}>
          &lt;flux<span className="text-cyan-400">el.rs/&gt;</span>
        </span>
        <div className="flex items-center gap-3 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2">
          <Lightbulb className="w-5 h-5 text-cyan-400" />
          <span className={`${spaceGrotesk.className} text-[18px] font-semibold uppercase tracking-[0.2em] text-cyan-400`}>
            Da li ste znali?/
          </span>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col justify-center px-16">
        {/* Big stat */}
        <div className="mb-12">
          <span className={`${archivo.className} text-[180px] font-black leading-[0.85] bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent`}>
            67%
          </span>
          <div className="mt-4 h-1 w-40 bg-gradient-to-r from-cyan-400 to-transparent rounded-full" />
        </div>

        {/* Explanation */}
        <h2 className={`${archivo.className} text-[52px] font-black text-white leading-[1.1] mb-8 max-w-[800px]`}>
          klijenata radije zakazuje
          <span className="text-cyan-400"> online</span> nego
          telefonom
        </h2>

        <p className={`${spaceGrotesk.className} text-[26px] text-white/60 leading-relaxed max-w-[700px]`}>
          Ako Vaš biznis nema online zakazivanje, gubite
          dva od tri potencijalna klijenta pre nego što
          vam se uopšte jave.
        </p>
      </div>

      {/* Bottom CTA strip */}
      <div className="px-16 pb-14">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-cyan-400 flex items-center justify-center">
              <ArrowRight className="w-7 h-7 text-black" />
            </div>
            <div>
              <p className={`${spaceGrotesk.className} text-[22px] text-white font-semibold`}>Besplatan razgovor</p>
              <p className={`${spaceGrotesk.className} text-[18px] text-white/50`}>fluxel.rs</p>
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
      title: "Omogućite online zakazivanje 24/7",
      body: "Klijenti žele da zakažu u 23h sa kauča. Ako ne mogu - idu kod konkurenta.",
      color: "cyan",
    },
    {
      icon: Bell,
      title: "Automatska podsećanja pre termina",
      body: "SMS podsećanje 24h ranije smanjuje 'no-show' termine za čak 50%.",
      color: "blue",
    },
    {
      icon: Globe,
      title: "Google Vas mora pronaći prvi",
      body: "80% klijenata traži usluge na Googlu. Bez SEO-a, vi ne postojite.",
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
      <div className="px-16 pt-14 flex items-center justify-between">
        <span className={`${archivo.className} text-[28px] font-black text-white tracking-tight`}>
          &lt;flux<span className="text-cyan-400">el.rs/&gt;</span>
        </span>
        <div className="flex items-center gap-3 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2">
          <BookOpen className="w-5 h-5 text-cyan-400" />
          <span className={`${spaceGrotesk.className} text-[18px] font-semibold uppercase tracking-[0.2em] text-cyan-400`}>
            Saveti
          </span>
        </div>
      </div>

      {/* Title */}
      <div className="px-16 pt-12 pb-8">
        <h2 className={`${archivo.className} text-[56px] font-black text-white leading-[1.1]`}>
          3 stvari koje Vaš biznis
          <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent"> mora imati </span>
          u 2026.
        </h2>
      </div>

      {/* Tips */}
      <div className="flex-1 flex flex-col justify-center px-16 gap-7">
        {tips.map(({ icon: Icon, title, body, color }, i) => (
          <div key={i} className={`relative p-8 rounded-[24px] bg-white/[0.05] border ${colorMap[color].border} backdrop-blur-sm`}>
            <div className="flex items-start gap-6">
              <div className={`shrink-0 w-16 h-16 rounded-2xl ${colorMap[color].num} flex items-center justify-center`}>
                <span className={`${archivo.className} text-[28px] font-black`}>0{i + 1}</span>
              </div>
              <div>
                <h3 className={`${archivo.className} text-[28px] font-bold text-white mb-2 leading-tight`}>{title}</h3>
                <p className={`${spaceGrotesk.className} text-[22px] text-white/55 leading-relaxed`}>{body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA strip */}
      <div className="px-16 pb-14">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-cyan-400 flex items-center justify-center">
              <ArrowRight className="w-7 h-7 text-black" />
            </div>
            <div>
              <p className={`${spaceGrotesk.className} text-[22px] text-white font-semibold`}>Besplatan razgovor</p>
              <p className={`${spaceGrotesk.className} text-[18px] text-white/50`}>fluxel.rs</p>
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
    {
      problem: "Trošite sate na administraciju",
      solution: "Automatizovani procesi rade za vas",
      icon: Zap,
    },
  ]

  return (
    <div className="relative w-[1080px] h-[1350px] bg-[#0a0a0a] overflow-hidden flex flex-col">
      {/* Ambient */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-cyan-400/8 rounded-full blur-[120px]" />

      {/* Top bar */}
      <div className="px-16 pt-14 flex items-center justify-between">
        <span className={`${archivo.className} text-[28px] font-black text-white tracking-tight`}>
          &lt;flux<span className="text-cyan-400">el.rs/&gt;</span>
        </span>
        <div className="flex items-center gap-3 rounded-full border border-red-400/30 bg-red-400/10 px-5 py-2">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <span className={`${spaceGrotesk.className} text-[18px] font-semibold uppercase tracking-[0.2em] text-red-400`}>
            Problem → Rešenje
          </span>
        </div>
      </div>

      {/* Title */}
      <div className="px-16 pt-12">
        <h2 className={`${archivo.className} text-[52px] font-black text-white leading-[1.1] mb-3`}>
          Prepoznajete li
          <span className="bg-gradient-to-r from-red-400 to-rose-500 bg-clip-text text-transparent"> ove probleme?</span>
        </h2>
        <p className={`${spaceGrotesk.className} text-[24px] text-white/50`}>Svaki ima rešenje.</p>
      </div>

      {/* Items */}
      <div className="flex-1 flex flex-col justify-center px-16 gap-6">
        {items.map(({ problem, solution, icon: Icon }, i) => (
          <div key={i} className="flex items-stretch gap-5">
            {/* Problem */}
            <div className="flex-1 p-6 rounded-2xl bg-red-500/[0.06] border border-red-500/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <span className={`${archivo.className} text-red-400 text-[14px] font-black`}>✕</span>
                </div>
                <span className={`${spaceGrotesk.className} text-[14px] text-red-400/70 uppercase tracking-widest font-semibold`}>Problem</span>
              </div>
              <p className={`${spaceGrotesk.className} text-[20px] text-white/70 leading-snug`}>{problem}</p>
            </div>
            {/* Arrow */}
            <div className="flex items-center">
              <ArrowRight className="w-7 h-7 text-white/30" />
            </div>
            {/* Solution */}
            <div className="flex-1 p-6 rounded-2xl bg-cyan-400/[0.06] border border-cyan-400/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-400/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-cyan-400" />
                </div>
                <span className={`${spaceGrotesk.className} text-[14px] text-cyan-400/70 uppercase tracking-widest font-semibold`}>Rešenje</span>
              </div>
              <p className={`${spaceGrotesk.className} text-[20px] text-white/80 leading-snug`}>{solution}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="px-16 pb-14">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-cyan-400 flex items-center justify-center">
              <ArrowRight className="w-7 h-7 text-black" />
            </div>
            <div>
              <p className={`${spaceGrotesk.className} text-[22px] text-white font-semibold`}>Besplatan razgovor</p>
              <p className={`${spaceGrotesk.className} text-[18px] text-white/50`}>fluxel.rs</p>
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
      body: "Javite nam se - mi slušamo vaše potrebe i predlažemo konkretno rešenje.",
      icon: MessageCircle,
      color: "cyan",
    },
    {
      n: "02",
      title: "Izrada sistema",
      body: "Dizajniramo i razvijamo sajt + zakazivanje + automatizaciju.",
      icon: Layout,
      color: "blue",
    },
    {
      n: "03",
      title: "Lansiranje",
      body: "Vaš sistem ide uživo. Mi ostajemo uz Vas sa podrškom.",
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
      <div className="px-16 pt-14 flex items-center justify-between">
        <span className={`${archivo.className} text-[28px] font-black text-white tracking-tight`}>
          &lt;flux<span className="text-cyan-400">el.rs/&gt;</span>
        </span>
        <div className="flex items-center gap-3 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2">
          <TrendingUp className="w-5 h-5 text-cyan-400" />
          <span className={`${spaceGrotesk.className} text-[18px] font-semibold uppercase tracking-[0.2em] text-cyan-400`}>
            Proces
          </span>
        </div>
      </div>

      {/* Title */}
      <div className="px-16 pt-12 pb-6">
        <h2 className={`${archivo.className} text-[56px] font-black text-white leading-[1.1]`}>
          Kako do sistema koji
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent"> radi za vas</span>
        </h2>
        <p className={`${spaceGrotesk.className} text-[24px] text-white/50 mt-4`}>
          Samo 3 koraka. Bez komplikacija.
        </p>
      </div>

      {/* Steps */}
      <div className="flex-1 flex flex-col justify-center px-16 gap-8">
        {steps.map(({ n, title, body, icon: Icon, color }, i) => (
          <div key={n} className="relative">
            {/* Connecting line */}
            {i < steps.length - 1 && (
              <div className={`absolute left-10 top-[120px] w-px h-8 bg-gradient-to-b ${colorMap[color].line} to-transparent`} />
            )}
            <div className={`p-8 rounded-[24px] bg-white/[0.05] border ${colorMap[color].border}`}>
              <div className="flex items-start gap-7">
                <div className={`shrink-0 w-20 h-20 rounded-2xl ${colorMap[color].bg} border ${colorMap[color].border} flex items-center justify-center`}>
                  <Icon className={`w-9 h-9 ${colorMap[color].text}`} />
                </div>
                <div className="pt-1">
                  <div className="flex items-center gap-4 mb-3">
                    <span className={`${archivo.className} text-[18px] font-black ${colorMap[color].text} uppercase tracking-[0.15em]`}>
                      Korak {n}
                    </span>
                  </div>
                  <h3 className={`${archivo.className} text-[32px] font-bold text-white mb-2`}>{title}</h3>
                  <p className={`${spaceGrotesk.className} text-[22px] text-white/55 leading-relaxed`}>{body}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="px-16 pb-14">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-cyan-400 flex items-center justify-center">
              <ArrowRight className="w-7 h-7 text-black" />
            </div>
            <div>
              <p className={`${spaceGrotesk.className} text-[22px] text-white font-semibold`}>Započnite danas</p>
              <p className={`${spaceGrotesk.className} text-[18px] text-white/50`}>fluxel.rs</p>
            </div>
          </div>
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
      <div className="px-16 pt-14 flex items-center justify-between">
        <span className={`${archivo.className} text-[28px] font-black text-white tracking-tight`}>
          &lt;flux<span className="text-cyan-400">el.rs/&gt;</span>
        </span>
        <div className="flex items-center gap-3 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <span className={`${spaceGrotesk.className} text-[18px] font-semibold uppercase tracking-[0.2em] text-cyan-400`}>
            Insight
          </span>
        </div>
      </div>

      {/* Main quote area */}
      <div className="flex-1 flex flex-col justify-center px-16">
        {/* Opening quote mark */}
        <div className="mb-8">
          <span className={`${archivo.className} text-[200px] leading-[0.6] font-black bg-gradient-to-b from-cyan-400/40 to-cyan-400/10 bg-clip-text text-transparent`}>
            &ldquo;
          </span>
        </div>

        <h2 className={`${archivo.className} text-[54px] font-black text-white leading-[1.15] mb-10 max-w-[900px]`}>
          Vaš sajt nije trošak.
          <br />
          Vaš sajt je
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"> radnik koji nikad ne spava.</span>
        </h2>

        <div className="h-px w-full bg-gradient-to-r from-cyan-400/40 via-white/10 to-transparent mb-10" />

        <p className={`${spaceGrotesk.className} text-[26px] text-white/55 leading-relaxed max-w-[750px]`}>
          Dok vi spavate, vaš sajt zakazuje termine, šalje podsećanja i konvertuje posetioce u klijente. To nije
          luksuz — to je sistem koji zarađuje.
        </p>

        {/* Stats row */}
        <div className="flex gap-12 mt-14">
          {[
            { value: "24/7", label: "Dostupnost" },
            { value: "-50%", label: "Manje no-show" },
            { value: "+2h", label: "Ušteda dnevno" },
          ].map(({ value, label }) => (
            <div key={label}>
              <span className={`${archivo.className} text-[48px] font-black text-cyan-400`}>{value}</span>
              <p className={`${spaceGrotesk.className} text-[18px] text-white/40 mt-1`}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-16 pb-14">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-cyan-400 flex items-center justify-center">
              <ArrowRight className="w-7 h-7 text-black" />
            </div>
            <div>
              <p className={`${spaceGrotesk.className} text-[22px] text-white font-semibold`}>Besplatan razgovor</p>
              <p className={`${spaceGrotesk.className} text-[18px] text-white/50`}>fluxel.rs</p>
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

// ─── Gallery page ───────────────────────────────────────────────────────────

const posts = [
  { id: "post-1", label: "Did you know", component: Post1 },
  { id: "post-2", label: "3 tips", component: Post2 },
  { id: "post-3", label: "Problem to solution", component: Post3 },
  { id: "post-4", label: "Step by step process", component: Post4 },
  { id: "post-5", label: "Quote insight", component: Post5 },
] as const

export default function InstagramTemplates() {
  const [downloading, setDownloading] = useState<number | null>(null)
  const [downloadingAll, setDownloadingAll] = useState(false)
  const postRefs = useRef<(HTMLDivElement | null)[]>([])

  const downloadPost = useCallback(async (index: number) => {
    const el = postRefs.current[index]
    if (!el) return

    setDownloading(index)
    try {
      const dataUrl = await domToJpeg(el, {
        width: 1080,
        height: 1350,
        quality: 0.95,
        backgroundColor: "#0a0a0a",
      })
      const link = document.createElement("a")
      link.download = `fluxel-post-${index + 1}.jpg`
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
    for (let i = 0; i < posts.length; i++) {
      await downloadPost(i)
      await new Promise(r => setTimeout(r, 800))
    }
    setDownloadingAll(false)
  }, [downloadPost])

  return (
    <div className={`min-h-screen bg-neutral-950 text-white ${spaceGrotesk.className}`}>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className={`${archivo.className} text-2xl font-bold`}>Fluxel Instagram Posts</h1>
            <p className="text-white/40 text-sm mt-1">1080 x 1350 — click post or button to save JPG</p>
          </div>
          <button
            onClick={downloadAll}
            disabled={downloadingAll || downloading !== null}
            className="flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-sm px-6 py-3 rounded-full transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            {downloadingAll ? "Saving..." : "Download all 5"}
          </button>
        </div>
      </div>

      {/* All 5 posts */}
      <div className="max-w-[600px] mx-auto px-6 py-10 space-y-12">
        {posts.map((p, i) => {
          const PostComponent = p.component
          return (
            <div key={p.id}>
              {/* Label + download */}
              <div className="flex items-center justify-between mb-4">
                <h2 className={`${archivo.className} text-xl font-bold text-white/80`}>
                  {i + 1}. {p.label}
                </h2>
                <button
                  onClick={() => downloadPost(i)}
                  disabled={downloading === i}
                  className="flex items-center gap-2 bg-white/10 hover:bg-cyan-400 hover:text-black text-white text-sm font-semibold px-5 py-2.5 rounded-full border border-white/10 hover:border-cyan-400 transition-all disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  {downloading === i ? "Saving..." : "Save JPG"}
                </button>
              </div>

              {/* Post — rendered at full 1080x1350, visually scaled to container */}
              <div
                className="cursor-pointer rounded-xl overflow-hidden ring-1 ring-white/10 hover:ring-cyan-400/40 transition-all"
                onClick={() => downloadPost(i)}
                style={{ position: "relative", width: "100%", paddingBottom: "125%" }}
              >
                <div
                  ref={el => { postRefs.current[i] = el }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 1080,
                    height: 1350,
                    transformOrigin: "top left",
                    transform: "scale(var(--s))",
                  }}
                >
                  <PostComponent />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Scale posts to fit their containers */}
      <style>{`
        [style*="padding-bottom: 125%"] {
          container-type: inline-size;
        }
        [style*="padding-bottom: 125%"] > div {
          --s: calc(100cqw / 1080);
        }
      `}</style>
    </div>
  )
}
