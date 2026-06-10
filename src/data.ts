import { UpcomingEvent, Registration } from './types';

export const INITIAL_UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    id: 'ue-5',
    title: 'Bauma 2028 - Employee Registration 2028',
    dateRange: '13/03/2028 - 19/03/2028',
    location: 'Unterschleissheim, Germany',
    hasLogo: false,
    logoText: 'B28',
    category: 'Employee Registration'
  },
  {
    id: 'ue-1',
    title: 'Dublin Tech Summit 2026',
    dateRange: '17/06/2026 - 18/06/2026',
    location: 'Dublin, Ireland',
    hasLogo: false,
    logoText: 'DTS'
  },
  {
    id: 'ue-2',
    title: 'EBACE 2026',
    dateRange: '26/05/2026 - 28/05/2026',
    location: 'Geneva, Switzerland',
    hasLogo: true,
    category: 'Aviation conference'
  },
  {
    id: 'ue-3',
    title: 'Money20/20 Amsterdam 2026',
    dateRange: '02/06/2026 - 04/06/2026',
    location: 'Amsterdam, Netherlands',
    hasLogo: true,
    category: 'Finance show'
  },
  {
    id: 'ue-4',
    title: 'ESAIC 2026',
    dateRange: '06/06/2026 - 08/06/2026',
    location: 'Munich, Germany',
    hasLogo: true,
    category: 'Medical trade'
  }
];

export const INITIAL_REGISTRATIONS: Registration[] = [
  {
    id: 'reg-b1',
    title: 'Dublin Tech Summit 2026',
    dateRange: '17/06/2026 - 18/06/2026',
    location: 'Dublin, Ireland',
    status: 'not_registered',
    isTest: false,
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=650&q=80'
  },
  {
    id: 'reg-b2',
    title: 'EBACE 2026',
    dateRange: '26/05/2026 - 28/05/2026',
    location: 'Geneva, Switzerland',
    status: 'registered',
    isTest: true,
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=650&q=80'
  },
  {
    id: 'reg-1',
    title: 'Bauma 2022 - Criteria Dependancies Registration',
    location: 'München, Germany',
    status: 'not_registered', // Set to not_registered to showcase "Register" button & timeline start date
    isTest: true
  },
  {
    id: 'reg-2',
    title: 'Light and Building 2026 - Employee Registration',
    dateRange: '17/03/2026 - 21/03/2026',
    location: 'Frankfurt, Germany',
    status: 'registered',
    isTest: true,
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'reg-4',
    title: 'SP Event 2026 - SP Employee Registration',
    dateRange: '26/03/2026 - 31/03/2026',
    location: 'München, Germany',
    customText: 'SP Employee Registration',
    status: 'incomplete',
    isTest: true
  },
  {
    id: 'reg-bauma2028',
    title: 'Bauma 2028 - Employee Registration 2028',
    dateRange: '13/03/2028 - 19/03/2028',
    location: 'Unterschleissheim, Germany',
    customText: 'Employee Registration',
    status: 'not_registered',
    isTest: true,
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80'
  }
];
