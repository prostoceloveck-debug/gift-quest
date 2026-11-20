import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Info } from 'lucide-react'
import type { ToastMsg } from '../hooks/useGameState'
export function Toast({ toast }: { toast: ToastMsg | null }) {
  return (
    <div className="toast-host" aria-live="polite">
      <AnimatePresence>
        {toast && (
          <motion.div key={toast.id} className={`toast toast-${toast.kind}`} initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} transition={{ duration: 0.3 }}>
            {toast.kind === 'warn' ? <AlertCircle size={18} strokeWidth={2} /> : toast.kind === 'success' ? <CheckCircle2 size={18} strokeWidth={2} /> : <Info size={18} strokeWidth={2} />}
            <span>{toast.text}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}