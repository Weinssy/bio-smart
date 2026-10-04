import { useRef } from 'react'
import { useProgress } from '../../context/ProgressContext'

export default function DataSyncBar() {
  const { progress, handleExport, handleImport, resetProgress } = useProgress()
  const fileInputRef = useRef(null)

  const lastSyncText = progress?.student?.lastSync || 'Hari ini, 10:45 WIB'

  const onImportButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const onFileInputChange = async (event) => {
    const file = event.target.files?.[0]
    if (file) {
      await handleImport(file)
      // Reset input agar pengguna dapat mengunggah file yang sama setelah modifikasi
      event.target.value = ''
    }
  }

  return (
    <section className="data-sync-bar" aria-label="Sinkronisasi Basis Data Siswa">
      {/* Synchronization Status */}
      <div className="sync-status">
        <div className="sync-icon-box">
          <span className="material-symbols-outlined">sync</span>
        </div>
        <div>
          <span className="sync-title">Sinkronisasi Basis Data Siswa</span>
          <p className="sync-time">
            <span>Terakhir disinkronkan: {lastSyncText}</span>
            <span className="pulse-dot" title="Sistem Aktif" />
          </p>
        </div>
      </div>

      {/* Action Cluster */}
      <div className="sync-actions">
        {/* Hidden File Input for .json Upload */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          style={{ display: 'none' }}
          id="json-import-input"
          onChange={onFileInputChange}
          aria-label="Upload file progres JSON"
        />

        {/* Import Button */}
        <button
          type="button"
          onClick={onImportButtonClick}
          className="btn-import"
          title="Muat file catatan progres .json lokal"
          aria-label="Import Data Progres Siswa (.json)"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>upload_file</span>
          <span>Import Data (.json)</span>
        </button>

        {/* Export Button */}
        <button
          type="button"
          onClick={handleExport}
          className="btn-export"
          title="Unduh backup data lengkap nilai dan progres belajar ke progress_biologi.json"
          aria-label="Export Data Progres Siswa ke format JSON"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>file_download</span>
          <span>Export Data</span>
          <span className="badge-tag">.json</span>
        </button>

        {/* Reset Button (Bonus utility) */}
        <button
          type="button"
          onClick={resetProgress}
          className="btn-reset"
          title="Reset data progres ke kondisi bawaan"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>restart_alt</span>
          <span>Reset</span>
        </button>
      </div>
    </section>
  )
}
