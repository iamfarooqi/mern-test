import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Customer, CustomerState } from '../types';

const initialState: CustomerState = {
  customers: [],
  loading: false,
  error: null,
};

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.customers.push(action.payload);
    },

    updateCustomer: (state, action: PayloadAction<Customer>) => {
      const index = state.customers.findIndex((c) => c.id == action.payload.id);
      if (index !== -1) {
        state.customers[index] = action.payload;
      }
    },

    deleteCustomer: (state, action: PayloadAction<string>) => {
      state.customers = state.customers.filter(
        (customer) => customer.id !== action.payload
      );
    },
    fetchCustomersBegin: (state) => {
      state.loading = true;
    },
    fetchCustomersSuccess: (state, action: PayloadAction<Customer[]>) => {
      state.loading = false;
      state.customers = action.payload;
    },
    fetchCustomersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    // You can add more reducers as needed for other CRUD operations
  },
});

export const {
  fetchCustomersBegin,
  fetchCustomersSuccess,
  fetchCustomersFailure,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} = customerSlice.actions;

export default customerSlice.reducer;
