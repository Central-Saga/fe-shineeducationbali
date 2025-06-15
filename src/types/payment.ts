export type TransactionStatus = "PAID" | "UNPAID" | "PENDING";

export interface Transaction {
  id: number;
  student_id: number;
  program_id: number;
  total_amount: number;
  payment_method: string;
  status: TransactionStatus;
  transaction_date: string;
  due_date: string;
  payment_proof?: string;
  notes?: string;
}

export interface BankAccount {
  id: number;
  bank_name: string;
  account_number: string;
  account_holder: string;
  branch: string;
  is_active: boolean;
}

export interface PaymentMethod {
  id: number;
  name: string;
  description?: string;
  is_active: boolean;
}

export interface PaymentSettings {
  allowed_payment_methods: string[];
  payment_due_days: number;
  late_payment_fee: number;
  send_payment_reminder: boolean;
  reminder_days_before: number[];
}
