'use client';
export interface Customer {
  _id: any;
  userName: string;
  customerName: string;
  email: string;
  profilePicture: File | null;
}

export interface CustomerState {
  customers: Customer[];
  loading: boolean;
  error: string | null;
}
