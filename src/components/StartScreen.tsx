import { motion } from 'framer-motion'
import { Sparkles, Star } from 'lucide-react'
import { DecorativeFlourish } from './Decorative'
export function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="screen start-screen">
      <motion.div className="start-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
        <motion.div className="start-badge" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.15, type: 'spring', stiffness: 180 }}>
          <Sparkles size={16} strokeWidth={1.6} /><span>Особое приключение</span><Sparkles size={16} strokeWidth={1.6} />
        </motion.div>
        <motion.h1 className="start-title" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }}>
          THE<br /><span className="title-accent">GIFT QUEST</span>
        </motion.h1>
        <DecorativeFlourish />
        <motion.p className="start-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55, duration: 0.7 }}>
          Сегодня тебя ждёт небольшое приключение. Впереди несколько испытаний, неожиданные находки и кое-что особенное в самом конце. Готова начать?
        </motion.p>
        <motion.button className="btn-primary" onClick={onStart} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.6 }} whileTap={{ scale: 0.97 }}>
          <Star size={18} strokeWidth={1.8} /><span>START ADVENTURE</span><Star size={18} strokeWidth={1.8} />
        </motion.button>
        <div className="start-footnote">Пять уровней · Пять загадок · Один подарок</div>
      </motion.div>
    </div>
  )
}