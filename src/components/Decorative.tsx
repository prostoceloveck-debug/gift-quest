import * as React from 'react'
import { motion } from 'framer-motion'

export function DecorativeFlourish() {
  return (
    <div className="flourish" aria-hidden>
      <span className="flourish-line" />
      <svg width="34" height="20" viewBox="0 0 34 20" fill="none">
        <path d="M17 2C13 6 10 8 4 9c6 1 9 3 13 7 4-4 7-6 13-7-6-1-9-3-13-7Z" fill="url(#g1)" opacity="0.75" />
        <defs><linearGradient id="g1" x1="4" y1="2" x2="30" y2="18"><stop stopColor="#e8a7b8" /><stop offset="1" stopColor="#c8a4d8" /></linearGradient></defs>
      </svg>
      <span className="flourish-line" />
    </div>
  )
}
export function FloatingPetals() {
  const petals = Array.from({ length: 18 }).map((_, i) => ({ id: i, left: Math.random() * 100, delay: Math.random() * 6, dur: 7 + Math.random() * 6, size: 6 + Math.random() * 8, hue: i % 3 }))
  return (
    <div className="petals" aria-hidden>
      {petals.map((p) => (
        <motion.span key={p.id} className={`petal petal-${p.hue}`} style={{ left: `${p.left}%`, width: p.size, height: p.size * 1.4 }} initial={{ y: '-10vh', opacity: 0, rotate: 0 }} animate={{ y: '110vh', opacity: [0, 0.9, 0.9, 0], rotate: 360 }} transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'linear' }} />
      ))}
    </div>
  )
}