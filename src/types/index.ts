export interface Tour {
  id: number;
  name: string;
  slug: string;
  price: number;
  isPackage?: boolean;
  packageLabel?: string;
  duration: string;
  category: TourCategory;
  image: string;
  description: string;
  shortDescription: string;
  included: string[];
  notIncluded?: string[];
  whatToBring: string[];
  highlights: string[];
  pickupInfo: string;
  restrictions?: string[];
  seasonal?: string;
  offeredDaily?: boolean;
  rating: number;
  reviewCount: number;
}

export type TourCategory =
  | 'Adventure'
  | 'Water Sports'
  | 'Nature & Wildlife'
  | 'City Tours';

export interface BookingDetails {
  tourId: number;
  tourName: string;
  date: Date | null;
  pickupTime: '9:00AM' | '2:00PM';
  guestName: string;
  adults: number;
  fullPrice: number;
  depositAmount: number;
  cashBalance: number;
  totalDeposit: number;
  isPackage?: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
  avatar?: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category?: string;
}
