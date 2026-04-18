import { useState } from 'react'
import { Briefcase, MapPin, Clock, DollarSign, Star, Search, SlidersHorizontal, Building2, ArrowUpRight, Bookmark, ChevronDown } from 'lucide-react'
import { Job } from '../types'

const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    type: 'full-time',
    salary: '$140k – $180k',
    description: 'Build beautiful, performant user interfaces used by millions. You\'ll lead frontend architecture decisions and mentor junior developers on a world-class team.',
    requirements: ['React', 'TypeScript', 'GraphQL', 'CSS', '5+ years'],
    matchScore: 95,
    postedAt: '2 days ago',
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    company: 'StartupXYZ',
    location: 'Remote',
    type: 'remote',
    salary: '$120k – $160k',
    description: 'Join our fast-moving startup as a Full Stack Developer. Work on products that impact millions of users and ship features weekly.',
    requirements: ['Node.js', 'React', 'PostgreSQL', 'AWS', '3+ years'],
    matchScore: 88,
    postedAt: '1 day ago',
  },
  {
    id: '3',
    title: 'React Native Developer',
    company: 'MobileFirst Inc',
    location: 'New York, NY',
    type: 'full-time',
    salary: '$130k – $165k',
    description: 'Build cross-platform mobile experiences for iOS and Android used by 2M+ users. Strong ownership culture with high autonomy.',
    requirements: ['React Native', 'TypeScript', 'Redux', 'iOS', 'Android'],
    matchScore: 76,
    postedAt: '3 days ago',
  },
  {
    id: '4',
    title: 'Backend Engineer',
    company: 'DataDriven Co',
    location: 'Austin, TX',
    type: 'full-time',
    salary: '$125k – $155k',
    description: 'Design and build scalable backend systems powering our data analytics platform. You\'ll work closely with ML engineers on data pipelines.',
    requirements: ['Python', 'Django', 'PostgreSQL', 'Redis', 'Docker'],
    matchScore: 62,
    postedAt: '1 week ago',
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'CloudScale',
    location: 'Seattle, WA',
    type: 'full-time',
    salary: '$135k – $170k',
    description: 'Lead infrastructure automation and CI/CD pipelines for our cloud-native platform serving Fortune 500 clients.',
    requirements: ['Kubernetes', 'Terraform', 'AWS', 'CI/CD', 'Go or Python'],
    matchScore: 55,
    postedAt: '5 days ago',
  },
  {
    id: '6',
    title: 'UI/UX Engineer',
    company: 'DesignStudio',
    location: 'Remote',
    type: 'contract',
    salary: '$80 – $120/hr',
    description: 'Craft pixel-perfect designs and implement them with modern frontend tech. Own the full product design lifecycle from ideation to launch.',
    requirements: ['Figma', 'React', 'CSS', 'Design Systems', 'User Research'],
    matchScore: 72,
    postedAt: '4 days ago',
  },
]

const TYPE_CONFIG: Record<string, { label: string; colors: string; darkColors: string }> = {
  'full-time': { label: 'Full-time', colors: 'bg-blue-50 text-blue-700 border-blue-100', darkColors: 'dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700/50' },
  'part-time': { label: 'Part-time', colors: 'bg-amber-50 text-amber-700 border-amber-100', darkColors: 'dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700/50' },
  'contract':  { label: 'Contract',  colors: 'bg-purple-50 text-purple-700 border-purple-100', darkColors: 'dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700/50' },
  'remote':    { label: 'Remote',    colors: 'bg-emerald-50 text-emerald-700 border-emerald-100', darkColors: 'dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700/50' },
}

function MatchBadge({ score }: { score: number }) {
  const config =
    score >= 85 ? { cls: 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-300 dark:bg-emerald-900/30 dark:border-emerald-700/50' } :
    score >= 70 ? { cls: 'text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-300 dark:bg-amber-900/30 dark:border-amber-700/50' } :
    { cls: 'text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-700' }

  return (
    <div className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-bold ${config.cls}`}>
      <Star className="w-3 h-3 fill-current" />
      {score}% match
    </div>
  )
}

const companyInitials = (name: string) => name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
const COMPANY_GRADIENTS = [
  'from-indigo-500 to-violet-600', 'from-blue-500 to-cyan-500',
  'from-emerald-500 to-teal-600', 'from-orange-500 to-red-500',
  'from-pink-500 to-rose-600', 'from-amber-500 to-yellow-500',
]

export default function JobsPage() {
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'match' | 'date'>('match')
  const [saved, setSaved] = useState<Set<string>>(new Set())

  const filtered = MOCK_JOBS
    .filter(job => {
      const q = search.toLowerCase()
      const matchesSearch = !q || job.title.toLowerCase().includes(q) || job.company.toLowerCase().includes(q) || job.requirements.some(r => r.toLowerCase().includes(q))
      const matchesType = filterType === 'all' || job.type === filterType
      return matchesSearch && matchesType
    })
    .sort((a, b) => sortBy === 'match' ? (b.matchScore ?? 0) - (a.matchScore ?? 0) : 0)

  const toggleSave = (id: string) => {
    setSaved(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">Job Matches</h1>
          <p className="text-gray-400 dark:text-gray-500 mt-1 text-sm">AI-ranked opportunities based on your profile</p>
        </div>
        <div className="flex items-center gap-2 bg-white/80 dark:bg-white/5 border border-white dark:border-white/10 rounded-xl px-4 py-2 shadow-sm">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{filtered.length} jobs found</span>
        </div>
      </div>

      <div className="bg-white/80 dark:bg-white/5 rounded-2xl border border-white dark:border-white/10 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, company, or skill..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 dark:focus:border-indigo-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
            />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={filterType}
                onChange={e => setFilterType(e.target.value)}
                className="pl-9 pr-8 py-3 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-gray-700 dark:text-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 appearance-none cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="remote">Remote</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as 'match' | 'date')}
                className="px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-gray-700 dark:text-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 appearance-none pr-8 cursor-pointer"
              >
                <option value="match">Best Match</option>
                <option value="date">Most Recent</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((job, idx) => {
          const grad = COMPANY_GRADIENTS[idx % COMPANY_GRADIENTS.length]
          const isSaved = saved.has(job.id)
          const typeConf = TYPE_CONFIG[job.type]

          return (
            <div
              key={job.id}
              className="group bg-white/80 dark:bg-white/5 rounded-2xl p-6 border border-white dark:border-white/10 shadow-sm card-hover animate-fade-in-up opacity-0"
              style={{ animationDelay: `${idx * 0.07}s`, animationFillMode: 'forwards' }}
            >
              <div className="flex items-start gap-4">
                <div className={`min-w-[52px] min-h-[52px] rounded-2xl bg-gradient-to-br ${grad} flex items-center justify-center text-white font-bold text-sm shadow-md`} style={{ width: 52, height: 52 }}>
                  {companyInitials(job.company)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">{job.title}</h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Building2 className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{job.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {job.matchScore !== undefined && <MatchBadge score={job.matchScore} />}
                      <button
                        onClick={() => toggleSave(job.id)}
                        className={`p-2 rounded-xl transition-all ${isSaved ? 'bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400' : 'bg-gray-50 dark:bg-white/5 text-gray-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/20 hover:text-indigo-500'}`}
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    <span className={`text-xs px-2.5 py-1 rounded-lg font-semibold border ${typeConf.colors} ${typeConf.darkColors}`}>{typeConf.label}</span>
                    <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                    {job.salary && <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400"><DollarSign className="w-3.5 h-3.5" />{job.salary}</span>}
                    <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500"><Clock className="w-3.5 h-3.5" />{job.postedAt}</span>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">{job.description}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {job.requirements.map(req => (
                  <span key={req} className="text-xs bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-lg font-medium">
                    {req}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex gap-3 pt-4 border-t border-gray-50 dark:border-white/5">
                <button className="flex-1 text-white py-2.5 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                  Apply Now <ArrowUpRight className="w-4 h-4" />
                </button>
                <button className="px-5 py-2.5 border border-gray-200 dark:border-white/10 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 space-y-3">
          <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto">
            <Briefcase className="w-8 h-8 text-gray-300 dark:text-gray-600" />
          </div>
          <div className="font-semibold text-gray-400">No jobs match your search</div>
          <div className="text-sm text-gray-300 dark:text-gray-600">Try adjusting your filters or search terms</div>
        </div>
      )}
    </div>
  )
}
