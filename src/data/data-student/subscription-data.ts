export interface Subscription {
  id: string;
  name: string;
  price: number;
  billingCycle: 'monthly' | 'quarterly' | 'yearly';
  features: string[];
  isPopular?: boolean;
  programAccess: number; // Number of programs accessible
  liveLessons: number; // Hours of live lessons per month
  certificateIncluded: boolean;
  supportLevel: 'basic' | 'priority' | 'dedicated';
  color?: string;
}

export interface UserSubscription {
  id: string;
  subscriptionId: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'canceled';
  autoRenew: boolean;
  paymentMethod: string;
  lastPaymentDate: string;
  nextPaymentDate: string;
  invoiceHistory: {
    id: string;
    date: string;
    amount: number;
    status: 'paid' | 'pending' | 'failed';
  }[];
}

export const subscriptionPlans: Subscription[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 150000,
    billingCycle: 'monthly',
    features: [
      'Akses 3 Kursus',
      '5 Jam Kelas Live per Bulan',
      'Materi Pembelajaran Dasar',
      'Forum Diskusi',
      'Dukungan Email'
    ],
    programAccess: 3,
    liveLessons: 5,
    certificateIncluded: false,
    supportLevel: 'basic',
    color: '#6E7881'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 300000,
    billingCycle: 'monthly',
    features: [
      'Akses 10 Kursus',
      '15 Jam Kelas Live per Bulan',
      'Materi Pembelajaran Premium',
      'Forum Diskusi',
      'Dukungan Prioritas',
      'Sertifikat Kelulusan',
      'Konsultasi dengan Guru'
    ],
    isPopular: true,
    programAccess: 10,
    liveLessons: 15,
    certificateIncluded: true,
    supportLevel: 'priority',
    color: '#DAA625'
  },
  {
    id: 'ultimate',
    name: 'Ultimate',
    price: 500000,
    billingCycle: 'monthly',
    features: [
      'Akses Semua Kursus',
      'Kelas Live Tak Terbatas',
      'Semua Materi Pembelajaran',
      'Forum Diskusi VIP',
      'Dukungan Guru Pribadi',
      'Sertifikat Kelulusan',
      'Konsultasi Pribadi dengan Ahli',
      'Akses ke Materi Eksklusif',
      'Sesi Belajar Kelompok Kecil'
    ],
    programAccess: 999, // Unlimited
    liveLessons: 999, // Unlimited
    certificateIncluded: true,
    supportLevel: 'dedicated',
    color: '#C40503'
  }
];

export const currentSubscription: UserSubscription = {
  id: 'sub-123',
  subscriptionId: 'premium',
  startDate: '2025-01-15',
  endDate: '2025-08-15',
  status: 'active',
  autoRenew: true,
  paymentMethod: 'Credit Card',
  lastPaymentDate: '2025-07-01',
  nextPaymentDate: '2025-08-01',
  invoiceHistory: [
    {
      id: 'inv-001',
      date: '2025-07-01',
      amount: 300000,
      status: 'paid'
    },
    {
      id: 'inv-002',
      date: '2025-06-01',
      amount: 300000,
      status: 'paid'
    },
    {
      id: 'inv-003',
      date: '2025-05-01',
      amount: 300000,
      status: 'paid'
    }
  ]
};
