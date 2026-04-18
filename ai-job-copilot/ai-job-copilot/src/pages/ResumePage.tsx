import { useState, useRef } from 'react'
import { Upload, FileText, CheckCircle, X, Sparkles, ChevronRight, TrendingUp, Award, Zap, AlertCircle } from 'lucide-react'

const SKILL_COLORS = [
  'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/40 dark:text-indigo-300 dark:border-indigo-700/50',
  'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/40 dark:text-violet-300 dark:border-violet-700/50',
  'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-700/50',
  'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-700/50',
  'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-700/50',
  'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-900/40 dark:text-pink-300 dark:border-pink-700/50',
  'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-900/40 dark:text-cyan-300 dark:border-cyan-700/50',
  'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/40 dark:text-rose-300 dark:border-rose-700/50',
]

const extractedSkills = ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'REST APIs', 'Git', 'Agile']
const suggestedRoles = [
  { title: 'Senior Frontend Engineer', match: 95 },
  { title: 'Full Stack Developer', match: 88 },
  { title: 'Software Engineer II', match: 82 },
  { title: 'React Developer', match: 79 },
]
const improvements = [
  'Add a portfolio link or GitHub profile',
  'Include measurable achievements (e.g. "reduced load time by 40%")',
  'Add relevant certifications (AWS, GCP, etc.)',
]

export default function ResumePage() {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [resumeText, setResumeText] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analyzed, setAnalyzed] = useState(false)
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload')
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    if (file.type === 'application/pdf' || file.type.includes('word') || file.type === 'text/plain') {
      setUploadedFile(file)
      setAnalyzed(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setTimeout(() => { setIsAnalyzing(false); setAnalyzed(true) }, 2200)
  }

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">Resume Analysis</h1>
        <p className="text-gray-400 dark:text-gray-500 mt-1 text-sm">Upload your resume and let AI extract your skills and match you with jobs.</p>
      </div>

      <div className="bg-white/80 dark:bg-white/5 rounded-2xl border border-white dark:border-white/10 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-100 dark:border-white/10">
          {(['upload', 'paste'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-sm font-semibold transition-all capitalize ${
                activeTab === tab
                  ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/10'
                  : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              {tab === 'upload' ? 'Upload File' : 'Paste Text'}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'upload' && (
            <>
              {!uploadedFile ? (
                <div
                  onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-200 ${
                    isDragging
                      ? 'border-indigo-400 bg-indigo-50/60 dark:bg-indigo-900/20 scale-[1.02]'
                      : 'border-gray-200 dark:border-white/15 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10'
                  }`}
                >
                  <input ref={fileRef} type="file" className="hidden" accept=".pdf,.doc,.docx,.txt" onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]) }} />
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 animate-float bg-indigo-50 dark:bg-indigo-500/20">
                    <Upload className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
                  </div>
                  <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-2">Drop your resume here</h3>
                  <p className="text-gray-400 dark:text-gray-500 text-sm mb-4">or click to browse your files</p>
                  <div className="flex items-center justify-center gap-2">
                    {['PDF', 'Word', 'TXT'].map(f => (
                      <span key={f} className="text-xs bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 px-2.5 py-1 rounded-lg font-medium">{f}</span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-indigo-50/60 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800/40">
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-800 dark:text-white truncate">{uploadedFile.name}</div>
                      <div className="text-sm text-gray-400">{(uploadedFile.size / 1024).toFixed(1)} KB • Ready to analyze</div>
                    </div>
                    <button onClick={() => { setUploadedFile(null); setAnalyzed(false) }} className="p-2 hover:bg-white dark:hover:bg-white/10 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  {!analyzed && (
                    <button onClick={handleAnalyze} disabled={isAnalyzing} className="w-full py-3.5 rounded-2xl font-semibold text-white transition-all hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 flex items-center justify-center gap-2.5 disabled:opacity-80 disabled:translate-y-0" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                      {isAnalyzing ? (
                        <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Analyzing your resume...</>
                      ) : (
                        <><Sparkles className="w-5 h-5" />Analyze with AI</>
                      )}
                    </button>
                  )}
                </div>
              )}
            </>
          )}

          {activeTab === 'paste' && (
            <div className="space-y-4">
              <textarea
                value={resumeText}
                onChange={e => setResumeText(e.target.value)}
                placeholder="Paste your resume content here..."
                rows={10}
                className="w-full border border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5 rounded-2xl p-4 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 dark:focus:border-indigo-600 resize-none placeholder:text-gray-300 dark:placeholder:text-gray-600 transition-all"
              />
              <button
                disabled={!resumeText.trim()}
                onClick={handleAnalyze}
                className="w-full py-3.5 rounded-2xl font-semibold text-white transition-all hover:shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
              >
                <Sparkles className="w-5 h-5" />Analyze Text
              </button>
            </div>
          )}
        </div>
      </div>

      {analyzed && (
        <div className="space-y-5 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
            <CheckCircle className="w-5 h-5" />
            Resume analyzed successfully! Here's what we found:
          </div>

          <div className="relative overflow-hidden rounded-3xl p-7 text-white" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #7c3aed 60%, #2563eb 100%)' }}>
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="flex items-end gap-4 relative">
              <div>
                <div className="text-sm text-indigo-200 font-medium mb-1 flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> Profile Strength
                </div>
                <div className="text-6xl font-black">82</div>
                <div className="text-indigo-200 text-sm">out of 100</div>
              </div>
              <div className="flex-1 pb-1.5">
                <div className="bg-white/20 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-white rounded-full h-2.5" style={{ width: '82%' }} />
                </div>
                <div className="text-xs text-indigo-200 mt-2">Add certifications & portfolio to reach 90+</div>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white/80 dark:bg-white/5 rounded-2xl p-6 border border-white dark:border-white/10 shadow-sm">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-indigo-500" /> Extracted Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {extractedSkills.map((skill, i) => (
                  <span key={skill} className={`text-xs px-3 py-1.5 rounded-xl border font-semibold ${SKILL_COLORS[i % SKILL_COLORS.length]}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white/80 dark:bg-white/5 rounded-2xl p-6 border border-white dark:border-white/10 shadow-sm">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-500" /> Best-Fit Roles
              </h3>
              <div className="space-y-3">
                {suggestedRoles.map(({ title, match }) => (
                  <div key={title} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <ChevronRight className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-200 font-medium truncate">{title}</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-lg flex-shrink-0">{match}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-white/5 rounded-2xl p-6 border border-amber-100 dark:border-amber-800/30 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500" /> Suggested Improvements
            </h3>
            <div className="space-y-3">
              {improvements.map((tip, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold text-amber-600 dark:text-amber-400">{i + 1}</div>
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
