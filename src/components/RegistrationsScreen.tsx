import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Calendar, MapPin, Info
} from 'lucide-react';
import { Registration, Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { RegistrationWizard } from './RegistrationWizard';
import { CoordinatorOverview } from './CoordinatorOverview';

// Helper function to extract and format timeline start date parts for left col
function getEventTimelineParts(reg: Registration) {
  let day = "24";
  let month = "Jun";
  let year = "2026";
  
  let dateStr = "";
  if (reg.dateRange) {
    const parts = reg.dateRange.split('-');
    dateStr = parts[0].trim(); // e.g., "17/03/2026"
  } else if (reg.title.toLowerCase().includes('bauma 2022')) {
    dateStr = "24/10/2022";
  }
  
  if (dateStr) {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const d = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10);
      const y = parseInt(parts[2], 10);
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      
      if (d >= 1 && m >= 1 && m <= 12) {
        day = d.toString();
        month = months[m - 1];
        year = y.toString();
        return { day, month, year };
      }
    }
  }
  
  // Custom fallback
  if (reg.title.toLowerCase().includes('bauma')) {
    return { day: "24", month: "Oct", year: "2022" };
  }
  return { day: "24", month: "Jun", year: "2026" };
}

// Map dates to JS Date objects for absolute chronological sorting
function getRegDateObject(reg: Registration): Date {
  let dateStr = "";
  if (reg.dateRange) {
    const parts = reg.dateRange.split('-');
    dateStr = parts[0].trim();
  } else if (reg.title.toLowerCase().includes('bauma 2022')) {
    dateStr = "24/10/2022";
  }
  
  if (dateStr) {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const d = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10);
      const y = parseInt(parts[2], 10);
      return new Date(y, m - 1, d);
    }
  }
  return new Date(2026, 11, 31); // default fallback
}

interface RegistrationsScreenProps {
  language: Language;
  userName: string;
  registrations: Registration[];
  theme?: 'option1' | 'option2';
  onWizardOpenChange?: (isOpen: boolean) => void;
  isWizardOpen?: boolean;
}

export function RegistrationsScreen({
  language,
  userName,
  registrations,
  theme,
  onWizardOpenChange,
  isWizardOpen
}: RegistrationsScreenProps) {
  const [localRegs, setLocalRegs] = useState<Registration[]>(registrations);
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);
  const [showFlowPreview, setShowFlowPreview] = useState(false);
  const [forceWizardMode, setForceWizardMode] = useState(false);

  const t = TRANSLATIONS[language];

  // Reset inner wizard mode and selected registration when header home or logo click sets isWizardOpen to false
  useEffect(() => {
    if (isWizardOpen === false) {
      setShowFlowPreview(false);
      setSelectedReg(null);
      setForceWizardMode(false);
    }
  }, [isWizardOpen]);

  // Sync state for popup integration
  useEffect(() => {
    const isOpen = showFlowPreview && selectedReg !== null;
    if (onWizardOpenChange) {
      onWizardOpenChange(isOpen);
    }
  }, [showFlowPreview, selectedReg, onWizardOpenChange]);

  const handleEditClick = (reg: Registration) => {
    setSelectedReg(reg);
    setShowFlowPreview(true);
  };

  // Chronologically sorted registrations for timeline list representation
  const sortedRegs = [...localRegs].sort((a, b) => getRegDateObject(a).getTime() - getRegDateObject(b).getTime());

  // Translate month strings to German if language is de
  const getLocalizedMonth = (engMonth: string) => {
    if (language !== 'de') return engMonth;
    const map: Record<string, string> = {
      'Jan': 'Jan', 'Feb': 'Feb', 'Mar': 'Mär', 'Apr': 'Apr',
      'May': 'Mai', 'Jun': 'Jun', 'Jul': 'Jul', 'Aug': 'Aug',
      'Sep': 'Sep', 'Oct': 'Okt', 'Nov': 'Nov', 'Dec': 'Dez'
    };
    return map[engMonth] || engMonth;
  };

  if (showFlowPreview && selectedReg) {
    if (!forceWizardMode && (selectedReg.id === 'reg-bauma2028' || selectedReg.title.toLowerCase().includes('bauma 2028'))) {
      return (
        <CoordinatorOverview
          language={language}
          theme={theme}
          onBack={() => {
            setShowFlowPreview(false);
            setSelectedReg(null);
          }}
          triggerToast={(msg) => {
            // CoordinatorOverview handles its own toasts but if parent ever wants to catch, it can.
          }}
          onRedirectToForm={() => {
            setForceWizardMode(true);
          }}
        />
      );
    }

    return (
      <RegistrationWizard
        language={language}
        registration={selectedReg}
        userName={userName}
        theme={theme}
        onClose={() => {
          setForceWizardMode(false);
          setShowFlowPreview(false);
          setSelectedReg(null);
        }}
        onComplete={(regId) => {
          setForceWizardMode(false);
          setLocalRegs(prev => prev.map(r => r.id === regId ? { ...r, status: 'registered' } : r));
          setShowFlowPreview(false);
          setSelectedReg(null);
        }}
      />
    );
  }

  return (
    <div id="registrations-dashboard" className="w-full max-w-6xl mx-auto px-4 py-8 md:py-12 animate-fade-in text-left">
      
      {/* Premium consolidated container card ensuring perfect readability over the background image */}
      <div className="w-full bg-[#FAFAFC] rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] border border-zinc-200/55 p-6 sm:p-8 md:p-10 transition-all duration-300">
        
        {/* Page Title Header block matching inspiration cleanly */}
        <div className="flex items-center justify-between gap-4 mb-10 select-none pb-4 border-b border-slate-200/60">
          <div>
            <h1 className="text-[#0F172A] font-extrabold text-3xl tracking-tight font-sans leading-none">
              {t.registrations.title}
            </h1>
          </div>
        </div>

        {/* RENDER CHRONOLOGICAL TIMELINE VIEW */}
        <div className="relative pl-1 pr-1 py-4 select-none">
          {sortedRegs.length > 0 ? (
            <div className="flex flex-col">
              {sortedRegs.map((reg) => {
                const { day, month, year } = getEventTimelineParts(reg);
                const isNotRegistered = reg.status === 'not_registered';
                const isIncomplete = reg.status === 'incomplete';
                const isRegistered = reg.status === 'registered';

                return (
                  <div key={reg.id} className="flex items-stretch group relative animate-fade-in">
                    
                    {/* 1. Left Column: Date and Year of the trade show without weekday */}
                    <div className="w-[80px] sm:w-[110px] pr-3 sm:pr-5 flex flex-col justify-start pt-5 text-right select-none shrink-0 font-sans">
                      <span className="font-extrabold text-[15px] sm:text-lg text-slate-900 tracking-tight leading-none group-hover:text-[#f89728] transition-colors uppercase">
                        {day} {getLocalizedMonth(month)}
                      </span>
                      <span className="text-[11px] font-bold text-slate-500 font-mono tracking-wider mt-1.5 leading-none">
                        {year}
                      </span>
                    </div>

                    {/* 2. Middle Column: Vertical Timeline Track & Colored anchor status connector dots */}
                    <div className="w-10 relative flex justify-center shrink-0">
                      {/* Grey Timeline bar segment */}
                      <div className="absolute top-0 bottom-0 w-[2px] bg-slate-200 group-last:bottom-auto group-last:h-12" />
                      
                      {/* Center State Dot Badge with color feedback indicator */}
                      <div className={`absolute top-[21px] w-3 h-3 rounded-full border-2 border-white shadow-sm transition-all duration-300 z-10 
                        ${isRegistered ? 'bg-emerald-500 scale-110 ring-4 ring-emerald-500/10' : ''}
                        ${isIncomplete ? 'bg-amber-500 scale-110 ring-4 ring-amber-500/10' : ''}
                        ${isNotRegistered ? 'bg-zinc-400 ring-4 ring-zinc-400/10' : ''}
                      `} />
                    </div>

                    {/* 3. Right Column: Neat rounded Card wrapping details on the right */}
                    <div className="flex-1 pb-8">
                      <div className="bg-white border border-[#CBD5E1]/75 rounded-2xl p-4.5 sm:p-6 shadow-3xs hover:shadow-premium hover:border-[#f89728]/30 hover:translate-y-[-1.5px] transition-all duration-350 flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
                        
                        {/* Left Side Group: Logo on the left side, then details */}
                        <div className="flex-1 min-w-0 flex items-start gap-4 sm:gap-5 text-left">
                          {/* Beautifully placed event image on the far left */}
                          {reg.imageUrl && (
                            <div className="shrink-0 relative w-[48px] h-[48px] sm:w-[60px] sm:h-[60px] rounded-xl overflow-hidden border border-zinc-200/50 shadow-3xs select-none hover:scale-105 transition-transform duration-200 bg-slate-50">
                              <img
                                src={reg.imageUrl}
                                alt={reg.title}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}

                          <div className="flex-1 min-w-0 space-y-2">
                            {/* Top Badges row */}
                            <div className="flex flex-wrap items-center gap-2 select-none">
                              {/* Status Tag */}
                              {isNotRegistered && (
                                <span className="inline-flex items-center gap-1.5 bg-rose-50 border border-rose-100 text-[9.5px] font-bold text-rose-700 px-3 py-0.5 rounded-md uppercase tracking-wider font-mono">
                                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                  <span>{t.registrations.notRegistered}</span>
                                </span>
                              )}
                              {isIncomplete && (
                                <span className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-100 text-[9.5px] font-bold text-amber-800 px-3 py-0.5 rounded-md uppercase tracking-wider font-mono">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                  <span>{t.registrations.incomplete}</span>
                                </span>
                              )}
                              {isRegistered && (
                                <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 text-[9.5px] font-bold text-emerald-800 px-3 py-0.5 rounded-md uppercase tracking-wider font-mono">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                  <span>{t.registrations.registered}</span>
                                </span>
                              )}

                              {/* TEST Tag */}
                              {reg.isTest && (
                                <span className="inline-flex items-center bg-slate-50 border border-slate-200 text-[9.5px] font-bold text-slate-500 px-2.5 py-0.5 rounded-md uppercase tracking-wider font-mono">
                                  <span>{t.registrations.testBadge}</span>
                                </span>
                              )}

                              {/* Custom label tag */}
                              {reg.customText && (
                                <span className="inline-flex items-center bg-orange-50/70 border border-orange-100 text-[9.5px] font-bold text-[#f89728] px-2.5 py-0.5 rounded-md uppercase tracking-wider font-mono font-medium">
                                  <span>{reg.customText}</span>
                                </span>
                              )}
                            </div>

                            {/* Event trade show bold name */}
                            <h4 className="font-sans font-extrabold text-slate-900 text-[15px] sm:text-[17px] tracking-tight group-hover:text-[#f89728] leading-snug transition-colors break-words">
                              {reg.title}
                            </h4>

                            {/* Date and Location Coordinates details */}
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] sm:text-xs text-slate-500 font-sans">
                              <div className="flex items-center gap-1.5 text-slate-500 font-mono font-medium">
                                <Calendar size={13} className="text-[#f89728]/80 shrink-0 stroke-[2.2]" />
                                <span>{reg.dateRange || "No dates scheduled"}</span>
                              </div>
                              <span className="text-slate-200 hidden sm:inline select-none">|</span>
                              <div className="flex items-center gap-1.5 text-slate-500 font-medium truncate max-w-[200px] sm:max-w-xs">
                                <MapPin size={13} className="text-[#f89728]/80 shrink-0 stroke-[2.2]" />
                                <span>{language === 'de' && reg.location.includes('Munich') ? reg.location.replace('Munich', 'München') : reg.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right Section: Action CTA Button with rounded-lg radius */}
                        <div className="flex items-center shrink-0 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-100/75 self-end md:self-center justify-end">
                          <div className="shrink-0">
                            {isNotRegistered ? (
                              <button
                                type="button"
                                onClick={() => handleEditClick(reg)}
                                className="w-28 h-10 bg-[#f89728] hover:bg-[#df7e10] active:scale-[0.98] text-white rounded-lg text-xs font-bold font-sans transition-all flex items-center justify-center gap-1 shadow-sm hover:shadow cursor-pointer select-none border border-transparent"
                              >
                                <span>{t.registrations.registerBtn}</span>
                                <ArrowRight size={13} className="stroke-[2.5]" />
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleEditClick(reg)}
                                className="w-28 h-10 border border-[#f89728]/80 hover:bg-[#f89728]/5 active:scale-[0.98] text-[#f89728] bg-white rounded-lg text-xs font-bold font-sans transition-all flex items-center justify-center gap-1 shadow-3xs hover:shadow-xs cursor-pointer select-none"
                              >
                                <span>{t.registrations.editBtn}</span>
                                <ArrowRight size={13} className="stroke-[2.5]" />
                              </button>
                            )}
                          </div>
                        </div>

                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-dashed border-slate-250 rounded-2xl">
              <Info size={40} className="text-slate-350 mx-auto mb-2" />
              <p className="text-slate-550 text-sm font-semibold max-w-sm mx-auto leading-relaxed font-sans">
                {t.registrations.noEvents}
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
