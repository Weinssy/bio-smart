import { INITIAL_PROGRESS_DATA } from '../data/initialProgress'

export const STORAGE_KEY = 'biosma_learning_progress'

/**
 * Membaca data progres dari localStorage.
 * Mengembalikan data default jika belum ada atau terjadi error parsing.
 * @returns {object}
 */
export function loadProgressFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      saveProgressToStorage(INITIAL_PROGRESS_DATA)
      return INITIAL_PROGRESS_DATA
    }
    const parsed = JSON.parse(raw)
    // Validasi integritas dasar data lokal
    if (parsed && typeof parsed === 'object' && 'modules' in parsed && 'quizzes' in parsed) {
      return parsed
    }
    console.warn('Data di localStorage tidak memiliki root key yang valid. Mereset ke data awal.')
    saveProgressToStorage(INITIAL_PROGRESS_DATA)
    return INITIAL_PROGRESS_DATA
  } catch (err) {
    console.error('Gagal membaca data dari localStorage:', err)
    return INITIAL_PROGRESS_DATA
  }
}

/**
 * Menyimpan objek progres belajar ke localStorage.
 * @param {object} data
 */
export function saveProgressToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    return true
  } catch (err) {
    console.error('Gagal menyimpan data ke localStorage:', err)
    return false
  }
}

/**
 * Mengonversi state JSON progres ke file progress_biologi.json
 * dan memicu unduhan langsung di peramban pengguna.
 * @param {object} progressData
 * @param {string} [filename='progress_biologi.json']
 */
export function exportProgress(progressData, filename = 'progress_biologi.json') {
  try {
    const jsonString = JSON.stringify(progressData, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' })
    const url = URL.createObjectURL(blob)

    const downloadLink = document.createElement('a')
    downloadLink.href = url
    downloadLink.setAttribute('download', filename)
    document.body.appendChild(downloadLink)
    downloadLink.click()

    // Bersihkan DOM dan ObjectURL
    document.body.removeChild(downloadLink)
    URL.revokeObjectURL(url)

    return { success: true, filename }
  } catch (err) {
    console.error('Gagal mengekspor file progres:', err)
    throw new Error('Terjadi kegagalan saat membuat dan mengunduh berkas progress_biologi.json.')
  }
}

/**
 * Membaca berkas .json yang diunggah pengguna, memvalidasi keberadaan root key
 * `modules` dan `quizzes`, lalu menimpanya ke localStorage.
 * @param {File} file
 * @returns {Promise<object>} Data progres yang telah tervalidasi
 */
export function importProgress(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error('Tidak ada file yang dipilih untuk diimpor.'))
    }

    if (!file.name.toLowerCase().endsWith('.json') && file.type !== 'application/json') {
      return reject(new Error('Format berkas tidak valid. Harap unggah berkas berekstensi .json.'))
    }

    const reader = new FileReader()

    reader.onload = (event) => {
      try {
        const text = event.target.result
        const parsed = JSON.parse(text)

        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
          return reject(new Error('Format isi JSON tidak valid atau bukan berupa objek.'))
        }

        // Validasi wajib: minimal mengecek keberadaan root key modules dan quizzes
        const hasModules = Object.prototype.hasOwnProperty.call(parsed, 'modules')
        const hasQuizzes = Object.prototype.hasOwnProperty.call(parsed, 'quizzes')

        if (!hasModules || !hasQuizzes) {
          return reject(
            new Error(
              'Validasi skema gagal: Berkas JSON harus memiliki root key "modules" dan "quizzes".'
            )
          )
        }

        // Perbarui timestamp sinkronisasi jika ada node student
        const now = new Date()
        const timeString = `Hari ini, ${String(now.getHours()).padStart(2, '0')}:${String(
          now.getMinutes()
        ).padStart(2, '0')} WIB`

        const updatedData = {
          ...parsed,
          student: {
            ...(parsed.student || {}),
            lastSync: timeString,
          },
        }

        // Timpa ke localStorage
        saveProgressToStorage(updatedData)

        resolve(updatedData)
      } catch (err) {
        reject(
          new Error('Gagal mengurai file JSON. Pastikan sintaks file JSON Anda benar dan tidak rusak.')
        )
      }
    }

    reader.onerror = () => {
      reject(new Error('Gagal membaca berkas dari sistem peramban.'))
    }

    reader.readAsText(file)
  })
}
