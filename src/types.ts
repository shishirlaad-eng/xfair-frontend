/**
 * Shared types for Xfair EMS Portal modernization
 */

export type Language = 'en' | 'uk' | 'de';

export interface UpcomingEvent {
  id: string;
  title: string;
  dateRange?: string; // some have, some don't
  location: string;
  hasLogo: boolean;
  logoText?: string;
  category?: string;
  imageUrl?: string;
}

export type RegistrationStatus = 'incomplete' | 'registered' | 'not_registered';

export interface Registration {
  id: string;
  title: string;
  dateRange?: string;
  location: string;
  status: RegistrationStatus;
  isTest: boolean;
  customText?: string;
  imageUrl?: string;
}

export interface UserSession {
  username: string;
  email: string;
  isLoggedIn: boolean;
}
