"use client"

import dynamic from "next/dynamic"
import { useState, useEffect, useRef, type FormEvent } from "react"
import { motion, useInView, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion"
import {
  PhoneOff, MessageSquareX, CalendarX, Globe, Clock,
  Calendar, Bell, Zap, RefreshCw, Layout,
  Check, Phone, Mail, MapPin, Star,
  Shield, Users, Award, Headphones,
  ChevronRight, Menu, X, ArrowRight, Quote,
  Code2, BarChart2, Sparkles,
} from "lucide-react"

const EtherealBeamsHero = dynamic(
  () => import("@/components/ui/ethereal-beams-hero"),
  { ssr: false, loading: () => <div className="min-h-screen w-full bg-black" /> }
)

// ─── Social icons ─────────────────────────────────────────────────────────────

type SI = { className?: string }
const IconInstagram = ({ className = "w-4 h-4" }: SI) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
const IconLinkedin = ({ className = "w-4 h-4" }: SI) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
)
const IconX = ({ className = "w-4 h-4" }: SI) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

// ─── Animation helpers ────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SlideIn({ children, delay = 0, className = "", direction = "left" }: { children: React.ReactNode; delay?: number; className?: string; direction?: "left" | "right" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === "left" ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function ScaleIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Animated counter for stats
function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const numericPart = parseInt(value.replace(/\D/g, "")) || 0
  const hasPlus = value.includes("+")
  const isText = isNaN(parseInt(value))

  if (isText) return <span ref={ref}>{value}</span>

  return (
    <span ref={ref}>
      {isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <CountUp target={numericPart} />
          {hasPlus && "+"}
          {suffix}
        </motion.span>
      ) : "0"}
    </span>
  )
}

function CountUp({ target }: { target: number }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let frame: number
    const duration = 1500
    const start = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [target])
  return <>{count}</>
}

// Magnetic hover effect
function MagneticWrap({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - rect.left - rect.width / 2) * 0.15)
        y.set((e.clientY - rect.top - rect.height / 2) * 0.15)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Section divider ──────────────────────────────────────────────────────────

function SectionDivider() {
  return (
    <div className="relative h-px w-full overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent origin-center"
      />
    </div>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const links = [
    { label: "Problem", href: "#problem" },
    { label: "Resenje", href: "#resenje" },
    { label: "Radovi", href: "#radovi" },
    { label: "O nama", href: "#o-nama" },
  ]

  const close = () => setOpen(false)

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/80 backdrop-blur-2xl border-b border-white/[0.15] shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#hero"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-xl font-black text-white tracking-tight"
          >
            &lt;flux<span className="text-cyan-400">el.rs/&gt;</span>
          </motion.a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 rounded-full bg-white/5 backdrop-blur-xl border border-white/[0.15] px-2 py-1">
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3, duration: 0.5 }}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                className="px-4 py-2 rounded-full text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                {l.label}
              </motion.a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <MagneticWrap>
            <motion.a
              href="#kontakt"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34,211,238,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-sm px-5 py-2.5 rounded-full transition-colors"
            >
              Besplatan razgovor
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </MagneticWrap>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(o => !o)} aria-label="Menu"
            className="md:hidden w-10 h-10 flex items-center justify-center text-white/70 hover:text-white">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/[0.15] px-6 py-4 space-y-1 overflow-hidden"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={close}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="block px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href="#kontakt"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-3 flex items-center justify-center gap-2 bg-cyan-400 text-black font-bold text-sm px-5 py-3 rounded-full w-full transition-all"
            >
              Besplatan razgovor <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

// ─── Shared atoms ─────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-5"
    >
      <Sparkles className="w-3 h-3" />
      {children}
    </motion.div>
  )
}

// ─── 1. Pain section ──────────────────────────────────────────────────────────

const pains = [
  {
    icon: PhoneOff,
    title: "Klijenti zovu dok ste zauzeti - i odu kod konkurencije",
    body: "Svaki propušten poziv je propušten prihod. Dok ste u radu sa jednim klijentom, drugi odlazi kod nekoga ko ima online zakazivanje.",
  },
  {
    icon: MessageSquareX,
    title: "Viber poruke se gomilaju, termini se gube u haosu",
    body: "Zakazivanje kroz Viber je nepouzdano - poruke se brišu, termini se dupliraju, a vi stalno proveravate telefon.",
  },
  {
    icon: CalendarX,
    title: "Klijenti ne dolaze jer nema automatskih podsećanja",
    body: "Bez automatskog SMS ili email podsećanja, svaki deseti termin je 'no-show' - izgubljen prihod koji niko nije otkazao.",
  },
  {
    icon: Globe,
    title: "Nemate sajt ili imate sajt koji ne radi ništa za vas",
    body: "Ako vas ne mogu pronaći na Googlu ili ne mogu odmah zakazati sa vašeg sajta, klijent odlazi dalje za 30 sekundi.",
  },
  {
    icon: Clock,
    title: "Trošite sate na administraciju umesto na rad koji volite",
    body: "Svako jutro prepisivanje termina, podsećanje klijenata, odgovaranje na iste poruke - to su sati ukrađeni od vašeg stvarnog posla.",
  },
]

function PainSection() {
  return (
    <section id="problem" className="py-28 bg-[#0c0d12] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <FadeIn className="text-center mb-16">
          <SectionLabel>Prepoznajete li ovo?</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5">
            Svaki dan bez sistema za zakazivanje<br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-red-400 to-rose-500 bg-clip-text text-transparent"> košta vas novac</span>
          </h2>
          <p className="text-white/75 text-lg max-w-2xl mx-auto">
            Razgovarali smo sa desetinama vlasnika malih biznisa u Srbiji. Evo šta čujemo iznova i iznova.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pains.map(({ icon: Icon, title, body }, i) => (
            <ScaleIn key={title} delay={i * 0.08}>
              <motion.div
                whileHover={{ scale: 1.03, y: -5, borderColor: "rgba(239,68,68,0.3)" }}
                transition={{ duration: 0.3 }}
                className="h-full p-6 rounded-2xl bg-white/[0.07] border border-white/[0.15] transition-all duration-300 group cursor-default"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 group-hover:bg-red-500/20 group-hover:shadow-lg group-hover:shadow-red-500/10 transition-all duration-300"
                >
                  <Icon className="w-5 h-5 text-red-400" />
                </motion.div>
                <h3 className="text-white font-bold text-base mb-2 leading-snug">{title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{body}</p>
              </motion.div>
            </ScaleIn>
          ))}

          {/* Empathy card */}
          <ScaleIn delay={pains.length * 0.08} className="md:col-span-2 lg:col-span-1">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="h-full p-6 rounded-2xl bg-cyan-400/5 border border-cyan-400/20 flex flex-col justify-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <Quote className="w-8 h-8 text-cyan-400/40 mb-3" />
              <p className="text-white/80 text-base italic leading-relaxed">
                "Znamo ovo jer smo to čuli od desetina vlasnika biznisa. Nije problem u vama - problem je što niste imali pravi alat."
              </p>
              <p className="text-cyan-400 text-sm font-semibold mt-4">&mdash; Fluxel</p>
            </motion.div>
          </ScaleIn>
        </div>
      </div>
    </section>
  )
}

// ─── 2. Solution section ─────────────────────────────────────────────────────

const systemParts = [
  {
    icon: Layout,
    title: "Profesionalni web sajt",
    color: "cyan",
    bullets: [
      "Moderan, brz, mobilni dizajn prilagođen vašem brendu",
      "Optimizovan za Google pretragu da vas klijenti pronađu",
      "Svaka stranica konvertuje posetioce u stvarne klijente",
    ],
  },
  {
    icon: Calendar,
    title: "Online zakazivanje 24/7",
    color: "blue",
    bullets: [
      "Klijenti zakazuju sami sa telefona - u bilo koje doba dana",
      "Vaš kalendar se ažurira automatski, bez telefoniranja",
      "Integracija sa Google kalendarom i SMS potvrdom",
    ],
  },
  {
    icon: Bell,
    title: "Automatska podsećanja",
    color: "violet",
    bullets: [
      "SMS i email podsećanja šalju se automatski pre termina",
      "Smanjuje 'no-show' termine i do 50%",
      "Automatske poruke za potvrdu, otkazivanje i follow-up",
    ],
  },
  {
    icon: Zap,
    title: "Automatizacija procesa",
    color: "amber",
    bullets: [
      "Automatizovani upitnici, recenzije i follow-up poruke",
      "Manje administracije, više vremena za stvarni rad",
      "Izveštaji o zakazivanjima i prihodu na jednom mestu",
    ],
  },
]

const colorMap: Record<string, { icon: string; glow: string }> = {
  cyan:   { icon: "bg-cyan-400/10 border-cyan-400/20 text-cyan-400", glow: "group-hover:shadow-cyan-400/20" },
  blue:   { icon: "bg-blue-500/10 border-blue-500/20 text-blue-400", glow: "group-hover:shadow-blue-400/20" },
  violet: { icon: "bg-violet-500/10 border-violet-500/20 text-violet-400", glow: "group-hover:shadow-violet-400/20" },
  amber:  { icon: "bg-amber-500/10 border-amber-500/20 text-amber-400", glow: "group-hover:shadow-amber-400/20" },
}

function SolutionSection() {
  return (
    <section id="resenje" className="py-28 bg-black relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <FadeIn className="text-center mb-16">
          <SectionLabel>Rešenje</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5">
            Sistem koji radi umesto vas -<br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent"> čak i kad spavate</span>
          </h2>
          <p className="text-white/75 text-lg max-w-2xl mx-auto">
            Ovo nije lista usluga. Ovo je jedan integrisani sistem koji rešava svaki problem koji smo
            gore naveli - odjednom.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {systemParts.map(({ icon: Icon, title, color, bullets }, i) => (
            <FadeIn key={title} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.3 }}
                className={`h-full p-7 rounded-2xl bg-white/[0.07] border border-white/[0.15] hover:border-white/15 transition-all duration-300 group cursor-default ${colorMap[color].glow} hover:shadow-lg`}
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  className={`w-13 h-13 rounded-xl border flex items-center justify-center mb-5 transition-all duration-300 ${colorMap[color].icon}`}
                  style={{ width: 52, height: 52 }}
                >
                  <Icon className="w-6 h-6" />
                </motion.div>
                <h3 className="text-white font-bold text-xl mb-4">{title}</h3>
                <ul className="space-y-2.5">
                  {bullets.map((b, j) => (
                    <motion.li
                      key={b}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + j * 0.08, duration: 0.5 }}
                      className="flex items-start gap-2.5"
                    >
                      <Check className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                      <span className="text-white/65 text-sm leading-relaxed">{b}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="text-center p-6 rounded-2xl bg-cyan-400/[0.08] border border-cyan-400/25">
            <p className="text-white text-lg font-medium">
              Sve ovo funkcionise kao <span className="text-cyan-400 font-bold">jedan sistem</span> -
              bez da vi morate da brinete o tehnologiji.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── 3. How it works ─────────────────────────────────────────────────────────

const steps = [
  {
    n: "01",
    title: "Razgovor",
    body: "Javite nam se i ispričajte nam o vašem biznisu. Razumemo vaše potrebe i predlažemo konkretno rešenje - bez žargona.",
    icon: Phone,
  },
  {
    n: "02",
    title: "Izrada",
    body: "Mi dizajniramo i razvijamo vaš sistem. Vi samo dajete feedback - mi radimo sve ostalo. Bez stresa, bez tehničkih problema.",
    icon: Code2,
  },
  {
    n: "03",
    title: "Lansiranje + Podrška",
    body: "Vaš sistem ide uživo. Mi ostajemo uz vas - održavanje, ažuriranja i podrška su uključeni. Niste sami.",
    icon: BarChart2,
  },
]

function HowItWorksSection() {
  return (
    <section id="proces" className="py-28 bg-[#0c0d12] relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <SectionLabel>Kako do vašeg sistema</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5">
            Samo <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">3 koraka</span> do sistema koji<br className="hidden sm:block" /> radi za vas
          </h2>
          <p className="text-white/75 text-lg max-w-xl mx-auto">
            Nema komplikacija. Nema tehničkih znanja koja su vam potrebna. Samo razgovor, izrada i rezultati.
          </p>
        </FadeIn>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Connecting line (desktop) - animated */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block absolute top-12 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-gradient-to-r from-cyan-400/50 via-cyan-400/30 to-cyan-400/50 z-0 origin-left"
          />

          {steps.map(({ n, title, body, icon: Icon }, i) => (
            <ScaleIn key={n} delay={i * 0.2}>
              <motion.div
                whileHover={{ scale: 1.04, y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center text-center p-8 rounded-2xl bg-black border border-white/[0.15] hover:border-cyan-400/30 transition-all duration-300 group"
              >
                {/* Step number + icon */}
                <div className="relative mb-6">
                  <motion.div
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.6 }}
                    className="w-24 h-24 rounded-2xl bg-cyan-400/10 border border-cyan-400/25 flex items-center justify-center group-hover:bg-cyan-400/15 group-hover:shadow-lg group-hover:shadow-cyan-400/15 transition-all duration-300"
                  >
                    <Icon className="w-10 h-10 text-cyan-400" />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.2, duration: 0.5, ease: "backOut" }}
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-400/30"
                  >
                    <span className="text-black font-black text-xs">{i + 1}</span>
                  </motion.div>
                </div>
                <h3 className="text-white font-bold text-xl mb-3">{title}</h3>
                <p className="text-white/75 text-sm leading-relaxed">{body}</p>
              </motion.div>
            </ScaleIn>
          ))}
        </div>

        <FadeIn className="mt-14 text-center">
          <MagneticWrap className="inline-block">
            <motion.a
              href="#kontakt"
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(34,211,238,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-black font-bold px-8 py-4 rounded-full transition-colors text-base relative"
            >
              <span className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl -z-10" />
              Pokrenite vas sistem danas
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </MagneticWrap>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── 4. Portfolio ─────────────────────────────────────────────────────────────

type Project = {
  type: string
  title: string
  desc: string
  tags: string[]
  gradient: string
  letter: string
  image: string | null
  link: string | null
  testimonial: { quote: string; name: string } | null
}

const projects: Project[] = [
  {
    type: "Frizerski salon",
    title: "RSBARBERSHOP - Sistem za zakazivanje",
    desc: "Izgradjen kompletan sistem za online zakazivanje sa automatskim EMAIL podsecanjima.",
    tags: ["Online zakazivanje", "Email podsecanja", "Admin Panel"],
    gradient: "from-rose-900/60 to-pink-900/40",
    letter: "RS",
    testimonial: null,
    image: "rsbarbershop.png",
    link: "https://rs-barbershop.com"
  },
  {
    type: "Psihoterapeut",
    title: "dr Jelena Petrović Popović - Web prezentacija",
    desc: "Profesionalni sajt koji komunicira poverenje i ekspertizu. Integrisano zakazivanje prvog razgovora direktno sa sajta.",
    tags: ["Web prezentacija", "Online zakazivanje", "SEO optimizacija"],
    gradient: "from-violet-900/60 to-indigo-900/40",
    letter: "M",
    testimonial: null,
    image: "jelenapsihoteraija.png",
    link: "https://jelenapsihoterapija.vercel.app"
  },
  {
    type: "Rent-a-car",
    title: "AutoRent BG - Sistem za rezervacije",
    desc: "Aplikacija za rezervacije vozila sa kalendarom dostupnosti, automatskim ugovorima i online uplatom depozita.",
    tags: ["Rezervacije vozila", "Automatski ugovori", "Online plaćanje"],
    gradient: "from-blue-900/60 to-cyan-900/40",
    letter: "R",
    testimonial: { quote: "Uštedeli smo minimum 2 sata dnevno na administraciji.", name: "Nikola M., vlasnik" },
    image: null,
    link: null,
  },
]

function PortfolioSection() {
  return (
    <section id="radovi" className="py-28 bg-black relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <FadeIn className="text-center mb-16">
          <SectionLabel>Naši radovi</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5">
            Sistemi koje smo <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">već napravili</span>
          </h2>
          <p className="text-white/75 text-lg max-w-2xl mx-auto">
            Svaki projekat je bio konkretan problem. Svako rešenje je donelo merljive rezultate.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(({ type, title, desc, tags, gradient, letter, image, link, testimonial }, i) => (
            <FadeIn key={title} delay={i * 0.1}>
              <motion.a
                href={link ?? "#"}
                target={link ? "_blank" : undefined}
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -6 }}
                transition={{ duration: 0.3 }}
                className="block group rounded-2xl overflow-hidden bg-white/[0.07] border border-white/[0.15] hover:border-white/20 transition-all duration-300 cursor-pointer"
              >
                {/* Mockup area */}
                <div className={`h-48 bg-gradient-to-br ${gradient} relative overflow-hidden`}>
                  {image ? (
                    <img
                      src={image}
                      alt={`Screenshot projekta ${title}`}
                      width={600}
                      height={192}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover object-top opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center pt-8">
                      <div className="text-center">
                        <div className="text-7xl font-black text-white/10 leading-none">{letter}</div>
                        <div className="mt-2 inline-flex gap-1">
                          {tags.slice(0,2).map(t=>(
                            <span key={t} className="text-[9px] bg-white/10 text-white/65 px-2 py-0.5 rounded-full">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Browser chrome */}
                  <div className="absolute top-3 left-3 right-3 h-7 bg-black/40 backdrop-blur rounded-lg flex items-center px-3 gap-2">
                    <div className="flex gap-1.5">
                      {[...Array(3)].map((_,j)=><div key={j} className="w-2 h-2 rounded-full bg-white/20" />)}
                    </div>
                    <div className="flex-1 h-3 bg-white/10 rounded-sm mx-4" />
                    {link && (
                      <span className="text-[9px] text-white/45 truncate max-w-[120px]">
                        {link.replace("https://", "")}
                      </span>
                    )}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="absolute top-3 right-4"
                  >
                    <ChevronRight className="w-5 h-5 text-white/75" />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-1.5">{type}</p>
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-cyan-400 transition-colors duration-300">{title}</h3>
                  <p className="text-white/75 text-sm leading-relaxed mb-4">{desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(t => (
                      <span key={t} className="text-xs border border-white/[0.15] text-white/65 px-3 py-1 rounded-full group-hover:border-cyan-400/20 group-hover:text-white/70 transition-all duration-300">
                        {t}
                      </span>
                    ))}
                  </div>
                  {testimonial && (
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <p className="text-white/70 text-sm italic">&ldquo;{testimonial.quote}&rdquo;</p>
                      <p className="text-white/55 text-xs mt-1">- {testimonial.name}</p>
                    </div>
                  )}
                </div>
              </motion.a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 5. About ─────────────────────────────────────────────────────────────────

const trustStats = [
  { icon: Award, value: "12+", label: "Završenih projekata" },
  { icon: Users, value: "10+", label: "Zadovoljnih klijenata" },
  { icon: Headphones, value: "7 dana", label: "Podrška u nedelji" },
  { icon: Shield, value: "Uključeno", label: "Održavanje 1. mesec" },
]

function AboutSection() {
  return (
    <section id="o-nama" className="py-28 bg-[#0c0d12] relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <SlideIn direction="left">
            <SectionLabel>Zašto Fluxel?</SectionLabel>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6">
              Specijalizovani, ne<br /><span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">generalistički</span>
            </h2>
            <div className="space-y-4 text-white/65 text-[16px] leading-relaxed">
              <p>
                Mi ne radimo &ldquo;sve&rdquo;. Fokusirani smo isključivo na sisteme za zakazivanje i automatizaciju
                za servisne biznise - frizere, kozmetičare, terapeute, škole, auto škole, rent-a-car.
                To znači da razumemo vaš posao bolje od bilo kog generalnog web studija.
              </p>
              <p>
                Proučili smo kako servisni biznisi zaista funkcionišu i gde gube klijente i novac.
                Naša rešenja su napravljena da reše tačno te probleme - ne samo da &ldquo;naprave sajt&rdquo;.
              </p>
              <p>
                Kada radimo sa vama, niste broj na listi. Ostajemo uz vas i posle lansiranja sa
                redovnim održavanjem, ažuriranjima i podrškom.
              </p>
            </div>
          </SlideIn>

          <div className="grid grid-cols-2 gap-4">
            {trustStats.map(({ icon: Icon, value, label }, i) => (
              <ScaleIn key={label} delay={i * 0.12}>
                <motion.div
                  whileHover={{ scale: 1.06, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="p-7 rounded-2xl bg-[#0c0d12] border border-white/[0.15] hover:border-cyan-400/25 transition-all text-center group cursor-default"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-11 h-11 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-cyan-400/20 group-hover:shadow-lg group-hover:shadow-cyan-400/15 transition-all duration-300"
                  >
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </motion.div>
                  <div className="text-3xl font-black text-white mb-1 text-white">
                    <AnimatedCounter value={value} />
                  </div>
                  <div className="text-white/65 text-sm">{label}</div>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── 6. Pricing hint ─────────────────────────────────────────────────────────

const included = [
  { icon: Layout, text: "Profesionalni web sajt po meri" },
  { icon: Calendar, text: "Sistem za online zakazivanje" },
  { icon: Bell, text: "Automatska SMS/email podsećanja za klijente" },
  { icon: Globe, text: "Osnovna SEO optimizacija (Google vidljivost)" },
  { icon: RefreshCw, text: "Mesečno održavanje i ažuriranja (1. mesec)" },
  { icon: Headphones, text: "Obuka za korišćenje sistema" },
  { icon: Star, text: "Podrška 7 dana u nedelji" },
]

function PricingHintSection() {
  return (
    <section id="paketi" className="py-28 bg-black relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-4xl px-6 lg:px-8 relative">
        <FadeIn className="text-center mb-12">
          <SectionLabel>Šta dobijate?</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5">
            Sve što vam treba -<br />
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">na jednom mestu</span>
          </h2>
          <p className="text-white/75 text-lg max-w-xl mx-auto">
            Jedan projekat. Jedan tim. Jedno rešenje koje pokriva sve od sajta do automatizacije.
          </p>
        </FadeIn>

        <ScaleIn>
          <div className="rounded-2xl bg-white/[0.07] border border-white/[0.15] overflow-hidden hover:border-white/20 transition-all duration-300">
            <div className="p-8">
              <ul className="space-y-4">
                {included.map(({ icon: Icon, text }, i) => (
                  <motion.li
                    key={text}
                    initial={{ opacity: 0, x: -30, filter: "blur(5px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-4 group/item"
                  >
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      className="w-10 h-10 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center shrink-0 group-hover/item:bg-cyan-400/20 transition-all duration-300"
                    >
                      <Icon className="w-4 h-4 text-cyan-400" />
                    </motion.div>
                    <span className="text-white/80 font-medium group-hover/item:text-white transition-colors duration-300">{text}</span>
                    <Check className="w-4 h-4 text-cyan-400 ml-auto shrink-0 group-hover/item:scale-125 transition-transform duration-300" />
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="border-t border-white/[0.15] p-8 bg-cyan-400/5 text-center">
              <p className="text-white/70 text-base mb-2">
                Cena zavisi od vaših specifičnih potreba i veličine biznisa.
              </p>
              <p className="text-white font-semibold text-lg mb-6">
                Javite nam se za <span className="text-cyan-400 font-bold">besplatnu procenu</span> - bez obaveza.
              </p>
              <MagneticWrap className="inline-block">
                <motion.a
                  href="#kontakt"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(34,211,238,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-black font-bold px-8 py-4 rounded-full transition-colors text-base"
                >
                  Tražim procenu &rarr;
                </motion.a>
              </MagneticWrap>
            </div>
          </div>
        </ScaleIn>
      </div>
    </section>
  )
}

// ─── 7. Contact ───────────────────────────────────────────────────────────────

const bizTypes = [
  "Frizerski salon","Kozmetički salon","Stomatološka ordinacija",
  "Auto škola","Škola stranih jezika","Rent-a-car",
  "Terapeut / Savetnik","Fitnes studio","Spa / Wellness",
  "Drugo",
]

function ContactSection() {
  const [form, setForm] = useState({ name:"", phone:"", biz:"", msg:"" })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  const inputCls = "w-full bg-white/5 border border-white/[0.15] rounded-xl px-4 py-3.5 text-white placeholder-white/25 focus:outline-none focus:border-cyan-400/50 focus:bg-white/8 focus:shadow-lg focus:shadow-cyan-400/5 transition-all duration-300 text-sm"

  return (
    <section id="kontakt" className="py-28 bg-[#0c0d12] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <FadeIn className="text-center mb-16">
          <SectionLabel>Kontakt</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5">
            Spremni da prestanete<br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">da gubite klijente?</span>
          </h2>
          <p className="text-white/75 text-lg max-w-2xl mx-auto">
            Zakažite besplatan razgovor i saznajte kako sistem za zakazivanje može da promeni vaš biznis.
            Bez obaveza, bez tehničkog žargona.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Contact info */}
          <SlideIn direction="left">
            <div className="space-y-8">
              <div>
                <h3 className="text-white font-bold text-xl mb-2">Direktan kontakt</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Preferujete da popunite formu? Odgovaramo u roku od 24 sata. Ili nas
                  kontaktirajte direktno:
                </p>
              </div>

              {[
                { icon: Phone, label: "Telefon / Viber", value: "+381 61 16 05 707" },
                { icon: Mail,  label: "Email", value: "fluxel@outlook.com" },
                { icon: MapPin, label: "Lokacija", value: "Novi Sad, Srbija" },
              ].map(({ icon: Icon, label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ x: 5 }}
                  className="flex gap-4 items-start group cursor-default"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-11 h-11 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-cyan-400/20 group-hover:shadow-lg group-hover:shadow-cyan-400/10 transition-all duration-300"
                  >
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </motion.div>
                  <div>
                    <p className="text-white/55 text-xs uppercase tracking-wider mb-0.5">{label}</p>
                    <p className="text-white font-medium">{value}</p>
                  </div>
                </motion.div>
              ))}

              <div className="flex gap-3 pt-2">
                {([
                  [IconInstagram, "Instagram"],
                  [IconLinkedin, "LinkedIn"],
                  [IconX, "X"],
                ] as [typeof IconInstagram, string][]).map(([Icon, label], i) => (
                  <motion.button
                    key={label}
                    aria-label={label}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.4, ease: "backOut" }}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/[0.15] flex items-center justify-center hover:bg-white/10 hover:border-cyan-400/30 transition-all cursor-pointer text-white/75 hover:text-cyan-400"
                  >
                    <Icon />
                  </motion.button>
                ))}
              </div>

              {/* Trust bar */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-5 rounded-2xl bg-black border border-white/[0.15] hover:border-cyan-400/15 transition-all duration-300"
              >
                <p className="text-white/65 text-xs uppercase tracking-wider mb-3">Zašto nam veruju</p>
                <div className="space-y-2">
                  {[
                    "Besplatan razgovor, bez obaveza",
                    "Odgovaramo u roku od 24 sata",
                    "Nema skrivenih troškova",
                    "Podrška i posle lansiranja",
                  ].map((t, i) => (
                    <motion.div
                      key={t}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                      className="flex items-center gap-2.5"
                    >
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="text-white/65 text-sm">{t}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </SlideIn>

          {/* Form */}
          <SlideIn direction="right" delay={0.15}>
            <div
              className="p-8 rounded-2xl bg-[#0c0d12] border border-white/[0.15] transition-all duration-300"
            >

              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "backOut" }}
                    className="flex flex-col items-center justify-center py-12 text-center relative"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.5, ease: "backOut" }}
                      className="w-16 h-16 rounded-full bg-cyan-400/15 border border-cyan-400/30 flex items-center justify-center mb-5"
                    >
                      <Check className="w-8 h-8 text-cyan-400" />
                    </motion.div>
                    <h3 className="text-white font-bold text-xl mb-2">Poruka primljena!</h3>
                    <p className="text-white/75 text-sm">Javimo se u roku od 24 sata.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-4 relative"
                  >
                    {[
                      { label: "Ime i prezime *", type: "text", placeholder: "Marko Nikolić", field: "name" as const },
                      { label: "Telefon / Viber *", type: "tel", placeholder: "+381 60 123 4567", field: "phone" as const },
                    ].map(({ label, type, placeholder, field }, i) => (
                      <motion.div
                        key={field}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.5 }}
                      >
                        <label className="block text-white/65 text-xs uppercase tracking-wider mb-2">{label}</label>
                        <input type={type} required placeholder={placeholder}
                          value={form[field]} onChange={e => setForm({...form, [field]: e.target.value})}
                          className={inputCls} />
                      </motion.div>
                    ))}

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.16, duration: 0.5 }}
                    >
                      <label className="block text-white/65 text-xs uppercase tracking-wider mb-2">Vrsta biznisa *</label>
                      <select required value={form.biz} onChange={e => setForm({...form, biz: e.target.value})}
                        className={`${inputCls} appearance-none`}>
                        <option value="" className="bg-black">Izaberi vrstu biznisa...</option>
                        {bizTypes.map(b => <option key={b} value={b} className="bg-black">{b}</option>)}
                      </select>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.24, duration: 0.5 }}
                    >
                      <label className="block text-white/65 text-xs uppercase tracking-wider mb-2">Poruka (opciono)</label>
                      <textarea placeholder="Opišite vaš biznis i šta vam je potrebno..."
                        rows={4} value={form.msg} onChange={e => setForm({...form, msg: e.target.value})}
                        className={`${inputCls} resize-none`} />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.32, duration: 0.5 }}
                    >
                      <MagneticWrap>
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(34,211,238,0.2)" }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-bold py-4 rounded-full transition-colors flex items-center justify-center gap-2 text-base mt-2 relative"
                        >
                          <span className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl -z-10" />
                          Zakazite besplatan razgovor
                          <ArrowRight className="w-5 h-5" />
                        </motion.button>
                      </MagneticWrap>
                    </motion.div>

                    <p className="text-white/45 text-xs text-center">
                      Vasi podaci su bezbedni. Bez spam poruka.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const navLinks = [
    { label: "Problem", href: "#problem" },
    { label: "Resenje", href: "#resenje" },
    { label: "Proces", href: "#proces" },
    { label: "Radovi", href: "#radovi" },
    { label: "O nama", href: "#o-nama" },
    { label: "Kontakt", href: "#kontakt" },
  ]

  return (
    <footer className="bg-black border-t border-white/[0.15] py-14 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <FadeIn>
            <motion.a
              href="#hero"
              whileHover={{ scale: 1.05 }}
              className="inline-block text-2xl font-black text-white tracking-tight"
            >
              &lt;flux<span className="text-cyan-400">el.rs/&gt;</span>
            </motion.a>
            <p className="text-white/60 text-sm leading-relaxed mt-3 max-w-xs">
              Specijalizovani sistemi za online zakazivanje i automatizaciju za mali servisni biznis u Srbiji.
            </p>
            <div className="flex gap-3 mt-5">
              {([
                [IconInstagram, "Instagram"],
                [IconLinkedin, "LinkedIn"],
                [IconX, "X"],
              ] as [typeof IconInstagram, string][]).map(([Icon, label]) => (
                <motion.button
                  key={label}
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/[0.15] flex items-center justify-center hover:border-cyan-400/30 hover:text-cyan-400 transition-all text-white/65 cursor-pointer"
                >
                  <Icon className="w-3 h-3" />
                </motion.button>
              ))}
            </div>
          </FadeIn>

          {/* Nav */}
          <FadeIn delay={0.1}>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Navigacija</h4>
            <ul className="space-y-2.5">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <a href={l.href} className="text-white/60 text-sm hover:text-cyan-400 hover:pl-1 transition-all duration-300">{l.label}</a>
                </motion.li>
              ))}
            </ul>
          </FadeIn>

          {/* Contact */}
          <FadeIn delay={0.2}>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Kontakt</h4>
            <ul className="space-y-2.5 text-white/60 text-sm">
              <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-cyan-400" />+381 61 16 05 707</li>
              <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-cyan-400" />fluxel@outlook.com</li>
              <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-cyan-400" />Novi Sad, Srbija</li>
            </ul>
            <motion.a
              href="#kontakt"
              whileHover={{ x: 5 }}
              className="mt-5 inline-flex items-center gap-2 text-cyan-400 text-sm font-semibold hover:text-cyan-300 transition-colors"
            >
              Besplatan razgovor <ChevronRight className="w-4 h-4" />
            </motion.a>
          </FadeIn>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="border-t border-white/[0.15] origin-left"
        />
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/45 text-sm">&copy; 2026 Fluxel. Sva prava zadržana.</p>
          <p className="text-white/20 text-xs">Dizajn i razvoj - Fluxel tim, Novi Sad</p>
        </div>
      </div>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main className="bg-black">
      <Navbar />
      <EtherealBeamsHero />
      <SectionDivider />
      <PainSection />
      <SectionDivider />
      <SolutionSection />
      <SectionDivider />
      <HowItWorksSection />
      <SectionDivider />
      <PortfolioSection />
      <SectionDivider />
      <AboutSection />
      <SectionDivider />
      <PricingHintSection />
      <SectionDivider />
      <ContactSection />
      <Footer />
    </main>
  )
}
