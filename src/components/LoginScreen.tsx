import React, { useState } from 'react';
import { Eye, EyeOff, Calendar, MapPin, UserPlus, KeyRound, Info } from 'lucide-react';
import { UpcomingEvent } from '../types';

interface LoginScreenProps {
  upcomingEvents: UpcomingEvent[];
  onLoginSuccess: (email: string) => void;
  onCreateAccountRequest: () => void;
  theme?: 'option1' | 'option2';
}

function getEventLogo(id: string, title: string) {
  switch (id) {
    case 'ue-1': // Dublin Tech Summit 2026
      return (
        <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/50 flex items-center justify-center relative overflow-hidden shadow-sm">
          <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#f89728]/20 blur-md pointer-events-none" />
          <svg className="w-6 h-6 text-[#f89728]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M4.5 16.5L12 3l7.5 13.5h-15z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 3v13.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      );
    case 'ue-2': // EBACE 2026
      return (
        <div className="w-12 h-12 rounded-xl bg-[#FFF1E0] border border-[#f89728]/20 flex items-center justify-center relative overflow-hidden shadow-sm">
          <div className="absolute -bottom-3 -left-3 w-8 h-8 rounded-full bg-[#f89728]/30 blur-sm pointer-events-none" />
          <svg className="w-6 h-6 text-[#f89728]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <rect x="3" y="3" width="18" height="18" rx="4" />
            <path d="M21 12H3" strokeLinecap="round" />
            <circle cx="12" cy="12" r="3" fill="#f89728" className="opacity-85" />
          </svg>
        </div>
      );
    case 'ue-3': // Money20/20 Amsterdam 2026
      return (
        <div className="w-12 h-12 rounded-xl bg-indigo-950 border border-indigo-800 flex items-center justify-center relative overflow-hidden shadow-sm">
          <svg className="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      );
    case 'ue-4': // ESAIC 2026
      return (
        <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800/80 flex items-center justify-center relative overflow-hidden shadow-sm">
          <div className="absolute top-0 left-0 w-full h-full opacity-15 bg-gradient-to-br from-[#f89728] to-red-500" />
          <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      );
    case 'ue-5': // Demo Event 3
      return (
        <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center relative overflow-hidden shadow-sm">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="none" fill="#FFF1E0" />
            <path d="M4.5 9.5H19.5M4.5 14.5H19.5M12 2C15 4 15 20 12 22C9 20 9 4 12 2Z" stroke="#f89728" strokeWidth="2" fill="none" />
          </svg>
        </div>
      );
    default:
      return (
        <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center">
          <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
      );
  }
}

export function LoginScreen({ upcomingEvents, onLoginSuccess, onCreateAccountRequest, theme = 'option1' }: LoginScreenProps) {
  const eventsToRender = upcomingEvents.slice(0, 3);
  const [email, setEmail] = useState('steven.terry@xfair.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Interactive mini modals triggers
  const [activeModal, setActiveModal] = useState<'none' | 'recover' | 'create' | 'help'>('none');
  const [modalEmail, setModalEmail] = useState('');
  const [modalSuccessMsg, setModalSuccessMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    // Simulate login transitions
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess(email);
    }, 800);
  };

  const handleRecoverPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalEmail) return;
    setModalSuccessMsg(`Password reset link has been dispatched to ${modalEmail}`);
    setTimeout(() => {
      setModalSuccessMsg('');
      setModalEmail('');
      setActiveModal('none');
    }, 3000);
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setModalSuccessMsg('Registration submitted. Account waiting administrator activation.');
    setTimeout(() => {
      setModalSuccessMsg('');
      setActiveModal('none');
    }, 3000);
  };

  const renderPanels = () => {
    return (
      <>
        {/* 1. Left Column - Immersive Deep Space Sign-in panel (takes equal 1/2 width) */}
        <div 
          id="login-left-panel"
          className="w-full md:w-1/2 min-h-[calc(100vh-72px)] bg-[#0A0F1D] px-6 py-6 sm:px-10 md:px-12 xl:px-16 text-white flex flex-col justify-center relative overflow-hidden shrink-0 border-b md:border-b-0 md:border-r border-[#151D30]"
        >
          {/* Subtle decorative glowing spheres */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(248,151,40,0.08),transparent_60%)] pointer-events-none" />
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#f89728]/10 rounded-full blur-3xl pointer-events-none" />
          
          {/* Main Vertically Centered Wrapper inside Sidebar panel */}
          <div className="w-full max-w-md mx-auto relative z-10 flex flex-col justify-center py-4">
            {/* Header Block branding */}
            <div id="registration-header-area" className="relative z-10 space-y-2">
              <span className="inline-block text-[10px] uppercase font-mono font-bold tracking-widest text-[#f89728] bg-[#f89728]/10 px-2.5 py-1 rounded border border-[#f89728]/20">
                XFAIR GMBH
              </span>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-white mt-1">
                Registration
              </h1>
            </div>

            {/* Dynamic form submit */}
            <form onSubmit={handleSubmit} className="mt-8 mb-4 space-y-5.5 relative z-10">
              <div>
                <label htmlFor="login-email-input" className="block text-xs font-semibold text-[#8C9BB0] mb-2 font-sans">
                  Email address
                </label>
                <input
                  id="login-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#111625] border border-[#222F46] text-white placeholder-white/20 text-xs rounded-lg px-4 py-3.5 outline-none focus:border-[#f89728] focus:ring-4 focus:ring-[#f89728]/10 transition-all duration-200 font-sans shadow-inner"
                  placeholder="email@xfair.com"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="login-password-input" className="block text-xs font-semibold text-[#8C9BB0] font-sans">
                    Password
                  </label>
                  <span className="text-[10px] text-[#8C9BB0]/80 font-medium font-sans select-none cursor-default pointer-events-none">
                    Recover password
                  </span>
                </div>
                <div id="password-field-container" className="relative">
                  <input
                    id="login-password-input"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#111625] border border-[#222F46] text-white placeholder-white/20 text-xs rounded-lg pl-4 pr-11 py-3.5 outline-none focus:border-[#f89728] focus:ring-4 focus:ring-[#f89728]/10 transition-all duration-200 font-sans shadow-inner"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors cursor-pointer p-1 rounded focus:ring-1 focus:ring-white/10"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 opacity-80" />
                    ) : (
                      <Eye className="w-4 h-4 opacity-80" />
                    )}
                  </button>
                </div>
              </div>

              {errorMsg && (
                <p className="text-red-300 text-xs font-semibold bg-red-950/40 px-3 py-2 rounded border border-red-500/20">
                  {errorMsg}
                </p>
              )}

              <div className="pt-2">
                <button
                  id="login-submit-button"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#f89728] hover:bg-[#df7e10] text-white font-bold text-xs rounded-lg py-3.5 cursor-pointer transition-all duration-150 hover:scale-[1.005] active:scale-[0.995] outline-none shadow-md flex items-center justify-center gap-2 font-sans"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Logging in...</span>
                    </>
                  ) : (
                    'Log in'
                  )}
                </button>
              </div>
            </form>

            {/* Custom Modern Stacked Recovery Action Links inside side-panel */}
            <div id="login-action-links" className="mt-8 relative z-10 pt-2 text-xs text-[#8C9BB0] font-sans">
              <span>Don't have an account?</span>{' '}
              <button
                type="button"
                onClick={onCreateAccountRequest}
                className="text-white hover:text-[#f89728] font-bold transition-colors cursor-pointer underline underline-offset-2"
              >
                Create Account!
              </button>
            </div>
          </div>
        </div>

        {/* 2. Right Column - Sleek Spacious Upcoming Account Events presentation (takes equal 1/2 width with expanded layout containers) */}
        <div id="login-right-panel" className="w-full md:w-1/2 min-h-[calc(100vh-72px)] px-4 sm:px-8 md:px-10 lg:px-12 flex flex-col justify-center bg-[#FAFAFC]">
          <div className="w-full max-w-2xl lg:max-w-3xl mx-auto flex flex-col h-full justify-center py-6 transition-all duration-300">
            
            <div className="flex items-center justify-between pb-3.5 border-b border-zinc-200/55">
              <h2 className="font-sans font-bold text-slate-800 text-sm md:text-base flex items-center gap-1.5">
                <span className="text-[#f89728] font-extrabold font-mono text-base bg-[#FFF1E0] px-2.5 py-0.5 rounded-lg mr-1.5">3</span>
                <span className="tracking-tight text-slate-950 font-bold font-sans">Upcoming event(s)</span>
              </h2>
            </div>

            {/* Scrolling layout containing scheduled events & high-fidelity custom scroll tracking guides */}
            <div className="flex gap-5 items-stretch mt-6 relative">
              {/* Event Cards filling the expanded layouts */}
              <div 
                id="upcoming-events-scroller"
                className="flex-1 space-y-4"
              >
                {eventsToRender.map((evt) => (
                  <div
                    key={evt.id}
                    className="group flex flex-row items-center gap-4.5 p-4.5 md:p-5 rounded-2xl border border-[#F1F3F7] bg-white hover:bg-[#F8FAFC] hover:border-[#f89728]/20 hover:shadow-premium transition-all duration-300 cursor-pointer w-full text-slate-700"
                  >
                    {/* Beautiful customized event badge vector representation */}
                    <div className="shrink-0">
                      {getEventLogo(evt.id, evt.title)}
                    </div>

                    {/* Metadata titles & locations */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <h3 className="font-sans font-bold text-slate-900 group-hover:text-[#f89728] text-sm md:text-base transition-colors tracking-tight leading-snug">
                        {evt.title}
                      </h3>
                      
                      <div className="space-y-1 text-slate-500 text-xs mt-1">
                        {evt.dateRange && (
                          <div className="flex items-center gap-1.5 font-mono tracking-tight text-slate-500/90">
                            <Calendar size={13} className="text-slate-400 shrink-0" />
                            <span>{evt.dateRange}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-1.5 text-slate-500/95">
                          <MapPin size={13} className="text-slate-400 shrink-0" />
                          <span className="truncate text-slate-600 font-medium">{evt.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </>
    );
  };

  return (
    <div id="login-screen" className={`w-full select-none ${
      theme === 'option2' 
        ? 'min-h-[calc(100vh-72px)] flex items-center justify-center p-4 md:p-8 py-12' 
        : 'flex-1 flex flex-col md:flex-row bg-[#FAFBFD] min-h-[calc(100vh-72px)]'
    }`}>
      {theme === 'option2' ? (
        <div 
          id="login-main-card"
          className="w-full max-w-5xl lg:max-w-6xl bg-[#FAFAFC] rounded-2xl shadow-active border border-zinc-200/55 overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
        >
          {renderPanels()}
        </div>
      ) : (
        renderPanels()
      )}

      {/* RENDER MODALS (Pure React, beautiful styling & overlay) */}
      {activeModal !== 'none' && (
        <div 
          id="login-dialog-overlay"
          className="fixed inset-0 bg-[#0A0F1D]/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
        >
          <div 
            id="login-dialog-container"
            className="w-full max-w-md bg-white rounded-2xl shadow-active border border-zinc-200/55 overflow-hidden p-6 relative max-h-[90vh] overflow-y-auto animate-slide-down text-slate-700"
          >
            {/* Modal close icon */}
            <button 
              onClick={() => setActiveModal('none')}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 focus:outline-none p-1 rounded-full hover:bg-slate-50 cursor-pointer"
            >
              ✕
            </button>

            {activeModal === 'recover' && (
              <div id="modal-recover-pass" className="font-sans">
                <div className="w-12 h-12 bg-[#FFF1E0] text-[#f89728] rounded-full flex items-center justify-center mb-4 border border-[#f89728]/15">
                  <KeyRound size={20} />
                </div>
                <h3 className="text-base font-display font-bold text-slate-900 mb-2">
                  Recover System Password
                </h3>
                <p className="text-slate-500 text-xs mb-4 leading-relaxed">
                  Provide your corporate email address registered under the Xfair EMS directory. We will shoot diagnostic coordinates to recalibrate credentials.
                </p>
                {modalSuccessMsg ? (
                  <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded border border-emerald-100 font-semibold mb-2">
                    {modalSuccessMsg}
                  </div>
                ) : (
                  <form onSubmit={handleRecoverPassword} className="space-y-4">
                    <input
                      type="email"
                      value={modalEmail}
                      onChange={(e) => setModalEmail(e.target.value)}
                      placeholder="steven.terry@xfair.com"
                      className="w-full border border-zinc-200/90 rounded-lg px-3 py-2 text-xs focus:ring-4 focus:ring-xfair-orange/15 focus:border-[#f89728] outline-none transition-all"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#f89728] to-[#df7e10] hover:brightness-105 hover:shadow-active text-white text-xs font-bold py-2.5 rounded-lg transition-all duration-150 cursor-pointer uppercase tracking-wide"
                    >
                      Dispatch Reset Coordinate
                    </button>
                  </form>
                )}
              </div>
            )}

            {activeModal === 'create' && (
              <div id="modal-create-account" className="font-sans">
                <div className="w-12 h-12 bg-[#FFF1E0] text-[#f89728] rounded-full flex items-center justify-center mb-4 border border-[#f89728]/15">
                  <UserPlus size={20} />
                </div>
                <h3 className="text-base font-display font-bold text-slate-900 mb-2">
                  Create EMS Account
                </h3>
                <p className="text-slate-500 text-xs mb-4 leading-relaxed">
                  Request access credentials to start submitting and organizing events. Your application must be validated by the respective event manager.
                </p>
                {modalSuccessMsg ? (
                  <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded border border-emerald-100 font-semibold mb-2">
                    {modalSuccessMsg}
                  </div>
                ) : (
                  <form onSubmit={handleCreateAccount} className="space-y-3">
                    <div>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1 font-sans">Full Name</label>
                      <input type="text" placeholder="Steven Terry" className="w-full border border-zinc-200/90 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#f89728]" required />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1 font-sans">Email address</label>
                      <input type="email" placeholder="steven.terry@xfair.com" className="w-full border border-zinc-200/90 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#f89728]" required />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1 font-sans">Company / Event Agency</label>
                      <input type="text" placeholder="XFAIR Deutschland GmbH" className="w-full border border-zinc-200/90 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#f89728]" required />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#f89728] hover:bg-[#df7e10] text-white text-xs font-bold py-2.5 rounded-lg shadow-sm transition-all duration-150 mt-2 cursor-pointer uppercase tracking-wide"
                    >
                      Submit access request
                    </button>
                  </form>
                )}
              </div>
            )}

            {activeModal === 'help' && (
              <div id="modal-help-info" className="font-sans">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4 border border-indigo-100">
                  <Info size={20} />
                </div>
                <h3 className="text-base font-display font-bold text-slate-900 mb-2">
                  EMS Portal Core Help
                </h3>
                <div className="text-slate-500 text-xs space-y-2.5 leading-relaxed">
                  <p>
                    <strong>What is Xfair EMS?</strong> Xfair Event Management System is a centralized secure framework utilized to operate registrars, user telemetry, and dynamic fair schedules.
                  </p>
                  <p>
                    <strong>How to login?</strong> For standard testing purposes, you may directly use the pre-entered credentials (Email: <code>steven.terry@xfair.com</code>) and click the active orange <strong>Log in</strong> block.
                  </p>
                  <p>
                    <strong>System Assistance:</strong> If you face directory sync issues, contact system administration at <code>support@xfair.com</code>.
                  </p>
                </div>
                <button
                  onClick={() => setActiveModal('none')}
                  className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold py-2.5 rounded-lg mt-5 border border-zinc-200/55 transition-all duration-150 cursor-pointer"
                >
                  Understood
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
