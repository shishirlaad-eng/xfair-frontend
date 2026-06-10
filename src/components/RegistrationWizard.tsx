import React, { useState, useRef, useEffect } from 'react';
import { 
  User, ShieldCheck, Mail, Phone, Calendar, MapPin, BookOpen,
  Upload, Trash2, ArrowLeft, ArrowRight, Check, CheckCircle2, 
  AlertTriangle, Building, Languages, HelpCircle, Hotel, Plus, 
  Download, FileText, ChevronLeft, ChevronRight, CheckSquare, Square,
  X, Info, Clock, AlertCircle, ChevronDown
} from 'lucide-react';
import { Registration, Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface RegistrationWizardProps {
  language: Language;
  registration: Registration;
  userName: string;
  onClose: () => void;
  onComplete: (regId: string) => void;
  theme?: 'option1' | 'option2';
}

// Predefined set of languages with flag emojis for Step 4
const LANGUAGES_LIST = [
  { code: 'bg', name: 'Bulgarian', flag: '🇧🇬' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'ua', name: 'Ukrainian', flag: '🇺🇦' },
  { code: 'fi', name: 'Finnish', flag: '🇫🇮' },
  { code: 'no', name: 'Norwegian', flag: '🇳🇴' },
  { code: 'pl', name: 'Polish', flag: '🇵🇱' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'ro', name: 'Romanian', flag: '🇷🇴' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'jp', name: 'Japanese', flag: '🇯🇵' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
  { code: 'se', name: 'Swedish', flag: '🇸🇪' },
  { code: 'dk', name: 'Danish', flag: '🇩🇰' },
  { code: 'gr', name: 'Greek', flag: '🇬🇷' }
];

// Predefined hot list for Step 6 (Hotel Request)
const HOTEL_OPTIONS = [
  { id: 'h1', name: 'Fairside View Plaza Munich', stars: '4★', distance: '0.4 km from Messe' },
  { id: 'h2', name: 'Novotel München Messe', stars: '4★', distance: '0.2 km from Messe' },
  { id: 'h3', name: 'H4 Hotel München Messe', stars: '4.5★', distance: '0.3 km from Messe' },
  { id: 'h4', name: 'B&B Hotel München Messe', stars: '3★', distance: '1.2 km from Messe' }
];

// Mock cartoon avatar options
const AVATAR_TEMPLATES = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
  // Caricature option placeholder - we can use an inline premium vector SVG instead for Steven Terry
];

// Custom styled select dropdown to match the luxury/brand theme with precise hover & open states
function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Select an option"
}: {
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
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
        className={`w-full flex items-center justify-between bg-white border rounded-lg px-3 py-2.5 text-[15px] text-zinc-900 font-semibold outline-none transition-all cursor-pointer h-11 text-left ${
          isOpen ? 'border-[#f89728] ring-2 ring-[#f89728]/10' : 'border-zinc-200 hover:border-[#f89728]/60'
        }`}
      >
        <span className={selectedOption ? 'text-zinc-900' : 'text-zinc-400 font-medium'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown 
          size={16} 
          className={`text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#f89728]' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-1.5 bg-white border border-zinc-200 rounded-lg shadow-lg py-1.5 z-50 animate-slide-down origin-top max-h-60 overflow-y-auto">
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
                    : 'text-zinc-700 hover:bg-orange-50 hover:text-[#f89728]'
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

// Custom styled select for attendance start/end times with interactive light orange hover behavior
function TimeSelect({
  value,
  onChange,
  disabled,
  options
}: {
  value: string;
  onChange: (val: string) => void;
  disabled: boolean;
  options: string[];
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

  return (
    <div ref={containerRef} className="relative inline-block text-left z-20">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white border border-slate-200 hover:border-orange-300 rounded px-2.5 py-1 text-xs text-slate-700 font-semibold focus:outline-none flex items-center gap-1.5 transition-all select-none cursor-pointer disabled:bg-slate-50 disabled:text-slate-400 disabled:border-slate-100 disabled:cursor-not-allowed justify-between h-8 min-w-[92px]"
      >
        <span>{value}</span>
        <ChevronDown size={12} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-[#f89728]' : ''}`} />
      </button>

      {isOpen && !disabled && (
        <div className="absolute right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50 min-w-[100px] animate-slide-down origin-top-right overflow-hidden">
          {options.map((opt) => {
            const isSelected = opt === value;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer block ${
                  isSelected 
                    ? 'bg-[#f89728] text-white' 
                    : 'text-slate-700 hover:bg-orange-50 hover:text-[#f89728]'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

const formatDateDMY = (dateStr: string) => {
  if (!dateStr) return '—';
  // If the format is already dd/mm/yyyy, return it
  if (dateStr.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
    return dateStr;
  }
  // If the format is yyyy-mm-dd
  if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y}`;
  }
  return dateStr;
};

export function RegistrationWizard({
  language,
  registration,
  userName,
  onClose,
  onComplete,
  theme
}: RegistrationWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [activePolicy, setActivePolicy] = useState<'none' | 'imprint' | 'privacy'>('none');
  const [stepperLayout, setStepperLayout] = useState<'horizontal' | 'vertical'>('horizontal');

  const t = TRANSLATIONS[language || 'en'];

  const getLocalizedDayOfWeek = (dayName: string) => {
    if (language !== 'de') return dayName;
    const map: { [key: string]: string } = {
      'Sunday': 'Sonntag',
      'Monday': 'Montag',
      'Tuesday': 'Dienstag',
      'Wednesday': 'Mittwoch',
      'Thursday': 'Donnerstag',
      'Friday': 'Freitag',
      'Saturday': 'Samstag'
    };
    return map[dayName] || dayName;
  };

  // Define Steps
  const steps = t.wizard.steps;

  const [stepperStartIndex, setStepperStartIndex] = useState(0);

  const lastStepRef = useRef(currentStep);
  useEffect(() => {
    if (lastStepRef.current !== currentStep) {
      lastStepRef.current = currentStep;
      // Auto-align window to fit currentStep if it moves out of current visible index range
      if (currentStep < stepperStartIndex || currentStep >= stepperStartIndex + 6) {
        const targetStart = Math.max(0, Math.min(6, Math.floor(currentStep / 3) * 3));
        setStepperStartIndex(targetStart);
      }
    }
  }, [currentStep, stepperStartIndex]);

  // Helper to determine which steps are visible in horizontal/vertical layout
  const getVisibleSteps = () => {
    const visible: number[] = [];
    for (let i = 0; i < 6; i++) {
      const idx = stepperStartIndex + i;
      if (idx < steps.length) {
        visible.push(idx);
      }
    }
    return visible;
  };

  const handleStepperPrev = () => {
    setStepperStartIndex(prev => Math.max(0, prev - 3));
  };

  const handleStepperNext = () => {
    setStepperStartIndex(prev => Math.min(6, prev + 3));
  };

  // Step 5: Personal Calendar State
  const [personalCalendar, setPersonalCalendar] = useState([
    { id: 'cal-1', time: 'Monday 22/06/2026, 10:00 AM', title: 'Opening Ceremony & Keynote Address', category: 'Keynote', selected: true },
    { id: 'cal-2', time: 'Monday 22/06/2026, 02:00 PM', title: 'Sustainable Heavy Industry Technology Panel', category: 'Panel Discussion', selected: false },
    { id: 'cal-3', time: 'Tuesday 23/06/2026, 11:30 AM', title: 'XFAIR Exhibitor Strategy Briefing', category: 'Briefing', selected: true },
    { id: 'cal-4', time: 'Wednesday 24/06/2026, 04:00 PM', title: 'Networking Reception & Dinner Gala', category: 'Social Event', selected: false }
  ]);

  // Step 6: Accompanying Person State
  const [accompanyingPerson, setAccompanyingPerson] = useState({
    hasCompanion: false,
    name: '',
    email: '',
    relation: 'Co-worker / Associate',
    badgeType: 'Guest'
  });

  // Step 7: Postcode Range State
  const [postcodeRange, setPostcodeRange] = useState({
    startCode: '80331',
    endCode: '81929',
    regionName: 'Bavaria (Süd/München)'
  });

  // Step 8: Travel State
  const [travelMode, setTravelMode] = useState({
    type: 'Train', // Train, Flight, Private Car, Public Transport
    departureCity: 'Berlin',
    arrivalDate: '2026-06-21',
    carbonOffset: true
  });

  // Step 9: Orders State
  const [exhibitorPassesCount, setExhibitorPassesCount] = useState(2);
  const [cateringVouchersCount, setCateringVouchersCount] = useState(5);
  const [galaDinnerTicketsCount, setGalaDinnerTicketsCount] = useState(1);

  // Step 10: Deputies State
  const [deputiesState, setDeputiesState] = useState({
    hasDeputy: false,
    name: '',
    email: '',
    mobile: ''
  });

  // Global State for all stages
  // Step 1: Personal Data
  const [personalData, setPersonalData] = useState({
    privacyAgreed: true,
    salutation: 'Mr.',
    title: 'None',
    firstName: userName.split(' ')[0] || 'John',
    lastName: userName.split(' ')[1] || 'Doe',
    email: 'steven.terry@xfair.com',
    position: 'Head of software development',
    mobile: '+49 17619096829',
    company: 'XFAIR GmbH',
    companyAddress: 'Elisabeth-Schiemann-Bogen 1, 85716, Unterschleißheim, Germany',
    contactLanguage: 'English (US)',
    telDialCode: '+49',
    telAreaCode: '89',
    telNumber: '19096820',
    mobileDialCode: '+49',
    mobileAreaCode: '176',
    mobileNumber: '19096829',
    approver: 'Gerhard Schroeder'
  });

  // Step 2: Picture Upload
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(
    // Initial cool caricature image style matching Steven Terry icon
    'sketch_default'
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Step 3: Attendance Days
  const [attendanceDays, setAttendanceDays] = useState([
    { id: 'd1', label: '21/06/2026', dayOfWeek: 'Sunday', checked: true, startTime: '08:00 AM', endTime: '06:00 PM' },
    { id: 'd2', label: '22/06/2026', dayOfWeek: 'Monday', checked: true, startTime: '08:00 AM', endTime: '06:00 PM' },
    { id: 'd3', label: '23/06/2026', dayOfWeek: 'Tuesday', checked: true, startTime: '09:00 AM', endTime: '05:00 PM' },
    { id: 'd4', label: '24/06/2026', dayOfWeek: 'Wednesday', checked: false, startTime: '08:00 AM', endTime: '06:00 PM' }
  ]);

  // Step 4: Spoken Languages
  const [spokenLanguages, setSpokenLanguages] = useState<string[]>(['bg', 'en']);
  const [motherTongue, setMotherTongue] = useState<string>('en');

  // Step 5: Meeting Rooms Agenda
  const [meetingDate, setMeetingDate] = useState('24/06/2026');
  // Representing rows for hours (8 AM - 1 PM) and columns for Meeting rooms (Meeting 1 - Meeting 5)
  // Initially some bookings exist to look authentic
  const [meetingBookings, setMeetingBookings] = useState<Record<string, { company: string, color: string }>>({
    '8AM-Meeting 1': { company: 'Caterpillar Europe', color: 'bg-rose-100 border-rose-300 text-rose-800' },
    '9AM-Meeting 2': { company: 'Zeppelin Power', color: 'bg-amber-100 border-amber-300 text-amber-800' },
    '9AM-Meeting 3': { company: 'Zeppelin Power', color: 'bg-amber-100 border-amber-300 text-amber-800' },
    '11AM-Meeting 1': { company: 'XFAIR GmbH', color: 'bg-orange-100 border-orange-300 text-orange-850' },
  });
  const [userMeetingHold, setUserMeetingHold] = useState<string | null>(null);

  // Step 6: Hotel bookings
  const [hotelNeeded, setHotelNeeded] = useState<'yes' | 'no'>('yes');
  const [hotelRequests, setHotelRequests] = useState<Array<{
    id: string;
    hotelId: string;
    roomType: string;
    checkIn: string;
    checkOut: string;
    status?: string;
    guestName?: string;
    smokingRoom?: boolean;
    breakfast?: boolean;
    earlyArrival?: string;
    lateDeparture?: string;
    comment?: string;
  }>>([
    { id: 'req-h1', hotelId: 'h2', roomType: 'Single Superior', checkIn: '2026-06-21', checkOut: '2026-06-24', status: 'Request', guestName: userName, smokingRoom: false, breakfast: true, earlyArrival: 'none', lateDeparture: 'none', comment: '' }
  ]);
  const [showAddHotelForm, setShowAddHotelForm] = useState(false);
  const [newHotelRequest, setNewHotelRequest] = useState({
    status: 'Request',
    hotelId: 'h1',
    roomType: 'Please select',
    checkIn: '2026-06-21',
    checkOut: '2026-06-24',
    guestName: '',
    smokingRoom: false,
    breakfast: false,
    earlyArrival: 'none',
    lateDeparture: 'none',
    comment: '',
    termsAccepted: false
  });

  const handleOpenAddHotelForm = () => {
    setNewHotelRequest({
      status: 'Request',
      hotelId: 'h1',
      roomType: 'Please select',
      checkIn: '2026-06-21',
      checkOut: '2026-06-24',
      guestName: userName || '',
      smokingRoom: false,
      breakfast: false,
      earlyArrival: 'none',
      lateDeparture: 'none',
      comment: '',
      termsAccepted: false
    });
    setShowAddHotelForm(true);
  };

  // Step 7: Downloads simulated state
  const [downloadedItems, setDownloadedItems] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Trigger brief alert toasts to simulate actual system feedback
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Navigations Handler
  const handleNext = () => {
    // Basic verification for step 1
    if (currentStep === 0 && !personalData.privacyAgreed) {
      triggerToast(t.wizard.alertPrivacy);
      return;
    }
    if (currentStep === 1) {
      triggerToast(t.wizard.alertLockedSteps);
      return;
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFinish = () => {
    triggerToast(t.wizard.alertSaving);
    setTimeout(() => {
      onComplete(registration.id);
    }, 1500);
  };

  // Step 2 Helper
  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setUploadedPhoto(uploadEvent.target.result as string);
          triggerToast('📸 Photo uploaded successfully!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Step 3 Helper (Attendance select all)
  const isAllDaysChecked = attendanceDays.every(d => d.checked);
  const handleToggleSelectAllDays = () => {
    const nextVal = !isAllDaysChecked;
    setAttendanceDays(attendanceDays.map(d => ({ ...d, checked: nextVal })));
    triggerToast(nextVal ? '📅 All attendance days selected' : '📅 Cleared all calendar selections');
  };

  const handleToggleDay = (id: string) => {
    setAttendanceDays(attendanceDays.map(d => d.id === id ? { ...d, checked: !d.checked } : d));
  };

  const handleUpdateTime = (id: string, type: 'start' | 'end', val: string) => {
    setAttendanceDays(attendanceDays.map(d => {
      if (d.id === id) {
        if (type === 'start') return { ...d, startTime: val };
        return { ...d, endTime: val };
      }
      return d;
    }));
  };

  // Step 4 Helper (Language Selection)
  const handleToggleLanguage = (langCode: string) => {
    if (spokenLanguages.includes(langCode)) {
      if (langCode === motherTongue) {
        // Find another language to be mother tongue
        const remaining = spokenLanguages.filter(l => l !== langCode);
        setMotherTongue(remaining[0] || 'en');
      }
      setSpokenLanguages(spokenLanguages.filter(l => l !== langCode));
    } else {
      setSpokenLanguages([...spokenLanguages, langCode]);
    }
  };

  // Step 5 Helper (Meeting booking scheduler cell toggle)
  const handleCellClick = (hour: string, roomLabel: string) => {
    const key = `${hour}-${roomLabel}`;
    // If it's already booked by someone else, can't touch
    if (meetingBookings[key] && meetingBookings[key].company !== 'John Doe (You)') {
      triggerToast(`🚫 This slot is booked by ${meetingBookings[key].company}`);
      return;
    }

    if (meetingBookings[key]) {
      // Remove booking
      const newBookings = { ...meetingBookings };
      delete newBookings[key];
      setMeetingBookings(newBookings);
      triggerToast(`🗑️ Removed meeting room booking at ${hour}`);
    } else {
      // Book slot
      setMeetingBookings({
        ...meetingBookings,
        [key]: { company: 'John Doe (You)', color: 'bg-emerald-100 border-emerald-300 text-emerald-850 font-bold' }
      });
      triggerToast(`✅ Booked reservation for ${roomLabel} at ${hour}`);
    }
  };

  // Step 6 Helper (Hotel requests admin)
  const handleAddHotelRequest = () => {
    if (!newHotelRequest.termsAccepted) {
      triggerToast('⚠️ You must accept the terms & conditions to continue.');
      return;
    }
    const req = {
      id: `req-${Date.now()}`,
      hotelId: newHotelRequest.hotelId,
      roomType: newHotelRequest.roomType,
      checkIn: newHotelRequest.checkIn,
      checkOut: newHotelRequest.checkOut,
      status: newHotelRequest.status,
      guestName: newHotelRequest.guestName,
      smokingRoom: newHotelRequest.smokingRoom,
      breakfast: newHotelRequest.breakfast,
      earlyArrival: newHotelRequest.earlyArrival,
      lateDeparture: newHotelRequest.lateDeparture,
      comment: newHotelRequest.comment
    };
    setHotelRequests([...hotelRequests, req]);
    setShowAddHotelForm(false);
    triggerToast('🏨 Hotel reservation request added to queue.');
  };

  const handleDeleteHotelRequest = (id: string) => {
    setHotelRequests(hotelRequests.filter(r => r.id !== id));
    triggerToast('🗑️ Hotel request deleted.');
  };

  // Step 7 Helpers
  const handleDownloadSimulate = (label: string) => {
    if (!downloadedItems.includes(label)) {
      setDownloadedItems([...downloadedItems, label]);
    }
    triggerToast(`📥 Downloading document: ${label}... (Completed)`);
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-transparent relative">
      <div id="registration-wizard-panel" className={`w-full flex-grow pt-1 pb-16 animate-fade-in ${
        theme === 'option2'
          ? 'max-w-6xl mx-auto px-4 sm:px-6 md:px-0'
          : 'max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16'
      }`}>
      
      {/* 1. Header with Title and Location Details of the Fair - Compacted */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between py-2 px-4 sm:px-6 bg-slate-50 border border-slate-200/80 rounded-t-xl select-none">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-slate-500 font-sans w-full">
          <h2 className="font-sans font-black text-slate-800 text-[13.5px] tracking-tight leading-tight select-none">
            {registration.title}
          </h2>
          <span className="text-zinc-300 hidden md:inline select-none">|</span>
          <span className="flex items-center gap-1 font-semibold text-slate-600">
            <Calendar size={12} className="text-[#f89728]" />
            <span>{registration.dateRange || '6/24/2026 - 7/1/2026'}</span>
          </span>
          <span className="text-zinc-300 hidden md:inline select-none">|</span>
          <span className="flex items-center gap-1 font-semibold text-slate-600">
            <MapPin size={12} className="text-[#f89728]" />
            <span>{registration.location || 'München, Germany'}</span>
          </span>
        </div>
      </div>

      {/* 2. Sleek Horizontal Connected Timeline Progress Indicator - Compacted */}
      {stepperLayout === 'horizontal' && (
        <div id="horizontal-stepper-view" className="bg-white py-3 px-3 md:py-4 md:px-5 relative select-none border-x border-b border-slate-200/80 rounded-b-xl flex flex-col gap-2">
          {/* Main Arrow & Steppers Row */}
          <div className="w-full flex items-center">
            
            {/* Left Arrow Button */}
            <button
              type="button"
              onClick={handleStepperPrev}
              disabled={stepperStartIndex === 0}
              className={`w-9 h-9 rounded-lg border transition-all duration-200 active:scale-95 flex items-center justify-center shrink-0 z-20 ${
                stepperStartIndex === 0
                  ? 'border-slate-100 text-slate-300 cursor-not-allowed opacity-30 bg-slate-50/50'
                  : 'border-[#f89728]/35 hover:border-[#f89728] text-[#f89728] bg-orange-50/10 hover:bg-orange-50 hover:shadow-3xs cursor-pointer'
              }`}
              title="Previous steps"
            >
              <ChevronLeft size={17} className="stroke-[2.5]" />
            </button>

            {/* Stepper Content Wrapper */}
            <div className="relative flex-1 mx-4 sm:mx-6 md:mx-8">
              
              {(() => {
                const hasLeftGhost = stepperStartIndex > 0;
                const hasRightGhost = stepperStartIndex + 6 < steps.length;
                let totalItems = 6;
                if (hasLeftGhost) totalItems += 1;
                if (hasRightGhost) totalItems += 1;

                const firstMainIdx = hasLeftGhost ? 1 : 0;
                const lastMainIdx = hasLeftGhost ? 6 : 5;

                const getPercent = (i: number) => {
                  if (totalItems <= 0) return 50;
                  return ((i + 0.5) / totalItems) * 100;
                };

                const currentMainIdx = firstMainIdx + (currentStep - stepperStartIndex);
                const progressWidth = getPercent(currentMainIdx) - getPercent(firstMainIdx);

                return (
                  <>
                    {/* 1. Behind-connecting solid line for the normal main steps (first to last active step: e.g. 1 to 6) */}
                    <div 
                      className="absolute top-[18px] h-0.5 bg-slate-200 z-0" 
                      style={{
                        left: `${getPercent(firstMainIdx)}%`,
                        width: `${getPercent(lastMainIdx) - getPercent(firstMainIdx)}%`
                      }}
                    />

                    {/* 2. Solid active steps progress row overlay (color matching the filled path) */}
                    {progressWidth > 0 && (
                      <div 
                        className="absolute top-[18px] h-0.5 bg-slate-800 z-1 transition-all duration-305"
                        style={{
                          left: `${getPercent(firstMainIdx)}%`,
                          width: `${progressWidth}%`
                        }}
                      />
                    )}

                    {/* 3. Preceding dashed line to left ghost circle if it exists */}
                    {hasLeftGhost && (
                      <div 
                        className="absolute top-[18px] h-0 border-t-2 border-dashed border-slate-300 z-0" 
                        style={{
                          left: `${getPercent(0)}%`,
                          width: `${getPercent(1) - getPercent(0)}%`
                        }}
                      />
                    )}

                    {/* 4. Trailing dashed line to right ghost circle if it exists */}
                    {hasRightGhost && (
                      <div 
                        className="absolute top-[18px] h-0 border-t-2 border-dashed border-slate-300 z-0" 
                        style={{
                          left: `${getPercent(lastMainIdx)}%`,
                          width: `${getPercent(totalItems - 1) - getPercent(lastMainIdx)}%`
                        }}
                      />
                    )}
                  </>
                );
              })()}

              {/* Column Layout based on Flexbox to prevent dead space - Compacted */}
              <div className="w-full flex items-start justify-between relative z-10">
                
                {/* 1st: Left Ghost Peek - Compacted */}
                {stepperStartIndex > 0 && (() => {
                  const prevIdx = stepperStartIndex - 1;
                  const prevStep = steps[prevIdx];
                  return (
                    <div className="flex-1 flex flex-col items-center relative select-none">
                      {/* Preceding dots indicator */}
                      <div className="absolute right-1/2 mr-5 top-[18px] -translate-y-1/2 flex gap-[2.5px] select-none pointer-events-none items-center z-30">
                        <span className="w-0.5 h-0.5 rounded-full bg-slate-300" />
                        <span className="w-0.5 h-0.5 rounded-full bg-slate-300" />
                        <span className="w-1 h-1 rounded-full bg-slate-400" />
                      </div>

                      <button
                        type="button"
                        onClick={handleStepperPrev}
                        className="flex flex-col items-center relative z-20 cursor-pointer focus:outline-none select-none group w-full"
                        title={`Preview: Step ${prevIdx + 1} - ${prevStep.title}. Click to view previous.`}
                      >
                        <div className="w-9 h-9 rounded-full border-2 border-dashed border-slate-200 bg-white flex items-center justify-center text-[11px] font-sans font-bold text-slate-400 group-hover:border-slate-400 transition-all duration-250 shadow-3xs group-hover:scale-105 active:scale-95">
                          {prevIdx + 1}
                        </div>
                        <span className="hidden lg:block text-[10px] font-semibold text-center mt-2 text-slate-400 truncate max-w-[85px] transition-colors group-hover:text-slate-600 leading-tight pb-0.5">
                          {prevStep.title}
                        </span>
                      </button>
                    </div>
                  );
                })()}

                {/* 2nd: Main 6 Steps in between (Flexbox utilizes space beautifully) - Compacted */}
                {(() => {
                  const visibleIndices = getVisibleSteps();
                  return visibleIndices.map((idx) => {
                    const step = steps[idx];
                    const isActive = idx === currentStep;
                    const isCompleted = idx < currentStep;

                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center relative z-10">
                        <button
                          type="button"
                          onClick={() => {
                            if (idx > 1 && idx > currentStep) {
                              triggerToast(t.wizard.alertLockedSteps);
                              return;
                            }
                            setCurrentStep(idx);
                          }}
                          className="flex flex-col items-center relative z-20 w-full cursor-pointer focus:outline-none group"
                        >
                          <div className={`
                            w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-sans font-bold transition-all duration-300 shadow-3xs
                            ${isActive
                              ? 'bg-slate-800 text-white ring-4 ring-slate-100 scale-105 shadow-sm font-bold'
                              : isCompleted
                                ? 'bg-slate-800 text-white'
                                : 'bg-white border border-slate-150 text-slate-400 group-hover:border-slate-300'
                            }
                          `}>
                            {isCompleted ? '✓' : idx + 1}
                          </div>

                          <span className={`
                            hidden lg:block text-[10.5px] font-bold text-center mt-2 tracking-tight transition-colors duration-200 truncate max-w-[85px] pb-0.5
                            ${isActive 
                              ? 'text-slate-800 font-extrabold' 
                              : isCompleted 
                                ? 'text-slate-600 font-semibold' 
                                : 'text-slate-400 font-semibold group-hover:text-slate-600'
                            }
                          `}>
                            {step.title}
                          </span>

                          {isActive && (
                            <span className="lg:hidden text-[9px] font-bold text-slate-800 mt-1.5 tracking-tight">
                              {step.title}
                            </span>
                          )}

                          {/* High fidelity horizontal active tab container border line at the bottom div border */}
                          {isActive && (
                            <div className="absolute -bottom-[12px] md:-bottom-[16px] left-2 right-2 h-[3px] bg-[#f89728] rounded-t-sm z-30" />
                          )}
                        </button>
                      </div>
                    );
                  });
                })()}

                {/* 3rd: Right Ghost Peek - Compacted */}
                {stepperStartIndex + 6 < steps.length && (() => {
                  const nextIdx = stepperStartIndex + 6;
                  const nextStep = steps[nextIdx];
                  return (
                    <div className="flex-1 flex flex-col items-center relative select-none">
                      <button
                        type="button"
                        onClick={handleStepperNext}
                        className="flex flex-col items-center relative z-20 cursor-pointer focus:outline-none select-none group w-full"
                        title={`Preview: Step ${nextIdx + 1} - ${nextStep.title}. Click to view next.`}
                      >
                        <div className="w-9 h-9 rounded-full border-2 border-dashed border-slate-200 bg-white flex items-center justify-center text-[11px] font-sans font-bold text-slate-400 group-hover:border-slate-400 transition-all duration-250 shadow-3xs group-hover:scale-105 active:scale-95">
                          {nextIdx + 1}
                        </div>
                        <span className="hidden lg:block text-[10px] font-semibold text-center mt-2 text-slate-400 truncate max-w-[85px] transition-colors group-hover:text-slate-600 leading-tight pb-0.5">
                          {nextStep.title}
                        </span>
                      </button>
                    </div>
                  );
                })()}

              </div>
            </div>

            {/* Right Arrow Button - Compacted */}
            <button
              type="button"
              onClick={handleStepperNext}
              disabled={stepperStartIndex >= 6}
              className={`w-9 h-9 rounded-lg border transition-all duration-200 active:scale-95 flex items-center justify-center shrink-0 z-20 ${
                stepperStartIndex >= 6
                  ? 'border-slate-100 text-slate-300 cursor-not-allowed opacity-30 bg-slate-50/50'
                  : 'border-[#f89728]/35 hover:border-[#f89728] text-[#f89728] bg-orange-50/10 hover:bg-orange-50 hover:shadow-3xs cursor-pointer'
              }`}
              title="Next steps"
            >
              <ChevronRight size={17} className="stroke-[2.5]" />
            </button>

          </div>

        </div>
      )}

      {/* 3. Main Stage Container - Supporting dynamic layout switching - Compacted spacing */}
      <div className={`
        transition-all duration-305 bg-white flex flex-col min-h-[480px] h-[calc(100vh-210px)] max-h-[780px] overflow-hidden
        ${theme === 'option2' ? 'shadow-xl' : ''}
        ${stepperLayout === 'vertical' 
          ? 'border-x border-b border-slate-200/80 flex flex-col md:flex-row' 
          : 'mt-2 border border-slate-200/80 relative rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.015)]'
        }
      `}>
        
        {/* Render vertical sidebar steps if active */}
        {stepperLayout === 'vertical' && (
          <div id="vertical-stepper-sidebar" className={`w-full md:w-72 p-6 shrink-0 font-sans ${
             theme === 'option2' ? 'bg-slate-50 border-b md:border-b-0 md:border-r border-slate-150' : 'bg-[#FAFAFC] border-b md:border-b-0 md:border-r border-slate-200'
          }`}>
            <div className="sticky top-6">
              <div className="mb-6">
                <span className="text-[10px] uppercase font-mono font-bold text-xfair-orange tracking-widest block mb-1">
                  {t.wizard.statusControlBrand}
                </span>
                <h4 className="font-display font-extrabold text-slate-800 text-sm">
                  {t.wizard.progressHeader}
                </h4>
              </div>

              <div className="relative pl-1 space-y-4">
                {/* Vertical continuous timeline connecting line */}
                <div className="absolute left-[17px] top-3 bottom-8 w-0.5 bg-slate-200" />
                
                {(() => {
                  const visibleIndices = getVisibleSteps();
                  return visibleIndices.map((idx) => {
                    const step = steps[idx];
                    const isActive = idx === currentStep;
                    const isCompleted = idx < currentStep;

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          if (idx > 1) {
                            triggerToast(t.wizard.alertLockedSteps);
                            return;
                          }
                          setCurrentStep(idx);
                        }}
                        className="w-full flex items-start gap-4 text-left group cursor-pointer outline-none relative transition-all"
                      >
                        <div className="relative z-10 shrink-0">
                          <span className={`
                            w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-mono font-bold transition-all duration-300
                            ${isActive 
                              ? 'bg-slate-800 text-white ring-4 ring-slate-105 shadow-md font-bold' 
                              : isCompleted 
                                ? 'bg-slate-800 text-white' 
                                : 'bg-white border-2 border-slate-150 text-slate-400 group-hover:border-slate-350 hover:text-slate-600'
                            }
                          `}>
                            {isCompleted ? '✓' : idx + 1}
                          </span>
                        </div>

                        <div className="pt-0.5 min-w-0 flex-1">
                          <span className={`
                            block text-[13px] font-bold leading-snug transition-colors duration-200
                            ${isActive 
                              ? 'text-slate-800 font-extrabold' 
                              : isCompleted 
                                ? 'text-slate-700 font-bold group-hover:text-slate-900' 
                                : 'text-slate-400 font-semibold group-hover:text-slate-600'
                            }
                          `}>
                            {step.title}
                          </span>
                          <span className={`
                            block text-[11px] leading-snug transition-colors duration-200 truncate mt-0.5
                            ${isActive 
                              ? 'text-slate-500 font-medium' 
                              : 'text-slate-450 group-hover:text-slate-500'
                            }
                          `}>
                            {step.desc}
                          </span>
                        </div>
                      </button>
                    );
                  });
                })()}
              </div>
            </div>
          </div>
        )}

        {/* Content Segment Wrapper - Compacted heights & vertical focus */}
        <div className={`transition-all duration-300 flex-1 flex flex-col min-h-0 justify-between ${
          (showAddHotelForm && currentStep === 3) ? 'filter blur-sm pointer-events-none select-none opacity-85' : ''
        }`}>
          
          {/* Scrollable Container for steps content */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 min-h-0 scrollbar-thin">
          
          {/* Step Segment Heading with elegant left-accent bar - hidden for Step 1 and Step 2 to avoid duplication of Title & Step Tag */}
          {currentStep > 1 && (
            <div id="step-segment-outer-header" className="flex items-start sm:items-center justify-between pb-3.5 mb-5 border-b border-zinc-100 select-none">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-[#f89728] rounded-full shrink-0" />
                <div>
                  <h3 className="font-sans font-black text-slate-800 text-[14px] sm:text-[15.5px] leading-tight uppercase tracking-tight">
                    {steps[currentStep].title}
                  </h3>
                  <p className="text-slate-400 text-[11px] font-medium leading-none mt-1">
                    {steps[currentStep].desc}
                  </p>
                </div>
              </div>
              
              {/* Quick page status indicator bubble */}
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/50 border border-slate-200.5 font-mono text-[9.5px] font-extrabold text-slate-500">
                <span>STEP {currentStep + 1} OF {steps.length}</span>
              </div>
            </div>
          )}

        {/* -------------------- STEP 1: PERSONAL DATA -------------------- */}
        {currentStep === 0 && (
          <div className="space-y-5 animate-fade-in w-full max-w-4xl mx-auto">
            
            {/* Section 1: Personal Data */}
            <div className="bg-white border border-zinc-200/95 rounded-2xl shadow-3xs transition-all hover:border-zinc-300/80 relative z-30 focus-within:z-50">
              <div className="bg-[#FFFBF7] border-b border-[#FEE6D6] rounded-t-2xl px-5 py-3.5 flex items-center gap-3 select-none">
                <div className="w-7.5 h-7.5 rounded-lg bg-orange-100/40 flex items-center justify-center text-[#f89728] border border-orange-200/30 shrink-0">
                  <User size={15} className="stroke-[2.5]" />
                </div>
                <h4 className="font-sans font-black text-[12px] uppercase tracking-wider text-[#A75D24] leading-none">
                  {language === 'de' ? 'PERSÖNLICHE DATEN' : 'PERSONAL DATA'}
                </h4>
              </div>

              <div className="p-5 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {/* Salutation select */}
                <div className="space-y-1.5 relative">
                  <label className="block text-[#4A5D7E] text-[12px] font-bold tracking-wide">
                    {t.wizard.salutationLabel} <span className="text-red-500 font-sans">*</span>
                  </label>
                  <CustomSelect 
                    value={personalData.salutation} 
                    onChange={(val) => setPersonalData({ ...personalData, salutation: val })}
                    placeholder={language === 'de' ? 'Anrede auswählen' : 'Select salutation'}
                    options={[
                      { value: "Mr.", label: language === 'de' ? "Herr" : "Mr." },
                      { value: "Mrs.", label: language === 'de' ? "Frau" : "Mrs." },
                      { value: "Mx.", label: "Mx." },
                      { value: "Dr.", label: "Dr." }
                    ]}
                  />
                </div>

                {/* Title */}
                <div className="space-y-1.5 relative">
                  <label className="block text-[#4A5D7E] text-[12px] font-bold tracking-wide">
                    {t.wizard.titleLabel}
                  </label>
                  <CustomSelect 
                    value={personalData.title}
                    onChange={(val) => setPersonalData({ ...personalData, title: val })}
                    placeholder={language === 'de' ? 'Bitte auswählen / Keine' : 'Please select / None'}
                    options={[
                      { value: "None", label: language === 'de' ? "Bitte auswählen / Keine" : "Please select / None" },
                      { value: "Dr.", label: "Dr." },
                      { value: "Prof.", label: "Prof." },
                      { value: "Dipl.-Ing.", label: "Dipl.-Ing." }
                    ]}
                  />
                </div>

                {/* First Name */}
                <div className="space-y-1.5 relative">
                  <label className="block text-[#4A5D7E] text-[12px] font-bold tracking-wide">
                    {t.wizard.firstNameLabel} <span className="text-red-500 font-sans">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={personalData.firstName}
                    onChange={(e) => setPersonalData({ ...personalData, firstName: e.target.value })}
                    className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-[15px] hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 text-zinc-900 font-semibold outline-none transition-all h-11"
                    required
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-1.5 relative">
                  <label className="block text-[#4A5D7E] text-[12px] font-bold tracking-wide">
                    {t.wizard.lastNameLabel} <span className="text-red-500 font-sans">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={personalData.lastName}
                    onChange={(e) => setPersonalData({ ...personalData, lastName: e.target.value })}
                    className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-[15px] hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 text-zinc-900 font-semibold outline-none transition-all h-11"
                    required
                  />
                </div>

                {/* Preferred communication lang */}
                <div className="space-y-1.5 relative">
                  <label className="block text-[#4A5D7E] text-[12px] font-bold tracking-wide">
                    {t.wizard.contactLangLabel || 'Preferred contact language'}
                  </label>
                  <CustomSelect 
                    value={personalData.contactLanguage}
                    onChange={(val) => setPersonalData({ ...personalData, contactLanguage: val })}
                    options={[
                      { value: "English (US)", label: "English (US)" },
                      { value: "English (UK)", label: "English (UK)" },
                      { value: "Deutsch", label: "Deutsch" }
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Contact */}
            <div className="bg-white border border-zinc-200/95 rounded-2xl shadow-3xs transition-all hover:border-zinc-300/80 relative z-20 focus-within:z-50">
              <div className="bg-[#FFFBF7] border-b border-[#FEE6D6] rounded-t-2xl px-5 py-3.5 flex items-center gap-3 select-none">
                <div className="w-7.5 h-7.5 rounded-lg bg-orange-100/40 flex items-center justify-center text-[#f89728] border border-orange-200/30 shrink-0">
                  <Phone size={15} className="stroke-[2.5]" />
                </div>
                <h4 className="font-sans font-black text-[12px] uppercase tracking-wider text-[#A75D24] leading-none">
                  {language === 'de' ? 'KONTAKT' : 'CONTACT'}
                </h4>
              </div>

              <div className="p-5 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-4">
                {/* Email Address */}
                <div className="space-y-1.5 relative">
                  <label className="block text-[#4A5D7E] text-[12px] font-bold tracking-wide">
                    {language === 'de' ? 'E-Mail-Adresse' : 'Email'} <span className="text-red-500 font-sans">*</span>
                  </label>
                  <input 
                    type="email" 
                    value={personalData.email}
                    onChange={(e) => setPersonalData({ ...personalData, email: e.target.value })}
                    className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-[15px] hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 text-zinc-900 font-semibold outline-none transition-all h-11"
                    required
                  />
                </div>

                {/* Mobile Phone Coordinates */}
                <div className="space-y-1.5 relative">
                  <label className="block text-[#4A5D7E] text-[12px] font-bold tracking-wide">
                    {language === 'de' ? 'Mobil' : 'Mobile'}
                  </label>
                  <input 
                    type="tel" 
                    value={personalData.mobile}
                    onChange={(e) => setPersonalData({ ...personalData, mobile: e.target.value })}
                    className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-[15px] hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 text-zinc-900 font-semibold outline-none transition-all h-11"
                  />
                </div>

                {/* Telephone field group */}
                <div className="space-y-1.5 relative md:col-span-1">
                  <label className="block text-[#4A5D7E] text-[12px] font-bold tracking-wide">
                    {language === 'de' ? 'Telefon' : 'Telephone'}
                  </label>
                  <div className="grid grid-cols-12 gap-2 items-end">
                    <div className="col-span-4">
                      <CustomSelect 
                        value={personalData.telDialCode || '+49'} 
                        onChange={(val) => setPersonalData({ ...personalData, telDialCode: val })}
                        placeholder={language === 'de' ? 'Ländervorw.' : 'Dial'}
                        options={[
                          { value: "+49", label: "+49 (DE)" },
                          { value: "+44", label: "+44 (UK)" },
                          { value: "+1", label: "+1 (US)" },
                          { value: "+380", label: "+380 (UA)" },
                          { value: "+43", label: "+43 (AT)" },
                          { value: "+41", label: "+41 (CH)" }
                        ]}
                      />
                    </div>
                    <div className="col-span-3">
                      <input 
                        type="text" 
                        placeholder={language === 'de' ? 'Vorwahl' : 'Area'}
                        value={personalData.telAreaCode || ''}
                        onChange={(e) => setPersonalData({ ...personalData, telAreaCode: e.target.value })}
                        className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-[15px] hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 text-zinc-900 font-semibold outline-none transition-all h-11"
                      />
                    </div>
                    <div className="col-span-5">
                      <input 
                        type="text" 
                        placeholder={language === 'de' ? 'Rufnummer' : 'Number'}
                        value={personalData.telNumber || ''}
                        onChange={(e) => setPersonalData({ ...personalData, telNumber: e.target.value })}
                        className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-[15px] hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 text-zinc-900 font-semibold outline-none transition-all h-11"
                      />
                    </div>
                  </div>
                </div>

                {/* Mobile field group */}
                <div className="space-y-1.5 relative md:col-span-1">
                  <label className="block text-[#4A5D7E] text-[12px] font-bold tracking-wide">
                    {language === 'de' ? 'Mobil' : 'Mobile'}
                  </label>
                  <div className="grid grid-cols-12 gap-2 items-end">
                    <div className="col-span-4">
                      <CustomSelect 
                        value={personalData.mobileDialCode || '+49'} 
                        onChange={(val) => setPersonalData({ ...personalData, mobileDialCode: val })}
                        placeholder={language === 'de' ? 'Ländervorw.' : 'Dial'}
                        options={[
                          { value: "+49", label: "+49 (DE)" },
                          { value: "+44", label: "+44 (UK)" },
                          { value: "+1", label: "+1 (US)" },
                          { value: "+380", label: "+380 (UA)" },
                          { value: "+43", label: "+43 (AT)" },
                          { value: "+41", label: "+41 (CH)" }
                        ]}
                      />
                    </div>
                    <div className="col-span-3">
                      <input 
                        type="text" 
                        placeholder={language === 'de' ? 'Vorwahl' : 'Area'}
                        value={personalData.mobileAreaCode || ''}
                        onChange={(e) => setPersonalData({ ...personalData, mobileAreaCode: e.target.value })}
                        className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-[15px] hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 text-zinc-900 font-semibold outline-none transition-all h-11"
                      />
                    </div>
                    <div className="col-span-5">
                      <input 
                        type="text" 
                        placeholder={language === 'de' ? 'Rufnummer' : 'Number'}
                        value={personalData.mobileNumber || ''}
                        onChange={(e) => setPersonalData({ ...personalData, mobileNumber: e.target.value })}
                        className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-[15px] hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 text-zinc-900 font-semibold outline-none transition-all h-11"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Company */}
            <div className="bg-white border border-zinc-200/95 rounded-2xl shadow-3xs transition-all hover:border-zinc-300/80 relative z-10 focus-within:z-50">
              <div className="bg-[#FFFBF7] border-b border-[#FEE6D6] rounded-t-2xl px-5 py-3.5 flex items-center gap-3 select-none">
                <div className="w-7.5 h-7.5 rounded-lg bg-orange-100/40 flex items-center justify-center text-[#f89728] border border-orange-200/30 shrink-0">
                  <Building size={15} className="stroke-[2.5]" />
                </div>
                <h4 className="font-sans font-black text-[12px] uppercase tracking-wider text-[#A75D24] leading-none">
                  {language === 'de' ? 'UNTERNEHMEN' : 'COMPANY'}
                </h4>
              </div>

              <div className="p-5 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-4">
                {/* Position */}
                <div className="space-y-1.5 relative">
                  <label className="block text-[#4A5D7E] text-[12px] font-bold tracking-wide">
                    {language === 'de' ? 'Position / Funktion' : 'Position'}
                  </label>
                  <input 
                    type="text" 
                    value={personalData.position}
                    onChange={(e) => setPersonalData({ ...personalData, position: e.target.value })}
                    className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-[15px] hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 text-zinc-900 font-semibold outline-none transition-all h-11"
                  />
                </div>

                {/* Company Name */}
                <div className="space-y-1.5 relative">
                  <label className="block text-[#4A5D7E] text-[12px] font-bold tracking-wide">
                    Company
                  </label>
                  <input 
                    type="text" 
                    value={personalData.company}
                    onChange={(e) => setPersonalData({ ...personalData, company: e.target.value })}
                    className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-[15px] hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 text-zinc-900 font-semibold outline-none transition-all h-11"
                  />
                </div>

                {/* Company Address Block */}
                <div className="space-y-1.5 relative md:col-span-2">
                  <label className="block text-[#4A5D7E] text-[12px] font-bold tracking-wide">
                    Company address
                  </label>
                  <input 
                    type="text"
                    value={personalData.companyAddress}
                    onChange={(e) => setPersonalData({ ...personalData, companyAddress: e.target.value })}
                    className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-[15px] hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 text-zinc-900 font-semibold outline-none transition-all h-11"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Approver */}
            <div className="bg-white border border-zinc-200/95 rounded-2xl shadow-3xs transition-all hover:border-zinc-300/80 relative z-10 focus-within:z-50">
              <div className="bg-[#FFFBF7] border-b border-[#FEE6D6] rounded-t-2xl px-5 py-3.5 flex items-center gap-3 select-none">
                <div className="w-7.5 h-7.5 rounded-lg bg-orange-100/40 flex items-center justify-center text-[#f89728] border border-orange-200/30 shrink-0">
                  <ShieldCheck size={15} className="stroke-[2.5]" />
                </div>
                <h4 className="font-sans font-black text-[12px] uppercase tracking-wider text-[#A75D24] leading-none">
                  {language === 'de' ? 'GENEHMIGER' : 'APPROVER'}
                </h4>
              </div>

              <div className="p-5 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div className="space-y-1.5 relative md:col-span-1">
                  <label className="block text-[#4A5D7E] text-[12px] font-bold tracking-wide">
                    {language === 'de' ? 'Genehmiger' : 'Approver'} <span className="text-red-500 font-sans">*</span>
                  </label>
                  <CustomSelect 
                    value={personalData.approver || 'Gerhard Schroeder'}
                    onChange={(val) => setPersonalData({ ...personalData, approver: val })}
                    options={[
                      { value: "Gerhard Schroeder", label: "Gerhard Schroeder (CEO)" },
                      { value: "Ursula von der Leyen", label: "Ursula von der Leyen (VP Sales)" },
                      { value: "Angela Merkel", label: "Angela Merkel (HR Lead)" },
                      { value: "Olaf Scholz", label: "Olaf Scholz (Events Director)" }
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Checkbox (Now acts as the final agreement block of Step 1 form) */}
            <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-100/75 space-y-3 mt-8 mb-4">
              <h4 className="text-slate-800 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-xfair-orange" />
                <span>{language === 'de' ? 'Datenschutzerklärung' : 'Data Protection Policy'}</span>
              </h4>
              <label className="flex items-start gap-3 cursor-pointer select-none group text-xs text-slate-600 leading-relaxed">
                <input 
                  type="checkbox"
                  checked={personalData.privacyAgreed}
                  onChange={(e) => setPersonalData({ ...personalData, privacyAgreed: e.target.checked })}
                  className="mt-0.5 accent-xfair-orange text-white w-4 h-4 cursor-pointer"
                />
                <span className="group-hover:text-slate-900 transition-colors">
                  {language === 'de' ? (
                    <>Ich stimme zu, dass meine personenbezogenen Daten im Rahmen der Veranstaltung erhoben, verarbeitet und genutzt werden. Meine personenbezogenen Daten wie Anwesenheitstage, Hotelbuchungsdaten usw. werden ausschließlich zum Zweck des XFAIR-Messeauftritts bei der Veranstaltung sowie deren Organisation und Verwaltung verwendet. Die Daten werden ausschließlich für interne Zwecke verwendet.</>
                  ) : (
                    <>I agree that my personal data will be collected, processed and used within the framework of the event. My personal data such as attendance days, hotel booking dates, etc. is used for the sole purpose of the XFAIR trade show appearance at the event and its organization and management. The data is exclusively used for internal purposes.</>
                  )} <span className="text-rose-500 font-bold font-mono">*</span>
                </span>
              </label>
            </div>

          </div>
        )}

        {/* -------------------- STEP 2: ATTENDANCE DAYS -------------------- */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">

            {/* Quick Multi selection toggle */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-slate-600 text-xs font-bold font-display uppercase tracking-wide">
                {language === 'de' ? 'Messetage und Zeiteinstellungen' : 'Fairdays and time settings'}
              </span>
              <button
                onClick={handleToggleSelectAllDays}
                className="text-xs font-semibold text-xfair-orange hover:underline flex items-center gap-1 cursor-pointer"
              >
                <div className={`w-3.5 h-3.5 rounded border border-xfair-orange flex items-center justify-center transition-all ${isAllDaysChecked ? 'bg-xfair-orange text-white' : 'bg-transparent'}`}>
                  {isAllDaysChecked && <Check size={10} />}
                </div>
                <span>{language === 'de' ? 'Alle Messetage auswählen' : 'Select all fair days'}</span>
              </button>
            </div>

            {/* Rows list of fairdays */}
            <div className="space-y-3.5">
              {attendanceDays.map((day, idx) => (
                <div 
                  key={day.id}
                  style={{ zIndex: 100 - idx }}
                  className={`
                    relative p-4 rounded-xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4
                    ${day.checked 
                      ? 'bg-orange-50/15 border-orange-200/80 shadow-sm' 
                      : 'bg-[#FAFAFD] border-slate-200/50 opacity-65'
                    }
                  `}
                >
                  {/* Left Column info checkbox */}
                  <label className="flex items-center gap-4 cursor-pointer select-none">
                    <input 
                      type="checkbox"
                      checked={day.checked}
                      onChange={() => handleToggleDay(day.id)}
                      className="accent-xfair-orange text-white w-4.5 h-4.5 rounded cursor-pointer shrink-0"
                    />
                    
                    {/* Calendar-style badge */}
                    <div className="w-[48px] h-[52px] bg-[#1E293B] rounded-lg flex flex-col items-center justify-center py-2 shrink-0 select-none text-white shadow-3xs">
                      <span className="font-display font-black text-lg leading-none tracking-tight text-white">
                        {day.label.includes('/') ? day.label.split('/')[0] : day.label.split(' ')[0]}
                      </span>
                      <span className="font-mono text-[9px] font-extrabold tracking-wider uppercase mt-1 leading-none text-[#f89728]">
                        {day.label.includes('/') ? 'JUN' : (day.label.split(' ')[1] || 'JUN').substring(0, 3).toUpperCase()}
                      </span>
                    </div>

                    <div className="font-sans">
                      <span className="font-bold text-slate-800 text-sm block">{getLocalizedDayOfWeek(day.dayOfWeek)}</span>
                      <span className="text-[11px] font-mono text-slate-500 block">{language === 'de' ? 'Messetag' : 'Fair Day'}</span>
                    </div>
                  </label>

                  {/* Right Column times selectors */}
                  <div className="flex flex-wrap items-center gap-3 bg-white/70 p-2 border border-slate-100 rounded-lg shadow-inner z-10">
                    <div className="flex items-center gap-1.5 font-sans">
                      <span className="text-[#4A5D7E] text-[12px] font-bold tracking-wide">{language === 'de' ? 'Beginn:' : 'Start:'}</span>
                      <TimeSelect
                        disabled={!day.checked}
                        value={day.startTime}
                        onChange={(val) => handleUpdateTime(day.id, 'start', val)}
                        options={["07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM"]}
                      />
                    </div>

                    <div className="h-4 w-px bg-slate-200" />

                    <div className="flex items-center gap-1.5 font-sans">
                      <span className="text-[#4A5D7E] text-[12px] font-bold tracking-wide">{language === 'de' ? 'Ende:' : 'End:'}</span>
                      <TimeSelect
                        disabled={!day.checked}
                        value={day.endTime}
                        onChange={(val) => handleUpdateTime(day.id, 'end', val)}
                        options={["04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"]}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------------------- STEP 3: MEETING ROOMS AGGREGATOR -------------------- */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">

            {/* Date Switcher bar */}
            <div className="flex items-center justify-between border border-slate-200 bg-slate-50 rounded-xl px-4 py-2.5 shadow-inner">
              <div className="flex items-center gap-1 text-xs text-slate-500 font-mono">
                <Calendar size={13} className="text-slate-400" />
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => triggerToast('🗓️ Loading preceding calendar schedule day...')}
                  className="p-1 px-1.5 bg-white border border-slate-200 rounded-md shadow-3xs text-xs font-bold hover:bg-slate-100 cursor-pointer"
                >
                  ◀
                </button>
                <span className="text-xs font-bold text-slate-800 font-mono text-center min-w-[125px]">
                  {meetingDate}
                </span>
                <button 
                  onClick={() => triggerToast('🗓️ Loading subsequent calendar schedule day...')}
                  className="p-1 px-1.5 bg-white border border-slate-200 rounded-md shadow-3xs text-xs font-bold hover:bg-slate-100 cursor-pointer"
                >
                  ▶
                </button>
              </div>

              <button 
                onClick={() => {
                  setMeetingBookings({
                    ...meetingBookings,
                    [`10AM-Meeting ${Math.floor(Math.random() * 5) + 1}`]: { company: 'John Doe (You)', color: 'bg-emerald-100 border-emerald-300 text-emerald-850 font-bold' }
                  });
                  triggerToast('➕ Created quick custom meeting reserve slot.');
                }}
                className="border border-[#f89728] text-[#f89728] bg-white hover:bg-orange-50 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-3xs"
              >
                + Insert Appointment
              </button>
            </div>

            {/* Schedule interactive grid TABLE */}
            <div className="border border-slate-200/70 rounded-2xl overflow-hidden shadow-sm bg-white overflow-x-auto select-none">
              <table className="w-full min-w-[650px] border-collapse text-left">
                <thead>
                  <tr className="bg-[#1E293B] text-white text-[10px] uppercase font-mono tracking-widest leading-none border-b border-slate-300/10">
                    <th className="p-3.5 border-r border-slate-300/10 w-24 text-center">Hour Slot</th>
                    <th className="p-3.5 border-r border-slate-300/10 text-center">Meeting 1 <span className="block text-[8px] text-slate-400 font-normal mt-0.5">[10 Pax]</span></th>
                    <th className="p-3.5 border-r border-slate-300/10 text-center">Meeting 2 <span className="block text-[8px] text-slate-400 font-normal mt-0.5">[8 Pax]</span></th>
                    <th className="p-3.5 border-r border-slate-300/10 text-center">Meeting 3 <span className="block text-[8px] text-slate-400 font-normal mt-0.5">[5 Pax]</span></th>
                    <th className="p-3.5 border-r border-slate-300/10 text-center">Meeting 4 <span className="block text-[8px] text-slate-400 font-normal mt-0.5">[6 Pax]</span></th>
                    <th className="p-3.5 text-center">Meeting 5 <span className="block text-[8px] text-slate-400 font-normal mt-0.5">[6 Pax]</span></th>
                  </tr>
                </thead>
                <tbody className="text-xs text-slate-600 font-mono">
                  {['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM'].map((hourSlot) => (
                    <tr key={hourSlot} className="border-b border-slate-100 hover:bg-slate-50/20">
                      {/* Hour cell */}
                      <td className="p-3 border-r border-slate-100 bg-[#FAFAFD] text-center font-bold text-slate-500">
                        {hourSlot}
                      </td>

                      {/* Rooms cells */}
                      {['Meeting 1', 'Meeting 2', 'Meeting 3', 'Meeting 4', 'Meeting 5'].map((roomName) => {
                        const cellKey = `${hourSlot.replace(' ', '')}-${roomName}`;
                        const booking = meetingBookings[cellKey];
                        const isMyBooking = booking?.company === 'John Doe (You)';
                        return (
                          <td 
                            key={roomName}
                            onClick={() => handleCellClick(hourSlot.replace(' ', ''), roomName)}
                            className={`
                              p-2.5 border-r border-slate-100 text-center cursor-pointer transition-all duration-150 h-16 relative group
                              ${booking 
                                ? `${booking.color} shadow-3xs` 
                                : 'bg-white hover:bg-slate-50 hover:shadow-inner'
                              }
                            `}
                          >
                            {booking ? (
                              <div className="font-sans text-[10px] leading-tight select-none">
                                <span className="block font-bold mb-0.5 text-slate-900">
                                  {isMyBooking ? 'Your Booking' : 'Occupied'}
                                </span>
                                {isMyBooking && (
                                  <span className="text-[9px] font-mono break-all opacity-85 block">{booking.company}</span>
                                )}
                              </div>
                            ) : (
                              <span className="opacity-0 group-hover:opacity-100 text-[10px] text-xfair-orange font-bold font-sans transition-all duration-200">
                                Click to Book
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* -------------------- STEP 4: HOTEL BOOKING CONTROLLER -------------------- */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in font-sans">

            <div>
              <h4 className="font-display font-semibold text-sm text-slate-850">Do you need a hotel room?</h4>
              
              <div className="mt-3 flex flex-wrap gap-4">
                <label className="flex items-center gap-2 bg-slate-50/60 border border-slate-200 rounded-xl px-4 py-3 select-none cursor-pointer hover:bg-slate-100/50 transition-all font-semibold text-xs">
                  <input 
                    type="radio" 
                    name="hotel_required" 
                    value="yes"
                    checked={hotelNeeded === 'yes'}
                    onChange={() => setHotelNeeded('yes')}
                    className="accent-xfair-orange w-4 h-4 text-[#f89728]"
                  />
                  <span>Yes, I do need a hotel room</span>
                </label>

                <label className="flex items-center gap-2 bg-slate-50/60 border border-slate-200 rounded-xl px-4 py-3 select-none cursor-pointer hover:bg-slate-100/50 transition-all font-semibold text-xs">
                  <input 
                    type="radio" 
                    name="hotel_required" 
                    value="no"
                    checked={hotelNeeded === 'no'}
                    onChange={() => { setHotelNeeded('no'); setHotelRequests([]); }}
                    className="accent-xfair-orange w-4 h-4 text-[#f89728]"
                  />
                  <span>No hotel room required</span>
                </label>
              </div>
            </div>

            {hotelNeeded === 'yes' && (
              <div className="space-y-4 animate-slide-down">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h4 className="font-display font-semibold text-sm text-slate-850">
                    Current Hotel Requests
                  </h4>
                    <button
                      onClick={handleOpenAddHotelForm}
                      className="border border-[#f89728] text-[#f89728] bg-white hover:bg-orange-50 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-3xs flex items-center gap-1.5"
                    >
                      <Plus size={14} />
                      <span>Add hotel request</span>
                    </button>
                </div>

                {/* Queue list representation */}
                {hotelRequests.length > 0 ? (
                  <div className="border border-slate-200 rounded-xl overflow-hidden shadow-soft">
                    <table className="w-full text-left font-sans text-xs">
                      <thead>
                        <tr className="bg-[#1E293B] text-white pr-4 font-semibold text-[10px] uppercase tracking-wider font-mono">
                          <th className="p-3 pl-4">Guest Name</th>
                          <th className="p-3">Arrival Date</th>
                          <th className="p-3">Departure Date</th>
                          <th className="p-3">Breakfast</th>
                          <th className="p-3">Smoking Room</th>
                          <th className="p-3 col-span-2">Comment</th>
                          <th className="p-3 text-right pr-4">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {hotelRequests.map((req) => {
                          return (
                            <tr key={req.id} className="hover:bg-slate-50/50">
                              <td className="p-3 pl-4 font-bold text-slate-850">
                                {req.guestName || userName || '—'}
                              </td>
                              <td className="p-3 font-mono text-slate-500 text-[11px]">{formatDateDMY(req.checkIn)}</td>
                              <td className="p-3 font-mono text-slate-500 text-[11px]">{formatDateDMY(req.checkOut)}</td>
                              <td className="p-3">
                                {req.breakfast ? (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                                    Included
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-50 text-slate-600 border border-slate-100">
                                    No breakfast
                                  </span>
                                )}
                              </td>
                              <td className="p-3">
                                {req.smokingRoom ? (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-orange-50 text-orange-700 border border-orange-100">
                                    Smoking
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-50 text-slate-650 border border-slate-100">
                                    Non-smoking
                                  </span>
                                )}
                              </td>
                              <td className="p-3 text-slate-500 max-w-[150px] truncate" title={req.comment}>
                                {req.comment || <span className="text-slate-300">—</span>}
                              </td>
                              <td className="p-3 text-right pr-4">
                                <button
                                  onClick={() => handleDeleteHotelRequest(req.id)}
                                  className="p-1 px-2 rounded bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 transition cursor-pointer text-xs font-semibold"
                                  title="Delete hotel request"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-6 border border-dashed border-slate-200 rounded-2xl bg-slate-50 text-center text-slate-400">
                    <Hotel size={24} className="mx-auto mb-1.5 text-slate-300" />
                    <p className="font-semibold text-xs text-slate-600">No hotel requests currently queued</p>
                    <p className="text-[10px] text-slate-450 mt-0.5">Click "Add hotel request" to start your luxury reservation.</p>
                  </div>
                )}
              </div>
            )}


          </div>
        )}

        {/* -------------------- STEP 5: Personal Calendar (New) -------------------- */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fade-in font-sans">
            <div className="bg-[#FAF9F5] border border-amber-150 rounded-2xl p-4 flex items-start gap-3 mb-6">
              <Info size={16} className="text-[#f89728] shrink-0 mt-0.5" />
              <div className="text-xs text-[#854D00]">
                <strong className="block font-bold mb-0.5">XFAIR Keynotes & Networking Schedule</strong>
                Select the sessions you wish to add to your personal calendar. Your customized schedule will be downloadable on the downloads tab and synced into your badge.
              </div>
            </div>

            <div className="space-y-3">
              {personalCalendar.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    const next = personalCalendar.map(c => c.id === item.id ? { ...c, selected: !c.selected } : c);
                    setPersonalCalendar(next);
                    triggerToast(item.selected ? `Removed session: ${item.title}` : `Added session to calendar: ${item.title}`);
                  }}
                  className={`w-full p-4 rounded-xl border text-left flex items-start gap-4 transition-all duration-200 cursor-pointer ${
                    item.selected
                      ? 'bg-orange-50/20 border-[#f89728]/40 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50/55'
                  }`}
                >
                  <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
                    item.selected ? 'bg-[#f89728] border-[#f89728] text-white' : 'border-slate-300 bg-white'
                  }`}>
                    {item.selected && <Check size={14} className="stroke-[3]" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {item.category}
                      </span>
                      <span className="text-[11px] font-mono text-slate-550 font-semibold flex items-center gap-1">
                        <Clock size={11} className="text-slate-400" />
                        {item.time}
                      </span>
                    </div>
                    <h5 className="font-bold text-slate-800 text-sm leading-snug">
                      {item.title}
                    </h5>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* -------------------- STEP 6: Accompanying person (New) -------------------- */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-fade-in font-sans">
            <div className="bg-[#FAFAFD] border border-slate-200 p-6 rounded-2xl">
              <label className="flex items-start gap-3.5 cursor-pointer select-none group text-sm text-slate-750 leading-normal">
                <input 
                  type="checkbox"
                  checked={accompanyingPerson.hasCompanion}
                  onChange={(e) => setAccompanyingPerson({ ...accompanyingPerson, hasCompanion: e.target.checked })}
                  className="mt-1 accent-[#f89728]"
                />
                <div>
                  <span className="font-bold text-slate-800 group-hover:text-slate-950 transition-colors block text-[15px]">
                    Yes, I am accompanied by a companion or associate
                  </span>
                  <span className="text-xs text-slate-400 block mt-1 leading-relaxed">
                    Select this option if you are planning to travel or share accommodations/event badges with a second team member or guest.
                  </span>
                </div>
              </label>
            </div>

            {accompanyingPerson.hasCompanion && (
              <div className="space-y-6 p-6 border border-orange-100 bg-[#FFFDFB]/60 rounded-2xl animate-fade-in">
                <div className="flex items-center gap-2.5 pb-2 border-b border-orange-50 mb-4 select-none">
                  <User size={16} className="text-xfair-orange" />
                  <h4 className="text-sm font-bold text-slate-800">Companion Credentials</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5 relative">
                    <label className="block text-[#4A5D7E] text-[11px] font-bold uppercase tracking-wider">Companion Full Name</label>
                    <input 
                      type="text"
                      placeholder="e.g. Sarah Terry"
                      value={accompanyingPerson.name}
                      onChange={(e) => setAccompanyingPerson({ ...accompanyingPerson, name: e.target.value })}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-[14px] hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 text-zinc-900 font-semibold outline-none transition-all h-10"
                    />
                  </div>

                  <div className="space-y-1.5 relative">
                    <label className="block text-[#4A5D7E] text-[11px] font-bold uppercase tracking-wider">Companion Email</label>
                    <input 
                      type="email"
                      placeholder="sarah.terry@example.com"
                      value={accompanyingPerson.email}
                      onChange={(e) => setAccompanyingPerson({ ...accompanyingPerson, email: e.target.value })}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-[14px] hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 text-zinc-900 font-semibold outline-none transition-all h-10"
                    />
                  </div>

                  <div className="space-y-1.5 relative">
                    <label className="block text-[#4A5D7E] text-[11px] font-bold uppercase tracking-wider">Relationship / Role</label>
                    <CustomSelect 
                      value={accompanyingPerson.relation}
                      onChange={(val) => setAccompanyingPerson({ ...accompanyingPerson, relation: val })}
                      placeholder="Select relation"
                      options={[
                        { value: "Co-worker / Associate", label: "Co-worker / Associate" },
                        { value: "Spouse / Partner", label: "Spouse / Partner" },
                        { value: "Client / Delegate", label: "Client / Delegate" },
                        { value: "Interpreter", label: "Interpreter" }
                      ]}
                    />
                  </div>

                  <div className="space-y-1.5 relative">
                    <label className="block text-[#4A5D7E] text-[11px] font-bold uppercase tracking-wider">Assign Pass Badge Type</label>
                    <CustomSelect 
                      value={accompanyingPerson.badgeType}
                      onChange={(val) => setAccompanyingPerson({ ...accompanyingPerson, badgeType: val })}
                      placeholder="Select pass type"
                      options={[
                        { value: "Guest", label: "Guest Pass (Free Access)" },
                        { value: "Exhibitor Support", label: "Exhibitor Support Badge" },
                        { value: "Full-Access Participant", label: "Full-Access VIP Participant" }
                      ]}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* -------------------- STEP 7: Postcode range (New) -------------------- */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-fade-in font-sans">
            <div className="bg-[#FFFDF6] border border-amber-100 rounded-2xl p-5 mb-4 text-xs font-medium text-amber-800 leading-relaxed flex items-start gap-3">
              <MapPin size={16} className="text-[#f89728] shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold mb-0.5">Zip/Postal Code Responsibility Assignment</strong>
                Enter your territorial postcode scope of responsibility. This filters exhibition leads, assignments, and corporate delegates allocated to your desk during the trade show footprint.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white border border-slate-150 p-6 rounded-2xl shadow-3xs">
              <div className="space-y-5">
                <div className="space-y-1.5 relative">
                  <label className="block text-[#4A5D7E] text-[11px] font-bold uppercase tracking-wider">Postcode Range Start</label>
                  <input 
                    type="text"
                    placeholder="e.g. 80331"
                    maxLength={10}
                    value={postcodeRange.startCode}
                    onChange={(e) => setPostcodeRange({ ...postcodeRange, startCode: e.target.value })}
                    className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-[15px] font-mono font-bold text-slate-800 hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 outline-none transition-all h-10"
                  />
                </div>

                <div className="space-y-1.5 relative">
                  <label className="block text-[#4A5D7E] text-[11px] font-bold uppercase tracking-wider">Postcode Range End</label>
                  <input 
                    type="text"
                    placeholder="e.g. 81929"
                    maxLength={10}
                    value={postcodeRange.endCode}
                    onChange={(e) => setPostcodeRange({ ...postcodeRange, endCode: e.target.value })}
                    className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-[15px] font-mono font-bold text-slate-800 hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 outline-none transition-all h-10"
                  />
                </div>

                <div className="space-y-1.5 relative">
                  <label className="block text-[#4A5D7E] text-[11px] font-bold uppercase tracking-wider">Region / Hub Designation Office</label>
                  <input 
                    type="text"
                    placeholder="e.g. Munich Central Office"
                    value={postcodeRange.regionName}
                    onChange={(e) => setPostcodeRange({ ...postcodeRange, regionName: e.target.value })}
                    className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-[15px] font-semibold text-slate-850 hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 outline-none transition-all h-10"
                  />
                </div>
              </div>

              {/* Visual read-out preview map badge */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-150 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[9px] text-[#f89728] font-black uppercase tracking-widest block mb-1">LIVE DISPATCH SEGMENT</span>
                  <h5 className="font-extrabold text-slate-850 text-sm font-sans mb-1">Coverage Active State</h5>
                  <p className="text-xs text-slate-550 leading-normal font-sans">
                    All visitors registering within zip range <code className="font-mono bg-slate-200/50 text-[#1E293B] px-1.5 py-0.5 rounded font-bold">{postcodeRange.startCode || '—'}</code> to <code className="font-mono bg-slate-200/50 text-[#1E293B] px-1.5 py-0.5 rounded font-bold">{postcodeRange.endCode || '—'}</code> will be linked dynamically to your desk staff.
                  </p>
                </div>

                <div className="border-t border-slate-200 pt-3.5 mt-4 flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span className="text-[11px] font-semibold text-slate-600 tracking-wide font-sans">
                    Staffed Region: <span className="text-slate-800 font-bold">{postcodeRange.regionName || 'Germany-HQ'}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------- STEP 8: Travel (New) -------------------- */}
        {currentStep === 7 && (
          <div className="space-y-6 animate-fade-in font-sans">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { type: 'Train', icon: '🚆', desc: 'IceDB High-speed Train' },
                { type: 'Flight', icon: '✈️', desc: 'Lufthansa Premium Air' },
                { type: 'Private Car', icon: '🚗', desc: 'Company Fleet Vehicle' },
                { type: 'Public Transport', icon: '🚌', desc: 'Municipal S-Bahn Transit' }
              ].map((m) => {
                const isSelected = travelMode.type === m.type;
                return (
                  <button
                    key={m.type}
                    type="button"
                    onClick={() => {
                      setTravelMode({ ...travelMode, type: m.type });
                      triggerToast(`Selected commute mode: ${m.type}`);
                    }}
                    className={`p-4 rounded-2xl border text-left flex flex-col justify-between h-28 cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#1E293B] text-white border-[#1E293B] shadow-md shadow-slate-900/10'
                        : 'bg-white text-slate-800 border-slate-150 hover:border-slate-300 hover:bg-slate-50/55'
                    }`}
                  >
                    <span className="text-2xl select-none">{m.icon}</span>
                    <div>
                      <span className="block font-bold text-xs">{m.type}</span>
                      <span className={`block text-[9px] mt-0.5 font-medium ${isSelected ? 'text-slate-300' : 'text-slate-450'}`}>{m.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 border border-slate-200 rounded-2xl">
              <div className="space-y-1.5 relative">
                <label className="block text-[#4A5D7E] text-[11px] font-bold uppercase tracking-wider">Departure City</label>
                <input 
                  type="text"
                  placeholder="e.g. Berlin"
                  value={travelMode.departureCity}
                  onChange={(e) => setTravelMode({ ...travelMode, departureCity: e.target.value })}
                  className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-[14px] hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 text-zinc-900 font-semibold outline-none transition-all h-10"
                />
              </div>

              <div className="space-y-1.5 relative">
                <label className="block text-[#4A5D7E] text-[11px] font-bold uppercase tracking-wider">Estimated Date of Arrival</label>
                <input 
                  type="date"
                  value={travelMode.arrivalDate}
                  onChange={(e) => setNewHotelRequest({ ...newHotelRequest, checkIn: e.target.value })} // Fixed earlier but original has onChange below
                  className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-[14px] font-mono hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 text-zinc-900 font-semibold outline-none transition-all h-10"
                />
              </div>
            </div>

            <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100/75 flex items-start gap-3">
              <input 
                type="checkbox"
                checked={travelMode.carbonOffset}
                onChange={(e) => setTravelMode({ ...travelMode, carbonOffset: e.target.checked })}
                className="mt-1 accent-emerald-600 text-white w-4.5 h-4.5 cursor-pointer shrink-0"
              />
              <div className="text-xs text-slate-650 leading-relaxed font-sans">
                <strong className="block font-bold text-emerald-800 mb-0.5">XFAIR Carbon Offset & Green Initiative</strong>
                I agree to purchase standard climate offset credits (certified Gold Standard) to fully counteract the emissions computed for my corporate travel route to Messe München.
              </div>
            </div>
          </div>
        )}

        {/* -------------------- STEP 9: Orders (New) -------------------- */}
        {currentStep === 8 && (
          <div className="space-y-6 animate-fade-in font-sans">
            <div className="bg-[#FAFAFD] border border-slate-150 rounded-2xl overflow-hidden shadow-soft">
              <table className="w-full text-left font-sans text-xs">
                <thead>
                  <tr className="bg-[#1E293B] text-white">
                    <th className="p-4 pl-5">Corporate Voucher Item</th>
                    <th className="p-4 text-center">Unit Price</th>
                    <th className="p-4 text-center w-36">Quantity</th>
                    <th className="p-4 text-right pr-5">Total Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {/* Item 1 */}
                  <tr>
                    <td className="p-4 pl-5">
                      <span className="font-bold text-slate-855 block text-[13px]">Additional Exhibitor Badge Pass</span>
                      <span className="text-[10px] text-slate-450 block font-normal mt-0.5">Multi-day entry for support crew</span>
                    </td>
                    <td className="p-4 text-center font-mono font-bold text-slate-500">45.00 €</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg py-1.5 max-w-[110px] mx-auto select-none">
                        <button
                          type="button"
                          onClick={() => {
                            if (exhibitorPassesCount > 0) setExhibitorPassesCount(exhibitorPassesCount - 1);
                          }}
                          className="px-2 hover:text-rose-600 text-[#f89728] font-bold text-base cursor-pointer select-none"
                        >
                          −
                        </button>
                        <span className="font-mono font-bold text-slate-800 px-1">{exhibitorPassesCount}</span>
                        <button
                          type="button"
                          onClick={() => setExhibitorPassesCount(exhibitorPassesCount + 1)}
                          className="px-2 hover:text-emerald-600 text-[#f89728] font-bold text-base cursor-pointer select-none"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-4 text-right pr-5 font-mono font-extrabold text-[#1E293B]">{(exhibitorPassesCount * 45).toFixed(2)} €</td>
                  </tr>

                  {/* Item 2 */}
                  <tr>
                    <td className="p-4 pl-5">
                      <span className="font-bold text-slate-855 block text-[13px]">Exhibitor Catering Vouchers</span>
                      <span className="text-[10px] text-slate-450 block font-normal mt-0.5">Accepted at Messe cafeteria lounges</span>
                    </td>
                    <td className="p-4 text-center font-mono font-bold text-slate-500">12.50 €</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg py-1.5 max-w-[110px] mx-auto select-none">
                        <button
                          type="button"
                          onClick={() => {
                            if (cateringVouchersCount > 0) setCateringVouchersCount(cateringVouchersCount - 1);
                          }}
                          className="px-2 hover:text-rose-600 text-[#f89728] font-bold text-base cursor-pointer select-none"
                        >
                          −
                        </button>
                        <span className="font-mono font-bold text-slate-800 px-1">{cateringVouchersCount}</span>
                        <button
                          type="button"
                          onClick={() => setCateringVouchersCount(cateringVouchersCount + 1)}
                          className="px-2 hover:text-emerald-600 text-[#f89728] font-bold text-base cursor-pointer select-none"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-4 text-right pr-5 font-mono font-extrabold text-[#1E293B]">{(cateringVouchersCount * 12.5).toFixed(2)} €</td>
                  </tr>

                  {/* Item 3 */}
                  <tr>
                    <td className="p-4 pl-5">
                      <span className="font-bold text-slate-855 block text-[13px]">Opening Night Gala Dinner Ticket</span>
                      <span className="text-[10px] text-slate-450 block font-normal mt-0.5">Includes 3-course dinner and lounge seating</span>
                    </td>
                    <td className="p-4 text-center font-mono font-bold text-slate-500">85.00 €</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg py-1.5 max-w-[110px] mx-auto select-none">
                        <button
                          type="button"
                          onClick={() => {
                            if (galaDinnerTicketsCount > 0) setGalaDinnerTicketsCount(galaDinnerTicketsCount - 1);
                          }}
                          className="px-2 hover:text-rose-600 text-[#f89728] font-bold text-base cursor-pointer select-none"
                        >
                          −
                        </button>
                        <span className="font-mono font-bold text-slate-800 px-1">{galaDinnerTicketsCount}</span>
                        <button
                          type="button"
                          onClick={() => setGalaDinnerTicketsCount(galaDinnerTicketsCount + 1)}
                          className="px-2 hover:text-emerald-600 text-[#f89728] font-bold text-base cursor-pointer select-none"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-4 text-right pr-5 font-mono font-extrabold text-[#1E293B]">{(galaDinnerTicketsCount * 85).toFixed(2)} €</td>
                  </tr>

                  {/* Pricing Total Row */}
                  <tr className="bg-orange-50/15">
                    <td colSpan={2} className="p-4 pl-5 font-bold text-sm text-slate-800">Total Purchase Vouchers Charge:</td>
                    <td className="p-4 text-center text-[10px] uppercase font-mono font-bold text-xfair-orange tracking-widest leading-none">EXFAIR ORDER STACK</td>
                    <td className="p-4 text-right pr-5 font-display font-black text-sm md:text-base text-xfair-orange tracking-tight">
                      {(exhibitorPassesCount * 45 + cateringVouchersCount * 12.5 + galaDinnerTicketsCount * 85).toFixed(2)} €
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* -------------------- STEP 10: Deputies (New) -------------------- */}
        {currentStep === 9 && (
          <div className="space-y-6 animate-fade-in font-sans">
            <div className="bg-[#FAFAFD] border border-slate-200 p-6 rounded-2xl">
              <label className="flex items-start gap-3.5 cursor-pointer select-none group text-sm text-slate-700 leading-normal">
                <input 
                  type="checkbox"
                  checked={deputiesState.hasDeputy}
                  onChange={(e) => setDeputiesState({ ...deputiesState, hasDeputy: e.target.checked })}
                  className="mt-1 accent-[#f89728]"
                />
                <div>
                  <span className="font-bold text-slate-800 group-hover:text-slate-950 transition-colors block text-[15px]">
                    Yes, I want to nominate an official proxy/deputy stand-in
                  </span>
                  <span className="text-xs text-slate-400 block mt-1 leading-relaxed">
                    A proxy deputy has authority to sign off client intake ledgers and inherit room schedules on your behalf when you are away from the stand.
                  </span>
                </div>
              </label>
            </div>

            {deputiesState.hasDeputy && (
              <div className="space-y-6 p-6 border border-orange-100 bg-[#FFFDFB]/60 rounded-2xl animate-fade-in">
                <div className="flex items-center gap-2.5 pb-2 border-b border-orange-50 mb-4 select-none">
                  <ShieldCheck size={16} className="text-[#f89728]" />
                  <h4 className="text-sm font-bold text-slate-800">Deputy Credentials</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5 relative">
                    <label className="block text-[#4A5D7E] text-[11px] font-bold uppercase tracking-wider">Deputy Full Name</label>
                    <input 
                      type="text"
                      placeholder="e.g. Michael Vance"
                      value={deputiesState.name}
                      onChange={(e) => setDeputiesState({ ...deputiesState, name: e.target.value })}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-[14px] hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 text-zinc-900 font-semibold outline-none transition-all h-10"
                    />
                  </div>

                  <div className="space-y-1.5 relative">
                    <label className="block text-[#4A5D7E] text-[11px] font-bold uppercase tracking-wider">Deputy Email</label>
                    <input 
                      type="email"
                      placeholder="m.vance@xfair.com"
                      value={deputiesState.email}
                      onChange={(e) => setDeputiesState({ ...deputiesState, email: e.target.value })}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-[14px] hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 text-zinc-900 font-semibold outline-none transition-all h-10"
                    />
                  </div>

                  <div className="space-y-1.5 relative col-span-1 md:col-span-2">
                    <label className="block text-[#4A5D7E] text-[11px] font-bold uppercase tracking-wider">Deputy Mobile Phone</label>
                    <input 
                      type="tel"
                      placeholder="+49 176 11223344"
                      value={deputiesState.mobile}
                      onChange={(e) => setDeputiesState({ ...deputiesState, mobile: e.target.value })}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-[14px] hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 text-zinc-900 font-semibold outline-none transition-all h-10"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* -------------------- STEP 11: DOWNLOAD AREA -------------------- */}
        {currentStep === 10 && (
          <div className="space-y-6 animate-fade-in font-sans">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Site Layout */}
              <div className="group border border-slate-200/80 rounded-2xl bg-white p-5 hover:border-xfair-orange/30 hover:shadow-premium transition-all duration-300 flex items-center justify-between gap-4">
                <h4 className="font-bold text-slate-800 text-sm truncate group-hover:text-slate-900 transition-colors font-sans">Site Layout Floorplan</h4>
                <button
                  onClick={() => handleDownloadSimulate('Site Layout Floorplan')}
                  className="border border-[#f89728] text-[#f89728] bg-white hover:bg-orange-50 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-3xs flex items-center gap-1.5 shrink-0"
                >
                  <Download size={12} />
                  <span>{downloadedItems.includes('Site Layout Floorplan') ? 'Redownload' : 'Download'}</span>
                </button>
              </div>

              {/* How to get there */}
              <div className="group border border-slate-200/80 rounded-2xl bg-white p-5 hover:border-xfair-orange/30 hover:shadow-premium transition-all duration-300 flex items-center justify-between gap-4">
                <h4 className="font-bold text-slate-800 text-sm truncate group-hover:text-slate-900 transition-colors font-sans">How to get there</h4>
                <button
                  onClick={() => handleDownloadSimulate('How to get there')}
                  className="border border-[#f89728] text-[#f89728] bg-white hover:bg-orange-50 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-3xs flex items-center gap-1.5 shrink-0"
                >
                  <Download size={12} />
                  <span>{downloadedItems.includes('How to get there') ? 'Redownload' : 'Download'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* -------------------- STEP 12: SUMMARY (FINAL AUDIT) -------------------- */}
        {currentStep === 11 && (
          <div className="space-y-8 animate-fade-in font-sans">

            <div className="space-y-6">
              
              {/* Vertical Section 1: Step 1 - Personal Information */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs hover:border-slate-300 transition-all">
                <div className="flex items-center pb-2.5 border-b border-slate-100 mb-4 select-none">
                  <h5 className="font-display font-semibold text-sm text-slate-850">Personal Information</h5>
                </div>
                
                <div className="space-y-4">
                  <div className="mb-4">
                    <span className="font-bold text-[15px] text-slate-855 tracking-tight block">
                      {personalData.salutation && personalData.salutation !== 'None' ? `${personalData.salutation} ` : ''}{personalData.firstName} {personalData.lastName}
                    </span>
                    <span className="text-slate-500 font-medium text-xs block mt-0.5">{personalData.position || 'Attendee'}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-xs font-sans">
                    <div className="flex flex-col gap-1">
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Email Address</span>
                      <span className="text-slate-800 font-semibold font-mono break-all">{personalData.email}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Mobile Phone</span>
                      <span className="text-slate-800 font-semibold font-mono">{personalData.mobile || '—'}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Company / Institution</span>
                      <span className="text-slate-800 font-semibold">{personalData.company || '—'}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Preferred Language</span>
                      <span className="text-slate-800 font-semibold">{personalData.contactLanguage || '—'}</span>
                    </div>
                    {personalData.companyAddress && (
                      <div className="flex flex-col gap-1 sm:col-span-2">
                        <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Company Address</span>
                        <span className="text-slate-700 font-medium text-xs">{personalData.companyAddress}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Vertical Section 2: Step 2 - Attendance Schedule */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs hover:border-slate-300 transition-all">
                <div className="flex items-center pb-2.5 border-b border-slate-100 mb-4 select-none">
                  <h5 className="font-display font-semibold text-sm text-slate-855">Attendance Schedule</h5>
                </div>
                
                <div className="space-y-2.5 font-sans">
                  {attendanceDays.filter(d => d.checked).length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {attendanceDays.filter(d => d.checked).map(d => {
                        const isDmy = d.label.includes('/');
                        const dayNum = isDmy ? d.label.split('/')[0] : d.label.split(' ')[0];
                        const shortMonth = isDmy ? 'JUN' : (d.label.split(' ')[1] || 'JUN').substring(0, 3).toUpperCase();
                        return (
                          <div key={d.id} className="flex items-center gap-4 text-xs font-medium">
                            {/* Calendar Style Left Date Block */}
                            <div className="w-14 h-14 bg-[#0A0F1D] rounded-xl flex flex-col items-center justify-center p-2 select-none shrink-0 text-center shadow-xs">
                              <span className="font-sans font-extrabold text-lg text-white tracking-tight leading-none font-display">
                                {dayNum}
                              </span>
                              <span className="font-mono text-[9px] font-black uppercase tracking-widest mt-1 text-[#f89728]">
                                {shortMonth}
                              </span>
                            </div>
                            {/* Right text Column, no borders */}
                            <div className="flex flex-col justify-center">
                              <span className="font-bold text-slate-855 text-sm tracking-tight">{d.dayOfWeek}</span>
                              <span className="font-mono text-slate-500 font-semibold text-xs mt-0.5">
                                {d.startTime} - {d.endTime}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs text-rose-500 font-semibold p-1">
                      <AlertCircle size={14} />
                      <span>⚠️ No attendance days specified!</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Vertical Section 3: Step 3 - Meeting Rooms */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs hover:border-slate-300 transition-all">
                <div className="flex items-center pb-2.5 border-b border-slate-100 mb-4 select-none">
                  <h5 className="font-display font-semibold text-sm text-slate-855">Meeting Room Requests</h5>
                </div>
                
                <div className="space-y-2.5 font-sans">
                  {Object.keys(meetingBookings).filter(key => meetingBookings[key].company === 'John Doe (You)').length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {Object.keys(meetingBookings).filter(key => meetingBookings[key].company === 'John Doe (You)').map(key => {
                        const [hour, room] = key.split('-');
                        return (
                          <div key={key} className="flex items-center justify-between text-xs py-2 px-3.5 bg-slate-50 border border-slate-150 rounded-xl font-medium font-sans">
                            <span className="font-bold text-slate-800">{room}</span>
                            <span className="font-mono text-slate-500 font-bold">{hour}</span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-slate-550 italic text-xs px-1">
                      <span>No corporate meeting rooms reserved for Wed, 24 June.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Vertical Section 4: Step 4 - Hotel Requests */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs hover:border-slate-300 transition-all">
                <div className="flex items-center pb-2.5 border-b border-slate-100 mb-4 select-none">
                  <h5 className="font-display font-semibold text-sm text-slate-855">Hotel Booking Requests</h5>
                </div>
                
                <div className="space-y-4 font-sans">
                  {hotelNeeded === 'yes' && hotelRequests.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {hotelRequests.map(req => (
                        <div key={req.id} className="bg-[#FAFAFD] border border-slate-100 rounded-2xl p-4 flex flex-col gap-2.5 text-xs">
                          <div className="flex justify-between items-center border-b border-slate-200/50 pb-1.5">
                            <span className="font-bold text-slate-800">Guest: {req.guestName || userName || '—'}</span>
                            <span className="text-[10px] bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full font-bold">Request</span>
                          </div>
                          <div className="grid grid-cols-2 gap-y-1.5 gap-x-2 text-[11px] text-slate-600">
                            <div>
                              <span className="text-slate-400 block font-semibold text-[9px] uppercase tracking-wider">Arrival</span>
                              <span className="font-mono text-slate-800 font-semibold">{formatDateDMY(req.checkIn)}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block font-semibold text-[9px] uppercase tracking-wider">Departure</span>
                              <span className="font-mono text-slate-800 font-semibold">{formatDateDMY(req.checkOut)}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block font-semibold text-[9px] uppercase tracking-wider">Breakfast</span>
                              <span className="font-semibold text-slate-850">{req.breakfast ? 'Included' : 'Not included'}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block font-semibold text-[9px] uppercase tracking-wider">Smoking Room</span>
                              <span className="font-semibold text-slate-800">{req.smokingRoom ? 'Smoking' : 'Non-smoking'}</span>
                            </div>
                          </div>
                          {req.comment && (
                            <div className="text-[11px] text-zinc-600 bg-white border border-slate-150 p-2.5 rounded-xl italic">
                              "{req.comment}"
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-slate-550 italic text-xs px-1">
                      <Check size={14} className="text-emerald-500" />
                      <span>No hotel rooms requested / hotel not required.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Vertical Section 5: Step 5 - Personal Calendar (New) */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs hover:border-slate-300 transition-all">
                <div className="flex items-center pb-2.5 border-b border-slate-100 mb-4 select-none">
                  <h5 className="font-display font-semibold text-sm text-slate-855">Personal Calendar Schedule</h5>
                </div>
                
                <div className="space-y-2 font-sans text-xs">
                  {personalCalendar.filter(c => c.selected).length > 0 ? (
                    <div className="space-y-2">
                      {personalCalendar.filter(c => c.selected).map(item => (
                        <div key={item.id} className="flex justify-between items-start p-2.5 bg-slate-50 border border-slate-150 rounded-xl">
                          <div>
                            <span className="font-bold text-slate-800 text-[13px] block">{item.title}</span>
                            <span className="font-mono text-[9px] text-[#f89728] uppercase tracking-wider font-bold mt-0.5 block">{item.category}</span>
                          </div>
                          <span className="font-mono text-[10px] text-slate-500 font-bold shrink-0">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-slate-500 italic text-xs px-1">
                      <span>No keynote or networking sessions selected for sync.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Vertical Section 6: Step 6 - Accompanying guest (New) */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs hover:border-slate-300 transition-all">
                <div className="flex items-center pb-2.5 border-b border-slate-100 mb-4 select-none">
                  <h5 className="font-display font-semibold text-sm text-slate-855">Accompanying Person</h5>
                </div>
                
                <div className="font-sans text-xs">
                  {accompanyingPerson.hasCompanion ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-1">
                      <div>
                        <span className="text-slate-400 block font-semibold text-[9px] uppercase tracking-wider">Full Name</span>
                        <span className="font-bold text-slate-800">{accompanyingPerson.name || '—'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-semibold text-[9px] uppercase tracking-wider">Email</span>
                        <span className="font-mono text-slate-800 font-semibold">{accompanyingPerson.email || '—'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-semibold text-[9px] uppercase tracking-wider">Assignment Role</span>
                        <span className="font-bold text-slate-800">{accompanyingPerson.relation} ({accompanyingPerson.badgeType})</span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-slate-500 italic px-1">No companion or secondary guest registered.</span>
                  )}
                </div>
              </div>

              {/* Vertical Section 7: Step 7 - Postcode range (New) */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs hover:border-slate-300 transition-all">
                <div className="flex items-center pb-2.5 border-b border-slate-100 mb-4 select-none">
                  <h5 className="font-display font-semibold text-sm text-slate-855">Postcode Boundary</h5>
                </div>
                
                <div className="font-sans text-xs p-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 block font-semibold text-[9px] uppercase tracking-wider">Assigned Range</span>
                      <span className="font-bold text-slate-800 font-mono text-sm">
                        {postcodeRange.startCode || '—'} — {postcodeRange.endCode || '—'}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 block font-semibold text-[9px] uppercase tracking-wider">Region Hub Office</span>
                      <span className="font-semibold text-slate-800">{postcodeRange.regionName || '—'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vertical Section 8: Step 8 - Travel commute (New) */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs hover:border-slate-300 transition-all">
                <div className="flex items-center pb-2.5 border-b border-slate-100 mb-4 select-none">
                  <h5 className="font-display font-semibold text-sm text-slate-855">Travel & Commute Details</h5>
                </div>
                
                <div className="font-sans text-xs grid grid-cols-1 sm:grid-cols-3 gap-4 p-1">
                  <div>
                    <span className="text-slate-400 block font-semibold text-[9px] uppercase tracking-wider">Mode</span>
                    <span className="font-bold text-slate-800">{travelMode.type}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold text-[9px] uppercase tracking-wider">Departure City</span>
                    <span className="font-semibold text-slate-800">{travelMode.departureCity || '—'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold text-[9px] uppercase tracking-wider">Arrival Date</span>
                    <span className="font-mono font-bold text-slate-800">{formatDateDMY(travelMode.arrivalDate)}</span>
                  </div>
                  {travelMode.carbonOffset && (
                    <div className="sm:col-span-3 border-t border-slate-100 pt-2 flex items-center gap-1.5 text-emerald-700 font-semibold text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>Certified Gold Standard Carbon Offset contribution committed.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Vertical Section 9: Step 9 - Orders (New) */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs hover:border-slate-300 transition-all">
                <div className="flex items-center pb-2.5 border-b border-slate-100 mb-4 select-none">
                  <h5 className="font-display font-semibold text-sm text-slate-855">Exhibitor Voucher Orders</h5>
                </div>
                
                <div className="font-sans text-xs space-y-2">
                  {exhibitorPassesCount === 0 && cateringVouchersCount === 0 && galaDinnerTicketsCount === 0 ? (
                    <span className="text-slate-500 italic px-1">No additional trade passes or catering vouchers ordered.</span>
                  ) : (
                    <div className="space-y-1.5 text-slate-700">
                      {exhibitorPassesCount > 0 && (
                        <div className="flex justify-between">
                          <span>Additional Exhibitor Badge Pass (×{exhibitorPassesCount})</span>
                          <span className="font-mono font-semibold">{(exhibitorPassesCount * 45).toFixed(2)} €</span>
                        </div>
                      )}
                      {cateringVouchersCount > 0 && (
                        <div className="flex justify-between">
                          <span>Exhibitor Catering Vouchers (×{cateringVouchersCount})</span>
                          <span className="font-mono font-semibold">{(cateringVouchersCount * 12.50).toFixed(2)} €</span>
                        </div>
                      )}
                      {galaDinnerTicketsCount > 0 && (
                        <div className="flex justify-between">
                          <span>Opening Night Gala Dinner Ticket (×{galaDinnerTicketsCount})</span>
                          <span className="font-mono font-semibold">{(galaDinnerTicketsCount * 85).toFixed(2)} €</span>
                        </div>
                      )}
                      <div className="flex justify-between border-t border-slate-150 pt-2 font-black text-[#f89728] text-[13px] leading-none">
                        <span>Shop Total:</span>
                        <span className="font-mono">
                          {(exhibitorPassesCount * 45 + cateringVouchersCount * 12.5 + galaDinnerTicketsCount * 85).toFixed(2)} €
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Vertical Section 10: Step 10 - Deputies (New) */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs hover:border-slate-300 transition-all">
                <div className="flex items-center pb-2.5 border-b border-slate-100 mb-4 select-none">
                  <h5 className="font-display font-semibold text-sm text-slate-855">Designated Proxy Deputy</h5>
                </div>
                
                <div className="font-sans text-xs">
                  {deputiesState.hasDeputy ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-1">
                      <div>
                        <span className="text-slate-400 block font-semibold text-[9px] uppercase tracking-wider">Proxy Full Name</span>
                        <span className="font-bold text-slate-800">{deputiesState.name || '—'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-semibold text-[9px] uppercase tracking-wider">Proxy Email</span>
                        <span className="font-mono text-slate-800 font-semibold">{deputiesState.email || '—'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-semibold text-[9px] uppercase tracking-wider">Contact Phone</span>
                        <span className="font-mono text-slate-800 font-semibold">{deputiesState.mobile || '—'}</span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-slate-500 italic px-1">No Stand Deputy designated.</span>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

          </div> {/* End of Scrollable Container */}

        {/* 4. Action navigation controls row - styled as a beautiful, docked bottom bar inside the main container */}
        <div id="wizard-navigation-toolbar" className="flex-shrink-0 z-10 w-full select-none border-t border-[#FED9B7] bg-[#FFF3E5]">
          <div className="bg-transparent py-3.5 px-6 sm:px-8 flex items-center justify-between w-full transition-all duration-300">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`
                px-5 py-2 bg-white border border-zinc-250 text-zinc-650 text-xs font-bold rounded-lg transition-all flex items-center gap-2 select-none
                ${currentStep === 0 
                  ? 'opacity-30 cursor-not-allowed border-zinc-100 text-zinc-400' 
                  : 'hover:bg-zinc-50 hover:border-zinc-350 cursor-pointer active:scale-[0.98]'
                }
              `}
            >
              <ArrowLeft size={14} className="stroke-[2.5]" />
              <span>{language === 'de' ? 'Zurück' : 'Back'}</span>
            </button>

            {currentStep === steps.length - 1 ? (
              <button
                onClick={handleFinish}
                className="px-6 py-2 bg-[#f89728] hover:bg-[#df7e10] active:scale-[0.98] text-white text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-2 select-none"
              >
                <span>{t.wizard.finishBtn}</span>
                <CheckCircle2 size={14} />
              </button>
            ) : (
              <button
                onClick={currentStep === 1 ? undefined : handleNext}
                disabled={currentStep === 1}
                className={`px-6 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 select-none ${
                  currentStep === 1 
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                    : "bg-[#f89728] hover:bg-[#df7e10] active:scale-[0.98] text-white cursor-pointer"
                }`}
                title={currentStep === 1 ? (language === 'de' ? 'Weitere Schritte sind gesperrt.' : "Further steps are locked.") : ""}
              >
                <span>{t.wizard.nextBtn}</span>
                <ArrowRight size={14} className="stroke-[2.5]" />
              </button>
            )}
          </div>
        </div>

        {/* Modal Overlay for Imprint/Privacy inside Wizard */}
        {activePolicy !== 'none' && (
          <div 
            onClick={() => setActivePolicy('none')}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-[9999] animate-fade-in"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 text-left border border-slate-100 max-h-[80vh] overflow-y-auto relative animate-scale-up"
            >
              <button
                onClick={() => setActivePolicy('none')}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
              >
                ✕
              </button>

              {activePolicy === 'imprint' ? (
                <div id="imprint-content-wizard" className="text-xs">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-[#f89728] mb-3">
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
                <div id="privacy-content-wizard" className="text-xs">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-[#f89728] mb-3">
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

        {/* End of Content Segment Wrapper */}
        </div>
      {/* End of Main Stage Container */}
      </div>

      {/* Step 4 Top-level Hotel Reservation Pop-up Modal */}
      {showAddHotelForm && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-lg shadow-2xl overflow-hidden flex flex-col my-10 sm:my-16 max-h-[80vh] sm:max-h-[85vh] animate-scale-in">
            {/* Header */}
            <div className="bg-[#1E293B] text-white px-5 py-3.5 flex items-center justify-between font-sans">
              <span className="text-xs font-bold tracking-tight uppercase font-display">Add hotel request</span>
              <button 
                type="button"
                onClick={() => setShowAddHotelForm(false)}
                className="text-slate-300 hover:text-white transition-colors cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs bg-white font-sans text-left">
              {/* Section 1: Status & Desired Hotel */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                <div className="space-y-1">
                  <label className="block text-[#4A5D7E] text-[10px] font-bold tracking-wide uppercase">Status</label>
                  <select
                    disabled
                    value={newHotelRequest.status}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs text-zinc-400 cursor-not-allowed font-semibold outline-none font-sans h-9"
                  >
                    <option value="Request">Request</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-[#4A5D7E] text-[10px] font-bold tracking-wide uppercase">Desired hotel</label>
                  <select
                    disabled
                    value={newHotelRequest.hotelId}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs text-zinc-400 cursor-not-allowed font-semibold outline-none font-sans h-9"
                  >
                    <option value="">Nothing selected</option>
                  </select>
                </div>
              </div>

              {/* Section 2: Check-in & Check-out date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                <div className="space-y-1">
                  <label className="block text-[#4A5D7E] text-[10px] font-bold tracking-wide uppercase">Arrival date *</label>
                  <input
                    type="date"
                    value={newHotelRequest.checkIn}
                    onChange={(e) => setNewHotelRequest({ ...newHotelRequest, checkIn: e.target.value })}
                    className="w-full bg-white border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs text-zinc-900 font-semibold outline-none hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 transition-all font-mono h-9"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[#4A5D7E] text-[10px] font-bold tracking-wide uppercase">Departure date *</label>
                  <input
                    type="date"
                    value={newHotelRequest.checkOut}
                    onChange={(e) => setNewHotelRequest({ ...newHotelRequest, checkOut: e.target.value })}
                    className="w-full bg-white border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs text-zinc-900 font-semibold outline-none hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 transition-all font-mono h-9"
                  />
                </div>
              </div>

              {/* Section 3: Room category & Guest Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                <div className="space-y-1">
                  <label className="block text-[#4A5D7E] text-[10px] font-bold tracking-wide uppercase">Room type</label>
                  <select
                    disabled
                    value={newHotelRequest.roomType}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs text-zinc-400 cursor-not-allowed font-semibold outline-none font-sans h-9"
                  >
                    <option value="Please select">Please select</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-[#4A5D7E] text-[10px] font-bold tracking-wide uppercase">Guest name</label>
                  <input
                    type="text"
                    placeholder="Guest name"
                    value={newHotelRequest.guestName}
                    onChange={(e) => setNewHotelRequest({ ...newHotelRequest, guestName: e.target.value })}
                    className="w-full bg-white border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs text-zinc-900 font-semibold outline-none hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 transition-all font-sans h-9"
                  />
                </div>
              </div>

              {/* Section 4: Smoking Room & Breakfast Checkboxes */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-5 py-1">
                <label className="flex items-center gap-2 select-none cursor-pointer text-slate-650 hover:text-slate-800 transition-colors">
                  <input
                    type="checkbox"
                    checked={newHotelRequest.smokingRoom}
                    onChange={(e) => setNewHotelRequest({ ...newHotelRequest, smokingRoom: e.target.checked })}
                    className="accent-[#f89728] w-4 h-4 rounded"
                  />
                  <span className="font-semibold text-xs text-[#4A5D7E]">Smoking room</span>
                </label>
                <label className="flex items-center gap-2 select-none cursor-pointer text-slate-650 hover:text-slate-800 transition-colors">
                  <input
                    type="checkbox"
                    checked={newHotelRequest.breakfast}
                    onChange={(e) => setNewHotelRequest({ ...newHotelRequest, breakfast: e.target.checked })}
                    className="accent-[#f89728] w-4 h-4 rounded"
                  />
                  <span className="font-semibold text-xs text-[#4A5D7E]">Breakfast</span>
                </label>
              </div>

              {/* Section 5: Early arrival & Late departure */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                <div className="space-y-1">
                  <label className="block text-[#4A5D7E] text-[10px] font-bold tracking-wide uppercase">Early arrival</label>
                  <select
                    disabled
                    value={newHotelRequest.earlyArrival}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs text-zinc-400 cursor-not-allowed font-semibold outline-none font-sans h-9"
                  >
                    <option value="none">none</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-[#4A5D7E] text-[10px] font-bold tracking-wide uppercase">Late departure</label>
                  <select
                    disabled
                    value={newHotelRequest.lateDeparture}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs text-zinc-400 cursor-not-allowed font-semibold outline-none font-sans h-9"
                  >
                    <option value="none">none</option>
                  </select>
                </div>
              </div>

              {/* Section 6: Comment textarea */}
              <div className="space-y-1">
                <label className="block text-[#4A5D7E] text-[10px] font-bold tracking-wide uppercase">Comment</label>
                <textarea
                  placeholder="Comment"
                  rows={2}
                  value={newHotelRequest.comment}
                  onChange={(e) => setNewHotelRequest({ ...newHotelRequest, comment: e.target.value })}
                  className="w-full bg-white border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs text-zinc-900 font-semibold outline-none hover:border-[#f89728]/60 focus:border-[#f89728] focus:ring-2 focus:ring-[#f89728]/10 transition-all resize-none font-sans"
                />
              </div>

              {/* Section 7: Terms and conditions agreement check */}
              <label className="flex items-start gap-2.5 select-none cursor-pointer">
                <input
                  type="checkbox"
                  checked={newHotelRequest.termsAccepted}
                  onChange={(e) => setNewHotelRequest({ ...newHotelRequest, termsAccepted: e.target.checked })}
                  className="accent-[#f89728] w-4 h-4 rounded mt-0.5 shrink-0"
                />
                <span className="text-zinc-500 text-[11px] leading-snug font-medium">
                  I have read and accept the <span className="underline text-orange-600 hover:text-[#f89728] cursor-pointer font-bold">terms & conditions</span> (please check the box to continue).
                </span>
              </label>
            </div>

            {/* Modal Footer Controls */}
            <div className="bg-slate-50 border-t border-slate-100 px-6 py-4 flex items-center justify-end gap-3 font-sans">
              <button
                type="button"
                onClick={() => setShowAddHotelForm(false)}
                className="px-4.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddHotelRequest}
                className="px-5 py-2 bg-[#f89728] hover:bg-[#df7e10] text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors shadow-sm active:scale-[0.98]"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Simulative feedback toast messages block */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 border border-slate-800 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-medium z-50 max-w-sm border-l-4 border-l-xfair-orange animate-slide-up">
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

      {/* 4.5. Seperated Out End static footer of 'Imprint and data privacy' covering the whole page width */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-100 border-t border-slate-200/80 py-2.5 sm:py-3 select-none text-center z-40 h-11 flex items-center justify-center shadow-[0_-1px_3px_rgba(0,0,0,0.02)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex items-center justify-center gap-6">
          <span className="font-bold text-[11px] font-sans text-slate-500">
            {t.footer.imprintLabel}
          </span>
          <span className="text-slate-300">|</span>
          <span className="font-bold text-[11px] font-sans text-slate-500">
            {t.footer.privacyLabel}
          </span>
        </div>
      </footer>
    </div>
  );
}
