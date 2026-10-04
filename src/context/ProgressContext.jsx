import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  loadProgressFromStorage,
  saveProgressToStorage,
  exportProgress,
  importProgress,
} from '../utils/storage'
import { INITIAL_PROGRESS_DATA } from '../data/initialProgress'

const ProgressContext = createContext(null)

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => loadProgressFromStorage())
  const [toast, setToast] = useState({
    show: false,
    title: '',
    message: '',
    isSuccess: true,
  })

  // Simpan setiap perubahan state progres ke localStorage secara otomatis
  useEffect(() => {
    if (progress) {
      saveProgressToStorage(progress)
    }
  }, [progress])

  const showToast = useCallback((title, message, isSuccess = true) => {
    setToast({
      show: true,
      title,
      message,
      isSuccess,
    })
  }, [])

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, show: false }))
  }, [])

  // Auto-hide toast setelah 3.5 detik
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        hideToast()
      }, 3500)
      return () => clearTimeout(timer)
    }
  }, [toast.show, hideToast])

  /**
   * Memperbarui sebagian atau seluruh state progress
   */
  const updateProgress = useCallback((updater) => {
    setProgress((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater }
      return next
    })
  }, [])

  /**
   * Logika Penilaian Kuis:
   * - Menghitung kelulusan berdasarkan KKM (default: 75).
   * - Memperbarui status kuis: is_passed: true.
   * - Mencatat highest_score (hanya menimpa jika nilai baru lebih tinggi) & increment attempts.
   * - Memperbarui modul terkait menjadi completed: true & status: 'Tuntas'.
   * - Menghitung ulang rata-rata kuis pada stats.
   */
  const submitQuizResult = useCallback(
    ({ quizId, score, moduleId = 'mod-1', passingGrade = 75 }) => {
      const isPassed = Number(score) >= passingGrade

      setProgress((prev) => {
        const currentQuizzes = prev.quizzes || []
        const existingQuiz = currentQuizzes.find((q) => q.id === quizId)

        let updatedQuizzes
        if (existingQuiz) {
          const prevHighest = existingQuiz.highest_score ?? existingQuiz.score ?? 0
          const attempts = (existingQuiz.attempts ?? 1) + 1
          const highestScore = Math.max(prevHighest, score)
          const passedStatus = Boolean(existingQuiz.is_passed || isPassed)

          updatedQuizzes = currentQuizzes.map((q) =>
            q.id === quizId
              ? {
                  ...q,
                  score,
                  highest_score: highestScore,
                  attempts,
                  is_passed: passedStatus,
                  status: passedStatus ? 'Tuntas' : 'Perlu Remedial',
                  completedAt: new Date().toISOString().slice(0, 10),
                }
              : q
          )
        } else {
          updatedQuizzes = [
            ...currentQuizzes,
            {
              id: quizId,
              title: 'Kuis Biologi Sel & Organel',
              score,
              highest_score: score,
              attempts: 1,
              is_passed: isPassed,
              status: isPassed ? 'Tuntas' : 'Perlu Remedial',
              completedAt: new Date().toISOString().slice(0, 10),
            },
          ]
        }

        // Perbarui modul terkait jika lulus kuis
        let updatedModules = prev.modules || []
        if (isPassed && moduleId) {
          updatedModules = updatedModules.map((m) => {
            if (m.id === moduleId || m.name.toLowerCase().includes('sel')) {
              return {
                ...m,
                completed: true,
                status: 'Tuntas',
                masteryPercent: Math.max(m.masteryPercent || 0, score),
              }
            }
            return m
          })
        }

        // Hitung ulang statistik agregat
        const totalScores = updatedQuizzes.reduce(
          (sum, q) => sum + (q.highest_score ?? q.score ?? 0),
          0
        )
        const avgScore =
          updatedQuizzes.length > 0
            ? Number((totalScores / updatedQuizzes.length).toFixed(1))
            : prev.stats?.averageQuizScore || 88.5
        const completedCount = updatedModules.filter(
          (m) => m.completed || m.status === 'Tuntas'
        ).length

        return {
          ...prev,
          quizzes: updatedQuizzes,
          modules: updatedModules,
          stats: {
            ...prev.stats,
            averageQuizScore: avgScore,
            completedModules: completedCount,
          },
        }
      })

      if (isPassed) {
        showToast(
          'Selamat, Anda Lulus Kuis!',
          `Skor: ${score}/100 (KKM: ${passingGrade}). Modul Biologi Sel berhasil ditandai Tuntas!`,
          true
        )
      } else {
        showToast(
          'Kuis Selesai',
          `Skor: ${score}/100. Belum mencapai KKM (${passingGrade}). Silakan pelajari kembali materi dan lakukan remedial.`,
          false
        )
      }

      return { isPassed, score }
    },
    [showToast]
  )

  /**
   * Menjalankan ekspor progres ke berkas progress_biologi.json
   */
  const handleExport = useCallback(() => {
    try {
      exportProgress(progress, 'progress_biologi.json')
      showToast(
        'Ekspor Berhasil',
        'Berkas progress_biologi.json berhasil diunduh ke perangkat Anda.',
        true
      )
      return true
    } catch (err) {
      showToast('Gagal Ekspor', err.message || 'Terjadi kesalahan saat mengekspor data.', false)
      return false
    }
  }, [progress, showToast])

  /**
   * Menerima file upload, memvalidasi root keys (modules & quizzes),
   * menimpa localStorage dan memperbarui state React.
   */
  const handleImport = useCallback(
    async (file) => {
      try {
        const validatedData = await importProgress(file)
        setProgress(validatedData)
        showToast(
          'Impor Berhasil',
          `Data progres ${validatedData.student?.name || 'Siswa'} berhasil disinkronkan.`,
          true
        )
        return { success: true, data: validatedData }
      } catch (err) {
        showToast(
          'Impor Ditolak',
          err.message || 'Berkas tidak sesuai format atau struktur skema BioSMA.',
          false
        )
        return { success: false, error: err.message }
      }
    },
    [showToast]
  )

  /**
   * Mengembalikan data ke kondisi awal
   */
  const resetProgress = useCallback(() => {
    setProgress(INITIAL_PROGRESS_DATA)
    saveProgressToStorage(INITIAL_PROGRESS_DATA)
    showToast('Reset Berhasil', 'Data progres dikembalikan ke nilai bawaan kurikulum.', true)
  }, [showToast])

  const value = {
    progress,
    updateProgress,
    submitQuizResult,
    handleExport,
    handleImport,
    resetProgress,
    toast,
    showToast,
    hideToast,
  }

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error('useProgress harus digunakan di dalam ProgressProvider')
  }
  return context
}
