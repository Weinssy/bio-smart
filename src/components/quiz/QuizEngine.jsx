import { useState, useMemo } from 'react'
import quizDataset from '../../data/quizData.json'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import { Progress } from '../ui/progress'
import { Badge } from '../ui/badge'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Label } from '../ui/label'
import { toast } from 'sonner'

export default function QuizEngine({ quizId = 'quiz-sel' }) {
  const currentQuizData = useMemo(() => {
    return quizDataset.quizzes.find((q) => q.id === quizId) || quizDataset.quizzes[0]
  }, [quizId])

  const questions = currentQuizData.questions || []
  const passingGrade = currentQuizData.passingGrade || 75

  // State kuis
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState({}) // { [questionId]: optionIndex }
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submissionResult, setSubmissionResult] = useState(null)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const currentQuestion = questions[currentIndex]
  const isLastQuestion = currentIndex === questions.length - 1
  const answeredCount = Object.keys(userAnswers).length
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100)

  const handleSelectOption = (optionIndex) => {
    if (isSubmitted) return
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex,
    }))
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  const handleSubmit = () => {
    let correctCount = 0
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        correctCount++
      }
    })

    const score = Math.round((correctCount / questions.length) * 100)

    setSubmissionResult({
      score,
      correctCount,
      totalQuestions: questions.length,
      isPassed: score >= passingGrade,
    })
    setIsConfirmOpen(false)
    setIsSubmitted(true)

    // Gamification Toast Notification
    if (score === 100) {
      toast.success('Luar Biasa! Sempurna 100!', {
        description: 'Anda mendapatkan +50 XP dan badge "Sel Master"!',
        duration: 5000,
      })
    } else if (score >= passingGrade) {
      toast.success(`Lulus KKM! Skor Anda ${score}.`, {
        description: 'Bagus sekali! Anda mendapatkan +20 XP.',
      })
    } else {
      toast.error(`Skor Anda ${score} (Belum Lulus)`, {
        description: 'Jangan menyerah! Cek pembahasan dan coba lagi nanti.',
      })
    }
  }

  const handleRetake = () => {
    setUserAnswers({})
    setCurrentIndex(0)
    setIsSubmitted(false)
    setSubmissionResult(null)
  }

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
      {/* Quiz Top Bar with Title and Status */}
      <div className="flex justify-between items-center flex-wrap gap-3 mb-2">
        <div>
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            {currentQuizData.topic} • KKM: {passingGrade}
          </span>
          <h2 className="text-2xl font-extrabold text-foreground mt-1 font-display">
            {currentQuizData.title}
          </h2>
        </div>
      </div>

      {!isSubmitted ? (
        /* WIZARD VIEW: One Question Per Page */
        <Card className="shadow-md overflow-hidden">
          <CardHeader className="bg-muted/30 border-b pb-6">
            <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
              <span className="font-bold text-primary">
                Soal {currentIndex + 1} dari {questions.length}
              </span>
              <span>
                Terjawab: {answeredCount} / {questions.length}
              </span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </CardHeader>
          
          <CardContent className="pt-8 pb-6 px-6 sm:px-10">
            {/* Question Text */}
            <div className="mb-8">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground leading-relaxed">
                {currentQuestion.question}
              </h3>
            </div>

            {/* Options using RadioGroup */}
            <RadioGroup 
              value={userAnswers[currentQuestion.id]?.toString()} 
              onValueChange={(val) => handleSelectOption(Number(val))}
              className="flex flex-col gap-3"
            >
              {currentQuestion.options.map((option, optIdx) => {
                const isSelected = userAnswers[currentQuestion.id] === optIdx
                const optionLetters = ['A', 'B', 'C', 'D']

                return (
                  <Label
                    key={optIdx}
                    htmlFor={`option-${optIdx}`}
                    className={`
                      relative flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border-2
                      ${isSelected 
                        ? 'border-primary bg-primary/5 shadow-[0_2px_10px_rgba(13,92,70,0.1)]' 
                        : 'border-muted bg-background hover:bg-muted/50 hover:border-primary/30'}
                    `}
                  >
                    <RadioGroupItem value={optIdx.toString()} id={`option-${optIdx}`} className="sr-only" />
                    
                    <span
                      className={`
                        flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors
                        ${isSelected 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-foreground'}
                      `}
                    >
                      {optionLetters[optIdx]}
                    </span>
                    <span className="text-base font-normal leading-relaxed flex-1 cursor-pointer">
                      {option}
                    </span>
                  </Label>
                )
              })}
            </RadioGroup>
          </CardContent>

          {/* Wizard Footer Navigation */}
          <CardFooter className="flex justify-between items-center py-5 px-6 sm:px-10 bg-muted/10 border-t">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span className="hidden sm:inline">Sebelumnya</span>
            </Button>

            {isLastQuestion ? (
              <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                <DialogTrigger asChild>
                  <Button
                    disabled={answeredCount < questions.length}
                    className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
                  >
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                    Kirim Jawaban
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Kirim Jawaban Kuis?</DialogTitle>
                    <DialogDescription>
                      Anda telah menjawab semua soal. Apakah Anda yakin ingin mengirim jawaban sekarang? Anda tidak dapat mengubah jawaban setelah dikirim.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>
                      Batal
                    </Button>
                    <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700">
                      Ya, Kirim Sekarang
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ) : (
              <Button
                onClick={handleNext}
                className="gap-2"
              >
                <span className="hidden sm:inline">Selanjutnya</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Button>
            )}
          </CardFooter>
        </Card>
      ) : (
        /* RESULTS & REVIEW VIEW */
        <div className="flex flex-col gap-6">
          {/* Result Card */}
          <Card className="shadow-lg text-center overflow-hidden">
            <div className={`h-2 w-full ${submissionResult?.isPassed ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            <CardContent className="pt-10 pb-10">
              <div
                className={`
                  mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full
                  ${submissionResult?.isPassed ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}
                `}
              >
                <span className="material-symbols-outlined text-[56px]">
                  {submissionResult?.isPassed ? 'emoji_events' : 'replay'}
                </span>
              </div>

              <Badge
                variant="outline"
                className={`
                  mb-4 px-4 py-1 text-sm font-bold border-2
                  ${submissionResult?.isPassed 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : 'bg-rose-50 text-rose-700 border-rose-200'}
                `}
              >
                {submissionResult?.isPassed ? 'LULUS KKM' : 'BELUM MEMENUHI KKM'}
              </Badge>

              <h3 className="text-5xl font-extrabold font-display text-foreground mb-4">
                {submissionResult?.score} <span className="text-2xl font-medium text-muted-foreground">/ 100</span>
              </h3>

              <p className="text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">
                {submissionResult?.isPassed
                  ? 'Luar biasa! Skor Anda telah melampaui KKM 75. Anda telah menguasai materi ini dengan baik.'
                  : 'Nilai belum mencapai standar ketuntasan minimal (75). Tinjau kembali kunci jawaban di bawah untuk memperdalam pemahaman.'}
              </p>

              <Button
                onClick={handleRetake}
                variant="outline"
                size="lg"
                className="gap-2 font-bold hover:bg-muted"
              >
                <span className="material-symbols-outlined text-[20px]">refresh</span>
                Ulangi Kuis Formatif
              </Button>
            </CardContent>
          </Card>

          {/* Detailed Question Review List */}
          <Card className="shadow-sm">
            <CardHeader className="bg-muted/20 border-b">
              <CardTitle className="text-xl">Pembahasan & Kunci Jawaban</CardTitle>
              <CardDescription>Tinjau kembali jawaban Anda dan pahami konsepnya melalui penjelasan ilmiah di bawah ini.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-5">
                {questions.map((q, idx) => {
                  const userChoice = userAnswers[q.id]
                  const isCorrect = userChoice === q.correctIndex

                  return (
                    <div
                      key={q.id}
                      className={`
                        p-5 rounded-xl border-2 transition-colors
                        ${isCorrect ? 'border-emerald-200 bg-emerald-50/50' : 'border-rose-200 bg-rose-50/50'}
                      `}
                    >
                      <div className="flex justify-between items-start gap-4 mb-3">
                        <p className="font-semibold text-[15px] text-foreground leading-snug">
                          {idx + 1}. {q.question}
                        </p>
                        <Badge
                          variant="outline"
                          className={`
                            shrink-0 border-none font-bold
                            ${isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}
                          `}
                        >
                          {isCorrect ? 'Benar (+20)' : 'Salah (0)'}
                        </Badge>
                      </div>

                      <div className="text-sm space-y-1.5 mb-4">
                        <p className={isCorrect ? 'text-emerald-700 font-medium' : 'text-rose-700 font-medium'}>
                          <strong>Jawaban Anda:</strong> {q.options[userChoice] ?? 'Tidak Dijawab'}
                        </p>
                        {!isCorrect && (
                          <p className="text-emerald-700 font-medium">
                            <strong>Kunci Jawaban yang Benar:</strong> {q.options[q.correctIndex]}
                          </p>
                        )}
                      </div>

                      <div className="p-3.5 rounded-lg bg-white dark:bg-black/20 text-sm text-foreground/80 leading-relaxed border border-border/50">
                        <strong className="text-foreground">Penjelasan Ilmiah:</strong> {q.explanation}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
