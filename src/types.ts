export interface ServicePackage {
  id: string;
  name: string;
  price: number;
  subtitle: string;
  description: string;
  suitability: string;
  includes: string[];
}

export interface MaintenanceService {
  id: string;
  name: string;
  price: number;
  billing: string;
  description: string;
  includes: string[];
}

export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  serviceId: string;
  isNewWeb: boolean; // true = new, false = redesign
  hasDomain: 'yes' | 'no' | 'need-help';
  webTopic?: string; // Téma / zaměření webu
  designIdea: string;
  selectedFeatures: string[]; // e.g. ["gallery", "form", "seo", "blog", "multilang"]
  customNote?: string;
  referral?: string; // Jak jste se o nás dozvěděl/a?
}

export interface InquiryResult {
  id: string;
  submittedAt: string;
  formData: InquiryFormData;
  calculatedPrice: number;
  proposalText: string;
  status: 'new' | 'contacted' | 'completed';
}
