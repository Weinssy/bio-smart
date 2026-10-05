import { useProgress } from '../../context/ProgressContext'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'

export default function WelcomeBanner() {
  const { progress } = useProgress()
  const student = progress?.student || { name: 'Raditya Putra', streakDays: 12, curriculum: 'Kurikulum Merdeka 2024/2025 • Fase F' }
  const stats = progress?.stats || { semesterTargetPercent: 78 }

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-green-900 to-green-700 text-white border-none mb-8">
      {/* Decorative Motif */}
      <span className="material-symbols-outlined absolute -right-8 -bottom-8 text-[180px] opacity-10 text-white pointer-events-none">eco</span>

      <CardContent className="p-8 flex flex-col md:flex-row gap-8 justify-between items-start md:items-center relative z-10">
        <div className="max-w-2xl space-y-4">
          <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none flex w-fit items-center gap-1.5 px-3 py-1">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            {student.curriculum}
          </Badge>
          
          <h1 className="text-3xl md:text-4xl font-bold font-display tracking-tight">
            Statistik & Progres Belajar Biologi
          </h1>
          
          <p className="text-green-50 text-base md:text-lg max-w-xl">
            Pertahankan ketekunan belajarmu, <span className="font-semibold text-white">{student.name}</span>! Kamu telah menyelesaikan modul transport membran dan siap untuk praktikum osmosis mandiri.
          </p>
        </div>

        {/* Highlights */}
        <div className="flex gap-4 w-full md:w-auto">
          <Card className="bg-white/10 border-white/20 backdrop-blur-md text-white flex-1 md:flex-none">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 bg-orange-500/20 rounded-full text-orange-400">
                <span className="material-symbols-outlined text-[28px] drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
              </div>
              <div>
                <div className="text-2xl font-bold font-display">{student.streakDays ?? 12} Hari</div>
                <div className="text-sm text-green-100 font-medium">Streak Belajar Aktif</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-md text-white flex-1 md:flex-none">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 bg-emerald-400/20 rounded-full text-emerald-300">
                <span className="material-symbols-outlined text-[28px]">donut_large</span>
              </div>
              <div>
                <div className="text-2xl font-bold font-display">{stats.semesterTargetPercent ?? 78}%</div>
                <div className="text-sm text-green-100 font-medium">Target Semester</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
