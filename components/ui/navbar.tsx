"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Menu, X } from "lucide-react"

const naturalEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function Navbar() {
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
    { label: "Problem", href: "/#problem" },
    { label: "Rešenje", href: "/#resenje" },
    { label: "Radovi", href: "/#radovi" },
    { label: "O nama", href: "/#o-nama" },
  ]

  const close = () => setOpen(false)

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, ease: naturalEase }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-2xl border-b border-white/[0.15] shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between sm:h-20">
          {/* Logo */}
          <motion.a
            href="/"
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

          {/* Desktop CTA */}
          <motion.a
            href="/#kontakt"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden items-center gap-1.5 text-sm font-semibold text-cyan-400 transition-colors hover:text-cyan-300 md:inline-flex"
          >
            Kontakt <ArrowRight className="w-3.5 h-3.5" />
          </motion.a>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition-colors hover:text-white md:hidden"
          >
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
                href="/#kontakt"
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
