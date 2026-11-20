export type LevelStatus = 'locked' | 'available' | 'completed'
export interface Level { id: number; title: string; riddle: string }
export interface GameProgress { completed: number; finalSeen: boolean }
