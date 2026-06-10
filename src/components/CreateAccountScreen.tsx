import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Eye, EyeOff, ChevronDown, Check, Shield, Info } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface CreateAccountScreenProps {
  language: Language;
  onBackToLogin: () => void;
  onSuccess: (email: string, firstName: string, lastName: string) => void;
  onSuccessDirect?: () => void;
}

export function CreateAccountScreen({ language, onBackToLogin, onSuccess, onSuccessDirect }: CreateAccountScreenProps) {
  // Field States
  const [userType, setUserType] = useState('Employee');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [repeatEmail, setRepeatEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');

  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPasswordRules, setShowPasswordRules] = useState(false);

  // Constant CAPTCHA read from registration system reference
  const ACTUAL_CAPTCHA = '185997';

  // Dropdown reference for closing outside
  const typeDropdownRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[language];

  // Map userType strings into German equivalents in local display if needed, but keep core data model clean
  const getLocalizedUserType = (type: string) => {
    if (language === 'de') {
      switch (type) {
        case 'Employee': return 'Mitarbeiter';
        case 'Survey': return 'Befragung';
        case 'Visitor': return 'Besucher';
        case 'Visitor Report': return 'Besuchsbericht';
        case 'Event Group': return 'Veranstaltungsgruppe';
        default: return type;
      }
    }
    return type;
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (typeDropdownRef.current && !typeDropdownRef.current.contains(event.target as Node)) {
        setIsTypeDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validate inputs using localized errors
    if (!firstName.trim()) newErrors.firstName = t.createAccount.errFirstName;
    if (!lastName.trim()) newErrors.lastName = t.createAccount.errLastName;
    
    if (!email) {
      newErrors.email = t.createAccount.errEmailRequired;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t.createAccount.errEmailInvalid;
    }

    if (email !== repeatEmail) {
      newErrors.repeatEmail = t.createAccount.errEmailMismatch;
    }

    if (password.length < 12) {
      newErrors.password = t.createAccount.errPasswordLength;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = t.createAccount.errPasswordMismatch;
    }

    if (captchaInput !== ACTUAL_CAPTCHA) {
      newErrors.captcha = t.createAccount.errCaptchaIncorrect;
    }

    if (!termsAgreed) {
      newErrors.terms = t.createAccount.errTermsRequired;
    }
    if (!privacyAgreed) {
      newErrors.privacy = t.createAccount.errPrivacyRequired;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    if (onSuccessDirect) {
      onSuccessDirect();
    } else {
      setIsSubmitted(true);
      setTimeout(() => {
        onSuccess(email, firstName, lastName);
      }, 1050);
    }
  };

  return (
    <div className="w-full flex-1 bg-transparent py-6 sm:py-8 px-4 flex flex-col justify-center items-center select-none animate-fade-in animate-duration-300">
      <div className="w-full max-w-4xl bg-white border border-[#E2E8F0] rounded-[24px] shadow-premium overflow-hidden flex flex-col md:flex-row md:items-stretch">
        
        {/* Left Side: Layout Sidebar panel inspired by mockup with clear opacity brand tone (#f89728 opacity-10) */}
        <div 
          className="md:w-[320px] p-8 sm:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E2E8F0]/40 select-none shrink-0 text-left relative overflow-hidden" 
          style={{ backgroundColor: 'rgba(248, 151, 40, 0.08)' }}
        >
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              {/* Title & Decorative bar */}
              <h2 className="text-[#0F172A] font-extrabold text-2xl sm:text-3xl leading-snug font-sans tracking-tight mt-4">
                {t.createAccount.title}
              </h2>
              <div className="w-8 h-1 bg-[#f89728] rounded-full mt-4" />

              {/* Description guidelines */}
              <p className="text-[#4A5D7E] text-xs sm:text-[13px] leading-relaxed font-sans font-medium mt-6">
                {t.createAccount.desc}
              </p>
            </div>

            {/* Bottom space */}
            <div className="mt-8 md:mt-12" />
          </div>
        </div>

        {/* Right Side: Form details Pane */}
        <div className="flex-1 p-6 sm:p-10 flex flex-col justify-center">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center text-center py-12 px-2 space-y-6 animate-fade-in">
              <div className="w-14 h-14 bg-orange-50 text-[#f89728] border border-orange-100 rounded-full flex items-center justify-center animate-pulse">
                <Shield size={26} />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-slate-900 font-sans">
                  {t.createAccount.successTitle}
                </h3>
                <p className="text-slate-500 text-xs max-w-sm leading-relaxed font-sans font-medium mb-1">
                  {t.createAccount.successDesc}<span className="font-mono text-[#f89728] font-bold">{email}</span>. Please review your email inbox to activate your profile.
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-100 text-slate-500 font-mono text-[10px] p-4 rounded-xl max-w-xs space-y-1 text-left w-full shadow-3xs">
                <p><strong>{t.createAccount.registryStatus}</strong> {t.createAccount.registryStatusValue}</p>
                <p><strong>{t.createAccount.activationCode}</strong> xfair-act-77196232</p>
                <p><strong>{t.createAccount.assignedType}</strong> {getLocalizedUserType(userType)}</p>
              </div>
              <button
                type="button"
                onClick={onBackToLogin}
                className="px-5 py-2.5 bg-white border border-zinc-250 text-zinc-650 text-xs font-bold rounded-lg transition-all flex items-center gap-2 select-none hover:bg-zinc-50 hover:border-zinc-350 cursor-pointer active:scale-[0.98]"
              >
                <ArrowLeft size={14} className="stroke-[2.5]" />
                {t.createAccount.returnToLoginBtn}
              </button>
            </div>
          ) : (
            <form onSubmit={handleNextSubmit} className="space-y-6 sm:space-y-8">
              
              {/* Grid 1: Name fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                <div className="space-y-1.5 group relative">
                  <label className="block text-[#4A5D7E] text-[12px] font-bold tracking-wide">
                    {t.createAccount.firstNameLabel} <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder={t.createAccount.firstNamePlaceholder}
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      if (errors.firstName) setErrors(prev => { const { firstName, ...rest } = prev; return rest; });
                    }}
                    required
                    className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-[15px] hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 text-zinc-900 font-semibold outline-none transition-all h-11"
                  />
                  {errors.firstName && (
                    <p className="text-[11px] font-semibold text-rose-500 mt-1 font-sans">{errors.firstName}</p>
                  )}
                </div>

                <div className="space-y-1.5 group relative">
                  <label className="block text-[#4A5D7E] text-[12px] font-bold tracking-wide">
                    {t.createAccount.lastNameLabel} <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder={t.createAccount.lastNamePlaceholder}
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      if (errors.lastName) setErrors(prev => { const { lastName, ...rest } = prev; return rest; });
                    }}
                    required
                    className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-[15px] hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 text-zinc-900 font-semibold outline-none transition-all h-11"
                  />
                  {errors.lastName && (
                    <p className="text-[11px] font-semibold text-rose-500 mt-1 font-sans">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Grid 2: Email addresses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                <div className="space-y-1.5 group relative">
                  <label className="block text-[#4A5D7E] text-[12px] font-bold tracking-wide">
                    {t.createAccount.emailLabel} <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="type" 
                    placeholder={t.createAccount.emailPlaceholder}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors(prev => { const { email, ...rest } = prev; return rest; });
                    }}
                    required
                    className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-[15px] hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 text-zinc-900 font-semibold outline-none transition-all h-11"
                  />
                  {errors.email && (
                    <p className="text-[11px] font-semibold text-rose-500 mt-1 font-sans">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-1.5 group relative">
                  <label className="block text-[#4A5D7E] text-[12px] font-bold tracking-wide">
                    {t.createAccount.repeatEmailLabel} <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="type" 
                    placeholder={t.createAccount.repeatEmailPlaceholder}
                    value={repeatEmail}
                    onChange={(e) => {
                      setRepeatEmail(e.target.value);
                      if (errors.repeatEmail) setErrors(prev => { const { repeatEmail, ...rest } = prev; return rest; });
                    }}
                    required
                    className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-[15px] hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 text-zinc-900 font-semibold outline-none transition-all h-11"
                  />
                  {errors.repeatEmail && (
                    <p className="text-[11px] font-semibold text-rose-500 mt-1 font-sans">{errors.repeatEmail}</p>
                  )}
                </div>
              </div>

              {/* Grid 3: Password and Confirm fields + Popover/Tooltip password rule trigger */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                <div className="space-y-1.5 group relative">
                  <div className="flex items-center gap-1.5 relative">
                    <label className="block text-[#4A5D7E] text-[12px] font-bold tracking-wide">
                      {t.createAccount.passwordLabel} <span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      onMouseEnter={() => setShowPasswordRules(true)}
                      onMouseLeave={() => setShowPasswordRules(false)}
                      onClick={() => setShowPasswordRules(!showPasswordRules)}
                      className="text-[#f89728] hover:text-[#df7e10] transition-colors p-0.5 rounded focus:outline-none cursor-pointer"
                      title="Requirements"
                    >
                      <Info size={13} className="stroke-[2.5]" />
                    </button>
                    {showPasswordRules && (
                      <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-slate-900 text-white text-[11px] leading-relaxed rounded-xl shadow-xl z-50 animate-fade-in pointer-events-none font-medium">
                        <div className="absolute top-full left-4 border-[6px] border-transparent border-t-slate-900" />
                        {t.createAccount.passwordInstructions}
                      </div>
                    )}
                  </div>
                  <div className="relative flex items-center">
                    <input 
                      type={showPassword ? 'text' : 'password'}
                      placeholder={t.createAccount.passwordPlaceholder}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors(prev => { const { password, ...rest } = prev; return rest; });
                      }}
                      required
                      className="w-full bg-white border border-zinc-200 rounded-lg pl-3 pr-10 py-2 text-[15px] hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 text-zinc-900 font-semibold outline-none transition-all h-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 text-slate-400 hover:text-[#f89728] transition-colors p-1 flex items-center justify-center"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-[11px] font-semibold text-rose-500 mt-1 font-sans">{errors.password}</p>
                  )}
                </div>

                <div className="space-y-1.5 group relative">
                  <label className="block text-[#4A5D7E] text-[12px] font-bold tracking-wide">
                    {t.createAccount.confirmPasswordLabel} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <input 
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder={t.createAccount.confirmPasswordPlaceholder}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (errors.confirmPassword) setErrors(prev => { const { confirmPassword, ...rest } = prev; return rest; });
                      }}
                      required
                      className="w-full bg-white border border-zinc-200 rounded-lg pl-3 pr-10 py-2 text-[15px] hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 text-zinc-900 font-semibold outline-none transition-all h-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 text-slate-400 hover:text-[#f89728] transition-colors p-1 flex items-center justify-center"
                    >
                      {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-[11px] font-semibold text-rose-500 mt-1 font-sans">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              {/* Grid 4: User Type & Captcha verification */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 items-end">
                {/* User Type */}
                <div ref={typeDropdownRef} className="space-y-1.5 relative">
                  <label className="block text-[#4A5D7E] text-[12px] font-bold tracking-wide">
                    {t.createAccount.typeLabel}
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                    className="w-full flex items-center justify-between bg-white border border-zinc-200 rounded-lg px-3 py-2 text-[15px] hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 text-zinc-900 font-semibold outline-none transition-all cursor-pointer h-11 text-left"
                  >
                    <span>{getLocalizedUserType(userType)}</span>
                    <ChevronDown size={15} className={`text-zinc-400 transition-transform ${isTypeDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isTypeDropdownOpen && (
                    <div className="absolute left-0 right-0 mt-1.5 bg-white border border-[#CBD5E1]/40 rounded-xl shadow-lg py-1.5 z-50 animate-slide-down origin-top max-h-60 overflow-y-auto">
                      {['Employee', 'Survey', 'Visitor', 'Visitor Report', 'Event Group'].map((type) => {
                        const isSelected = type === userType;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => {
                              setUserType(type);
                              setIsTypeDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                              isSelected 
                                ? 'bg-[#f89728] text-white' 
                                : 'text-slate-700 hover:bg-orange-50 hover:text-[#f89728]'
                            }`}
                          >
                            <span>{getLocalizedUserType(type)}</span>
                            {isSelected && <Check size={12} className="stroke-[2.5]" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Captcha section */}
                <div className="space-y-1.5">
                  <label className="block text-[#4A5D7E] text-[12px] font-bold tracking-wide">
                    {t.createAccount.captchaLabel} <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4 items-end">
                    {/* Captcha representation badge matching picture closely */}
                    <div className="bg-[#FAFAFD] border border-slate-200/80 w-[96px] sm:w-[110px] h-[36px] rounded-lg font-mono text-sm font-bold italic tracking-[0.2em] text-[#0F172A] select-none shadow-3xs line-through relative overflow-hidden flex items-center justify-center shrink-0 mb-1">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(248,151,40,0.04)_1.2px,transparent_1.2px)] bg-[size:4px_4px]" />
                      <span className="relative z-10 select-none tracking-[0.15em]">{ACTUAL_CAPTCHA}</span>
                    </div>

                    <input 
                      type="text" 
                      maxLength={8}
                      placeholder={t.createAccount.captchaPlaceholder}
                      value={captchaInput}
                      onChange={(e) => {
                        setCaptchaInput(e.target.value);
                        if (errors.captcha) setErrors(prev => { const { captcha, ...rest } = prev; return rest; });
                      }}
                      required
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-[15px] hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 text-zinc-900 font-semibold outline-none transition-all h-11 font-mono tracking-wide"
                    />
                  </div>
                  {errors.captcha && (
                    <p className="text-[11px] font-semibold text-rose-500 mt-1 font-sans">{errors.captcha}</p>
                  )}
                </div>
              </div>

              {/* Data Protection Checkboxes with requested clean labels */}
              <div className="pt-4 border-t border-[#F1F5F9] space-y-3">
                <label className="block text-[#4A5D7E] text-[12px] font-bold tracking-wide">
                  {t.createAccount.dataProtectionLabel} <span className="text-red-500">*</span>
                </label>
                
                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer select-none group text-xs text-slate-700 font-semibold md:text-[13px]">
                    <input 
                      type="checkbox"
                      checked={termsAgreed}
                      onChange={(e) => {
                        setTermsAgreed(e.target.checked);
                        if (errors.terms) setErrors(prev => { const { terms, ...rest } = prev; return rest; });
                      }}
                      required
                      className="mt-0.5 accent-[#f89728] text-white w-4 h-4 cursor-pointer rounded border-[#CBD5E1]"
                    />
                    <span className="group-hover:text-[#f89728] transition-colors leading-normal font-semibold text-[#4A5D7E] hover:underline">
                      {t.createAccount.termsLabel} <span className="text-red-500 font-sans">*</span>
                    </span>
                  </label>
                  {errors.terms && (
                    <p className="text-[11px] font-semibold text-rose-500 ml-7 -mt-1.5 font-sans">{errors.terms}</p>
                  )}

                  <label className="flex items-start gap-3 cursor-pointer select-none group text-xs text-slate-700 font-semibold md:text-[13px]">
                    <input 
                      type="checkbox"
                      checked={privacyAgreed}
                      onChange={(e) => {
                        setPrivacyAgreed(e.target.checked);
                        if (errors.privacy) setErrors(prev => { const { privacy, ...rest } = prev; return rest; });
                      }}
                      required
                      className="mt-0.5 accent-[#f89728] text-white w-4 h-4 cursor-pointer rounded border-[#CBD5E1]"
                    />
                    <span className="group-hover:text-[#f89728] transition-colors leading-normal font-semibold text-[#4A5D7E] hover:underline">
                      {t.createAccount.privacyLabel} <span className="text-red-500 font-sans">*</span>
                    </span>
                  </label>
                  {errors.privacy && (
                    <p className="text-[11px] font-semibold text-rose-500 ml-7 -mt-1.5 font-sans">{errors.privacy}</p>
                  )}
                </div>
              </div>

              {/* Action Navigation Submit Button Row - styled matching back button in step 2 */}
              <div className="pt-6 border-t border-[#F1F5F9] flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={onBackToLogin}
                  className="w-full sm:w-auto px-5 py-2.5 bg-white border border-zinc-250 text-zinc-650 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 select-none hover:bg-zinc-50 hover:border-zinc-350 cursor-pointer active:scale-[0.98]"
                >
                  <ArrowLeft size={14} className="stroke-[2.5]" />
                  <span>{t.createAccount.backBtn}</span>
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-2.5 bg-[#f89728] hover:bg-[#df7e10] active:scale-[0.98] text-white text-xs font-bold rounded-lg shadow-sm hover:shadow transition-all cursor-pointer flex items-center justify-center gap-2 select-none"
                >
                  <span>{t.createAccount.submitBtn}</span>
                  <ArrowRight size={14} className="stroke-[2.5]" />
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
