'use client';
export interface Customer {
  id: string;
  userName: string;
  customerName: string;
  email: string;
}

export interface CustomerState {
  customers: Customer[];
  loading: boolean;
  error: string | null;
}
