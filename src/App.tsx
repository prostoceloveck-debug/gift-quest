import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { StartScreen } from './components/StartScreen'
import { GameMap } from './components/GameMap'
import { RiddleScreen } from './components/RiddleScreen'
import { FinalScreen } from './components/FinalScreen'
import { Toast } from './components/Toast'
import { useGameState } from './hooks/useGameState'
import { LEVELS } from './constants'

type View = 'start' | 'map' | 'riddle' | 'final'

export default function App() {
  const game = useGameState()
  const [view, setView] = useState<View>('start')
  const [activeLevel, setActiveLevel] = useState<number | null>(null)

  const startGame = () => setView('map')

  const openLevel = (id: number) => {
    const status = game.statusFor(id)
    if (status === 'available' || status === 'completed') {
      setActiveLevel(id)
      setView('riddle')
    }
  }

  const backToMap = () => {
    setView('map')
    setActiveLevel(null)
  }

  const handleFinishLevel5 = () => {
    game.completeLevel5()
    setView('final')
  }

  const activeLevelData = activeLevel ? LEVELS.find((l) => l.id === activeLevel) : null

  return (
    <div className="app-shell">
      <BackgroundDecor />
      <AnimatePresence mode="wait">
        {view === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StartScreen onStart={startGame} />
          </motion.div>
        )}

        {view === 'map' && (
          <motion.div
            key="map"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5 }}
          >
            <GameMap
              levels={LEVELS}
              statusFor={game.statusFor}
              completed={game.progress.completed}
              onOpenLevel={openLevel}
              onShowFinal={() => setView('final')}
              finalReady={game.progress.completed >= 5}
            />
          </motion.div>
        )}

        {view === 'riddle' && activeLevelData && (
          <motion.div
            key="riddle"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4 }}
          >
            <RiddleScreen
              level={activeLevelData}
              status={game.statusFor(activeLevelData.id)}
              onBack={backToMap}
              onFinishLevel5={handleFinishLevel5}
            />
          </motion.div>
        )}

        {view === 'final' && (
          <motion.div
            key="final"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FinalScreen onBackToMap={backToMap} />
          </motion.div>
        )}
      </AnimatePresence>
      
      <Toast toast={game.toast} />

    </div>
  )
}

function BackgroundDecor() {
  return (
    <div className="bg-decor" aria-hidden>
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      <div className="grain" />
    </div>
  )
}
