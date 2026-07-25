export type LeadStatus =
  | 'New Lead'
  | 'Called'
  | 'Interested'
  | 'Follow-up'
  | 'Callback Later'
  | 'No Response'
  | 'Busy'
  | 'Switched Off'
  | 'Wrong Number'
  | 'Not Interested'
  | 'Documents Pending'
  | 'Documents Received'
  | 'Verification Pending'
  | 'Verification Completed'
  | 'Account Opened'
  | 'Credit Card Approved'
  | 'Loan Approved'
  | 'Completed';

export const LEAD_STATUS_LIST: LeadStatus[] = [
  'New Lead',
  'Called',
  'Interested',
  'Follow-up',
  'Callback Later',
  'No Response',
  'Busy',
  'Switched Off',
  'Wrong Number',
  'Not Interested',
  'Documents Pending',
  'Documents Received',
  'Verification Pending',
  'Verification Completed',
  'Account Opened',
  'Credit Card Approved',
  'Loan Approved',
  'Completed',
];

export interface Lead {
  id: string; // e.g., P247-20260724-1001
  date: string; // YYYY-MM-DD
  time: string; // HH:MM AM/PM
  name: string;
  mobile: string;
  whatsapp: string;
  email?: string;
  district: string;
  state: string;
  address: string;
  product: string;
  leadSource?: string;
  preferredCallTime?: string;
  message?: string;
  assignedTelecaller: string; // Name or "Unassigned"
  assignedTelecallerId?: string;
  status: LeadStatus;
  nextFollowUpDate?: string;
  remarks: string;
  lastUpdated: string; // ISO or formatted string
  updatedBy?: string;
  ipAddress?: string;
  deviceInfo?: string;
  browserInfo?: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'Banking' | 'Loans' | 'Investment' | 'Services & Jobs';
  description: string;
  benefits: string[];
  eligibility: string;
  requiredDocuments: string[];
  iconName: string;
  badge?: string;
  tagline?: string;
}

export interface TelecallerUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  username: string;
  password?: string;
  activeLeadsCount?: number;
  completedLeadsCount?: number;
}

export interface AppConfig {
  googleSheetsWebhookUrl: string;
  autoSyncGoogleSheets: boolean;
  companyName: string;
  contactPhone: string;
  whatsappPhone: string;
  email: string;
  address: string;
}
