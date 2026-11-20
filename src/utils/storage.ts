import type { GameProgress } from '../types'
import { STORAGE_KEY } from '../constants'
const DEFAULT: GameProgress = { completed: 0, finalSeen: false }
export function loadProgress(): GameProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT
    const parsed = JSON.parse(raw) as Partial<GameProgress>
    const completed = Math.max(0, Math.min(5, Number(parsed.completed) || 0))
    return { completed, finalSeen: Boolean(parsed.finalSeen) }
  } catch { return DEFAULT }
}
export function saveProgress(p: GameProgress) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)) } catch {}
}