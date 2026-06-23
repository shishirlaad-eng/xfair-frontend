import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface TwoFactorAuthScreenProps {
  language: Language;
  onVerify: (code: string) => void;
  onRequestPasswordReset: () => void;
}

export function TwoFactorAuthScreen({ language, onVerify, onRequestPasswordReset }: TwoFactorAuthScreenProps) {
  const [code, setCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Allow proceeding even if empty for design sandbox testing
    const finalCode = code.trim() || '123456';
    onVerify(finalCode);
  };

  return (
    <div id="2fa-screen" className="w-full flex-1 bg-transparent py-6 sm:py-8 px-4 flex flex-col justify-center items-center select-none animate-fade-in animate-duration-300">
      <div 
        id="2fa-main-card"
        className="w-full max-w-4xl bg-white border border-[#E2E8F0] rounded-[24px] shadow-premium overflow-hidden flex flex-col md:flex-row md:items-stretch"
      >
        {/* Left Side: Layout Sidebar panel styled exactly like CreateAccountScreen left side with 8% brand tone */}
        <div 
          className="md:w-[320px] p-8 sm:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E2E8F0]/40 select-none shrink-0 text-left relative overflow-hidden" 
          style={{ backgroundColor: 'rgba(248, 151, 40, 0.08)' }}
        >
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              {/* Title & Decorative Orange bar */}
              <h2 className="text-[#0F172A] font-extrabold text-2xl sm:text-3xl leading-snug font-sans tracking-tight mt-4">
                {language === 'de' ? 'Zwei-Faktor-Auth' : 'Two-factor auth'}
              </h2>
              <div className="w-8 h-1 bg-[#f89728] rounded-full mt-4" />

              {/* Description guidelines description */}
              <p className="text-[#4A5D7E] text-xs sm:text-[13px] leading-relaxed font-sans font-medium mt-6 animate-fade-in">
                {language === 'de' 
                  ? 'Bitte geben Sie den Bestätigungscode ein' 
                  : 'Please enter the verification code'}
              </p>
            </div>

            {/* Bottom space with brand removed in alignment with Create Account screen */}
            <div className="mt-8 md:mt-12" />
          </div>
        </div>

        {/* Right Side: Verification input Pane */}
        <div className="flex-1 p-6 sm:p-10 flex flex-col justify-center text-left">
          <div className="w-full max-w-md mx-auto py-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-2 group relative">
                <label className="block text-[#4A5D7E] text-[12px] font-bold tracking-wide">
                  {language === 'de' ? 'Code' : 'Code'} <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder={language === 'de' ? 'Code' : 'Code'}
                  id="2fa-code-input"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  className="w-full bg-white border border-zinc-200 rounded-lg px-3.5 py-2.5 text-sm hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 text-zinc-900 font-semibold outline-none transition-all h-11"
                />
                {errorMsg && (
                  <p className="text-[11px] font-semibold text-rose-500 mt-1 font-sans">{errorMsg}</p>
                )}
              </div>

              {/* Action row with Reset password link on the left and solid orange Next button on the right */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <button
                  type="button"
                  onClick={onRequestPasswordReset}
                  className="text-xs font-bold text-[#f89728] hover:text-[#df7e10] hover:underline cursor-pointer select-none text-left py-1"
                >
                  {language === 'de' ? 'Passwort zurücksetzen?' : 'Password reset?'}
                </button>

                <button
                  type="submit"
                  className="px-8 py-2.5 bg-[#f89728] hover:bg-[#df7e10] active:scale-[0.98] text-white text-xs font-bold rounded-lg shadow-sm hover:shadow transition-all cursor-pointer flex items-center justify-center gap-2 select-none h-11"
                >
                  <span>{language === 'de' ? 'Weiter' : 'Next'}</span>
                  <ArrowRight size={14} className="stroke-[2.5]" />
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
