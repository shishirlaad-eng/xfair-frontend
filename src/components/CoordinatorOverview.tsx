import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, Edit2, Trash2, ChevronDown, ChevronUp, Users, Info,
  CheckCircle2, AlertTriangle, Mail, BookOpen, ShieldCheck, Check, Calendar,
  Globe, User, Sliders, Hotel, Plane
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';

const registrationGroupOptions = [
  { value: 'Please select', label: 'Please select' },
  { value: 'Add New Employee (Appointment)', label: 'Add New Employee (Appointment)' },
  { value: 'Add New Visitor (Appointment)', label: 'Add New Visitor (Appointment)' },
  { value: 'New Registration', label: 'New Registration' },
  { value: 'Survey 2026', label: 'Survey 2026' },
  { value: 'Visitor Registration 2028', label: 'Visitor Registration 2028' },
  { value: 'Employee Registration 2028', label: 'Employee Registration 2028' },
];

function CustomSelectModal({
  value,
  onChange,
  options
}: {
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(o => o.value === value);

  return (
    <div ref={containerRef} className={`relative w-full ${isOpen ? 'z-50' : 'z-10'}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between bg-white border rounded-lg px-3.5 py-2.5 text-sm text-zinc-905 font-bold outline-none transition-all cursor-pointer h-11 text-left ${
          isOpen ? 'border-[#f89728] ring-2 ring-[#f89728]/10' : 'border-zinc-200 hover:border-[#f89728]/60'
        }`}
      >
        <span className={selectedOption && selectedOption.value !== 'Please select' ? 'text-zinc-900 font-semibold' : 'text-zinc-400 font-medium'}>
          {selectedOption ? selectedOption.label : 'Please select'}
        </span>
        <ChevronDown 
          size={16} 
          className={`text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#f89728]' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-1.5 bg-white border border-zinc-200 rounded-xl shadow-lg py-1.5 z-50 origin-top max-h-60 overflow-y-auto">
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                  isSelected 
                    ? 'bg-[#f89728] text-white' 
                    : 'text-zinc-700 hover:bg-orange-50/70 hover:text-[#f89728]'
                }`}
              >
                <span>{option.label}</span>
                {isSelected && <Check size={14} className="stroke-[2.5]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface CoordinatorOverviewProps {
  language: Language;
  onBack: () => void;
  triggerToast: (msg: string) => void;
  theme?: 'option1' | 'option2';
  onRedirectToForm?: () => void;
}

interface Worker {
  id: string;
  firstName: string;
  lastName: string;
  company: string;
  status: 'Registered' | 'Incomplete' | 'Not Registered';
  registrationGroup: string;
}

export function CoordinatorOverview({ language, onBack, triggerToast, theme, onRedirectToForm }: CoordinatorOverviewProps) {
  const t = TRANSLATIONS[language];

  // 1. Interactive States for Expandable Sections
  const [canadaExpanded, setCanadaExpanded] = useState(false);
  const [indiaExpanded, setIndiaExpanded] = useState(false);
  const [xfairExpanded, setXfairExpanded] = useState(true);
  const [employeePersonExpanded, setEmployeePersonExpanded] = useState(true);

  // 2. Active Imprint/Privacy Policy Overlay State
  const [activePolicy, setActivePolicy] = useState<'none' | 'imprint' | 'privacy'>('none');

  // 3. Central Reactive Source of Truth for Workers of XFAIR GmbH
  const [xfairWorkers, setXfairWorkers] = useState<Worker[]>([
    { id: 'w-1', firstName: 'Sergey', lastName: 'Cherniavsky', company: 'XFAIR GmbH', status: 'Registered', registrationGroup: 'Employee Registration 2028' },
    { id: 'w-2', firstName: 'Arslan Anwar', lastName: 'Khawaja', company: 'XFAIR GmbH', status: 'Registered', registrationGroup: 'Employee Registration 2028' },
    { id: 'w-3', firstName: 'John', lastName: 'Smith', company: 'XFAIR GmbH', status: 'Incomplete', registrationGroup: 'Employee Registration 2028' },
    { id: 'w-4', firstName: 'Rajashree', lastName: 'Swain', company: 'XFAIR GmbH', status: 'Registered', registrationGroup: 'Employee Registration 2028' },
    { id: 'w-5', firstName: 'Steven', lastName: 'Terry', company: 'XFAIR GmbH', status: 'Registered', registrationGroup: 'Employee Registration 2028' },
  ]);

  // 4. Central State for "Person" Section (Employee 3)
  const [personWorkers, setPersonWorkers] = useState<Worker[]>([
    { id: 'p-1', firstName: 'SP', lastName: 'Rajashree', company: '—', status: 'Incomplete', registrationGroup: 'New Registration' },
    { id: 'p-2', firstName: 'John', lastName: 'Smith', company: 'XFAIR GmbH', status: 'Incomplete', registrationGroup: 'Employee Registration 2028' },
    { id: 'p-3', firstName: 'Rajashree', lastName: 'Swain', company: 'XFAIR GmbH', status: 'Registered', registrationGroup: 'Employee Registration 2028' },
  ]);

  // 5. Popup Modal State for New/Edit Person
  const [showPersonModal, setShowPersonModal] = useState(false);
  const [editingMode, setEditingMode] = useState<false | 'company' | 'person'>(false);
  const [selectedWorkerId, setSelectedWorkerId] = useState<string | null>(null);

  // Form Fields State
  const [formRegGroup, setFormRegGroup] = useState('Please select');
  const [formFirstName, setFormFirstName] = useState('');
  const [formLastName, setFormLastName] = useState('');
  const [formEmail, setFormEmail] = useState('');

  // Dummy error helper
  const [formError, setFormError] = useState('');

  // 6. Action: Delete a worker from Company
  const handleDeleteCompanyWorker = (id: string, name: string) => {
    if (confirm(language === 'de' ? `Soll ${name} wirklich gelöscht werden?` : `Are you sure you want to delete ${name}?`)) {
      setXfairWorkers(prev => prev.filter(w => w.id !== id));
      // Also update person list if there is a matching John Smith or Rajashree Swain
      setPersonWorkers(prev => prev.filter(w => !(w.company === 'XFAIR GmbH' && w.firstName === name.split(' ')[0])));
      triggerToast(language === 'de' ? `${name} erfolgreich gelöscht.` : `${name} deleted successfully.`);
    }
  };

  // Action: Delete a worker from the Person list
  const handleDeletePersonWorker = (id: string, name: string) => {
    if (confirm(language === 'de' ? `Soll ${name} aus der Personenliste gelöscht werden?` : `Are you sure you want to delete ${name} from the person list?`)) {
      setPersonWorkers(prev => prev.filter(w => w.id !== id));
      triggerToast(language === 'de' ? `${name} aus der Personenliste gelöscht.` : `${name} removed from person list.`);
    }
  };

  // Open modal for Creating a New Person in XFAIR
  const handleOpenCreateModal = () => {
    setEditingMode(false);
    setSelectedWorkerId(null);
    setFormRegGroup('Please select');
    setFormFirstName('');
    setFormLastName('');
    setFormEmail('');
    setFormError('');
    setShowPersonModal(true);
  };

  // Open modal for Editing a Custom Company Worker
  const handleOpenEditCompanyModal = (worker: Worker) => {
    setEditingMode('company');
    setSelectedWorkerId(worker.id);
    setFormRegGroup(worker.registrationGroup);
    setFormFirstName(worker.firstName);
    setFormLastName(worker.lastName);
    setFormEmail(worker.firstName.toLowerCase() + '.' + worker.lastName.toLowerCase() + '@xfair.com');
    setFormError('');
    setShowPersonModal(true);
  };

  // Open modal for Editing a Custom Person Worker
  const handleOpenEditPersonModal = (worker: Worker) => {
    setEditingMode('person');
    setSelectedWorkerId(worker.id);
    setFormRegGroup(worker.registrationGroup);
    setFormFirstName(worker.firstName);
    setFormLastName(worker.lastName);
    setFormEmail(worker.firstName.toLowerCase() + '.' + worker.lastName.toLowerCase() + '@xfair.com');
    setFormError('');
    setShowPersonModal(true);
  };

  // Autocomplete functional dummy email event triggers
  const handleFillDummyEmail = () => {
    setFormEmail('dummy@xfair.com');
    triggerToast(language === 'de' ? 'Dummy-E-Mail eingetragen!' : 'Filled with dummy@xfair.com!');
  };

  // Submit Logic (inserting or updating state)
  const handleSavePerson = (e: React.FormEvent) => {
    e.preventDefault();

    if (formRegGroup === 'Please select') {
      setFormError(language === 'de' ? 'Bitte wählen Sie eine Registrierungsgruppe.' : 'Please select a registration group.');
      return;
    }
    if (!formFirstName.trim() || !formLastName.trim()) {
      setFormError(language === 'de' ? 'Vor- und Nachname sind erforderlich.' : 'First name and Last name are required.');
      return;
    }
    if (!formEmail.trim() || !formEmail.includes('@')) {
      setFormError(language === 'de' ? 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' : 'Please enter a valid email address.');
      return;
    }

    const fullName = `${formFirstName} ${formLastName}`.trim();

    if (editingMode === 'company' && selectedWorkerId) {
      // Modify company worker data
      setXfairWorkers(prev => prev.map(w => w.id === selectedWorkerId ? {
        ...w,
        firstName: formFirstName.trim(),
        lastName: formLastName.trim(),
        registrationGroup: formRegGroup
      } : w));
      // Sync to person list as well
      setPersonWorkers(prev => prev.map(p => p.id === selectedWorkerId || (p.company === 'XFAIR GmbH' && p.lastName === formLastName) ? {
        ...p,
        firstName: formFirstName.trim(),
        lastName: formLastName.trim(),
        registrationGroup: formRegGroup
      } : p));
      triggerToast(language === 'de' ? `${fullName} erfolgreich aktualisiert.` : `${fullName} updated successfully.`);
    } else if (editingMode === 'person' && selectedWorkerId) {
      // Modify person worker data
      setPersonWorkers(prev => prev.map(w => w.id === selectedWorkerId ? {
        ...w,
        firstName: formFirstName.trim(),
        lastName: formLastName.trim(),
        registrationGroup: formRegGroup
      } : w));
      triggerToast(language === 'de' ? `Person ${fullName} aktualisiert.` : `Person ${fullName} updated.`);
    } else {
      // Create New Person for XFAIR GmbH list
      const newId = `w-new-${Date.now()}`;
      const newWorker: Worker = {
        id: newId,
        firstName: formFirstName.trim(),
        lastName: formLastName.trim(),
        company: 'XFAIR GmbH',
        status: 'Registered', // defaults to Registered for immediate simulation satisfaction
        registrationGroup: formRegGroup
      };
      setXfairWorkers(prev => [...prev, newWorker]);

      // If registered or added, let's also auto-populate person list to make the app outstandingly interactive!
      if (formRegGroup.includes('Employee') || formRegGroup.includes('Registration')) {
        setPersonWorkers(prev => [...prev, newWorker]);
      }

      triggerToast(language === 'de' ? `${fullName} erfolgreich hinzugefügt.` : `${fullName} added successfully.`);
    }

    setShowPersonModal(false);
  };

  return (
    <div id="coordinator-container" className="w-full max-w-6xl mx-auto px-4 py-8 md:py-12 animate-fade-in text-left">
      
      {/* 1. Styled Premium Container Box wrapping all data sections cleanly */}
      <div className="w-full bg-[#FAFAFC] rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] border border-zinc-200/55 p-6 sm:p-8 md:p-10 transition-all duration-300">
        
        {/* 2. Top Header Title & Buttons Segment */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 mb-10 border-b border-slate-200/60 select-none">
          <div className="space-y-2">
            <h1 className="text-[#0F172A] font-extrabold text-3xl tracking-tight leading-none font-sans" id="coordinator-title-lbl">
              Coordinator overview
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm max-w-3xl leading-relaxed mt-2" id="coordinator-subtitle-lbl">
              Here you can register all employees of your company and administrate the data.<br />
              By clicking the icon „+“ a list of employees from your company will be displayed.
            </p>
          </div>

          {/* Right Outline Buttons Block */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button 
              onClick={() => triggerToast(language === 'de' ? 'Limits-Übersicht geöffnet' : 'Person Limits Overview window invoked')}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-350 hover:border-[#f89728] text-slate-755 hover:text-[#f89728] active:scale-[0.98] text-xs font-bold rounded-lg shadow-3xs transition-all cursor-pointer font-sans"
              title="Person Limits Overview"
            >
              <Sliders size={13} className="text-slate-800 shrink-0" />
              <span>Person Limits Overview</span>
            </button>
            <button 
              onClick={() => triggerToast(language === 'de' ? 'Sammelanforderungen Hotels geöffnet' : 'Bulk Hotel Requests window invoked')}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-350 hover:border-[#f89728] text-slate-755 hover:text-[#f89728] active:scale-[0.98] text-xs font-bold rounded-lg shadow-3xs transition-all cursor-pointer font-sans"
              title="Bulk Hotel Requests"
            >
              <Hotel size={13} className="text-slate-800 shrink-0" />
              <span>Bulk Hotel Requests</span>
            </button>
            <button 
              onClick={() => triggerToast(language === 'de' ? 'Sammelanforderungen Reisen geöffnet' : 'Bulk Travel requests window invoked')}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-350 hover:border-[#f89728] text-slate-755 hover:text-[#f89728] active:scale-[0.98] text-xs font-bold rounded-lg shadow-3xs transition-all cursor-pointer font-sans"
              title="Bulk Travel requests"
            >
              <Plane size={13} className="text-slate-800 shrink-0" />
              <span>Bulk Travel Requests</span>
            </button>
          </div>
        </div>

        {/* 3. SECTION: LIMIT OVERVIEW */}
        <section id="sec-limit-overview" className="mb-10 animate-fade-in">
          <div className="bg-white border border-zinc-200/95 rounded-2xl shadow-3xs transition-all hover:border-zinc-300/80">
            <div className="bg-[#FFFBF7] border-b border-[#FEE6D6] rounded-t-2xl px-5 py-3.5 flex items-center gap-3 select-none">
              <div className="w-7.5 h-7.5 rounded-lg bg-orange-100/40 flex items-center justify-center text-[#f89728] border border-orange-200/30 shrink-0">
                <CheckCircle2 size={15} className="stroke-[2.5]" />
              </div>
              <h5 className="font-sans font-bold text-sm text-slate-800">Limit overview</h5>
            </div>
            
            <div className="p-5 sm:p-6">
              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-3xs">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500">
                      <th className="py-3 px-4 text-xs font-bold text-slate-500 font-sans min-w-[120px]"></th>
                      <th className="py-3 px-4 text-xs font-bold text-slate-500 font-mono text-center">Afternoon 23rd Oct</th>
                      <th className="py-3 px-4 text-xs font-bold text-slate-500 font-mono text-center">Afternoon 24th Oct</th>
                      <th className="py-3 px-4 text-xs font-bold text-slate-500 font-mono text-center">Evening 23rd Oct</th>
                      <th className="py-3 px-4 text-xs font-bold text-slate-500 font-mono text-center">Evening 24th Oct</th>
                      <th className="py-3 px-4 text-xs font-bold text-slate-500 font-mono text-center">Morning 23rd Oct</th>
                      <th className="py-3 px-4 text-xs font-bold text-slate-500 font-mono text-center">Morning 24th Oct</th>
                      <th className="py-3 px-4 text-xs font-bold text-slate-500 font-mono text-center">Morning 25th Oct</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-center text-xs">
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-bold text-left font-sans text-slate-800 bg-slate-50/80">Contingent</td>
                      <td className="py-3 px-4 font-bold text-blue-650">10</td>
                      <td className="py-3 px-4 text-slate-400">0</td>
                      <td className="py-3 px-4 text-slate-400">0</td>
                      <td className="py-3 px-4 text-slate-400">0</td>
                      <td className="py-3 px-4 font-bold text-blue-650">10</td>
                      <td className="py-3 px-4 text-slate-400">0</td>
                      <td className="py-3 px-4 text-slate-400">0</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-bold text-left font-sans text-slate-800 bg-slate-50/80">Ordered</td>
                      <td className="py-3 px-4 text-slate-400">0</td>
                      <td className="py-3 px-4 text-slate-400">0</td>
                      <td className="py-3 px-4 text-slate-400">0</td>
                      <td className="py-3 px-4 text-slate-400">0</td>
                      <td className="py-3 px-4 text-slate-400">0</td>
                      <td className="py-3 px-4 text-slate-400">0</td>
                      <td className="py-3 px-4 text-slate-400">0</td>
                    </tr>
                    <tr className="bg-emerald-50 hover:bg-emerald-100 border-t border-emerald-200">
                      <td className="py-3 px-4 font-bold text-left font-sans text-emerald-950 bg-emerald-100/40">Available</td>
                      <td className="py-3 px-4 font-extrabold text-emerald-800">10</td>
                      <td className="py-3 px-4 text-slate-800 font-semibold">0</td>
                      <td className="py-3 px-4 text-slate-800 font-semibold">0</td>
                      <td className="py-3 px-4 text-slate-800 font-semibold">0</td>
                      <td className="py-3 px-4 font-extrabold text-emerald-800">10</td>
                      <td className="py-3 px-4 text-slate-800 font-semibold">0</td>
                      <td className="py-3 px-4 text-slate-800 font-semibold">0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* 4. SECTION: LIMIT PER DATE OVERVIEW */}
        <section id="sec-limit-date-overview" className="mb-10 animate-fade-in">
          <div className="bg-white border border-zinc-200/95 rounded-2xl shadow-3xs transition-all hover:border-zinc-300/80">
            <div className="bg-[#FFFBF7] border-b border-[#FEE6D6] rounded-t-2xl px-5 py-3.5 flex items-center gap-3 select-none">
              <div className="w-7.5 h-7.5 rounded-lg bg-orange-100/40 flex items-center justify-center text-[#f89728] border border-orange-200/30 shrink-0">
                <Calendar size={15} className="stroke-[2.5]" />
              </div>
              <h5 className="font-sans font-bold text-sm text-slate-800">Limit per date overview</h5>
            </div>
            
            <div className="p-5 sm:p-6">
              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-3xs">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-center text-xs font-bold text-slate-500">
                      <th className="py-3 px-4 text-xs font-bold text-slate-500 font-sans text-left min-w-[120px]"></th>
                      <th className="py-3 px-3 text-xs font-bold text-slate-500 font-mono">01 Mar</th>
                      <th className="py-3 px-3 text-xs font-bold text-slate-500 font-mono">02 Mar</th>
                      <th className="py-3 px-3 text-xs font-bold text-slate-500 font-mono">03 Mar</th>
                      <th className="py-3 px-3 text-xs font-bold text-slate-500 font-mono">04 Mar</th>
                      <th className="py-3 px-3 text-xs font-bold text-slate-500 font-mono">05 Mar</th>
                      <th className="py-3 px-3 text-xs font-bold text-slate-500 font-mono">06 Mar</th>
                      <th className="py-3 px-3 text-xs font-bold text-slate-500 font-mono">07 Mar</th>
                      <th className="py-3 px-3 text-xs font-bold text-slate-500 font-mono">08 Mar</th>
                      <th className="py-3 px-3 text-xs font-bold text-slate-500 font-mono">09 Mar</th>
                      <th className="py-3 px-3 text-xs font-bold text-slate-500 font-mono">10 Mar</th>
                      <th className="py-3 px-3 text-xs font-bold text-slate-500 font-mono">11 Mar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-center text-xs">
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-bold text-left font-sans text-slate-800 bg-slate-50/80">Contingent</td>
                      <td className="py-3 px-3 font-semibold text-slate-700">10</td>
                      <td className="py-3 px-3 font-semibold text-slate-700">10</td>
                      <td className="py-3 px-3 font-semibold text-slate-700">10</td>
                      <td className="py-3 px-3 font-semibold text-slate-700">1</td>
                      <td className="py-3 px-3 font-semibold text-slate-700">1</td>
                      <td className="py-3 px-3 font-semibold text-slate-700">1</td>
                      <td className="py-3 px-3 font-semibold text-slate-700">1</td>
                      <td className="py-3 px-3 font-semibold text-slate-700">1</td>
                      <td className="py-3 px-3 font-semibold text-slate-700">1</td>
                      <td className="py-3 px-3 font-semibold text-slate-700">1</td>
                      <td className="py-3 px-3 font-semibold text-slate-700">1</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-bold text-left font-sans text-slate-800 bg-slate-50/80">Ordered</td>
                      <td className="py-3 px-3 text-slate-700">1</td>
                      <td className="py-3 px-3 text-slate-700">1</td>
                      <td className="py-3 px-3 text-slate-700">1</td>
                      <td className="py-3 px-3 text-slate-700">1</td>
                      <td className="py-3 px-3 text-slate-700">1</td>
                      <td className="py-3 px-3 text-slate-700">1</td>
                      <td className="py-3 px-3 text-slate-700">1</td>
                      <td className="py-3 px-3 text-slate-700">1</td>
                      <td className="py-3 px-3 text-slate-700">1</td>
                      <td className="py-3 px-3 text-slate-700">1</td>
                      <td className="py-3 px-3 text-slate-700">1</td>
                    </tr>
                    <tr className="bg-emerald-50 hover:bg-emerald-100 border-t border-emerald-200">
                      <td className="py-3 px-4 font-bold text-left font-sans text-emerald-950 bg-emerald-100/40">Available</td>
                      <td className="py-3 px-3 font-extrabold text-emerald-800">9</td>
                      <td className="py-3 px-3 font-extrabold text-emerald-800">9</td>
                      <td className="py-3 px-3 font-extrabold text-emerald-800">9</td>
                      <td className="py-3 px-3 text-slate-800 font-semibold">1</td>
                      <td className="py-3 px-3 text-slate-800 font-semibold">1</td>
                      <td className="py-3 px-3 text-slate-800 font-semibold">1</td>
                      <td className="py-3 px-3 text-slate-800 font-semibold">1</td>
                      <td className="py-3 px-3 text-slate-800 font-semibold">1</td>
                      <td className="py-3 px-3 text-slate-800 font-semibold">1</td>
                      <td className="py-3 px-3 text-slate-800 font-semibold">1</td>
                      <td className="py-3 px-3 text-slate-800 font-semibold">1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* 5. SECTION: COUNTRY */}
        <section id="sec-country-block" className="mb-10 animate-fade-in">
          <div className="border border-[#FEE6D6] bg-white rounded-2xl overflow-hidden shadow-3xs hover:border-zinc-300/80">
            {/* Header styled exactly like Limit Overview */}
            <div className="bg-[#FFFBF7] border-b border-[#FEE6D6] rounded-t-2xl px-5 py-3.5 flex items-center gap-3 select-none">
              <div className="w-7.5 h-7.5 rounded-lg bg-orange-100/40 flex items-center justify-center text-[#f89728] border border-orange-200/30 shrink-0">
                <Globe size={15} className="stroke-[2.5]" />
              </div>
              <h5 className="font-sans font-bold text-sm text-slate-800">Country</h5>
            </div>

            <div className="p-5 sm:p-6 space-y-3">
              {/* Canada Dropdown (iconless) */}
              <div className="border border-slate-150 bg-white rounded-xl overflow-hidden shadow-3xs">
                <button
                  type="button"
                  onClick={() => setCanadaExpanded(!canadaExpanded)}
                  className="w-full px-5 py-4 flex items-center justify-between text-slate-800 font-bold text-sm bg-slate-50/50 hover:bg-slate-50 transition-colors focus:outline-none select-none cursor-pointer"
                >
                  <span className="font-sans font-semibold text-slate-700">Canada (0)</span>
                  {canadaExpanded ? <ChevronUp size={16} className="text-slate-450" /> : <ChevronDown size={16} className="text-slate-450" />}
                </button>
                {canadaExpanded && (
                  <div className="p-5 text-xs text-slate-400 border-t border-slate-150 text-center font-sans tracking-wide bg-slate-50/20">
                    No employee registrations stored under Canada directory.
                  </div>
                )}
              </div>

              {/* India Dropdown (iconless) */}
              <div className="border border-slate-150 bg-white rounded-xl overflow-hidden shadow-3xs">
                <button
                  type="button"
                  onClick={() => setIndiaExpanded(!indiaExpanded)}
                  className="w-full px-5 py-4 flex items-center justify-between text-slate-800 font-bold text-sm bg-slate-50/50 hover:bg-slate-50 transition-colors focus:outline-none select-none cursor-pointer"
                >
                  <span className="font-sans font-semibold text-slate-700">India (0)</span>
                  {indiaExpanded ? <ChevronUp size={16} className="text-slate-450" /> : <ChevronDown size={16} className="text-slate-450" />}
                </button>
                {indiaExpanded && (
                  <div className="p-5 text-xs text-slate-400 border-t border-slate-150 text-center font-sans tracking-wide bg-slate-50/20">
                    No employee registrations stored under India directory.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 6. SECTION: COMPANY */}
        <section id="sec-company-block" className="mb-10 animate-fade-in">
          <div className="border border-[#FEE6D6] bg-white rounded-2xl overflow-hidden shadow-3xs hover:border-zinc-300/80">
            {/* Header Accordion Bar styled like Limit Overview */}
            <button
              type="button"
              onClick={() => setXfairExpanded(!xfairExpanded)}
              className="w-full bg-[#FFFBF7] border-b border-[#FEE6D6] px-5 py-3.5 flex items-center justify-between select-none focus:outline-none cursor-pointer hover:bg-[#FFFBF7]/85 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-7.5 h-7.5 rounded-lg bg-orange-100/40 flex items-center justify-center text-[#f89728] border border-orange-200/30 shrink-0">
                  <Users size={15} className="stroke-[2.5]" />
                </div>
                <h5 className="font-sans font-bold text-sm text-slate-800">XFAIR GmbH ({xfairWorkers.length})</h5>
              </div>
              <div className="flex items-center select-none">
                {xfairExpanded ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-450" />}
              </div>
            </button>

            {/* Expanded Table Block */}
            {xfairExpanded && (
              <div className="p-4 sm:p-6 text-left">
                {/* Actions Toolbar - Containing "+New person" */}
                <div className="flex items-center justify-end mb-4 select-none">
                  <button
                    onClick={handleOpenCreateModal}
                    className="flex items-center gap-2 bg-[#f89728] hover:bg-[#df7e10] active:scale-[0.98] text-white px-4 py-2 text-xs font-bold rounded-lg shadow-sm font-sans cursor-pointer transition-all border border-transparent"
                    id="btn-add-new-person"
                  >
                    <Plus size={14} className="stroke-[2.5]" />
                    <span>New person</span>
                  </button>
                </div>

                {/* The Company Data Table styled in the theme */}
                {xfairWorkers.length > 0 ? (
                  <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-3xs">
                    <table className="w-full text-left border-collapse min-w-[650px]">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-bold font-sans">
                          <th className="py-3 px-4 w-[220px]">Name</th>
                          <th className="py-3 px-4 w-[150px]">Company</th>
                          <th className="py-3 px-4 w-[130px]">Status</th>
                          <th className="py-3 px-4">Registration group</th>
                          <th className="py-3 px-4 text-right w-[110px]">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                        {xfairWorkers.map((worker) => {
                          const isReg = worker.status === 'Registered';
                          const isIncomp = worker.status === 'Incomplete';
                          return (
                            <tr key={worker.id} className="hover:bg-slate-50/50 transition-colors font-sans">
                              {/* Name Cell */}
                              <td className="py-3.5 px-4 font-bold text-slate-900">
                                {worker.firstName} {worker.lastName}
                              </td>
                              {/* Company Cell */}
                              <td className="py-3.5 px-4 font-semibold text-slate-505">
                                {worker.company}
                              </td>
                              {/* Status Badge */}
                              <td className="py-3.5 px-4 select-none">
                                {isReg ? (
                                  <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-100 text-[9px] font-bold text-emerald-800 px-2.5 py-0.5 rounded-md font-mono uppercase tracking-wider">
                                    <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                    Registered
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-100 text-[9px] font-bold text-amber-800 px-2.5 py-0.5 rounded-md font-mono uppercase tracking-wider">
                                    <span className="w-1 h-1 rounded-full bg-amber-500" />
                                    Incomplete
                                  </span>
                                )}
                              </td>
                              {/* Registration Group / Event */}
                              <td className="py-3.5 px-4 text-slate-600 font-medium">
                                {worker.registrationGroup}
                              </td>
                              {/* Actions buttons */}
                              <td className="py-3.5 px-4 text-right select-none font-sans">
                                <div className="flex items-center justify-end gap-1.5 animate-none">
                                  <button
                                    onClick={() => onRedirectToForm && onRedirectToForm()}
                                    className="p-1.5 text-slate-500 hover:text-[#f89728] hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
                                    title="Edit worker registration"
                                  >
                                    <Edit2 size={13} className="stroke-[2.2]" />
                                  </button>
                                  <button
                                    disabled
                                    className="p-1.5 text-slate-350 cursor-not-allowed rounded-lg"
                                    title="Delete action is disabled currently"
                                  >
                                    <Trash2 size={13} className="stroke-[2.2] text-slate-300" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="py-10 text-center border-2 border-dashed border-[#FEE6D6]/40 rounded-xl bg-[#FFFBF7]/10">
                    <p className="text-slate-405 text-sm font-medium font-sans">
                      All employees deleted. Use "+New person" to append a brand-new administrator list.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* 7. SECTION: PERSON */}
        <section id="sec-person-block" className="mb-10 animate-fade-in">
          <div className="border border-[#FEE6D6] bg-white rounded-2xl overflow-hidden shadow-3xs hover:border-zinc-300/80">
            {/* Header Accordion Bar styled like Limit Overview */}
            <button
              type="button"
              onClick={() => setEmployeePersonExpanded(!employeePersonExpanded)}
              className="w-full bg-[#FFFBF7] border-b border-[#FEE6D6] px-5 py-3.5 flex items-center justify-between select-none focus:outline-none cursor-pointer hover:bg-[#FFFBF7]/85 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-7.5 h-7.5 rounded-lg bg-orange-100/40 flex items-center justify-center text-[#f89728] border border-orange-200/30 shrink-0">
                  <User size={15} className="stroke-[2.5]" />
                </div>
                <h5 className="font-sans font-bold text-sm text-slate-800">Person ({personWorkers.length})</h5>
              </div>
              <div className="flex items-center select-none">
                {employeePersonExpanded ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-450" />}
              </div>
            </button>

            {/* Body */}
            {employeePersonExpanded && (
              <div className="p-4 sm:p-6 text-left font-sans">
                {/* Actions Toolbar - Containing "+New person" */}
                <div className="flex items-center justify-end mb-4 select-none">
                  <button
                    onClick={handleOpenCreateModal}
                    className="flex items-center gap-2 bg-[#f89728] hover:bg-[#df7e10] active:scale-[0.98] text-white px-4 py-2 text-xs font-bold rounded-lg shadow-sm font-sans cursor-pointer transition-all border border-transparent"
                    id="btn-add-new-person-person"
                  >
                    <Plus size={14} className="stroke-[2.5]" />
                    <span>New person</span>
                  </button>
                </div>

                {personWorkers.length > 0 ? (
                  <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-3xs">
                    <table className="w-full text-left border-collapse min-w-[650px]">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-bold text-left font-sans">
                          <th className="py-3 px-4 w-[220px]">Name</th>
                          <th className="py-3 px-4 w-[150px]">Company</th>
                          <th className="py-3 px-4 w-[130px]">Status</th>
                          <th className="py-3 px-4">Registration group</th>
                          <th className="py-3 px-4 text-right w-[110px]">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                        {personWorkers.map((person) => {
                          const isReg = person.status === 'Registered';
                          const isIncomp = person.status === 'Incomplete';
                          return (
                            <tr key={person.id} className="hover:bg-slate-50/50 transition-colors">
                              {/* Name Cell */}
                              <td className="py-3.5 px-4 font-bold text-slate-900">
                                {person.firstName} {person.lastName}
                              </td>
                              {/* Company */}
                              <td className="py-3.5 px-4 font-semibold text-slate-505">
                                {person.company}
                              </td>
                              {/* Status */}
                              <td className="py-3.5 px-4 select-none">
                                {isReg ? (
                                  <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-100 text-[9px] font-bold text-emerald-800 px-2.5 py-0.5 rounded-md font-mono uppercase tracking-wider">
                                    <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                    Registered
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-100 text-[9px] font-bold text-amber-800 px-2.5 py-0.5 rounded-md font-mono uppercase tracking-wider">
                                    <span className="w-1 h-1 rounded-full bg-amber-500" />
                                    Incomplete
                                  </span>
                                )}
                              </td>
                              {/* Registration Group */}
                              <td className="py-3.5 px-4 text-slate-650 font-medium">
                                {person.registrationGroup}
                              </td>
                              {/* Action Buttons */}
                              <td className="py-3.5 px-4 text-right select-none">
                                <div className="flex items-center justify-end gap-1.5 animate-none">
                                  <button
                                    onClick={() => onRedirectToForm && onRedirectToForm()}
                                    className="p-1.5 text-slate-500 hover:text-[#f89728] hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
                                    title="Edit worker registration"
                                  >
                                    <Edit2 size={13} className="stroke-[2.2]" />
                                  </button>
                                  <button
                                    disabled
                                    className="p-1.5 text-slate-350 cursor-not-allowed rounded-lg"
                                    title="Delete action is disabled currently"
                                  >
                                    <Trash2 size={13} className="stroke-[2.2] text-slate-300" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="py-8 text-center border-2 border-dashed border-[#FEE6D6]/40 rounded-xl bg-[#FFFBF7]/10">
                    <p className="text-slate-400 text-xs font-semibold">
                      Person list is empty currently.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

      </div>

      {/* 8. IMITATED IMPlIED INNER FOOTER LINKS */}
      <div id="coordinator-footer" className="w-full text-center py-4 mt-8 text-[11px] text-slate-500 font-medium select-none flex items-center justify-center gap-6">
        <span className="font-semibold text-slate-400">
          {t.footer.imprintLabel}
        </span>
        <span className="text-slate-300">|</span>
        <span className="font-semibold text-slate-400">
          {t.footer.privacyLabel}
        </span>
      </div>

      {/* 9. THE INTERACTIVE "+NEW PERSON / EDIT" POPUP MODAL */}
      {showPersonModal && (
        <div id="modal-new-person-overlay" className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in font-sans">
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 text-left border border-slate-100 max-h-[90vh] overflow-visible relative animate-scale-up flex flex-col justify-start"
          >
            {/* Close Cross Button */}
            <button
              onClick={() => setShowPersonModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
            >
              ✕
            </button>

            {/* Popup Title Frame */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-lg tracking-tight leading-none">
                    {editingMode ? (editingMode === 'company' ? 'Edit person' : 'Edit person details') : 'New person'}
                  </h4>
                </div>
              </div>

              <form onSubmit={handleSavePerson} className="mt-5 space-y-4 relative">
                
                {/* Dropdown Field 'Registration Group' */}
                <div className="space-y-1.5 relative z-40" id="group-select-field">
                  <label className="block text-slate-600 text-xs font-bold font-sans">
                    Registration group
                  </label>
                  <div>
                    <CustomSelectModal
                      value={formRegGroup}
                      onChange={(val) => {
                        setFormRegGroup(val);
                        setFormError('');
                      }}
                      options={registrationGroupOptions}
                    />
                  </div>
                </div>

                {/* Selection gives 3 fields: First name, Last name, Email * visible ONLY when not 'Please select' */}
                {formRegGroup !== 'Please select' && (
                  <div className="space-y-4 border-t border-slate-100 pt-4 animate-fade-in relative z-10">
                  
                  {/* First Name Field */}
                  <div className="space-y-1">
                    <label className="block text-slate-600 text-xs font-bold font-sans">
                      First name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. John"
                      value={formFirstName}
                      onChange={(e) => {
                        setFormFirstName(e.target.value);
                        setFormError('');
                      }}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 text-zinc-900 font-semibold outline-none transition-all h-11"
                      required
                    />
                  </div>

                  {/* Last Name Field */}
                  <div className="space-y-1">
                    <label className="block text-slate-600 text-xs font-bold font-sans">
                      Last name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Smith"
                      value={formLastName}
                      onChange={(e) => {
                        setFormLastName(e.target.value);
                        setFormError('');
                      }}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 text-zinc-900 font-semibold outline-none transition-all h-11"
                      required
                    />
                  </div>

                  {/* Email Field with dummy email button below it */}
                  <div className="space-y-1 relative">
                    <label className="block text-slate-600 text-xs font-bold font-sans">
                      Email *
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. john.smith@company.com"
                      value={formEmail}
                      onChange={(e) => {
                        setFormEmail(e.target.value);
                        setFormError('');
                      }}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 text-zinc-900 font-semibold outline-none transition-all h-11"
                      required
                    />

                    {/* Dummy email autofill loader widget */}
                    <div className="pt-2 select-none">
                      <button
                        type="button"
                        onClick={handleFillDummyEmail}
                        className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-205 text-slate-600 border border-slate-200 font-sans text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-md transition-colors cursor-pointer outline-none"
                      >
                        <Mail size={11} className="stroke-[2.2]" />
                        <span>Autofill dummy email</span>
                      </button>
                    </div>

                  </div>

                </div>
              )}

              {/* Error Label Panel */}
              {formError && (
                <div className="bg-rose-50 border border-rose-100/80 px-3 py-2 rounded-lg text-[11px] font-semibold text-rose-700 flex items-center gap-1.5 select-none font-sans">
                  <AlertTriangle size={12} className="stroke-[2.5]" />
                  <span>{formError}</span>
                </div>
              )}

              {/* ACTION BUTTON CHEVROWS */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 text-xs select-none">
                <button
                  type="button"
                  onClick={() => setShowPersonModal(false)}
                  className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold px-4 py-2 rounded-lg transition-all cursor-pointer font-sans"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#f89728] hover:bg-[#df7e10] active:scale-[0.98] text-white font-bold px-4 py-2 rounded-lg shadow-sm transition-all cursor-pointer font-sans border border-transparent"
                >
                  Insert
                </button>
              </div>

            </form>
            </div>
          </div>
        </div>
      )}

      {/* 10. POLICY POPUP WINDOW OVERLAY (reproducing FooterLinks modals seamlessly) */}
      {activePolicy !== 'none' && (
        <div 
          onClick={() => setActivePolicy('none')}
          className="fixed inset-0 bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 text-left border border-slate-100 max-h-[80vh] overflow-y-auto relative animate-scale-up font-sans"
          >
            <button
              onClick={() => setActivePolicy('none')}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
            >
              ✕
            </button>

            {activePolicy === 'imprint' ? (
              <div id="imprint-content">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-[#f39200] mb-3">
                  <BookOpen size={20} />
                </div>
                <h4 className="font-display font-semibold text-slate-900 text-base mb-2">{t.footer.imprintTitle}</h4>
                <div className="text-slate-500 text-xs space-y-2 mt-3 leading-relaxed font-sans">
                  <p><strong>xfair.com GmbH</strong></p>
                  <p>Elisabeth-Schiemann-Bogen 1<br />85716 Unterschleißheim, Germany</p>
                  <p><strong>{t.footer.managingDirectors}</strong><br />Markus Terry, John Doe</p>
                  <p><strong>{t.footer.contact}</strong><br />{t.footer.phone} +49 (0) 89 19096820<br />Email: info@xfair.com</p>
                  <p><strong>{t.footer.registerEntry}</strong><br />{t.footer.registryCourt} Munich District Court<br />{t.footer.registrationNumber} HRB 148292<br />{t.footer.vatLabel} DE 813928192</p>
                </div>
              </div>
            ) : (
              <div id="privacy-content">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-[#f39200] mb-3">
                  <ShieldCheck size={20} />
                </div>
                <h4 className="font-display font-semibold text-slate-900 text-base mb-2">{t.footer.privacyTitle}</h4>
                <div className="text-slate-500 text-xs space-y-3 mt-3 leading-relaxed font-sans">
                  <p>{t.footer.privacyP1}</p>
                  <p><strong>{t.footer.privacyInfoColl}</strong><br />{t.footer.privacyInfoCollText}</p>
                  <p><strong>{t.footer.privacyRights}</strong><br />{t.footer.privacyRightsText}</p>
                </div>
              </div>
            )}

            <button
              onClick={() => setActivePolicy('none')}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2.5 rounded-lg mt-5 transition-all cursor-pointer font-sans"
            >
              {t.footer.closeBtn}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
