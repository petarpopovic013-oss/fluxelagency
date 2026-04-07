"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import { useState, useEffect, type FormEvent } from "react"
import { motion, MotionConfig, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import {
  PhoneOff, MessageSquareX, CalendarX, Globe, Clock,
  Calendar, Bell, Zap, Layout,
  Check, Phone, Mail, MapPin,
  ChevronRight, Menu, X, ArrowRight,
  Code2, BarChart2, Sparkles,
} from "lucide-react"

const EtherealBeamsHero = dynamic(
  () => import("@/components/ui/ethereal-beams-hero"),
  { ssr: false, loading: () => <div className="min-h-screen w-full bg-black" /> }
)

const naturalEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

// ─── Social icons ─────────────────────────────────────────────────────────────

type SI = { className?: string }
const IconInstagram = ({ className = "w-4 h-4" }: SI) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

// ─── Animation helpers ────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 52, scale: 0.94, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-8% 0px -6%" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SlideIn({ children, delay = 0, className = "", direction = "left" }: { children: React.ReactNode; delay?: number; className?: string; direction?: "left" | "right" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === "left" ? -72 : 72, rotate: direction === "left" ? -2.5 : 2.5, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, x: 0, rotate: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-8% 0px -6%" }}
      transition={{ duration: 0.95, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function ScaleIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.86, y: 42, rotateX: -14, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, scale: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-8% 0px -6%" }}
      transition={{ duration: 0.95, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
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
        initial={{ scaleX: 0, opacity: 0.2 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)")
    const syncMenu = (event: MediaQueryList | MediaQueryListEvent) => {
      if (event.matches) setOpen(false)
    }
    syncMenu(media)
    media.addEventListener("change", syncMenu)
    return () => media.removeEventListener("change", syncMenu)
  }, [])

  const links = [
    { label: "Problem", href: "#problem" },
    { label: "Rešenje", href: "#resenje" },
    { label: "Radovi", href: "#radovi" },
    { label: "O nama", href: "#o-nama" },
  ]

  const close = () => setOpen(false)

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, ease: naturalEase }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-black/80 backdrop-blur-2xl border-b border-white/[0.15] shadow-lg shadow-black/20" : "bg-transparent"
        }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between sm:h-20">
          {/* Logo */}
          <motion.a
            href="#hero"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-lg font-black tracking-tight text-white sm:text-xl"
          >
            &lt;flux<span className="text-cyan-400">el.rs/&gt;</span>
          </motion.a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 rounded-full border border-white/[0.15] bg-white/5 px-2 py-1 backdrop-blur-xl md:flex">
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3, duration: 0.5 }}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                {l.label}
              </motion.a>
            ))}
          </nav>

          {/* Desktop CTA — replaced by FloatingCTA */}
          <motion.a
            href="#kontakt"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden items-center gap-1.5 text-sm font-semibold text-cyan-400 transition-colors hover:text-cyan-300 md:inline-flex"
          >
            Kontakt <ArrowRight className="w-3.5 h-3.5" />
          </motion.a>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(o => !o)} aria-label="Menu"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition-colors hover:text-white md:hidden">
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
            transition={{ duration: 0.42, ease: naturalEase }}
            className="md:hidden overflow-hidden border-t border-white/[0.15] bg-black/95 px-4 py-4 backdrop-blur-xl sm:px-6"
          >
            <div className="space-y-2 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-2">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={close}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.45, ease: naturalEase }}
                  className="block rounded-2xl px-4 py-3.5 text-base font-medium text-white/70 transition-all hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href="#kontakt"
                onClick={close}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.22, duration: 0.45, ease: naturalEase }}
                className="mt-2 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-cyan-400/30 px-5 py-3.5 text-base font-semibold text-cyan-400 transition-all hover:bg-cyan-400/10"
              >
                Kontakt <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
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
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="mb-5 inline-flex animate-warp-pulse items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-400"
    >
      <Sparkles className="w-3 h-3" />
      {children}
    </motion.div>
  )
}

const sectionShell = "relative overflow-hidden py-20 sm:py-24 lg:py-28"
const containerShell = "relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
const sectionIntro = "mb-12 text-center sm:mb-16"
const sectionTitle = "mb-4 text-[clamp(2rem,8vw,3.25rem)] font-black leading-[1.05] tracking-tight text-white sm:mb-5"
const sectionBody = "mx-auto max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8"

// ─── 1. Pain section ──────────────────────────────────────────────────────────

const pains = [
  {
    icon: PhoneOff,
    title: "Klijenti zovu dok ste zauzeti - i odu kod konkurencije",
    body: "Dok radite sa jednim klijentom, drugi zove, ne dobija odgovor, i zakazuje kod konkurencije koja ima online zakazivanje. Svaki propušten poziv = propušten novac.",
  },
  {
    icon: MessageSquareX,
    title: "Viber poruke se gomilaju, termini se gube u haosu",
    body: "Poruke se brišu, termini se dupliraju, klijenti se ljute kad dođe do zabune. Vi provlačite telefon umesto da radite svoj posao.",
  },
  {
    icon: CalendarX,
    title: "Klijenti ne dolaze jer nema automatskih podsećanja",
    body: "Bez automatskog podsećanja, klijenti jednostavno zaborave. Svaki no-show je termin koji ste mogli popuniti nekim drugim - ali niste znali na vreme.",
  },
  {
    icon: Globe,
    title: "Nemate sajt ili imate sajt koji ne radi ništa za Vas",
    body: "Ako Vas ne mogu pronaći na Googlu ili ne mogu odmah zakazati sa Vašeg sajta - klijent odlazi dalje za 30 sekundi. Vaš sajt treba da radi za Vas, ne samo da postoji.",
  },
  {
    icon: Clock,
    title: "Svako jutro počinjete sa administracijom umesto pravim poslom",
    body: "Prepisivanje termina, podsećanje klijenata, odgovaranje na iste poruke - svaki dan izgubite 1-2 sata na posao koji može da radi sistem umesto Vas.",
  },
]

function PainSection() {
  return (
    <section id="problem" className={`${sectionShell} bg-[#0c0d12]`}>
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className={containerShell}>
        <FadeIn className={sectionIntro}>
          <SectionLabel>Prepoznajete li ovo?</SectionLabel>
          <h2 className={sectionTitle}>
            Svaki dan bez sistema za zakazivanje<br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-red-400 to-rose-500 bg-clip-text text-transparent"> košta Vas novac</span>
          </h2>
          <p className={sectionBody}>
            Ovo su problemi koje čujemo od vlasnika servisnih biznisa svake nedelje.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-6">
          {pains.map(({ icon: Icon, title, body }, i) => (
            <ScaleIn
              key={title}
              delay={i * 0.08}
              className={
                i === 3
                  ? "lg:col-span-2 lg:col-start-2"
                  : i === 4
                    ? "lg:col-span-2 lg:col-start-4"
                    : "lg:col-span-2"
              }
            >
              <motion.div
                whileHover={{ scale: 1.03, y: -5, borderColor: "rgba(239,68,68,0.3)" }}
                transition={{ duration: 0.3 }}
                className="group flex h-full flex-col rounded-2xl border border-white/[0.15] bg-white/[0.07] p-5 transition-all duration-300 cursor-default sm:p-6"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 group-hover:bg-red-500/20 group-hover:shadow-lg group-hover:shadow-red-500/10 transition-all duration-300"
                >
                  <Icon className="w-5 h-5 text-red-400" />
                </motion.div>
                <h3 className="mb-2 text-base font-bold leading-snug text-white sm:text-lg">{title}</h3>
                <p className="text-sm leading-6 text-white/70 sm:text-[15px]">{body}</p>
              </motion.div>
            </ScaleIn>
          ))}
        </div>

        <FadeIn delay={0.2} className="mt-6 md:mt-8">
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5 text-center sm:p-6">
            <p className="text-base leading-7 text-white/80 sm:text-[17px]">
              Ovi problemi su isti za svaki servisni biznis - frizere, kozmetičare, terapeute. Rešenje takođe.
            </p>
          </div>
        </FadeIn>
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
      "Moderan, brz, mobilni dizajn prilagođen Vašem brendu",
      "Optimizovan za Google pretragu da Vas klijenti pronađu",
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
      "Smanjuje no-show termine - više popunjenih termina, više prihoda",
      "Automatske poruke za potvrdu, otkazivanje i follow-up",
    ],
  },
  {
    icon: Zap,
    title: "Automatizacija procesa",
    color: "amber",
    bullets: [
      "Automatizovani upitnici, recenzije i follow-up poruke",
      "Vraćate sebi 1-2 sata dnevno koje ste trošili na administraciju",
      "Izveštaji o zakazivanjima i prihodu na jednom mestu",
    ],
  },
]

const colorMap: Record<string, { icon: string; glow: string }> = {
  cyan: { icon: "bg-cyan-400/10 border-cyan-400/20 text-cyan-400", glow: "group-hover:shadow-cyan-400/20" },
  blue: { icon: "bg-blue-500/10 border-blue-500/20 text-blue-400", glow: "group-hover:shadow-blue-400/20" },
  violet: { icon: "bg-violet-500/10 border-violet-500/20 text-violet-400", glow: "group-hover:shadow-violet-400/20" },
  amber: { icon: "bg-amber-500/10 border-amber-500/20 text-amber-400", glow: "group-hover:shadow-amber-400/20" },
}

function SolutionSection() {
  return (
    <section id="resenje" className={`${sectionShell} bg-black`}>
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className={containerShell}>
        <FadeIn className={sectionIntro}>
          <SectionLabel>Rešenje</SectionLabel>
          <h2 className={sectionTitle}>
            Sistem koji radi umesto Vas -<br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent"> čak i kad spavate</span>
          </h2>
          <p className={sectionBody}>
            Ovo nije lista usluga. Ovo je jedan sistem koji rešava sve probleme koje smo gore opisali - odjednom.
          </p>
        </FadeIn>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:gap-5 md:mb-10 md:grid-cols-2 md:gap-6">
          {systemParts.map(({ icon: Icon, title, color, bullets }, i) => (
            <FadeIn key={title} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.3 }}
                className={`group h-full rounded-2xl border border-white/[0.15] bg-white/[0.07] p-5 transition-all duration-300 cursor-default hover:border-white/15 hover:shadow-lg sm:p-6 ${colorMap[color].glow}`}
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  className={`w-13 h-13 rounded-xl border flex items-center justify-center mb-5 transition-all duration-300 ${colorMap[color].icon}`}
                  style={{ width: 52, height: 52 }}
                >
                  <Icon className="w-6 h-6" />
                </motion.div>
                <h3 className="mb-3 text-lg font-bold text-white sm:mb-4 sm:text-xl">{title}</h3>
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
                      <span className="mt-0.5 shrink-0 text-cyan-400">✓</span>
                      <span className="text-sm leading-6 text-white/65 sm:text-[15px]">{b}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="rounded-2xl border border-cyan-400/25 bg-cyan-400/[0.08] p-5 text-center sm:p-6">
            <p className="text-base font-medium leading-7 text-white sm:text-lg">
              Sve ovo funkcioniše kao <span className="text-cyan-400 font-bold">jedan sistem</span> - bez da Vi morate da brinete o tehnologiji.
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
    body: "Pokazaćemo Vam tačno kako bi Vaš sistem izgledao i koliko vremena može da Vam uštedi - za 15 minuta, bez obaveza.",
    icon: Phone,
  },
  {
    n: "02",
    title: "Izrada",
    body: "Mi dizajniramo i razvijamo Vaš sistem. Vi samo dajete feedback - mi radimo sve ostalo. Bez stresa, bez tehničkih problema.",
    icon: Code2,
  },
  {
    n: "03",
    title: "Lansiranje + Podrška",
    body: "Vaš sistem ide uživo. Mi ostajemo uz Vas - održavanje, ažuriranja i podrška su uključeni. Ako nešto ne radi kako treba, mi to rešavamo.",
    icon: BarChart2,
  },
]

function HowItWorksSection() {
  return (
    <section id="proces" className={`${sectionShell} bg-[#0c0d12]`}>
      <div className={containerShell}>
        <FadeIn className={sectionIntro}>
          <SectionLabel>Kako do Vašeg sistema</SectionLabel>
          <h2 className={sectionTitle}>
            Samo <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">3 koraka</span> do sistema koji<br className="hidden sm:block" /> radi za Vas
          </h2>
          <p className="mx-auto max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
            Nema komplikacija. Nema tehničkih znanja koja su Vam potrebna. Samo razgovor, izrada i rezultati.
          </p>
        </FadeIn>

        <div className="relative grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3 md:gap-8">
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
                className="group relative z-10 flex flex-col items-center rounded-2xl border border-white/[0.15] bg-black p-6 text-center transition-all duration-300 hover:border-cyan-400/30 sm:p-8"
              >
                {/* Step number + icon */}
                <div className="relative mb-6">
                  <motion.div
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.6 }}
                    className="flex h-20 w-20 items-center justify-center rounded-2xl border border-cyan-400/25 bg-cyan-400/10 transition-all duration-300 group-hover:bg-cyan-400/15 group-hover:shadow-lg group-hover:shadow-cyan-400/15 sm:h-24 sm:w-24"
                  >
                    <Icon className="h-8 w-8 text-cyan-400 sm:h-10 sm:w-10" />
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
                <h3 className="mb-3 text-lg font-bold text-white sm:text-xl">{title}</h3>
                <p className="text-sm leading-6 text-white/75 sm:text-[15px]">{body}</p>
              </motion.div>
            </ScaleIn>
          ))}
        </div>

        {/* CTA removed — handled by FloatingCTA */}
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
    desc: "Problem: zakazivanje je išlo preko poziva i Viber-a, termini su se gubili. Rešenje: kompletan sistem za online zakazivanje sa automatskim email podsećanjima. Klijenti sada sami zakazuju 24/7.",
    tags: ["Online zakazivanje", "Email podsećanja", "Admin Panel"],
    gradient: "from-rose-900/60 to-pink-900/40",
    letter: "RS",
    testimonial: null,
    image: "/rsbarbershop.png",
    link: "https://rs-barbershop.com"
  },
  {
    type: "Psihoterapeut",
    title: "dr Jelena Petrović Popović - Web prezentacija",
    desc: "Problem: nije imala profesionalno online prisustvo i klijenti nisu mogli lako da zakažu. Rešenje: profesionalni sajt koji komunicira poverenje sa integrisanim zakazivanjem prvog razgovora direktno sa sajta.",
    tags: ["Web prezentacija", "Online zakazivanje", "SEO optimizacija"],
    gradient: "from-violet-900/60 to-indigo-900/40",
    letter: "M",
    testimonial: null,
    image: "/jelenapsihoteraija.png",
    link: "https://jelenapsihoterapija.vercel.app"
  },
  {
    type: "Rent-a-car",
    title: "BG Rent A Car & Limo Service - Sistem za rezervacije",
    desc: "Aplikacija za rezervacije vozila sa kalendarom dostupnosti, email notifikacijama i admin panelom za laku upotrebu vlasnika biznisa.",
    tags: ["Rezervacije vozila", "Email podsećanja", "Admin Panel"],
    gradient: "from-blue-900/60 to-cyan-900/40",
    letter: "R",
    testimonial: { quote: "Profesionalna saradnja i odlični rezultati, sve preporuke!", name: "Peđa D., vlasnik BG Rent A Car-a" },
    image: "/bgrc.png",
    link: "https://bg-rentacar.vercel.app"
  },
]

function PortfolioSection() {
  return (
    <section id="radovi" className={`${sectionShell} bg-black`}>
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className={containerShell}>
        <FadeIn className={sectionIntro}>
          <SectionLabel>Naši radovi</SectionLabel>
          <h2 className={sectionTitle}>
            Sistemi koje smo <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">već napravili</span>
          </h2>
          <p className={sectionBody}>
            Svaki projekat je bio konkretan problem koji smo rešili konkretnim sistemom.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-4 md:gap-6">
          {projects.map(({ type, title, desc, tags, gradient, letter, image, link, testimonial }, i) => (
            <FadeIn
              key={title}
              delay={i * 0.1}
              className={i === 2 ? "md:col-span-2 md:col-start-2" : "md:col-span-2"}
            >
              <motion.a
                href={link ?? "#"}
                target={link ? "_blank" : undefined}
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -6 }}
                transition={{ duration: 0.3 }}
                className="group block overflow-hidden rounded-2xl border border-white/[0.15] bg-white/[0.07] transition-all duration-300 cursor-pointer hover:border-white/20"
              >
                {/* Mockup area */}
                <div className={`relative h-44 overflow-hidden bg-gradient-to-br sm:h-48 ${gradient}`}>
                  {image ? (
                    <Image
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
                        <div className="mt-2 inline-flex max-w-[12rem] flex-wrap justify-center gap-1">
                          {tags.slice(0, 2).map(t => (
                            <span key={t} className="text-[9px] bg-white/10 text-white/65 px-2 py-0.5 rounded-full">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Browser chrome */}
                  <div className="absolute left-3 right-3 top-3 flex h-7 items-center gap-2 rounded-lg bg-black/40 px-3 backdrop-blur">
                    <div className="flex gap-1.5">
                      {[...Array(3)].map((_, j) => <div key={j} className="w-2 h-2 rounded-full bg-white/20" />)}
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
                <div className="p-5 sm:p-6">
                  <p className="text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-1.5">{type}</p>
                  <h3 className="mb-2 text-lg font-bold text-white transition-colors duration-300 group-hover:text-cyan-400 sm:text-xl">{title}</h3>
                  <p className="mb-4 text-sm leading-6 text-white/75 sm:text-[15px]">{desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(t => (
                      <span key={t} className="rounded-full border border-white/[0.15] px-3 py-1 text-[11px] text-white/65 transition-all duration-300 group-hover:border-cyan-400/20 group-hover:text-white/70 sm:text-xs">
                        {t}
                      </span>
                    ))}
                  </div>
                  {testimonial && (
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <p className="text-sm italic leading-6 text-white/70">&ldquo;{testimonial.quote}&rdquo;</p>
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

function AboutSection() {
  return (
    <section id="o-nama" className={`${sectionShell} bg-[#0c0d12]`}>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className={containerShell}>
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <SectionLabel>Zašto Fluxel?</SectionLabel>
            <h2 className="mb-5 text-[clamp(2rem,8vw,3.25rem)] font-black leading-[1.05] tracking-tight text-white sm:mb-6">
              Specijalizovani, ne<br /><span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">generalistički</span>
            </h2>
            <div className="space-y-4 text-[15px] leading-7 text-white/65 sm:text-base sm:leading-8">
              <p>
                Mi ne radimo &ldquo;sve&rdquo;. Fokusirani smo isključivo na sisteme za zakazivanje i automatizaciju za servisne biznise - frizere, kozmetičare, terapeute, škole, auto škole, rent-a-car. To znači da razumemo Vaš posao bolje od bilo kog generalnog web studija.
              </p>
              <p>
                Znamo tačno gde servisni biznisi gube klijente i novac. Naša rešenja su napravljena da reše te probleme - ne samo da &ldquo;naprave sajt&rdquo;.
              </p>
              <p>
                Kada radimo sa Vama, niste broj na listi. Ostajemo uz Vas i posle lansiranja sa redovnim održavanjem, ažuriranjima i podrškom.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.12} className="mt-8">
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5 text-center sm:p-6">
              <p className="text-sm font-medium leading-7 text-white/85 sm:text-base">
                Svaki klijent dobija podršku 7 dana u nedelji i besplatno održavanje prvog meseca.
              </p>
            </div>
          </FadeIn>
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
]

function PricingHintSection() {
  return (
    <section id="paketi" className={`${sectionShell} bg-black`}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-10 text-center sm:mb-12">
          <SectionLabel>Šta dobijate?</SectionLabel>
          <h2 className={sectionTitle}>
            Sve što Vam treba -<br />
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">na jednom mestu</span>
          </h2>
          <p className="mx-auto max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
            Jedan projekat. Jedan tim. Jedno rešenje koje pokriva sve - od sajta do automatizacije. Bez žongliranja sa različitim freelancerima.
          </p>
        </FadeIn>

        <ScaleIn>
          <div className="overflow-hidden rounded-2xl border border-white/[0.15] bg-white/[0.07] transition-all duration-300 hover:border-white/20">
            <div className="p-5 sm:p-8">
              <ul className="space-y-3.5 sm:space-y-4">
                {included.map(({ icon: Icon, text }, i) => (
                  <motion.li
                    key={text}
                    initial={{ opacity: 0, x: -30, filter: "blur(5px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="group/item flex items-start gap-3.5 sm:gap-4"
                  >
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      className="w-10 h-10 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center shrink-0 group-hover/item:bg-cyan-400/20 transition-all duration-300"
                    >
                      <Icon className="w-4 h-4 text-cyan-400" />
                    </motion.div>
                    <span className="text-sm font-medium leading-6 text-white/80 transition-colors duration-300 group-hover/item:text-white sm:text-base">{text}</span>
                    <span className="ml-auto mt-1 shrink-0 text-cyan-400 transition-transform duration-300 group-hover/item:scale-125">✓</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="border-t border-white/[0.15] bg-cyan-400/5 p-5 text-center sm:p-8">
              <p className="mb-2 text-sm leading-6 text-white/70 sm:text-base">
                Cena zavisi od Vaših specifičnih potreba i veličine biznisa.
              </p>
              <p className="text-base font-semibold leading-7 text-white sm:text-lg">
                Javite nam se za <span className="text-cyan-400 font-bold">besplatnu procenu</span> - bez obaveza.
              </p>
            </div>
          </div>
        </ScaleIn>
      </div>
    </section>
  )
}


// ─── 7. Urgency + Risk Reversal ───────────────────────────────────────────────

function UrgencySection() {
  return (
    <section id="ogranicena-mesta" className={`${sectionShell} bg-[#0c0d12]`}>
      <div className={containerShell}>
        <FadeIn className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-cyan-400/25 bg-cyan-400/[0.08] p-6 sm:p-8">
            <h2 className="mb-4 text-[clamp(1.75rem,6vw,2.5rem)] font-black leading-[1.1] tracking-tight text-white">
              Primamo ograničen broj klijenata mesečno
            </h2>
            <p className="mb-4 text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
              Pošto svaki projekat radimo detaljno i sa punom pažnjom, možemo da primimo samo nekoliko novih klijenata mesečno. Ako želite sistem koji će raditi za Vas do sledeće sezone, javite se sada.
            </p>
            <p className="mb-6 text-sm leading-7 text-white/70 sm:text-base">
              Ako posle prvog razgovora odlučite da ovo nije za Vas - nema problema. Nema obaveza, nema pritiska. Ali barem ćete znati tačno šta je moguće za Vaš biznis.
            </p>
            {/* CTA removed — handled by FloatingCTA */}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
// ─── 8. Contact ───────────────────────────────────────────────────────────────

const bizTypes = [
  "Frizerski salon", "Kozmetički salon", "Stomatološka ordinacija",
  "Auto škola", "Škola stranih jezika", "Rent-a-car",
  "Terapeut / Savetnik", "Fitnes studio", "Spa / Wellness",
  "Drugo",
]

function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", biz: "", msg: "" })
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitError("")

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
    if (!accessKey) {
      setSubmitError("Došlo je do greške. Pokušajte ponovo uskoro.")
      return
    }

    const formData = new FormData()
    formData.append("access_key", accessKey)
    formData.append("subject", "Nova prijava sa fluxel.rs")
    formData.append("from_name", "Fluxel sajt")
    formData.append("name", form.name)
    formData.append("phone", form.phone)
    formData.append("biz_type", form.biz)
    formData.append("message", form.msg || "Nije ostavljena dodatna poruka.")
    formData.append("botcheck", "")

    setSubmitting(true)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        setSubmitError(result.message || "Došlo je do greške pri slanju poruke.")
        return
      }

      setSent(true)
      setForm({ name: "", phone: "", biz: "", msg: "" })
    } catch {
      setSubmitError("Došlo je do greške pri slanju poruke. Pokušajte ponovo.")
    } finally {
      setSubmitting(false)
    }
  }

  const inputCls = "w-full rounded-xl border border-white/[0.15] bg-white/5 px-4 py-3.5 text-base text-white placeholder-white/25 transition-all duration-300 focus:border-cyan-400/50 focus:bg-white/8 focus:shadow-lg focus:shadow-cyan-400/5 focus:outline-none"

  return (
    <section id="kontakt" className={`${sectionShell} bg-[#0c0d12]`}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className={containerShell}>
        <FadeIn className={sectionIntro}>
          <SectionLabel>Kontakt</SectionLabel>
          <h2 className={sectionTitle}>
            Spremni da prestanete<br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">da gubite klijente?</span>
          </h2>
          <p className={sectionBody}>
            Zakažite besplatan razgovor i pokazaćemo Vam tačno kako bi Vaš sistem izgledao - za 15 minuta.
            Bez obaveza, bez tehničkog žargona.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 items-start gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Contact info */}
          <SlideIn direction="left">
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-white font-bold text-xl mb-2">Direktan kontakt</h3>
                <p className="text-sm leading-6 text-white/70 sm:text-[15px]">
                  Preferujete da popunite formu? Odgovaramo u roku od 24 sata. Ili nas
                  kontaktirajte direktno:
                </p>
              </div>

              {[
                { icon: Phone, label: "Telefon / Viber", value: "+381 61 16 05 707" },
                { icon: Mail, label: "Email", value: "info@fluxel.rs" },
                { icon: MapPin, label: "Lokacija", value: "Novi Sad, Srbija" },
              ].map(({ icon: Icon, label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ x: 5 }}
                  className="group flex items-start gap-3.5 sm:gap-4 cursor-default"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 transition-all duration-300 group-hover:bg-cyan-400/20 group-hover:shadow-lg group-hover:shadow-cyan-400/10"
                  >
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </motion.div>
                  <div className="min-w-0">
                    <p className="text-white/55 text-xs uppercase tracking-wider mb-0.5">{label}</p>
                    <p className="break-words text-sm font-medium text-white sm:text-base">{value}</p>
                  </div>
                </motion.div>
              ))}

              <div className="flex flex-wrap gap-3 pt-1 sm:pt-2">
                <motion.a
                  href="https://www.instagram.com/fluxel.rs/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.4, ease: "backOut" }}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.15] bg-white/5 text-white/75 transition-all cursor-pointer hover:border-cyan-400/30 hover:bg-white/10 hover:text-cyan-400"
                >
                  <IconInstagram />
                </motion.a>
              </div>

              {/* Trust bar */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="rounded-2xl border border-white/[0.15] bg-black p-5 transition-all duration-300 hover:border-cyan-400/15"
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
                      <span className="text-cyan-400 shrink-0">✓</span>
                      <span className="text-sm leading-6 text-white/65">{t}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </SlideIn>

          {/* Form */}
          <SlideIn direction="right" delay={0.15}>
            <div className="rounded-2xl border border-white/[0.15] bg-[#0c0d12] p-5 transition-all duration-300 sm:p-8">

              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "backOut" }}
                    className="relative flex flex-col items-center justify-center py-10 text-center sm:py-12"
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
                    className="relative space-y-4"
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
                        <label className="mb-2 block text-xs uppercase tracking-wider text-white/65">{label}</label>
                        <input type={type} required placeholder={placeholder}
                          value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })}
                          className={inputCls} />
                      </motion.div>
                    ))}

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.16, duration: 0.5 }}
                    >
                      <label className="mb-2 block text-xs uppercase tracking-wider text-white/65">Vrsta biznisa *</label>
                      <select required value={form.biz} onChange={e => setForm({ ...form, biz: e.target.value })}
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
                      <label className="mb-2 block text-xs uppercase tracking-wider text-white/65">Poruka (opciono)</label>
                      <textarea placeholder="Opišite Vaš biznis i šta Vam je potrebno..."
                        rows={4} value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })}
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
                          disabled={submitting}
                          whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(34,211,238,0.2)" }}
                          whileTap={{ scale: 0.98 }}
                          className="relative mt-2 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-cyan-400 py-4 text-base font-bold text-black transition-colors disabled:cursor-not-allowed disabled:opacity-70 sm:min-h-14"
                        >
                          <span className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl -z-10" />
                          Zakažite besplatan razgovor (15 min)
                          <ArrowRight className="w-5 h-5" />
                        </motion.button>
                      </MagneticWrap>
                    </motion.div>

                    {submitError ? (
                      <p className="text-center text-sm text-red-400">{submitError}</p>
                    ) : null}

                    <p className="text-white/45 text-xs text-center">
                      Vaši podaci su bezbedni. Bez spam poruka. Odgovaramo u roku od 24 sata.
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
  return (
    <footer className="bg-black border-t border-white/[0.15] py-14 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

      <div className={containerShell}>
        <div className="mb-10 grid grid-cols-1 gap-8 sm:gap-10 md:mb-12 md:grid-cols-2">
          {/* Brand */}
          <FadeIn>
            <motion.a
              href="#hero"
              whileHover={{ scale: 1.05 }}
              className="inline-block text-2xl font-black text-white tracking-tight"
            >
              &lt;flux<span className="text-cyan-400">el.rs/&gt;</span>
            </motion.a>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/60">
              Sistemi za zakazivanje i automatizaciju za servisne biznise u Srbiji.
            </p>
            <div className="mt-5 flex gap-3">
              <motion.a
                href="https://www.instagram.com/fluxel.rs/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.15] bg-white/5 text-white/65 transition-all cursor-pointer hover:border-cyan-400/30 hover:text-cyan-400"
              >
                <IconInstagram className="h-3.5 w-3.5" />
              </motion.a>
            </div>
          </FadeIn>

          {/* Contact */}
          <FadeIn delay={0.1}>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Kontakt</h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li className="flex items-start gap-2.5"><Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-400" />+381 61 16 05 707</li>
              <li className="flex items-start gap-2.5 break-all sm:break-normal"><Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-400" />info@fluxel.rs</li>
              <li className="flex items-start gap-2.5"><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-400" />Novi Sad, Srbija</li>
            </ul>
            {/* CTA removed — handled by FloatingCTA */}
          </FadeIn>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="border-t border-white/[0.15] origin-left"
        />
        <div className="flex flex-col items-start justify-between gap-3 pt-8 text-left sm:flex-row sm:items-center">
          <p className="text-white/45 text-sm">&copy; 2026 Fluxel. Sva prava zadržana.</p>
          <p className="text-white/20 text-xs">Dizajn i razvoj - Fluxel tim, Novi Sad</p>
        </div>
      </div>
    </footer>
  )
}

// ─── Floating CTA ────────────────────────────────────────────────────────────

function FloatingCTA() {
  const [pastFold, setPastFold] = useState(false)
  const [hideForContact, setHideForContact] = useState(false)

  useEffect(() => {
    let ticking = false

    const update = () => {
      setPastFold(window.scrollY > window.innerHeight * 0.5)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    // Intersection observer: hide when contact section is visible
    const kontakt = document.getElementById("kontakt")
    let observer: IntersectionObserver | null = null
    if (kontakt) {
      observer = new IntersectionObserver(
        ([entry]) => setHideForContact(entry.isIntersecting),
        { threshold: 0.1 }
      )
      observer.observe(kontakt)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      observer?.disconnect()
    }
  }, [])

  const show = pastFold && !hideForContact

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
        >
          <div className="pointer-events-auto mx-auto w-full max-w-md px-4 pb-10 sm:pb-12">
            <MagneticWrap>
              <motion.a
                href="#kontakt"
                whileHover={{ scale: 1.03, boxShadow: "0 0 50px rgba(34,211,238,0.35)" }}
                whileTap={{ scale: 0.97 }}
                aria-label="Zakažite besplatan razgovor"
                className="relative flex min-h-14 w-full transform-gpu items-center justify-center gap-2.5 rounded-full bg-cyan-400 px-5 py-4 text-base font-bold text-black shadow-[0_4px_24px_rgba(34,211,238,0.3)] transition-colors will-change-transform hover:bg-cyan-300 sm:min-h-[3.75rem] sm:px-6 sm:py-[1.125rem] sm:text-lg"
              >
                <span className="absolute inset-0 -z-10 rounded-full bg-cyan-400/20 blur-xl will-change-transform motion-safe:animate-floating-cta-pulse motion-reduce:animate-none" />
                Zakažite besplatan razgovor
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </MagneticWrap>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null
      const href = anchor?.getAttribute("href")
      if (!anchor || !href) return

      const id = href.slice(1)
      const element = id ? document.getElementById(id) : document.body
      if (!element) return

      event.preventDefault()
      const headerOffset = window.innerWidth < 768 ? 88 : 96
      const rect = element.getBoundingClientRect()
      const targetY = Math.max(0, rect.top + window.scrollY - headerOffset)
      window.scrollTo({
        top: targetY,
        behavior: reduceMotion.matches ? "auto" : "smooth",
      })
      history.replaceState(null, "", href)
    }

    document.addEventListener("click", onClick)
    return () => {
      document.removeEventListener("click", onClick)
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.6, ease: naturalEase }}>
      <main className="overflow-x-clip bg-black">
        <Navbar />
        <FloatingCTA />
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
        <UrgencySection />
        <SectionDivider />
        <ContactSection />
        <Footer />
      </main>
    </MotionConfig>
  )
}
