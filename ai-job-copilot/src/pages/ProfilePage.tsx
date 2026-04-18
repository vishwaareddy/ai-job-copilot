import { useState } from 'react'
import { Plus, X, Save, CheckCircle, MapPin, Briefcase, GraduationCap, Globe, Edit3 } from 'lucide-react'
import { Skill } from '../types'

const initialSkills: Skill[] = [
  { id: '1', name: 'React', level: 'expert' },
  { id: '2', name: 'TypeScript', level: 'advanced' },
  { id: '3', name: 'Node.js', level: 'intermediate' },
  { id: '4', name: 'PostgreSQL', level: 'intermediate' },
  { id: '5', name: 'AWS', level: 'beginner' },
]

const LEVEL_CONFIG: Record<string, { label: string; colors: string; bar: string; width: string }> = {
  beginner:     { label: 'Beginner',     colors: 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700',           bar: 'bg-gray-400',    width: 'w-1/4' },
  intermediate: { label: 'Intermediate', colors: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-700/50',       bar: 'bg-blue-500',    width: 'w-1/2' },
  advanced:     { label: 'Advanced',     colors: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/40 dark:text-indigo-300 dark:border-indigo-700/50', bar: 'bg-indigo-500',  width: 'w-3/4' },
  expert:       { label: 'Expert',       colors: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/40 dark:text-violet-300 dark:border-violet-700/50', bar: 'bg-violet-500',  width: 'w-full' },
}

const preferredRoles = ['Frontend Engineer', 'Full Stack Developer', 'React Developer']
const preferredLocations = ['Remote', 'San Francisco, CA', 'New York, NY']

export default function ProfilePage() {
  const [skills, setSkills] = useState<Skill[]>(initialSkills)
  const [newSkill, setNewSkill] = useState('')
  const [newLevel, setNewLevel] = useState<Skill['level']>('intermediate')
  const [name, setName] = useState('Alex Johnson')
  const [email, setEmail] = useState('alex@example.com')
  const [experience, setExperience] = useState('5')
  const [title, setTitle] = useState('Senior Frontend Engineer')
  const [saved, setSaved] = useState(false)
  const [editingBasic, setEditingBasic] = useState(false)

  const addSkill = () => {
    if (!newSkill.trim()) return
    setSkills(prev => [...prev, { id: Date.now().toString(), name: newSkill.trim(), level: newLevel }])
    setNewSkill('')
    setSaved(false)
  }

  const removeSkill = (id: string) => {
    setSkills(prev => prev.filter(s => s.id !== id))
    setSaved(false)
  }

  const handleSave = () => {
    setSaved(true)
    setEditingBasic(false)
    setTimeout(() => setSaved(false), 2500)
  }

  const completionItems = [
    { label: 'Basic info', done: true },
    { label: 'Skills added', done: skills.length > 0 },
    { label: 'Resume uploaded', done: false },
    { label: 'Preferences set', done: true },
  ]
  const completion = Math.round((completionItems.filter(c => c.done).length / completionItems.length) * 100)

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">Your Profile</h1>
        <p className="text-gray-400 dark:text-gray-500 mt-1 text-sm">Keep your profile updated to get better job matches.</p>
      </div>

      <div className="bg-white/80 dark:bg-white/5 rounded-2xl p-6 border border-white dark:border-white/10 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Profile Completion</span>
          <span className="text-sm font-bold" style={{ color: completion >= 80 ? '#10b981' : '#6366f1' }}>{completion}%</span>
        </div>
        <div className="h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden mb-4">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${completion}%`, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {completionItems.map(({ label, done }) => (
            <div key={label} className={`flex items-center gap-2 text-xs font-medium ${done ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-gray-600'}`}>
              <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${done ? 'bg-emerald-100 dark:bg-emerald-900/40' : 'bg-gray-100 dark:bg-white/10'}`}>
                {done ? <CheckCircle className="w-3 h-3" /> : <div className="w-1.5 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />}
              </div>
              {label}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/80 dark:bg-white/5 rounded-2xl border border-white dark:border-white/10 shadow-sm overflow-hidden">
        <div className="relative p-8" style={{ background: 'linear-gradient(135deg, #eef2ff, #ede9fe)' }}>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.12))' }} />
          <div className="absolute top-4 right-4 relative z-10">
            <button onClick={() => setEditingBasic(!editingBasic)} className="p-2 bg-white/80 dark:bg-white/20 rounded-xl text-gray-500 hover:text-indigo-600 hover:bg-white dark:hover:bg-white/30 transition-all">
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-5 relative">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg flex-shrink-0" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div className="flex-1">
              {editingBasic ? (
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="text-xl font-black text-gray-900 bg-white/80 border border-indigo-200 rounded-xl px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full mb-1" />
              ) : (
                <div className="text-xl font-black text-gray-900">{name}</div>
              )}
              {editingBasic ? (
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="text-sm text-indigo-600 font-semibold bg-white/80 border border-indigo-200 rounded-xl px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full" />
              ) : (
                <div className="text-sm font-semibold text-indigo-700 mt-0.5">{title}</div>
              )}
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{email}</span>
                <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{experience} yrs exp.</span>
              </div>
            </div>
          </div>
        </div>

        {editingBasic && (
          <div className="p-6 border-t border-gray-50 dark:border-white/10 grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1.5">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400/30" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1.5">Years of Experience</label>
              <input type="number" value={experience} onChange={e => setExperience(e.target.value)} min="0" max="40" className="w-full border border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400/30" />
            </div>
          </div>
        )}
      </div>

      <div className="bg-white/80 dark:bg-white/5 rounded-2xl p-6 border border-white dark:border-white/10 shadow-sm space-y-5">
        <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-indigo-500" /> Skills
        </h2>
        <div className="space-y-3">
          {skills.map(skill => {
            const conf = LEVEL_CONFIG[skill.level]
            return (
              <div key={skill.id} className="flex items-center gap-3">
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{skill.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${conf.bar} ${conf.width} transition-all`} />
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-lg border font-semibold ${conf.colors}`}>{conf.label}</span>
                  </div>
                </div>
                <button onClick={() => removeSkill(skill.id)} className="p-1.5 text-gray-300 dark:text-gray-600 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all flex-shrink-0">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )
          })}
        </div>

        <div className="flex gap-2 pt-2 border-t border-gray-50 dark:border-white/10">
          <input
            type="text"
            value={newSkill}
            onChange={e => setNewSkill(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addSkill()}
            placeholder="Add a skill..."
            className="flex-1 border border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400/30 placeholder:text-gray-400 dark:placeholder:text-gray-600"
          />
          <select
            value={newLevel}
            onChange={e => setNewLevel(e.target.value as Skill['level'])}
            className="border border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400/30"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="expert">Expert</option>
          </select>
          <button
            onClick={addSkill}
            disabled={!newSkill.trim()}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 disabled:opacity-40 transition-all hover:shadow-md hover:shadow-indigo-200/50"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-white/80 dark:bg-white/5 rounded-2xl p-6 border border-white dark:border-white/10 shadow-sm space-y-4">
        <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <MapPin className="w-5 h-5 text-indigo-500" /> Preferences
        </h2>
        <div>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Target Roles</div>
          <div className="flex flex-wrap gap-2">
            {preferredRoles.map(role => (
              <span key={role} className="text-xs bg-indigo-50 dark:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-700/50 text-indigo-700 dark:text-indigo-300 px-3 py-1.5 rounded-xl font-semibold">{role}</span>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Preferred Locations</div>
          <div className="flex flex-wrap gap-2">
            {preferredLocations.map(loc => (
              <span key={loc} className="text-xs bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700/50 text-emerald-700 dark:text-emerald-300 px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1">
                <MapPin className="w-3 h-3" />{loc}
              </span>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        className={`w-full py-3.5 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5 ${
          saved ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200/40' : 'text-white hover:shadow-lg hover:shadow-indigo-500/30'
        }`}
        style={saved ? {} : { background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
      >
        {saved ? <CheckCircle className="w-5 h-5" /> : <Save className="w-5 h-5" />}
        {saved ? 'Profile Saved!' : 'Save Profile'}
      </button>
    </div>
  )
}
