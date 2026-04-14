"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X, Check, ArrowRight, Car, Inbox, Calendar,
  DollarSign, Lock, Sparkles, ChevronLeft, ChevronRight
} from "lucide-react"
import { Navbar } from "@/components/ui/navbar"

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

function SectionLabel({ children }: { children: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-400"
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BGRentACarCaseStudy() {
  const [activeImg, setActiveImg] = useState(0)
  const galleryImages = [
    { src: "/posle1.png", title: "Početna stranica", desc: "Premium tamna tema i unapređena konverzija." },
    { src: "/posle2.png", title: "Administrativni pregled", desc: "Sve potrebne informacije na jednom mestu." },
    { src: "/polse 3.png", title: "Pregled vozila za klijenta", desc: "Najbitnije informacije i rezervisanje sa jednog mesta" },
  ]

  const nextImg = () => setActiveImg((prev) => (prev + 1) % galleryImages.length)
  const prevImg = () => setActiveImg((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)

  return (
    <main className="min-h-screen bg-black text-white">

      <Navbar />

      {/* ── 1. HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        {/* Ambient */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[900px] bg-cyan-400/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-0 h-[400px] w-[600px] bg-cyan-400/3 blur-[100px] rounded-full" />
        </div>

        <div className={containerShell}>
          <div className="text-center">
            <FadeIn>
              <SectionLabel>Case Study</SectionLabel>
            </FadeIn>

            <FadeIn delay={0.08}>
              <h1 className="mx-auto max-w-4xl text-[clamp(2.5rem,9vw,5rem)] font-black leading-[1.0] tracking-tight text-white">
                Haos koji se pretvara{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  u sistem.
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.16}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                {[
                  { label: "Klijent", value: "BG Rent a Car & Limo Service" },
                  { label: "Industrija", value: "Iznajmljivanje vozila, Beograd" },
                  { label: "Trajanje", value: "3 nedelje" },
                  { label: "Rešenje", value: "Novi sajt + Admin panel" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-2 text-sm"
                  >
                    <span className="text-white/40 font-medium">{label}:</span>
                    <span className="font-semibold text-white">{value}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Thumbnail */}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── 2. PROBLEM ───────────────────────────────────────────────────────── */}
      <section className={`${sectionShell} bg-[#0c0d12]`}>
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] bg-red-500/5 blur-[100px] rounded-full" />

        <div className={containerShell}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">

            {/* Left - title + cards */}
            <div className="flex-1">
              <FadeIn className="mb-10 text-left">
                <SectionLabel>01 - Problem</SectionLabel>
                <h2 className={sectionTitle}>
                  Sajt iz 2019. koji radi{" "}
                  <span className="bg-gradient-to-r from-red-400 to-rose-500 bg-clip-text text-transparent">
                    protiv biznisa.
                  </span>
                </h2>
              </FadeIn>

              <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2">
                {[
                  {
                    title: "Nema upravljanja vozilima sa sajta",
                    body: "Svako ažuriranje zahtevalo je programera. Novo vozilo u floti - čekanje danima.",
                  },
                  {
                    title: "Upiti su padali u e-mail praznu zonu",
                    body: "Klijent pošalje upit. Vlasnik ne zna. Vozilo stoji. Klijent pronađe konkurenciju.",
                  },
                  {
                    title: "Potvrde samo telefonom",
                    body: "Svaka rezervacija zahtevala je ručni poziv. Bez pregleda zauzetosti. Bez obaveštenja.",
                  },
                  {
                    title: "Vizuelno i tehnički zastareo",
                    body: "Dizajn iz 2019, sporo učitavanje, loše mobilno iskustvo.",
                  },
                ].map(({ title, body }, i) => (
                  <ScaleIn key={title} delay={i * 0.08}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -4, borderColor: "rgba(239,68,68,0.25)" }}
                      transition={{ duration: 0.3 }}
                      className="group flex h-full flex-col rounded-2xl border border-white/[0.12] bg-white/[0.05] p-6 cursor-default"
                    >
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 group-hover:bg-red-500/20 transition-colors duration-300">
                        <X className="w-5 h-5 text-red-400" />
                      </div>
                      <h3 className="mb-2 text-base font-bold leading-snug text-white sm:text-lg">{title}</h3>
                      <p className="text-sm leading-6 text-white/65 sm:text-[15px]">{body}</p>
                    </motion.div>
                  </ScaleIn>
                ))}
              </div>
            </div>

            {/* Right - stacked gallery */}
            <SlideIn direction="right" className="mt-12 lg:mt-0 lg:w-[320px] shrink-0">
              <div className="relative flex justify-center" style={{ height: "460px" }}>
                {/* Back card */}
                <motion.div
                  initial={{ opacity: 0, rotate: -6, y: 20 }}
                  whileInView={{ opacity: 1, rotate: -5, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="absolute top-8 left-0 w-[240px] rounded-2xl overflow-hidden shadow-2xl border border-white/[0.08]"
                  style={{ zIndex: 1 }}
                >
                  <Image
                    src="/pre1.png"
                    alt="Stari sajt - homepage"
                    width={240}
                    height={340}
                    className="w-full h-[340px] object-cover object-top"
                    style={{ filter: "grayscale(100%) contrast(0.8) brightness(0.65)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-950/70 via-red-950/10 to-transparent" />
                </motion.div>

                {/* Front card */}
                <motion.div
                  initial={{ opacity: 0, rotate: 6, y: 20 }}
                  whileInView={{ opacity: 1, rotate: 4, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
                  className="absolute top-0 right-0 w-[240px] rounded-2xl overflow-hidden shadow-2xl border border-white/[0.08]"
                  style={{ zIndex: 2 }}
                >
                  <Image
                    src="/pre 3.png"
                    alt="Stari sajt - detalj vozila"
                    width={240}
                    height={340}
                    className="w-full h-[340px] object-cover object-top"
                    style={{ filter: "grayscale(100%) contrast(0.8) brightness(0.65)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-950/70 via-red-950/10 to-transparent" />
                </motion.div>

                {/* 2019 stamp */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: -12 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
                  className="absolute bottom-6 left-6 z-10 rounded border-2 border-red-500/60 px-3 py-1 text-sm font-black uppercase tracking-widest text-red-400/75 bg-black/40 backdrop-blur-sm"
                >
                  2019
                </motion.div>
              </div>
            </SlideIn>

          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── 3. BEFORE / AFTER ────────────────────────────────────────────────── */}
      <section className={sectionShell}>
        <div className={containerShell}>
          <FadeIn className={sectionIntro}>
            <SectionLabel>02 - Transformacija</SectionLabel>
            <h2 className={sectionTitle}>Pre i posle.</h2>
          </FadeIn>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Before */}
            <SlideIn direction="left">
              <div className="h-full rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-6 sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/15 border border-red-500/20">
                    <X className="w-4 h-4 text-red-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Stari sistem</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Statičan sajt, izmene samo kroz programera",
                    "Forma za upit bez notifikacija",
                    "Nema pregleda zauzetosti vozila",
                    "Potvrda isključivo telefonom",
                    "Vizuelni identitet iz 2019.",
                    "Nema mobilne optimizacije",
                    "30+ vozila, nijedan filter",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-white/65 sm:text-[15px]">
                      <X className="mt-0.5 w-4 h-4 shrink-0 text-red-400/70" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </SlideIn>

            {/* After */}
            <SlideIn direction="right">
              <div className="h-full rounded-2xl border border-cyan-400/25 bg-cyan-400/[0.04] p-6 sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/15 border border-cyan-400/25">
                    <Check className="w-4 h-4 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Novo rešenje</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Admin panel - dodavanje vozila za 2 minuta",
                    "Centralizovani inbox sa statusima",
                    "Kalendar zauzetosti u realnom vremenu",
                    "5-koračni booking flow",
                    "Luksuzni tamni dizajn",
                    "Mobilno-first pristup",
                    "Automatski obračun cene po broju dana",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-white/80 sm:text-[15px]">
                      <Check className="mt-0.5 w-4 h-4 shrink-0 text-cyan-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </SlideIn>
          </div>

          {/* ── Gallery ── */}
          <FadeIn delay={0.2} className="mt-16 sm:mt-24">
            <div className="mb-10 flex flex-col items-center sm:flex-row sm:justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white sm:text-3xl">Vizuelni pregled</h3>
                <p className="mt-2 text-white/55 text-sm sm:text-base">Završni izgled platforme i admin panela.</p>
              </div>

              <div className="mt-6 flex items-center gap-3 sm:mt-0">
                <button
                  onClick={prevImg}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 hover:border-cyan-400/30 touch-manipulation"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImg}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 hover:border-cyan-400/30 touch-manipulation"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="group relative aspect-[4/3] md:aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/[0.12] bg-white/[0.05]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImg}
                  initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={galleryImages[activeImg].src}
                    alt={galleryImages[activeImg].title}
                    fill
                    className="object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-80" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />

                  <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 max-w-2xl">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <p className="text-xl md:text-3xl font-bold text-white mb-2">{galleryImages[activeImg].title}</p>
                      <p className="text-sm md:text-lg text-white/70">{galleryImages[activeImg].desc}</p>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots */}
            <div className="mt-8 flex justify-center gap-3">
              {galleryImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImg(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === activeImg ? "w-10 bg-cyan-400" : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ── 4. FEATURES ──────────────────────────────────────────────────────── */}
      <section className={`${sectionShell} bg-[#0c0d12]`}>
        <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[600px] bg-cyan-400/4 blur-[100px] rounded-full" />

        <div className={containerShell}>
          <FadeIn className={sectionIntro}>
            <SectionLabel>03 - Šta je izgrađeno</SectionLabel>
            <h2 className={sectionTitle}>
              Kompletna platforma za{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                upravljanje iznajmljivanjem.
              </span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Car,
                title: "Upravljanje voznim parkom",
                body: "Dodavanje vozila, izmena cena, upload slika kroz admin panel bez dodirivanja koda.",
              },
              {
                icon: Inbox,
                title: "Centralni inbox za rezervacije",
                body: "Svi upiti na jednom mestu sa kompletnim podacima klijenta i automatski izračunatom cenom.",
              },
              {
                icon: Check,
                title: "Jednoklik potvrda ili odbijanje",
                body: "Vlasnik jednim klikom potvrđuje ili odbija rezervaciju. Nema telefonskog haosa.",
              },
              {
                icon: Calendar,
                title: "Kalendar zauzetosti",
                body: "Vizuelni prikaz dostupnosti u realnom vremenu. Potvrđene rezervacije blokiraju termine automatski.",
              },
              {
                icon: DollarSign,
                title: "Dinamični cenovni rangovi",
                body: "Cena se automatski obračunava po broju dana: 2-3, 4-7, 8-14, 15-28, 29+.",
              },
              {
                icon: Lock,
                title: "Zaštićeni admin pristup",
                body: "Lozinkom zaštićen panel samo za vlasnika. Kompletan operativni pregled na jednom ekranu.",
              },
            ].map(({ icon: Icon, title, body }, i) => (
              <ScaleIn key={title} delay={i * 0.07}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -5, borderColor: "rgba(34,211,238,0.25)" }}
                  transition={{ duration: 0.3 }}
                  className="group flex h-full flex-col rounded-2xl border border-white/[0.12] bg-white/[0.05] p-6 cursor-default"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 group-hover:bg-cyan-400/20 group-hover:shadow-lg group-hover:shadow-cyan-400/10 transition-all duration-300">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="mb-2 text-base font-bold leading-snug text-white sm:text-lg">{title}</h3>
                  <p className="text-sm leading-6 text-white/65 sm:text-[15px]">{body}</p>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── 5. BOOKING FLOW ──────────────────────────────────────────────────── */}
      <section className={sectionShell}>
        <div className={containerShell}>
          <FadeIn className={sectionIntro}>
            <SectionLabel>04 - Klijentski tok</SectionLabel>
            <h2 className={sectionTitle}>
              Od interesa do upita{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                za 60 sekundi.
              </span>
            </h2>
          </FadeIn>

          {/* Steps - horizontal on desktop, vertical on mobile */}
          <div className="relative">
            {/* Connector line desktop */}
            <div className="absolute top-8 left-0 right-0 hidden h-px lg:block">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="h-full bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent origin-left"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-5">
              {[
                { step: "1", title: "Izbor vozila", desc: "Klijent bira iz kataloga" },
                { step: "2", title: "Datumi", desc: "Interaktivni kalendar sa zauzetošću" },
                { step: "3", title: "Lokacije", desc: "Aerodrom, adresa ili poslovnica" },
                { step: "4", title: "Kontakt", desc: "Ime, telefon, email, napomena" },
                { step: "5", title: "Pregled & slanje", desc: "Sažetak sa ukupnom cenom" },
              ].map(({ step, title, desc }, i) => (
                <ScaleIn key={step} delay={i * 0.1}>
                  <div className="flex lg:flex-col items-start lg:items-center gap-4 lg:gap-0 lg:text-center">
                    <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-cyan-400/40 bg-black text-xl font-black text-cyan-400 lg:mb-5">
                      {step}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white sm:text-lg">{title}</h3>
                      <p className="mt-1 text-sm text-white/55">{desc}</p>
                    </div>
                  </div>
                </ScaleIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── 6. RESULTS ───────────────────────────────────────────────────────── */}
      <section className={`${sectionShell} bg-[#0c0d12]`}>
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] bg-cyan-400/4 blur-[120px] rounded-full" />

        <div className={containerShell}>
          <FadeIn className={sectionIntro}>
            <SectionLabel>05 - Rezultati</SectionLabel>
            <h2 className={sectionTitle}>Šta se promenilo.</h2>
          </FadeIn>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {[
              {
                stat: "0 → ∞",
                label: "Propuštenih upita",
                body: "Svaki upit se pojavljuje u admin panelu. Nema više mailova koji se izgube.",
              },
              {
                stat: "2 min",
                label: "Vreme za dodavanje vozila",
                body: "Ranije čekanje na programera danima. Sada vlasnik sam dodaje za 2 minuta.",
              },
              {
                stat: "5×",
                label: "Brži booking proces",
                body: "Klijent sam bira vozilo, datume i lokaciju bez čekanja na povratni poziv.",
              },
            ].map(({ stat, label, body }, i) => (
              <ScaleIn key={label} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -6, borderColor: "rgba(34,211,238,0.3)" }}
                  transition={{ duration: 0.3 }}
                  className="group flex h-full flex-col rounded-2xl border border-white/[0.12] bg-white/[0.05] p-7 text-center cursor-default"
                >
                  <div className="mb-2 text-[clamp(2.5rem,7vw,4rem)] font-black leading-none tracking-tight text-cyan-400 group-hover:[text-shadow:0_0_40px_rgba(34,211,238,0.5)] transition-all duration-500">
                    {stat}
                  </div>
                  <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/50">{label}</div>
                  <p className="text-sm leading-6 text-white/65">{body}</p>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── 7. TECH STACK ────────────────────────────────────────────────────── */}
      <section className={sectionShell}>
        <div className={containerShell}>
          <FadeIn className={sectionIntro}>
            <SectionLabel>06 - Tehnologije</SectionLabel>
            <h2 className={sectionTitle}>Izgrađeno da traje.</h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Next.js 14",
                "React",
                "TypeScript",
                "Tailwind CSS",
                "Supabase",
                "Vercel",
                "n8n Automatizacija/s",
                "Responsive Design",
                "Admin Auth",
              ].map((tag) => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.06, borderColor: "rgba(34,211,238,0.4)", color: "#22d3ee" }}
                  transition={{ duration: 0.2 }}
                  className="rounded-full border border-white/[0.15] bg-white/[0.05] px-5 py-2 text-sm font-semibold text-white/70 cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ── 8. CTA ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] bg-cyan-400/6 blur-[120px] rounded-full" />
        </div>

        <div className={containerShell}>
          <div className="mx-auto max-w-2xl text-center">
            <FadeIn>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-400">
                <Sparkles className="w-3 h-3" />
                Fluxel - Booking sistemi za servisne biznise
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <h2 className="mb-4 text-[clamp(2rem,7vw,3.5rem)] font-black leading-[1.05] tracking-tight text-white">
                Vaš biznis zaslužuje{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  sistem koji radi.
                </span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.14}>
              <p className="mb-10 text-base leading-7 text-white/65 sm:text-lg">
                Izgradimo zajedno rešenje koje štedi vreme i donosi više rezervacija.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Link
                href="/#kontakt"
                className="group inline-flex items-center gap-2 rounded-full bg-cyan-400 px-7 py-4 text-base font-bold text-black transition-all duration-300 hover:bg-cyan-300 hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] active:scale-95"
              >
                Kontaktirajte nas
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

    </main>
  )
}
