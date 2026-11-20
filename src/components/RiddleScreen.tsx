import { motion } from 'framer-motion'
import { ArrowLeft, Gift, Sparkles } from 'lucide-react'
import type { Level, LevelStatus } from '../types'
interface Props { level: Level; status: LevelStatus; onBack: () => void; onFinishLevel5: () => void }
export function RiddleScreen({ level, status, onBack, onFinishLevel5 }: Props) {
  const isFifth = level.id === 5
  return (
    <div className="screen riddle-screen">
      <motion.button className="back-btn" onClick={onBack} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} whileTap={{ scale: 0.95 }}>
        <ArrowLeft size={18} strokeWidth={2} /><span>К карте</span>
      </motion.button>
      <motion.div className="riddle-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="riddle-badge"><Sparkles size={14} strokeWidth={1.8} /><span>LEVEL 0{level.id}</span></div>
        <h1 className="riddle-title">{level.title}</h1>
        <div className="riddle-ornament" aria-hidden>
          <span />
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l1.9 5.9L20 9.8l-5 3.8 1.9 6L12 16.5 7.1 19.6 9 13.6 4 9.8l6.1-1.9L12 2Z" fill="url(#starGrad)" opacity="0.8" />
            <defs><linearGradient id="starGrad" x1="4" y1="2" x2="20" y2="20"><stop stopColor="#e8a7b8" /><stop offset="1" stopColor="#c8a4d8" /></linearGradient></defs>
          </svg>
          <span />
        </div>
        <div className="riddle-text">
          {level.riddle.split('\n').map((line, i) => line.trim() === '' ? <div key={i} className="riddle-gap" /> : <p key={i}>{line}</p>)}
        </div>
        {status === 'completed' && !isFifth && (
          <div className="riddle-status done"><Gift size={16} strokeWidth={1.8} /><span>Этот этап уже пройден. Ищи следующий QR-код.</span></div>
        )}
        {status === 'available' && !isFifth && (
          <div className="riddle-status hint">Найди подарок и спрятанный рядом QR-код — он откроет следующий уровень.</div>
        )}
        {isFifth && status !== 'locked' && (
          <motion.button className="btn-primary finish-btn" onClick={onFinishLevel5} whileTap={{ scale: 0.97 }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Gift size={18} strokeWidth={1.8} /><span>Я нашла главный подарок!</span>
          </motion.button>
        )}
      </motion.div>
    </div>
  )
}