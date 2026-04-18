import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Briefcase, Home, User, FileText, Zap, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

interface LayoutProps {
  children: ReactNode
}

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/jobs', label: 'Jobs', icon: Briefcase },
  { path: '/resume', label: 'Resume', icon: FileText },
  { path: '/profile', label: 'Profile', icon: User },
]

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* ── Background Layer ── */}
      {isDark ? (
        <>
          <div className="fixed inset-0 z-0" style={{ background: 'linear-gradient(135deg, #080812 0%, #0d0d1f 40%, #0a0d1a 70%, #080f18 100%)' }} />
          <div className="dot-grid opacity-60" />
          <div className="star-bg" />
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
          <div className="orb orb-4" />
        </>
      ) : (
        <>
          <div className="fixed inset-0 z-0 light-mode-bg" />
          <div className="fixed inset-0 z-0" style={{
            backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.07) 1px, transparent 1px)',
            backgroundSize: '36px 36px'
          }} />
          <div className="orb" style={{ width: 500, height: 500, top: -100, left: -100, background: 'radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%)', filter: 'blur(60px)', animation: 'orbFloat1 14s ease-in-out infinite', position: 'fixed', borderRadius: '50%', zIndex: 0, pointerEvents: 'none' }} />
          <div className="orb" style={{ width: 400, height: 400, bottom: '5%', right: -80, background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)', filter: 'blur(60px)', animation: 'orbFloat2 18s ease-in-out infinite', position: 'fixed', borderRadius: '50%', zIndex: 0, pointerEvents: 'none' }} />
        </>
      )}

      {/* ── Header ── */}
      <header className={`relative z-50 sticky top-0 border-b transition-colors duration-300 ${
        isDark
          ? 'bg-[#080812]/80 border-white/8 backdrop-blur-xl'
          : 'bg-white/75 border-white/60 backdrop-blur-xl shadow-sm shadow-indigo-100/30'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2.5 font-bold text-xl">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className={isDark ? 'gradient-text-hero' : 'gradient-text'}>AI Job Copilot</span>
            </Link>

            <nav className={`hidden md:flex items-center gap-1 rounded-2xl p-1.5 border transition-all duration-300 ${
              isDark
                ? 'bg-white/5 border-white/10'
                : 'bg-white/60 border-white/80 shadow-inner'
            }`}>
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    location.pathname === path
                      ? isDark
                        ? 'bg-indigo-500/20 text-indigo-300 shadow-sm shadow-indigo-900'
                        : 'bg-white text-indigo-600 shadow-sm shadow-indigo-100'
                      : isDark
                        ? 'text-gray-400 hover:text-gray-200 hover:bg-white/8'
                        : 'text-gray-500 hover:text-gray-800 hover:bg-white/70'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 border ${
                  isDark
                    ? 'bg-white/8 border-white/15 text-yellow-300 hover:bg-white/15 hover:border-white/25'
                    : 'bg-gray-100 border-gray-200 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200'
                }`}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <Link
                to="/jobs"
                className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
              >
                Find Jobs
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ── Page Content ── */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
        {children}
      </main>

      {/* ── Mobile Bottom Nav ── */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 border-t z-50 backdrop-blur-xl transition-colors duration-300 ${
        isDark
          ? 'bg-[#080812]/85 border-white/10'
          : 'bg-white/80 border-white/60 shadow-lg shadow-indigo-100/30'
      }`}>
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                location.pathname === path
                  ? 'text-indigo-400'
                  : isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              <div className={`p-1.5 rounded-lg ${location.pathname === path ? isDark ? 'bg-indigo-500/20' : 'bg-indigo-50' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}
