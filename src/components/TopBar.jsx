import { useState } from 'react'
import { fmt, ST } from '../utils/storage'

export default function TopBar({
  navigate,
  onOpenPatient,
  patients = [],
  activePage,
}) {
  const [query,    setQuery]    = useState('')
  const [showDrop, setShowDrop] = useState(false)

  // ดึงชื่อเภสัชกรจาก localStorage
  const pharmacistName = localStorage.getItem('pharmatrack_pharmacist') || 'เภสัชกร'

  // ตัวอักษรแรกสำหรับ avatar
  const initial = pharmacistName.trim().charAt(0).toUpperCase()

  const handleLogout = () => {
    if (confirm('ต้องการออกจากระบบ?')) {
      localStorage.removeItem('pharmatrack_pharmacist')
      navigate('login')
    }
  }

  const results = query.trim()
    ? patients.filter(
        p =>
          p.activeDate &&
          !p.isStartEvent &&
          (
            p.vn.toLowerCase().includes(query.toLowerCase()) ||
            (p.patientName || '').toLowerCase().includes(query.toLowerCase())
          )
      )
    : []

  const doSearch = q => {
    setQuery(q)
    setShowDrop(!!q.trim())
  }

  const pickSearch = id => {
    setQuery('')
    setShowDrop(false)
    if (onOpenPatient) onOpenPatient(id)
  }

  return (
    <header className="fixed top-0 right-0 left-64 h-16 flex items-center justify-between px-6 bg-slate-50 border-b border-slate-200 z-40">

      {/* LEFT */}
      <div className="flex items-center gap-6 flex-1">

        {/* Logo */}
        <div className="flex flex-col leading-tight min-w-fit">
          <h1 className="text-2xl font-black tracking-tight text-blue-900">PharmaTrack</h1>
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-[0.25em]">Clinical Portal</p>
        </div>

        {/* Search — แสดงเฉพาะหน้า calendar */}
        {activePage === 'calendar' && (
          <div className="max-w-md w-full relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
            <input
              type="text"
              value={query}
              autoComplete="off"
              placeholder="Search VN / Patient name…"
              onChange={e => doSearch(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Escape') { setQuery(''); setShowDrop(false) }
              }}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none transition-all focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
            />
            {showDrop && (
              <div className="absolute top-[calc(100%+6px)] left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-xl z-50 max-h-72 overflow-y-auto">
                {results.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-slate-400 italic">ไม่พบข้อมูล</div>
                ) : results.map(p => {
                  const st = ST[p.status] || ST.followup
                  return (
                    <div key={p.id} onClick={() => pickSearch(p.id)}
                      className="px-4 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-0 flex items-center gap-3">
                      <span className={`w-3 h-3 rounded-full ${st.dot} flex-shrink-0`} />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">{p.patientName}</p>
                        <p className="text-xs text-slate-400">{p.vn} · {p.medication || ''} · {fmt(p.activeDate)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* RIGHT — ชื่อเภสัชกร + logout */}
      <div className="flex items-center gap-3 ml-4">
        <div className="h-8 w-px bg-slate-200" />

        {/* Avatar + ชื่อ */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-black flex-shrink-0">
            {initial}
          </div>
          <div className="flex flex-col leading-tight">
            <p className="text-sm font-bold text-slate-800 max-w-[140px] truncate">{pharmacistName}</p>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">pharmacist</p>
          </div>
        </div>
      </div>
    </header>
  )
}