import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Customer, CustomerState } from '../types';
import {
  addCustomerThunk,
  deleteCustomerThunk,
  editCustomerThunk,
  getCustomerThunk,
} from '../thunks/customerThunks';

const initialState: CustomerState = {
  customers: [],
  loading: false,
  error: null,
};

export const customerSlice: any = createSlice({
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
  },
  extraReducers: (builder) => {
    builder

      // Adding Customer Data
      .addCase(addCustomerThunk.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCustomerThunk.fulfilled, (state, action: any) => {
        state.loading = false;
        state.customers.push(action.payload.customerData);
      })
      .addCase(addCustomerThunk.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Getting Customer Data
      .addCase(getCustomerThunk.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCustomerThunk.fulfilled, (state, action: any) => {
        state.loading = false;
        if (action.payload && action.payload.customerData) {
          const flattenedCustomers = action.payload.customerData.flat();
          const uniqueCustomers: any = Array.from(
            new Set(flattenedCustomers.map((customer: any) => customer._id))
          ).map((id) =>
            flattenedCustomers.find((customer: any) => customer._id == id)
          );
          state.customers = uniqueCustomers;
        } else {
          console.error(
            'Unexpected payload structure or error in response:',
            action.payload,
            (state.error = action.payload)
          );
        }
      })
      .addCase(getCustomerThunk.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.payload; // Assuming payload contains the error message
      })

      // Deleting Customer Data
      .addCase(deleteCustomerThunk.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCustomerThunk.fulfilled, (state, action: any) => {
        state.loading = false;
        // Assuming you are removing the deleted customer from the array
        state.customers = state.customers.filter(
          (customer: any) => customer._id !== action.payload.customerData._id
        );
      })
      .addCase(deleteCustomerThunk.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Edit Customer Data
      .addCase(editCustomerThunk.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editCustomerThunk.fulfilled, (state, action) => {
        state.loading = false;
        // Replace the existing customer with the edited one in the array
        state.customers = state.customers.map((customer: any) =>
          customer._id === action.payload.customerData._id
            ? action.payload.customerData
            : customer
        );
      })
      .addCase(editCustomerThunk.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
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
