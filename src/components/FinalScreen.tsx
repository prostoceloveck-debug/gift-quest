import { motion } from 'framer-motion'
import { ArrowLeft, Gift, Sparkles } from 'lucide-react'
import { FloatingPetals } from './Decorative'
export function FinalScreen({ onBackToMap }: { onBackToMap: () => void }) {
  return (
    <div className="screen final-screen">
      <FloatingPetals />
      <div className="final-content">
        <motion.div className="gift-box" initial={{ scale: 0.4, opacity: 0, rotate: -12 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 140, damping: 12 }}>
          <div className="gift-lid">
            <motion.div className="lid-spark" animate={{ y: [0, -6, 0], opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }}><Sparkles size={22} strokeWidth={1.6} /></motion.div>
          </div>
          <div className="gift-body"><Gift size={44} strokeWidth={1.4} /></div>
        </motion.div>
        <motion.h1 className="final-title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}>YOU DID IT!</motion.h1>
        <motion.p className="final-text" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.7 }}>
          Ты прошла весь путь, разгадала все загадки и добралась до самого главного.<br /><br /><span className="final-highlight">Поздравляем! Твой новый iPhone ждёт тебя!</span>
        </motion.p>
        <motion.button className="back-btn ghost" onClick={onBackToMap} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }} whileTap={{ scale: 0.95 }}>
          <ArrowLeft size={16} strokeWidth={2} /><span>Вернуться к карте</span>
        </motion.button>
      </div>
    </div>
  )
}
