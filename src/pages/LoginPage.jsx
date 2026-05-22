import { useState } from 'react'

export default function LoginPage({ onLogin }) {
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const [pharmacistName, setPharmacistName] = useState('')
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const isFormComplete = pharmacistName.trim() !== '' && id.trim() !== '' && pw.trim() !== ''

  const handleLogin = () => {
    if (!isFormComplete) return
    localStorage.setItem('pharmatrack_pharmacist', pharmacistName.trim())
    onLogin()
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        backgroundImage: `linear-gradient(rgba(249,249,255,0.92),rgba(249,249,255,0.92)),
          url(https://lh3.googleusercontent.com/aida-public/AB6AXuCavmPvj0oaw46YQcJUt1PTg2z_zfFiGJ0Tk216V5Fu6RCdtMktOlFX5vjUGE-DcnfmYj_AH3ARsZDCLSyLwtYZGH1iYIKYPo9ijdtZipZr4pCjBz6gomRS8C-zXex413-6RZHijLjvALIxZRKBb671s5gp5x0W8OV2BHHsQtjSVFF03DU4wVzS2vwyK7NvyAnus3HY-kfC98jsZJGe4Kn4BKk79dABoD89RhSi2CrOBT2vg9cvKlBabmQ3a3ozYYepPYi-BIut1xMQ)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white w-full max-w-[480px] rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 flex flex-col items-center text-center">
          <div className="mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-700 text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
            <h1 className="text-2xl font-bold text-blue-800">PharmaTrack</h1>
          </div>
          <p className="text-sm text-slate-500">Clinical Management Station Access</p>
        </div>

        {/* Form */}
        <div className="px-8 pb-8 flex flex-col gap-5">

          {/* Pharmacist Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Pharmacist name <span className="text-red-400">*</span>
            </label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" style={{fontVariationSettings:"'FILL' 1"}}>medication</span>
              <input
                type="text"
                value={pharmacistName}
                onChange={e => { setPharmacistName(e.target.value); setError('') }}
                placeholder="First and last name"
                className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none transition-all text-sm text-slate-800"
              />
            </div>
          </div>

          {/* ID */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider" htmlFor="personnel-id">
              Pharmacist ID
            </label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">person</span>
              <input
                id="personnel-id"
                type="text"
                value={id}
                onChange={e => setId(e.target.value)}
                placeholder="Enter ID"
                className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none transition-all text-sm text-slate-800"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider" htmlFor="password">
                Security Password
              </label>
              <button className="text-[11px] font-bold text-blue-700 hover:underline">Forgot Password?</button>
            </div>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">lock</span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={pw}
                onChange={e => setPw(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none transition-all text-sm text-slate-800"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors focus:outline-none"
                tabIndex={-1}
                aria-label={showPassword ? 'ซ่อน password' : 'แสดง password'}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg">
              <span className="material-symbols-outlined text-red-500 text-sm">error</span>
              <p className="text-xs font-semibold text-red-600">{error}</p>
            </div>
          )}

          {/* Remember */}
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={remember}
              onChange={e => setRemember(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-400"
            />
            <span className="text-sm text-slate-500 group-hover:text-slate-700 transition-colors">Remember this terminal</span>
          </label>

          {/* Sign In */}
          <button
            onClick={handleLogin}
            disabled={!isFormComplete}
            className={`w-full font-semibold py-3 px-5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm
              ${isFormComplete
                ? 'bg-blue-700 hover:bg-blue-800 text-white active:scale-[0.98] cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
          >
            Sign In
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>

          {/* Helper text when disabled */}
          {!isFormComplete && (
            <p className="text-center text-[11px] text-slate-400">
              Please fill in all required fields before logging in.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}