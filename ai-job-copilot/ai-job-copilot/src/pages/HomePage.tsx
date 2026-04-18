import { Link } from 'react-router-dom'
import { Briefcase, FileText, Zap, TrendingUp, Target, Clock, ArrowRight, CheckCircle, Star, Users, Award, Sparkles } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const features = [
  {
    icon: Zap,
    title: 'AI-Powered Matching',
    description: 'Our AI analyzes your skills and resume to surface the most relevant roles — ranked by fit, not just keywords.',
    gradient: 'from-yellow-400 to-orange-400',
  },
  {
    icon: Target,
    title: 'Precision Job Search',
    description: 'Filter by match score, location, salary, and type. See only jobs that actually align with your goals.',
    gradient: 'from-indigo-500 to-violet-500',
  },
  {
    icon: TrendingUp,
    title: 'Skill Gap Analysis',
    description: 'Understand what top employers want and get personalized recommendations to close the gap fast.',
    gradient: 'from-emerald-400 to-teal-500',
  },
  {
    icon: Clock,
    title: 'Save Hours Every Week',
    description: 'Stop scrolling through hundreds of irrelevant listings. Let the AI surface what matters in seconds.',
    gradient: 'from-pink-400 to-rose-500',
  },
]

const stats = [
  { value: '50K+', label: 'Active Listings', icon: Briefcase },
  { value: '94%', label: 'Match Accuracy', icon: Target },
  { value: '2x', label: 'Faster Hiring', icon: Zap },
  { value: '10K+', label: 'Happy Users', icon: Users },
]

const testimonials = [
  {
    name: 'Sarah Chen', role: 'Senior Engineer at Stripe',
    text: 'Found my dream job in 3 weeks. The AI matching was scarily accurate — it knew what I wanted better than I did.',
    avatar: 'SC', stars: 5,
  },
  {
    name: 'Marcus Rivera', role: 'Product Manager at Notion',
    text: 'Uploaded my resume and within minutes I had 15 perfectly matched roles. Completely changed my job search.',
    avatar: 'MR', stars: 5,
  },
  {
    name: 'Priya Sharma', role: 'Data Scientist at OpenAI',
    text: 'The skill gap analysis told me exactly what to learn. Two months later I had offers from three top companies.',
    avatar: 'PS', stars: 5,
  },
]

const steps = [
  { step: '01', title: 'Upload Your Resume', desc: 'Drop your PDF or paste your text. AI extracts your skills instantly.' },
  { step: '02', title: 'Set Preferences', desc: 'Tell us your target roles, location, and salary expectations.' },
  { step: '03', title: 'Get Matched', desc: 'Browse AI-ranked jobs sorted by how well they fit you.' },
]

const avatarColors = [
  'from-indigo-500 to-violet-500',
  'from-cyan-500 to-blue-500',
  'from-emerald-500 to-teal-500',
]

export default function HomePage() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const card = isDark
    ? 'bg-white/5 border border-white/10 backdrop-blur-sm'
    : 'bg-white/80 border border-white shadow-sm'

  const textPrimary = isDark ? 'text-white' : 'text-gray-900'
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-500'
  const textMuted = isDark ? 'text-gray-500' : 'text-gray-400'
  const badge = isDark
    ? 'bg-indigo-500/15 border border-indigo-500/30 text-indigo-300'
    : 'bg-white/80 border border-indigo-100 text-indigo-700'
  const sectionBadge = isDark
    ? 'bg-indigo-500/15 text-indigo-300'
    : 'bg-indigo-50 text-indigo-500'

  return (
    <div className="space-y-24">

      {/* ── Hero ── */}
      <section className="relative text-center space-y-8 pt-16 pb-8">
        <div className={`animate-fade-in-up opacity-0`} style={{ animationFillMode: 'forwards' }}>
          <div className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full shadow-sm ${badge}`}>
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Job Search Platform
            <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
          </div>
        </div>

        <div className="animate-fade-in-up opacity-0 delay-100" style={{ animationFillMode: 'forwards' }}>
          <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Land Your{' '}
            <span className={isDark ? 'gradient-text-hero' : 'gradient-text'}>Dream Job</span>
            <br />
            Faster With{' '}
            <span className={isDark ? 'gradient-text-hero' : 'gradient-text'}>AI</span>
          </h1>
        </div>

        <div className="animate-fade-in-up opacity-0 delay-200" style={{ animationFillMode: 'forwards' }}>
          <p className={`text-xl max-w-2xl mx-auto leading-relaxed font-light ${textSecondary}`}>
            Upload your resume, add your skills, and let our AI match you with hundreds of perfectly-fit opportunities. Stop guessing — start landing interviews.
          </p>
        </div>

        {/* Social Proof Row */}
        <div className="animate-fade-in-up opacity-0 delay-200 flex items-center justify-center gap-3" style={{ animationFillMode: 'forwards' }}>
          <div className="flex -space-x-2">
            {avatarColors.map((grad, i) => (
              <div key={i} className={`w-9 h-9 rounded-full bg-gradient-to-br ${grad} border-2 ${isDark ? 'border-[#0d0d1f]' : 'border-white'} flex items-center justify-center text-white text-xs font-bold`}>
                {['SC', 'MR', 'PS'][i]}
              </div>
            ))}
          </div>
          <div className={`text-sm ${textSecondary}`}>
            <span className="font-bold text-emerald-500">10,213+</span> professionals matched this week
          </div>
          <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
        </div>

        <div className="animate-fade-in-up opacity-0 delay-300 flex flex-col sm:flex-row gap-4 justify-center items-center" style={{ animationFillMode: 'forwards' }}>
          <Link
            to="/resume"
            className="group inline-flex items-center gap-2.5 text-white px-8 py-3.5 rounded-2xl font-semibold text-base transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
          >
            <FileText className="w-5 h-5" />
            Upload Your Resume
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/jobs"
            className={`inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-semibold text-base transition-all duration-200 ${
              isDark
                ? 'bg-white/8 text-gray-200 border border-white/15 hover:bg-white/15 hover:border-white/25'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 shadow-sm'
            }`}
          >
            <Briefcase className="w-5 h-5 text-indigo-400" />
            Browse Job Matches
          </Link>
        </div>

        <div className={`animate-fade-in-up opacity-0 delay-400 flex flex-wrap items-center justify-center gap-6 text-sm ${textMuted}`} style={{ animationFillMode: 'forwards' }}>
          {['No credit card required', 'Free to get started', '10K+ jobs matched daily'].map(item => (
            <span key={item} className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ value, label, icon: Icon }, i) => (
          <div
            key={label}
            className={`rounded-2xl p-6 text-center card-hover animate-fade-in-up opacity-0 ${card}`}
            style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'forwards' }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 bg-indigo-500/20">
              <Icon className="w-5 h-5 text-indigo-400" />
            </div>
            <div className={`text-3xl font-black ${isDark ? 'gradient-text-hero' : 'gradient-text'}`}>{value}</div>
            <div className={`text-sm mt-1 font-medium ${textSecondary}`}>{label}</div>
          </div>
        ))}
      </section>

      {/* ── How It Works ── */}
      <section className="space-y-10">
        <div className="text-center space-y-3">
          <div className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${sectionBadge}`}>How It Works</div>
          <h2 className={`text-3xl sm:text-4xl font-bold ${textPrimary}`}>Three steps to your next role</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {steps.map(({ step, title, desc }, i) => (
            <div
              key={step}
              className={`relative rounded-3xl p-8 card-hover animate-fade-in-up opacity-0 ${card}`}
              style={{ animationDelay: `${i * 0.15}s`, animationFillMode: 'forwards' }}
            >
              <div className={`text-6xl font-black leading-none mb-4 ${isDark ? 'text-indigo-900/80' : 'text-indigo-100'}`}>{step}</div>
              <h3 className={`font-bold text-lg mb-2 ${textPrimary}`}>{title}</h3>
              <p className={`text-sm leading-relaxed ${textSecondary}`}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="space-y-10">
        <div className="text-center space-y-3">
          <div className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${sectionBadge}`}>Features</div>
          <h2 className={`text-3xl sm:text-4xl font-bold ${textPrimary}`}>Everything you need to succeed</h2>
          <p className={`max-w-xl mx-auto ${textSecondary}`}>Built for serious job seekers who want to move fast and land better roles.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {features.map(({ icon: Icon, title, description, gradient }, i) => (
            <div
              key={title}
              className={`group rounded-3xl p-7 card-hover animate-fade-in-up opacity-0 cursor-default ${card}`}
              style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 bg-gradient-to-br ${gradient} shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className={`font-bold text-lg mb-2 ${textPrimary}`}>{title}</h3>
              <p className={`text-sm leading-relaxed ${textSecondary}`}>{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="space-y-10">
        <div className="text-center space-y-3">
          <div className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${sectionBadge}`}>Testimonials</div>
          <h2 className={`text-3xl sm:text-4xl font-bold ${textPrimary}`}>Loved by job seekers</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {testimonials.map(({ name, role, text, avatar, stars }, i) => (
            <div
              key={name}
              className={`rounded-3xl p-7 card-hover animate-fade-in-up opacity-0 ${card}`}
              style={{ animationDelay: `${i * 0.12}s`, animationFillMode: 'forwards' }}
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: stars }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className={`text-sm leading-relaxed mb-5 italic ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>"{text}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 bg-gradient-to-br ${avatarColors[i % avatarColors.length]}`}>
                  {avatar}
                </div>
                <div>
                  <div className={`font-semibold text-sm ${textPrimary}`}>{name}</div>
                  <div className={`text-xs ${textMuted}`}>{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative overflow-hidden rounded-3xl p-10 sm:p-16 text-center text-white" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #1d4ed8 100%)' }}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="star-bg opacity-40" />
          <div className="absolute top-4 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute bottom-4 right-10 w-56 h-32 bg-white/10 rounded-full blur-2xl" />
        </div>
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6">
            <Award className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Ready to find your dream job?</h2>
          <p className="text-indigo-200 max-w-xl mx-auto mb-8 text-lg font-light">
            Join 10,000+ professionals who've already found better opportunities. It takes less than 2 minutes to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/resume" className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-8 py-3.5 rounded-2xl hover:bg-indigo-50 transition-all hover:shadow-xl hover:-translate-y-0.5">
              <FileText className="w-5 h-5" />
              Get Started Free
            </Link>
            <Link to="/jobs" className="inline-flex items-center gap-2 bg-white/15 text-white font-semibold px-8 py-3.5 rounded-2xl hover:bg-white/25 transition-all border border-white/25">
              <Briefcase className="w-5 h-5" />
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
