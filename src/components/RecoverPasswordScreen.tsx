import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Mail } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface RecoverPasswordScreenProps {
  language: Language;
  onBackToLogin: () => void;
  onSuccessToast?: (msg: string) => void;
  onProceedToPasswordReset: () => void;
}

export function RecoverPasswordScreen({ language, onBackToLogin, onSuccessToast, onProceedToPasswordReset }: RecoverPasswordScreenProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorType, setErrorType] = useState<'empty' | 'invalid' | ''>('');

  const t = TRANSLATIONS[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorType('empty');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorType('invalid');
      return;
    }

    setIsSubmitting(true);
    setErrorType('');

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 850);
  };

  return (
    <div id="recover-password-screen" className="w-full flex-1 bg-transparent py-6 sm:py-8 px-4 flex flex-col justify-center items-center select-none animate-fade-in animate-duration-300">
      <div 
        id="recover-password-main-card"
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
                {t.recover.title}
              </h2>
              <div className="w-8 h-1 bg-[#f89728] rounded-full mt-4" />

              {/* Description guidelines description */}
              {!isSubmitted && (
                <p className="text-[#4A5D7E] text-xs sm:text-[13px] leading-relaxed font-sans font-medium mt-6 animate-fade-in">
                  {language === 'de' 
                    ? 'Geben Sie Ihre registrierte E-Mail-Adresse ein. Wir senden Ihnen per E-Mail Anweisungen zum sicheren Zurücksetzen Ihres Systempassworts.' 
                    : 'Please provide your registered email address below, and we will dispatch a secure link to reset your password and recover your account access.'}
                </p>
              )}
            </div>

            {/* Bottom space with brand removed in alignment with Create Account screen */}
            <div className="mt-8 md:mt-12" />
          </div>
        </div>

        {/* Right Side: Form details Pane */}
        <div className="flex-1 p-6 sm:p-10 flex flex-col justify-center text-left">
          {isSubmitted ? (
            /* Password Recovery Confirmation Success State */
            <div id="recover-success-state" className="flex flex-col items-center justify-center text-center py-12 px-2 space-y-6 animate-fade-in animate-duration-300">
              <div className="w-14 h-14 bg-orange-50 text-[#f89728] border border-orange-100 rounded-full flex items-center justify-center animate-pulse">
                <Mail size={26} />
              </div>
              <div className="space-y-1.5 flex flex-col items-center">
                <h3 className="text-lg font-bold text-slate-900 font-sans">
                  {t.recover.successTitle}
                </h3>
                <p className="text-slate-500 text-xs max-w-sm leading-relaxed font-sans font-medium mb-4">
                  {t.recover.successSentText} <span className="font-mono text-[#f89728] font-bold">{email}</span>. {t.recover.successInstructionsText}
                </p>
                
                <button
                  type="button"
                  onClick={onProceedToPasswordReset}
                  className="px-6 py-2 border border-[#f89728] text-[#f89728] hover:bg-orange-50/40 rounded-lg text-xs font-bold transition-all cursor-pointer select-none"
                >
                  Proceed to password reset
                </button>
              </div>
            </div>
          ) : (
            /* Reset password request form */
            <div className="w-full max-w-md mx-auto py-2">
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                
                {/* Specific correct entries notification matching original layout precisely */}
                {errorType && (
                  <div 
                    id="recover-error-banner" 
                    className="bg-[#FFF5F5] border border-red-200 border-l-[6px] border-l-red-600 rounded-lg p-4 mb-5 text-[#B91C1C] text-xs font-sans animate-fade-in"
                  >
                    <p className="font-bold text-[13px] text-red-900 mb-1">
                      {language === 'de' ? 'Bitte korrigieren Sie Ihre Angaben' : 'Please correct your entries'}
                    </p>
                    <ul className="list-disc list-inside space-y-0.5 text-xs font-medium text-red-700 ml-1">
                      <li>
                        {errorType === 'empty' 
                          ? (language === 'de' 
                              ? 'Bitte geben Sie Ihre E-Mail-Adresse ein! Der Wiederherstellungslink wird Ihnen zugesandt.' 
                              : 'Please enter your email address! The recovery link will be sent to you.')
                          : (language === 'de' 
                              ? 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' 
                              : 'Please enter a valid email address.')}
                      </li>
                    </ul>
                  </div>
                )}

                <div className="space-y-1.5 group relative">
                  <label className="block text-[#4A5D7E] text-[12px] font-bold tracking-wide">
                    {t.recover.emailLabel} <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    placeholder={t.recover.emailPlaceholder}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorType) setErrorType('');
                    }}
                    className={`w-full rounded-lg px-3.5 py-2.5 text-sm font-semibold outline-none transition-all h-11 ${
                      errorType 
                        ? 'bg-red-50/50 border border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100/50 text-red-900 placeholder-red-300' 
                        : 'bg-white border border-zinc-200 text-zinc-900 hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10'
                    }`}
                  />
                </div>

                {/* Action Navigation Controls Row - matching CreateAccountScreen design exactly with tighter margin */}
                <div className="pt-5 border-t border-[#F1F5F9] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={onBackToLogin}
                    className="w-full sm:w-auto px-5 py-2.5 bg-white border border-zinc-250 text-zinc-650 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 select-none hover:bg-zinc-50 hover:border-zinc-350 cursor-pointer active:scale-[0.98]"
                  >
                    <ArrowLeft size={14} className="stroke-[2.5]" />
                    <span>{t.recover.backBtn}</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-2.5 bg-[#f89728] hover:bg-[#df7e10] active:scale-[0.98] text-white text-xs font-bold rounded-lg shadow-sm hover:shadow transition-all cursor-pointer flex items-center justify-center gap-2 select-none"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>{t.recover.sendingBtn}</span>
                      </>
                    ) : (
                      <>
                        <span>{t.recover.sendBtn}</span>
                        <ArrowRight size={14} className="stroke-[2.5]" />
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
