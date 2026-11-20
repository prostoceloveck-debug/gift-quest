import { motion } from 'framer-motion'
import { Gift, Trophy } from 'lucide-react'
import type { Level, LevelStatus } from '../types'
import { LevelNode } from './LevelNode'

interface Props {
  levels: Level[]
  statusFor: (id: number) => LevelStatus
  completed: number
  onOpenLevel: (id: number) => void
  onShowFinal: () => void
  finalReady: boolean
}

export function GameMap({
  levels,
  statusFor,
  completed,
  onOpenLevel,
  onShowFinal,
  finalReady,
}: Props) {
  return (
    <div className="screen map-screen">
      <motion.header
        className="map-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="map-eyebrow">The Gift Quest</div>
        <h1 className="map-title">Карта приключения</h1>
        <div className="progress-pill">
          <div className="progress-pill-inner">
            <span className="progress-num">{completed}</span>
            <span className="progress-slash">/</span>
            <span className="progress-total">{levels.length}</span>
          </div>
          <div className="progress-track">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${levels.length > 0 ? (completed / levels.length) * 100 : 0}%` }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            />
          </div>
        </div>
      </motion.header>

      <div className="map-canvas">
        <svg className="path-svg" viewBox="0 0 320 900" preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id="pathGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#e8b7c8" />
              <stop offset="0.5" stopColor="#d9b8e6" />
              <stop offset="1" stopColor="#f2c9b8" />
            </linearGradient>
          </defs>
          <path
            d="M 80 60 C 250 130, 260 200, 150 270 C 40 340, 60 420, 220 500 C 320 560, 260 640, 150 700 C 70 745, 90 810, 160 860"
            stroke="url(#pathGrad)"
            strokeWidth="3"
            strokeDasharray="6 8"
            fill="none"
            strokeLinecap="round"
            opacity="0.75"
          />
        </svg>

        <div className="nodes-layer">
          {levels.map((level, i) => (
            <LevelNode
              key={level.id}
              level={level}
              index={i}
              status={statusFor(level.id)}
              onClick={() => onOpenLevel(level.id)}
            />
          ))}
        </div>
      </div>

      {finalReady && (
        <motion.div
          className="final-cta-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button className="btn-final" onClick={onShowFinal}>
            <Trophy size={20} strokeWidth={1.7} />
            <span>Открыть финал</span>
            <Gift size={20} strokeWidth={1.7} />
          </button>
        </motion.div>
      )}
    </div>
  )
}