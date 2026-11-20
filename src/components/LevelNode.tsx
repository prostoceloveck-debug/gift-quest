import { motion } from 'framer-motion'
import { Check, Lock, Sparkles } from 'lucide-react'
import type { Level, LevelStatus } from '../types'
interface Props { level: Level; index: number; status: LevelStatus; onClick: () => void }
const ICONS = [
  <Sparkles size={22} strokeWidth={1.7} key="i1" />,
  <span className="glyph" key="i2">❄</span>,
  <span className="glyph" key="i3">✦</span>,
  <span className="glyph" key="i4">☾</span>,
  <span className="glyph" key="i5">♛</span>,
]
export function LevelNode({ level, index, status, onClick }: Props) {
  const isLocked = status === 'locked'
  const isAvailable = status === 'available'
  const isCompleted = status === 'completed'
  const POS = [{ top: '5%', left: '14%' }, { top: '24%', left: '58%' }, { top: '47%', left: '20%' }, { top: '70%', left: '62%' }, { top: '90%', left: '30%' }][index] ?? { top: '50%', left: '50%' }
  return (
    <div className={`node-wrap ${status}`} style={{ top: POS.top, left: POS.left }}>
      <motion.button className={`node ${status}`} onClick={onClick} disabled={isLocked} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: isLocked ? 0.75 : 1, scale: 1 }} transition={{ delay: 0.15 + index * 0.08, type: 'spring', stiffness: 160 }} whileTap={!isLocked ? { scale: 0.94 } : undefined} aria-label={`Уровень ${level.id}: ${level.title}`}>
        {isAvailable && <span className="pulse-ring" aria-hidden />}
        <span className="node-inner">{isLocked ? <Lock size={20} strokeWidth={2} /> : isCompleted ? <Check size={24} strokeWidth={2.4} /> : ICONS[index]}</span>
        <span className="node-num">0{level.id}</span>
      </motion.button>
      <div className={`node-label ${status}`}>
        <div className="node-level">LEVEL 0{level.id}</div>
        <div className="node-title">{level.title}</div>
      </div>
    </div>
  )
}