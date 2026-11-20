import { useCallback, useEffect, useRef, useState } from 'react'
import type { GameProgress, LevelStatus } from '../types'
import { loadProgress, saveProgress } from '../utils/storage'
type ToastKind = 'info' | 'warn' | 'success'
export interface ToastMsg { id: number; kind: ToastKind; text: string }
export function useGameState() {
  const [progress, setProgress] = useState<GameProgress>(() => loadProgress())
  const [toast, setToast] = useState<ToastMsg | null>(null)
  const toastId = useRef(0)
  const lastCodeRef = useRef<string | null>(null)
  const showToast = useCallback((text: string, kind: ToastKind = 'info') => {
    toastId.current += 1
    setToast({ id: toastId.current, kind, text })
  }, [])
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3600)
    return () => clearTimeout(t)
  }, [toast])
  useEffect(() => { saveProgress(progress) }, [progress])
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const codeRaw = params.get('code')
    if (!codeRaw) return
    const signature = `${codeRaw}:${window.location.search}`
    if (lastCodeRef.current === signature) return
    lastCodeRef.current = signature
    const code = Number(codeRaw)
    if (!Number.isInteger(code) || code < 1 || code > 5) {
      showToast('Неизвестный код. Проверь QR-код.', 'warn')
      cleanUrl()
      return
    }
    setProgress((prev) => {
      if (code === 1) {
        if (prev.completed === 0) showToast('Level 01 открыт. Вперёд!', 'success')
        else showToast('Level 01 уже пройден.', 'info')
        return prev
      }
      if (prev.completed < code - 1) {
        showToast(`Сначала заверши LEVEL 0${prev.completed + 1}, потом возвращайся.`, 'warn')
        return prev
      }
      if (prev.completed >= code) {
        showToast(`LEVEL 0${code} уже пройден.`, 'info')
        return prev
      }
      const nextCompleted = code - 1
      showToast(`LEVEL 0${code} открыт!`, 'success')
      return { ...prev, completed: nextCompleted }
    })
    cleanUrl()
  }, [])
  const completeLevel5 = useCallback(() => {
    setProgress((prev) => {
      if (prev.completed < 4) return prev
      return { ...prev, completed: 5, finalSeen: true }
    })
  }, [])
  const statusFor = useCallback((levelId: number): LevelStatus => {
    if (levelId <= progress.completed) return 'completed'
    if (levelId === progress.completed + 1) return 'available'
    return 'locked'
  }, [progress.completed])
  const reset = useCallback(() => {
    setProgress({ completed: 0, finalSeen: false })
    showToast('Прогресс сброшен.', 'info')
  }, [showToast])
  return { progress, toast, showToast, statusFor, completeLevel5, reset, isFinal: progress.completed >= 5 && progress.finalSeen }
}
function cleanUrl() {
  try {
    const url = new URL(window.location.href)
    url.searchParams.delete('code')
    const next = url.pathname + (url.search ? url.search : '') + url.hash
    window.history.replaceState({}, '', next)
  } catch {}
}
