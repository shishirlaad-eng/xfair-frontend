import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Language } from '../types';

interface ChangePasswordWithOldScreenProps {
  language: Language;
  onBack: () => void;
  onSubmitSuccess: () => void;
}

export function ChangePasswordWithOldScreen({ language, onBack, onSubmitSuccess }: ChangePasswordWithOldScreenProps) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Allow empty password submission directly to proceed in design reviews if everything is empty
    if (!oldPassword.trim() && !newPassword.trim() && !confirmPassword.trim()) {
      setIsSubmitting(true);
      setErrorMsg('');
      setTimeout(() => {
        setIsSubmitting(false);
        onSubmitSuccess();
      }, 1000);
      return;
    }

    // Otherwise, validate mandatory old password field
    if (!oldPassword.trim()) {
      setErrorMsg(language === 'de' ? 'Das alte Passwort ist zwingend erforderlich.' : 'Old password is required.');
      return;
    }

    if (!newPassword.trim()) {
      setErrorMsg(language === 'de' ? 'Geben Sie bitte ein neues Passwort ein.' : 'Please enter a new password.');
      return;
    }

    if (newPassword.length < 12) {
      setErrorMsg(language === 'de' ? 'Das neue Passwort muss mindestens 12 Zeichen lang sein.' : 'The new password must have at least 12 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg(language === 'de' ? 'Die Passwörter stimmen nicht überein.' : 'The passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess();
    }, 1000);
  };

  return (
    <div id="change-password-with-old-screen" className="w-full flex-1 bg-transparent py-6 sm:py-8 px-4 flex flex-col justify-center items-center select-none animate-fade-in animate-duration-300">
      <div 
        id="change-password-with-old-main-card"
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
                {language === 'de' ? 'Passwort ändern' : 'Change password'}
              </h2>
              <div className="w-8 h-1 bg-[#f89728] rounded-full mt-4" />

              {/* Description guidelines */}
              <p className="text-[#4A5D7E] text-xs sm:text-[13px] leading-relaxed font-sans font-medium mt-6 animate-fade-in">
                {language === 'de' 
                  ? 'Geben Sie Ihr altes Passwort ein und legen Sie ein neues fest' 
                  : 'Enter your old password and set your new password'}
              </p>
            </div>

            {/* Bottom space */}
            <div className="mt-8 md:mt-12" />
          </div>
        </div>

        {/* Right Side: Change Password input Form Pane */}
        <div className="flex-1 p-6 sm:p-10 flex flex-col justify-center text-left">
          <div className="w-full max-w-md mx-auto py-2">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Old Password field - Top additional mandatory field */}
              <div className="space-y-1.5 group relative">
                <label className="block text-[#4A5D7E] text-[12px] font-bold tracking-wide">
                  {language === 'de' ? 'Altes Passwort' : 'Old password'} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input 
                    type={showOldPassword ? 'text' : 'password'} 
                    placeholder={language === 'de' ? 'Altes Passwort' : 'Old Password'}
                    value={oldPassword}
                    onChange={(e) => {
                      setOldPassword(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    className="w-full bg-white border border-zinc-200 rounded-lg pl-3.5 pr-11 py-2.5 text-sm hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 text-zinc-900 font-semibold outline-none transition-all h-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1 rounded"
                  >
                    {showOldPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* New Password field */}
              <div className="space-y-1.5 group relative">
                <label className="block text-[#4A5D7E] text-[12px] font-bold tracking-wide">
                  {language === 'de' ? 'Neues Passwort' : 'New password'} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input 
                    type={showNewPassword ? 'text' : 'password'} 
                    placeholder={language === 'de' ? 'Neues Passwort' : 'New Password'}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    className="w-full bg-white border border-zinc-200 rounded-lg pl-3.5 pr-11 py-2.5 text-sm hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 text-zinc-900 font-semibold outline-none transition-all h-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1 rounded"
                  >
                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password field */}
              <div className="space-y-1.5 group relative">
                <label className="block text-[#4A5D7E] text-[12px] font-bold tracking-wide">
                  {language === 'de' ? 'Neues Passwort bestätigen' : 'Confirm new password'} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input 
                    type={showConfirmPassword ? 'text' : 'password'} 
                    placeholder={language === 'de' ? 'Passwort bestätigen' : 'Confirm password'}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    className="w-full bg-white border border-zinc-200 rounded-lg pl-3.5 pr-11 py-2.5 text-sm hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 text-zinc-900 font-semibold outline-none transition-all h-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1 rounded"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Specific Help / Disclaimer text matching image exactly */}
              <p className="text-slate-500 text-[11px] leading-relaxed font-sans font-normal italic pt-1 text-justify">
                {language === 'de'
                  ? 'Das Passwort muss mindestens 12 Zeichen lang sein, davon 1 Sonderzeichen ($, !, etc.). Bitte vermeiden Sie die Verwendung folgender Zeichen: +, &, ". Bitte stellen Sie sicher, dass das Passwort nicht trivial ist, nicht Ihren Firmennamen enthält und nicht Teil Ihrer E-Mail-Adresse ist.'
                  : 'The password must have at least 12 characters, of them 1 special characters ($,!, etc.). Please avoid using the following characters: +, &, ". Please ensure that the password is not trivial, does not contain your company name and is not part of your email address.'}
              </p>

              {errorMsg && (
                <p className="text-[11px] font-semibold text-rose-500 font-sans">{errorMsg}</p>
              )}

              {/* Action row with Go Back button and Submit button */}
              <div className="pt-5 border-t border-[#F1F5F9] flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={onBack}
                  className="w-full sm:w-auto px-5 py-2.5 bg-white border border-zinc-250 text-zinc-650 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 select-none hover:bg-zinc-50 hover:border-zinc-350 cursor-pointer active:scale-[0.98]"
                >
                  <ArrowLeft size={14} className="stroke-[2.5]" />
                  <span>{language === 'de' ? 'Zurück' : 'Back'}</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-2.5 bg-[#f89728] hover:bg-[#df7e10] active:scale-[0.98] text-white text-xs font-bold rounded-lg shadow-sm hover:shadow transition-all cursor-pointer flex items-center justify-center gap-2 select-none h-11"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>{language === 'de' ? 'Wird geändert...' : 'Updating...'}</span>
                    </>
                  ) : (
                    <>
                      <span>{language === 'de' ? 'Passwort ändern' : 'Change password'}</span>
                      <ArrowRight size={14} className="stroke-[2.5]" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
