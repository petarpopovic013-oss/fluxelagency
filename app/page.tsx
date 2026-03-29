"use client"

import dynamic from "next/dynamic"
import { useState, useEffect, type FormEvent } from "react"
import { motion } from "framer-motion"
import {
  PhoneOff, MessageSquareX, CalendarX, Globe, Clock,
  Calendar, Bell, Zap, RefreshCw, Layout,
  Check, Phone, Mail, MapPin, Star,
  Shield, Users, Award, Headphones,
  ChevronRight, Menu, ArrowRight, Quote,
  Code2, BarChart2,
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

// ─── Animation helper ─────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
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
    { label: "Rešenje", href: "#resenje" },
    { label: "Radovi", href: "#radovi" },
    { label: "O nama", href: "#o-nama" },
  ]

  const close = () => setOpen(false)

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-black/90 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
    }`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="text-xl font-black text-white tracking-tight">
            	&lt;flux<span className="text-cyan-400">el.rs/&gt;</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 rounded-full bg-white/5 backdrop-blur border border-white/10 px-2 py-1">
            {links.map(l => (
              <a key={l.href} href={l.href}
                className="px-4 py-2 rounded-full text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all">
                {l.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a href="#kontakt"
            className="hidden md:inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-sm px-5 py-2.5 rounded-full transition-all">
            Besplatan razgovor
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(o => !o)} aria-label="Menu"
            className="md:hidden w-10 h-10 flex items-center justify-center text-white/70 hover:text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 px-6 py-4 space-y-1">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={close}
              className="block px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
              {l.label}
            </a>
          ))}
          <a href="#kontakt" onClick={close}
            className="mt-3 flex items-center justify-center gap-2 bg-cyan-400 text-black font-bold text-sm px-5 py-3 rounded-full w-full transition-all">
            Besplatan razgovor <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </header>
  )
}

// ─── Shared atoms ─────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-5">
      {children}
    </div>
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
    <section id="problem" className="py-24 bg-[#050505]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="text-center mb-14">
          <SectionLabel>Prepoznajete li ovo?</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5">
            Svaki dan bez sistema za zakazivanje<br className="hidden sm:block" />
            <span className="text-cyan-400"> košta vas novac</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Razgovarali smo sa desetinama vlasnika malih biznisa u Srbiji. Evo šta čujemo iznova i iznova.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pains.map(({ icon: Icon, title, body }, i) => (
            <FadeIn key={title} delay={i * 0.08}>
              <div className="h-full p-6 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-red-500/20 hover:bg-red-950/10 transition-all duration-300 group">
                <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 group-hover:bg-red-500/15 transition-colors">
                  <Icon className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-white font-bold text-base mb-2 leading-snug">{title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{body}</p>
              </div>
            </FadeIn>
          ))}

          {/* Empathy card */}
          <FadeIn delay={pains.length * 0.08} className="md:col-span-2 lg:col-span-1">
            <div className="h-full p-6 rounded-2xl bg-cyan-400/5 border border-cyan-400/20 flex flex-col justify-center">
              <Quote className="w-8 h-8 text-cyan-400/40 mb-3" />
              <p className="text-white/80 text-base italic leading-relaxed">
                "Znamo ovo jer smo to čuli od desetina vlasnika biznisa. Nije problem u vama - problem je što niste imali pravi alat."
              </p>
              <p className="text-cyan-400 text-sm font-semibold mt-4">— Fluxel</p>
            </div>
          </FadeIn>
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

const colorMap: Record<string, string> = {
  cyan:   "bg-cyan-400/10 border-cyan-400/20 text-cyan-400",
  blue:   "bg-blue-500/10 border-blue-500/20 text-blue-400",
  violet: "bg-violet-500/10 border-violet-500/20 text-violet-400",
  amber:  "bg-amber-500/10 border-amber-500/20 text-amber-400",
}

function SolutionSection() {
  return (
    <section id="resenje" className="py-24 bg-black">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="text-center mb-14">
          <SectionLabel>Rešenje</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5">
            Sistem koji radi umesto vas -<br className="hidden sm:block" />
            <span className="text-cyan-400"> čak i kad spavate</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Ovo nije lista usluga. Ovo je jedan integrisani sistem koji rešava svaki problem koji smo
            gore naveli - odjednom.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {systemParts.map(({ icon: Icon, title, color, bullets }, i) => (
            <FadeIn key={title} delay={i * 0.1}>
              <div className="h-full p-7 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-white/15 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 ${colorMap[color]}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-white font-bold text-xl mb-4">{title}</h3>
                <ul className="space-y-2.5">
                  {bullets.map(b => (
                    <li key={b} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                      <span className="text-white/65 text-sm leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="text-center p-6 rounded-2xl bg-cyan-400/5 border border-cyan-400/20">
            <p className="text-white text-lg font-medium">
              Sve ovo funkcioniše kao <span className="text-cyan-400 font-bold">jedan sistem</span> -
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
    body: "Javite nam se i ispričajte nam o vašem biznisu. Razumemo vaše potrebe i predložimo konkretno rešenje - bez žargona.",
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
    <section id="proces" className="py-24 bg-[#050505]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <SectionLabel>Kako do vašeg sistema</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5">
            Samo <span className="text-cyan-400">3 koraka</span> do sistema koji<br className="hidden sm:block" /> radi za vas
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Nema komplikacija. Nema tehničkih znanja koja su vam potrebna. Samo razgovor, izrada i rezultati.
          </p>
        </FadeIn>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-12 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-gradient-to-r from-white/0 via-cyan-400/30 to-white/0 z-0" />

          {steps.map(({ n, title, body, icon: Icon }, i) => (
            <FadeIn key={n} delay={i * 0.15}>
              <div className="relative z-10 flex flex-col items-center text-center p-8 rounded-2xl bg-black border border-white/8 hover:border-cyan-400/25 transition-all duration-300">
                {/* Step number + icon */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-2xl bg-cyan-400/10 border border-cyan-400/25 flex items-center justify-center">
                    <Icon className="w-10 h-10 text-cyan-400" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-cyan-400 flex items-center justify-center">
                    <span className="text-black font-black text-xs">{i + 1}</span>
                  </div>
                </div>
                <h3 className="text-white font-bold text-xl mb-3">{title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{body}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-12 text-center">
          <a href="#kontakt"
            className="inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-black font-bold px-8 py-4 rounded-full transition-all text-base">
            Pokrenite vaš sistem danas
            <ArrowRight className="w-5 h-5" />
          </a>
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


const projects = [
  {
    type: "Frizerski salon",
    title: "RSBARBERSHOP - Sistem za zakazivanje",
    desc: "Izgrađen kompletan sistem za online zakazivanje sa automatskim EMAIL podsećanjima.",
    tags: ["Online zakazivanje", "Email podsećanja", "Admin Panel"],
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
  },
  
]

function PortfolioSection() {
  return (
    <section id="radovi" className="py-24 bg-black">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="text-center mb-14">
          <SectionLabel>Naši radovi</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5">
            Sistemi koje smo <span className="text-cyan-400">već napravili</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Svaki projekat je bio konkretan problem. Svako rešenje je donelo merljive rezultate.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(({ type, title, desc, tags, gradient, letter, image, link, testimonial }, i) => (
  <FadeIn key={title} delay={i * 0.08}>

    {/* Wrap u <a> samo ako postoji link */}
    <a
      href={link ?? "#"}
      target={link ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="block group rounded-2xl overflow-hidden bg-white/[0.03] border border-white/8 hover:border-white/15 transition-all duration-300 cursor-pointer"
      
    >
      {/* Mockup area */}
      <div className={`h-48 bg-gradient-to-br ${gradient} relative overflow-hidden`}>
        
        {/* Ako postoji slika — prikaži je */}
        {image ? (
          <img
            src={image}
            alt={`Screenshot projekta ${title}`}
            width={600}
            height={192}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-top opacity-60 group-hover:opacity-80 transition-opacity duration-300"
          />
        ) : (
          /* Fallback — stari letter placeholder */
          <div className="absolute inset-0 flex items-center justify-center pt-8">
            <div className="text-center">
              <div className="text-7xl font-black text-white/10 leading-none">{letter}</div>
              <div className="mt-2 inline-flex gap-1">
                {tags.slice(0,2).map(t=>(
                  <span key={t} className="text-[9px] bg-white/10 text-white/50 px-2 py-0.5 rounded-full">{t}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Browser chrome ostaje */}
        <div className="absolute top-3 left-3 right-3 h-7 bg-black/40 backdrop-blur rounded-lg flex items-center px-3 gap-2">
          <div className="flex gap-1.5">
            {[...Array(3)].map((_,j)=><div key={j} className="w-2 h-2 rounded-full bg-white/20" />)}
          </div>
          <div className="flex-1 h-3 bg-white/10 rounded-sm mx-4" />
          {/* URL hint ako postoji link */}
          {link && (
            <span className="text-[9px] text-white/30 truncate max-w-[120px]">
              {link.replace("https://", "")}
            </span>
          )}
        </div>

        <div className="absolute top-3 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronRight className="w-5 h-5 text-white/60" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Sadržaj kartice — ostaje isti */}
      <div className="p-6">
        <p className="text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-1.5">{type}</p>
        <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
        <p className="text-white/60 text-sm leading-relaxed mb-4">{desc}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map(t => (
            <span key={t} className="text-xs border border-white/10 text-white/50 px-3 py-1 rounded-full">
              {t}
            </span>
          ))}
        </div>
        {testimonial && (
          <div className="mt-4 pt-4 border-t border-white/5">
            <p className="text-white/70 text-sm italic">"{testimonial.quote}"</p>
            <p className="text-white/40 text-xs mt-1">- {testimonial.name}</p>
          </div>
        )}
      </div>
    </a>

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
  { icon: Shield, value: "Uključeno", label: "Mesečno održavanje" },
]

function AboutSection() {
  return (
    <section id="o-nama" className="py-24 bg-[#050505]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <SectionLabel>Zašto Fluxel?</SectionLabel>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6">
              Specijalizovani, ne<br /><span className="text-cyan-400">generalistički</span>
            </h2>
            <div className="space-y-4 text-white/65 text-[16px] leading-relaxed">
              <p>
                Mi ne radimo "sve". Fokusirani smo isključivo na sisteme za zakazivanje i automatizaciju
                za servisne biznise - frizere, kozmetičare, terapeute, škole, auto škole, rent-a-car.
                To znači da razumemo vaš posao bolje od bilo kog generalnog web studija.
              </p>
              <p>
                Proučili smo kako servisni biznisi zaista funkcionišu i gde gube klijente i novac.
                Naša rešenja su napravljena da reše tačno te probleme - ne samo da "naprave sajt".
              </p>
              <p>
                Kada radimo sa vama, niste broj na listi. Ostajemo uz vas i posle lansiranja sa
                redovnim održavanjem, ažuriranjima i podrškom.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 gap-4">
            {trustStats.map(({ icon: Icon, value, label }, i) => (
              <FadeIn key={label} delay={i * 0.1}>
                <div className="p-7 rounded-2xl bg-black border border-white/8 hover:border-cyan-400/20 transition-all text-center group">
                  <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-cyan-400/15 transition-colors">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="text-3xl font-black text-white mb-1">{value}</div>
                  <div className="text-white/50 text-sm">{label}</div>
                </div>
              </FadeIn>
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
  { icon: RefreshCw, text: "Mesečno održavanje i ažuriranja" },
  { icon: Headphones, text: "Obuka za korišćenje sistema" },
  { icon: Star, text: "Podrška 7 dana u nedelji" },
]

function PricingHintSection() {
  return (
    <section id="paketi" className="py-24 bg-black">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <SectionLabel>Šta dobijate?</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5">
            Sve što vam treba -<br />
            <span className="text-cyan-400">na jednom mestu</span>
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Jedan projekat. Jedan tim. Jedno rešenje koje pokriva sve od sajta do automatizacije.
          </p>
        </FadeIn>

        <FadeIn>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
            <div className="p-8">
              <ul className="space-y-4">
                {included.map(({ icon: Icon, text }, i) => (
                  <motion.li
                    key={text}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-9 h-9 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="text-white/80 font-medium">{text}</span>
                    <Check className="w-4 h-4 text-cyan-400 ml-auto shrink-0" />
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="border-t border-white/10 p-8 bg-cyan-400/5 text-center">
              <p className="text-white/70 text-base mb-2">
                Cena zavisi od vaših specifičnih potreba i veličine biznisa.
              </p>
              <p className="text-white font-semibold text-lg mb-6">
                Javite nam se za <span className="text-cyan-400">besplatnu procenu</span> - bez obaveza.
              </p>
              <a href="#kontakt"
                className="inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-black font-bold px-8 py-4 rounded-full transition-all text-base">
                Tražim procenu →
              </a>
            </div>
          </div>
        </FadeIn>
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

  const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/25 focus:outline-none focus:border-cyan-400/50 focus:bg-white/8 transition-all text-sm"

  return (
    <section id="kontakt" className="py-24 bg-[#050505]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="text-center mb-14">
          <SectionLabel>Kontakt</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5">
            Spremni da prestanete<br />
            <span className="text-cyan-400">da gubite klijente?</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Zakažite besplatan razgovor i saznajte kako sistem za zakazivanje može da promeni vaš biznis.
            Bez obaveza, bez tehničkog žargona.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Contact info */}
          <FadeIn>
            <div className="space-y-8">
              <div>
                <h3 className="text-white font-bold text-xl mb-2">Direktan kontakt</h3>
                <p className="text-white/55 text-sm leading-relaxed">
                  Preferujete da popunite formu? Odgovaramo u roku od 24 sata. Ili nas
                  kontaktirajte direktno:
                </p>
              </div>

              {[
                { icon: Phone, label: "Telefon / Viber", value: "+381 61 16 05 707" },
                { icon: Mail,  label: "Email", value: "fluxel@outlook.com" },
                { icon: MapPin, label: "Lokacija", value: "Novi Sad, Srbija" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-4 items-start">
                  <div className="w-11 h-11 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">{label}</p>
                    <p className="text-white font-medium">{value}</p>
                  </div>
                </div>
              ))}

              <div className="flex gap-3 pt-2">
                {([
                  [IconInstagram, "Instagram"],
                  [IconLinkedin, "LinkedIn"],
                  [IconX, "X"],
                ] as [typeof IconInstagram, string][]).map(([Icon, label]) => (
                  <button key={label} aria-label={label}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-cyan-400/30 transition-all cursor-pointer text-white/60 hover:text-cyan-400">
                    <Icon />
                  </button>
                ))}
              </div>

              {/* Trust bar */}
              <div className="p-5 rounded-2xl bg-black border border-white/8">
                <p className="text-white/50 text-xs uppercase tracking-wider mb-3">Zašto nam veruju</p>
                <div className="space-y-2">
                  {[
                    "Besplatan razgovor, bez obaveza",
                    "Odgovaramo u roku od 24 sata",
                    "Nema skrivenih troškova",
                    "Podrška i posle lansiranja",
                  ].map(t => (
                    <div key={t} className="flex items-center gap-2.5">
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="text-white/65 text-sm">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={0.15}>
            <div className="p-8 rounded-2xl bg-black border border-white/10">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-cyan-400/15 border border-cyan-400/30 flex items-center justify-center mb-5">
                    <Check className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">Poruka primljena!</h3>
                  <p className="text-white/60 text-sm">Javimo se u roku od 24 sata.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Ime i prezime *</label>
                    <input type="text" required placeholder="Marko Nikolić"
                      value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                      className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Telefon / Viber *</label>
                    <input type="tel" required placeholder="+381 60 123 4567"
                      value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                      className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Vrsta biznisa *</label>
                    <select required value={form.biz} onChange={e => setForm({...form, biz: e.target.value})}
                      className={`${inputCls} appearance-none`}>
                      <option value="" className="bg-black">Izaberi vrstu biznisa...</option>
                      {bizTypes.map(b => <option key={b} value={b} className="bg-black">{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Poruka (opciono)</label>
                    <textarea placeholder="Opišite vaš biznis i šta vam je potrebno..."
                      rows={4} value={form.msg} onChange={e => setForm({...form, msg: e.target.value})}
                      className={`${inputCls} resize-none`} />
                  </div>
                  <button type="submit"
                    className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-bold py-4 rounded-full transition-all flex items-center justify-center gap-2 text-base mt-2">
                    Zakažite besplatan razgovor
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <p className="text-white/30 text-xs text-center">
                    Vaši podaci su bezbedni. Bez spam poruka.
                  </p>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const navLinks = [
    { label: "Problem", href: "#problem" },
    { label: "Rešenje", href: "#resenje" },
    { label: "Proces", href: "#proces" },
    { label: "Radovi", href: "#radovi" },
    { label: "O nama", href: "#o-nama" },
    { label: "Kontakt", href: "#kontakt" },
  ]

  return (
    <footer className="bg-black border-t border-white/10 py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <a href="#hero" className="text-2xl font-black text-white tracking-tight">
              &lt;flux<span className="text-cyan-400">el.rs/&gt;</span>
            </a>
            <p className="text-white/45 text-sm leading-relaxed mt-3 max-w-xs">
              Specijalizovani sistemi za online zakazivanje i automatizaciju za mali servisni biznis u Srbiji.
            </p>
            <div className="flex gap-3 mt-5">
              {([
                [IconInstagram, "Instagram"],
                [IconLinkedin, "LinkedIn"],
                [IconX, "X"],
              ] as [typeof IconInstagram, string][]).map(([Icon, label]) => (
                <button key={label} aria-label={label}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-cyan-400/30 hover:text-cyan-400 transition-all text-white/50 cursor-pointer">
                  <Icon className="w-3 h-3" />
                </button>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Navigacija</h4>
            <ul className="space-y-2.5">
              {navLinks.map(l => (
                <li key={l.href}>
                  <a href={l.href} className="text-white/45 text-sm hover:text-cyan-400 transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Kontakt</h4>
            <ul className="space-y-2.5 text-white/45 text-sm">
              <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-cyan-400" />+381 61 16 05 707</li>
              <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-cyan-400" />fluxel@outlook.com</li>
              <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-cyan-400" />Novi Sad, Srbija</li>
            </ul>
            <a href="#kontakt"
              className="mt-5 inline-flex items-center gap-2 text-cyan-400 text-sm font-semibold hover:text-cyan-300 transition-colors">
              Besplatan razgovor <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">© 2026 Fluxel. Sva prava zadržana.</p>
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
      <PainSection />
      <SolutionSection />
      <HowItWorksSection />
      <PortfolioSection />
      <AboutSection />
      <PricingHintSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
