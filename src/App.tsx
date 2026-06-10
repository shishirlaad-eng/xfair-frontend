import React, { useState } from 'react';
import { Info, Home, Shield, Sparkles, LogOut, X } from 'lucide-react';
import { XfairLogo } from './components/XfairLogo';
import { BackgroundOverlay } from './components/BackgroundOverlay';
import { LoginScreen } from './components/LoginScreen';
import { CreateAccountScreen } from './components/CreateAccountScreen';
import { RecoverPasswordScreen } from './components/RecoverPasswordScreen';
import { RegistrationsScreen } from './components/RegistrationsScreen';
import { FooterLinks } from './components/FooterLinks';
import { INITIAL_UPCOMING_EVENTS, INITIAL_REGISTRATIONS } from './data';
import { Language, UserSession } from './types';
import { TRANSLATIONS } from './translations';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [session, setSession] = useState<UserSession>({
    username: 'John Doe',
    email: '',
    isLoggedIn: false
  });
  const [showBrandInfo, setShowBrandInfo] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [isRecoveringPassword, setIsRecoveringPassword] = useState(false);
  const loginTheme = 'option1';

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Language selector parameters
  const languagesConfig = {
    en: { name: 'English (US)', flag: '/us.webp' },
    uk: { name: 'English (UK)', flag: '/uk.png' },
    de: { name: 'Deutsch', flag: '/de.png' }
  };

  const handleLogin = (email: string) => {
    setSession({
      username: 'John Doe',
      email: email,
      isLoggedIn: true
    });
  };

  const handleLogout = () => {
    setSession({
      username: 'John Doe',
      email: '',
      isLoggedIn: false
    });
    setIsCreatingAccount(false);
    setIsRecoveringPassword(false);
    setIsWizardOpen(false);
  };

  const toggleLanguage = (lang: Language) => {
    setLanguage(lang);
    setShowLangMenu(false);
  };

  const t = TRANSLATIONS[language];

  return (
    <div className="relative min-h-screen flex flex-col justify-between">
      {/* 1. Styled Background Elements & Vectors */}
      <BackgroundOverlay theme={loginTheme} />

      {/* 2. Global Portal Header wrapper (Top Bar) */}
      <header id="global-portal-header" className="w-full bg-[#ffffff] border-b border-slate-100 shadow-sm sticky top-0 z-40 transition-colors duration-300">
        <div className="max-w-none px-4 sm:px-8 lg:px-12 h-18 flex items-center justify-between">
          
          {/* Left Block inside Header */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Brand Logo inside Header */}
            <div className="flex items-center gap-2">
              <XfairLogo size="md" darkText={true} />
              <span className="hidden xs:inline-block bg-slate-100 text-slate-500 font-mono text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider font-bold">
                {t.header.emsPro}
              </span>
            </div>
          </div>

          {/* Right Action Widgets (moved to header) */}
          <div className="flex items-center gap-4">
            <div id="portal-header-toolbar" className="flex items-center gap-3">


              {/* Interactive brand Flag Picker */}
              <div className="relative inline-block">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center gap-2.5 bg-white border border-slate-200/90 px-3.5 py-1.5 rounded-lg text-xs font-bold hover:border-[#f89728] hover:bg-orange-50/10 hover:shadow-3xs cursor-pointer transition-all duration-200 focus:ring-2 focus:ring-[#f89728]/10 select-none active:scale-[0.98] w-full"
                  id="header-lang-picker"
                >
                  <img 
                    src={languagesConfig[language].flag} 
                    alt={languagesConfig[language].name} 
                    className="w-5 h-3.5 object-cover rounded-xs border border-slate-200/40 shadow-2xs shadow-neutral-200"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-slate-700 hidden text-xs sm:inline-block font-sans whitespace-nowrap">
                    {languagesConfig[language].name}
                  </span>
                  <span className={`text-[9px] text-slate-400 font-mono transition-transform duration-200 ${showLangMenu ? 'rotate-180 text-[#f89728]' : ''}`}>▼</span>
                </button>

                {/* Dropdown panel */}
                {showLangMenu && (
                  <div className="absolute left-0 right-0 mt-1 w-full bg-white border border-slate-200/60 rounded-xl shadow-premium py-1 z-50 text-xs text-slate-700 animate-fade-in select-none overflow-hidden">
                    {(Object.keys(languagesConfig) as Language[]).map((lang) => {
                      const isSelected = language === lang;
                      return (
                        <button
                          key={lang}
                          onClick={() => toggleLanguage(lang)}
                          className={`
                            w-full text-left px-4 py-2 cursor-pointer font-bold flex items-center justify-between text-xs transition-colors duration-150
                            ${isSelected 
                              ? 'bg-[#f89728] text-white hover:bg-[#df7e10]' 
                              : 'text-slate-600 hover:bg-orange-50/50 hover:text-[#f89728]'}
                          `}
                        >
                          <span className="flex items-center gap-2.5">
                            <img 
                              src={languagesConfig[lang].flag} 
                              alt={languagesConfig[lang].name} 
                              className="w-5 h-3.5 object-cover rounded-xs border border-slate-200/40 shadow-2xs"
                              referrerPolicy="no-referrer"
                            />
                            <span className="font-sans">{languagesConfig[lang].name}</span>
                          </span>
                          {isSelected && <span className="text-xs font-mono">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Home Key (resets password inputs or logs out) - Hidden on login screen */}
              {(session.isLoggedIn || isCreatingAccount || isRecoveringPassword) && (
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors hover:scale-105 cursor-pointer"
                  title={t.header.resetTooltip}
                  id="header-home-button"
                >
                  <Home size={18} />
                </button>
              )}

              {/* Info key */}
              <div
                className="p-2 text-slate-400 outline-none select-none"
                id="header-info-button"
              >
                <Info size={18} />
              </div>

              {/* Vertical Separator */}
              <span className="w-px h-5 bg-slate-200" />

              {/* Profile tag (moved to the right side beside info icon) */}
              {session.isLoggedIn && (
                <div className="flex items-center gap-2 bg-slate-50 pl-3 pr-1.5 py-1 rounded-full border border-slate-100 mr-1 animate-fade-in">
                  <div className="w-6 h-6 rounded-full bg-[#f89728]/10 text-[#f89728] font-bold text-xs uppercase flex items-center justify-center">
                    {session.username.split(' ').map(name => name[0]).join('')}
                  </div>
                  <span className="text-slate-700 text-xs font-semibold">{session.username}</span>
                  <button
                    onClick={handleLogout}
                    className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-all duration-150 cursor-pointer"
                    title={t.header.logoutTooltip}
                  >
                    <LogOut size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 3. Main Central App Module Dynamic views switcher */}
      <main className="flex-1 w-full flex items-stretch">
        {!session.isLoggedIn ? (
          isRecoveringPassword ? (
            <RecoverPasswordScreen
              language={language}
              onBackToLogin={() => setIsRecoveringPassword(false)}
              onSuccessToast={(msg) => triggerToast(msg)}
            />
          ) : isCreatingAccount ? (
            <CreateAccountScreen
              language={language}
              onBackToLogin={() => setIsCreatingAccount(false)}
              onSuccessDirect={() => {
                setIsCreatingAccount(false);
                const successMsg = language === 'de' ? 'Vielen Dank für Ihre Registrierung!' : 'Thank you for registering!';
                triggerToast(successMsg);
              }}
              onSuccess={(email, firstName, lastName) => {
                setSession({
                  username: `${firstName} ${lastName}`.trim() || 'John Doe',
                  email: email,
                  isLoggedIn: true
                });
                setIsCreatingAccount(false);
              }}
            />
          ) : (
            <LoginScreen
              language={language}
              upcomingEvents={INITIAL_UPCOMING_EVENTS}
              onLoginSuccess={handleLogin}
              onCreateAccountRequest={() => setIsCreatingAccount(true)}
              onRecoverPasswordRequest={() => setIsRecoveringPassword(true)}
              theme={loginTheme}
            />
          )
        ) : (
          <div className="w-full">
            {/* Authenticated Dashboard Overview */}
            <RegistrationsScreen
              language={language}
              userName={session.username}
              registrations={INITIAL_REGISTRATIONS}
              theme={loginTheme}
              onWizardOpenChange={setIsWizardOpen}
            />
          </div>
        )}
      </main>

      {/* 4. Elegant custom branding footer */}
      {!isWizardOpen && <FooterLinks language={language} />}

      {/* 5. OVERALL SYSTEM INFO MODAL */}
      {showBrandInfo && (
        <div id="brand-system-modal" className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 relative text-left border border-slate-100">
            <button 
              onClick={() => setShowBrandInfo(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              ✕
            </button>
            
            <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-4">
              <Shield size={20} />
            </div>

            <h3 className="text-lg font-display font-bold text-slate-900 mb-2">
              {t.header.systemInfoTitle}
            </h3>
            
            <p className="text-slate-600 text-xs leading-relaxed mb-4">
              {t.header.systemInfoDesc}
            </p>

            <div className="bg-slate-50 p-4 rounded-xl space-y-1.5 text-[11px] font-mono text-slate-500 border border-slate-100">
              <p><strong>{t.header.depMode}</strong> {t.header.depModeValue}</p>
              <p><strong>{t.header.brandPalette}</strong> {t.header.brandPaletteValue}</p>
              <p><strong>{t.header.varnishLevel}</strong> {t.header.varnishLevelValue}</p>
            </div>

            <button
              onClick={() => setShowBrandInfo(false)}
              className="w-full bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold py-2.5 rounded-lg mt-5 cursor-pointer"
            >
              {t.header.acknowledgedBtn}
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification block */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 border border-slate-800 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-medium z-50 max-w-sm border-l-4 border-l-[#f89728] animate-slide-up">
          <div className="flex-1 leading-normal pr-2">
            {toastMessage}
          </div>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white shrink-0 p-0.5 rounded cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
