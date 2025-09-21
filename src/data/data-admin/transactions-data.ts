// import { type } from "os";
import { TransactionStatus } from "@/types/payment";

export type TransactionType = "STUDENT_PAYMENT" | "TEACHER_SALARY";
export type EducationLevel = "SD" | "SMP" | "SMA";

export interface TransactionData {
  id: number;
  transaction_type: TransactionType;
  reference_id: string;
  person_name: string;
  person_id: number;
  education_level: EducationLevel;
  program_name?: string;
  program_id?: number;
  total_amount: number;
  status: TransactionStatus;
  transaction_date: string;
  due_date: string;
  payment_proof?: string;
  notes?: string;
  details?: {
    payment_method?: string;
    bank_name?: string;
    account_number?: string;
    month_period?: string;
    additional_info?: string;
  };
}

const transactionsData: TransactionData[] = [
  // Student Payments
  {
    id: 1,
    transaction_type: "STUDENT_PAYMENT",
    reference_id: "INV/2025/06/001",
    person_name: "Kadek Ayu Putri",
    person_id: 1,
    education_level: "SMP",
    program_name: "English for Beginners",
    program_id: 1,
    total_amount: 1500000,
    status: "PAID",
    transaction_date: "2025-06-01",
    due_date: "2025-06-10",
    details: {
      payment_method: "Bank Transfer",
      bank_name: "BCA",
      account_number: "1234567890",
      month_period: "Juni 2025",
    },
  },
  {
    id: 2,
    transaction_type: "STUDENT_PAYMENT",
    reference_id: "INV/2025/06/002",
    person_name: "I Made Wirawan",
    person_id: 2,
    education_level: "SMA",
    program_name: "Mathematics Advanced",
    program_id: 2,
    total_amount: 2000000,
    status: "PENDING",
    transaction_date: "2025-06-05",
    due_date: "2025-06-15",
    details: {
      payment_method: "Cash",
      month_period: "Juni 2025",
    },
  },
  // Teacher Salaries
  {
    id: 3,
    transaction_type: "TEACHER_SALARY",
    reference_id: "SAL/2025/06/001",
    person_name: "Ni Putu Devi",
    person_id: 101,
    education_level: "SMA",
    total_amount: 4500000,
    status: "PAID",
    transaction_date: "2025-06-01",
    due_date: "2025-06-05",
    details: {
      payment_method: "Bank Transfer",
      bank_name: "Mandiri",
      account_number: "9876543210",
      month_period: "Juni 2025",
      additional_info: "Including transportation allowance",
    },
  },
  {
    id: 4,
    transaction_type: "TEACHER_SALARY",
    reference_id: "SAL/2025/06/002",
    person_name: "I Nyoman Artha",
    person_id: 102,
    education_level: "SD",
    total_amount: 3800000,
    status: "UNPAID",
    transaction_date: "2025-06-01",
    due_date: "2025-06-05",
    details: {
      payment_method: "Bank Transfer",
      bank_name: "BNI",
      account_number: "5678901234",
      month_period: "Juni 2025",
    },
  },
] as const;

export { transactionsData };
