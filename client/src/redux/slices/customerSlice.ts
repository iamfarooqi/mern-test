import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Customer, CustomerState } from '../types';
import {
  addCustomerThunk,
  deleteCustomerThunk,
  editCustomerThunk,
  getCustomerThunk,
} from '../thunks/customerThunks';

const initialState: CustomerState = {
  customers: [],
  loading: true,
  error: null,
};

export const customerSlice: any = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state: CustomerState) => {
      state.loading = true;
      state.error = null;
    };
    const handleRejected = (state: CustomerState, action: any) => {
      state.loading = false;
      state.error = action.payload;
    };
    builder

      // Adding Customer Data
      .addCase(addCustomerThunk.pending, handlePending)
      .addCase(
        addCustomerThunk.fulfilled,
        (state, action: PayloadAction<{ customerData: Customer }>) => {
          state.loading = false;
          state.customers.push(action.payload.customerData);
        }
      )
      .addCase(addCustomerThunk.rejected, handleRejected)

      // Getting Customer Data
      .addCase(getCustomerThunk.pending, handlePending)
      .addCase(
        getCustomerThunk.fulfilled,
        (state, action: PayloadAction<{ customerData: Customer }>) => {
          state.loading = false;
          if (action.payload && action.payload.customerData) {
            let flattenedCustomers: any[] = [];
            if (Array.isArray(action.payload.customerData)) {
              flattenedCustomers = action.payload.customerData.flat();
            } else {
              flattenedCustomers = [action.payload.customerData];
            }
            const uniqueCustomers: any = Array.from(
              new Set(flattenedCustomers.map((customer: any) => customer._id))
            ).map((id) =>
              flattenedCustomers.find((customer: any) => customer._id == id)
            );
            state.customers = uniqueCustomers;
          } else {
            console.error(
              'Unexpected payload structure or error in response:',
              action.payload
            );
          }
        }
      )
      .addCase(getCustomerThunk.rejected, handleRejected)

      // Deleting Customer Data
      .addCase(deleteCustomerThunk.pending, handlePending)
      .addCase(
        deleteCustomerThunk.fulfilled,
        (state, action: PayloadAction<{ customerData: Customer }>) => {
          state.loading = false;
          // Assuming you are removing the deleted customer from the array
          state.customers = state.customers.filter(
            (customer: any) => customer._id !== action.payload.customerData._id
          );
        }
      )
      .addCase(deleteCustomerThunk.rejected, handleRejected)

      // Edit Customer Data
      .addCase(editCustomerThunk.pending, handlePending)
      .addCase(editCustomerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = state.customers.map((customer: any) =>
          customer._id === action.payload.customerData._id
            ? action.payload.customerData
            : customer
        );
      })
      .addCase(editCustomerThunk.rejected, handleRejected);
  },
});

export const { addCustomer, updateCustomer, deleteCustomer } =
  customerSlice.actions;

export default customerSlice.reducer;
