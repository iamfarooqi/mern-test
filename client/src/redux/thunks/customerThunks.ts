// import { AppDispatch } from '../store';
// import {
//   fetchCustomersBegin,
//   fetchCustomersSuccess,
//   fetchCustomersFailure,
// } from '../slices/customerSlice';
// import { CustomerData } from '../types';

// export const fetchCustomers = () => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(fetchCustomersBegin());
//     const response = await fetch('/api/customers');
//     const customers = await response.json();
//     dispatch(fetchCustomersSuccess(customers));
//   } catch (error) {
//     if (error instanceof Error) {
//       dispatch(fetchCustomersFailure(error.message));
//     } else {
//       // Handle cases where the error is not an instance of Error
//       dispatch(fetchCustomersFailure('An unknown error occurred'));
//     }
//   }
// };

// export const addCustomerAsync = (customerData: CustomerData) => async (dispatch: AppDispatch) => {
//   try {
//     const response = await fetch('/api/customers/add', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(customerData),
//     });
//     const newCustomer = await response.json();
//     dispatch(addCustomer(newCustomer));
//   } catch (error) {
//     console.error('Failed to add customer:', error);
//     // Optionally dispatch an error action here
//   }
// };
