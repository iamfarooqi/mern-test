import axios, { AxiosError } from 'axios';
import { Customer } from '../types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addCustomerThunk = createAsyncThunk(
  'customer/addCustomerAsync',
  async (customerData: Customer, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('userName', customerData.userName);
      formData.append('customerName', customerData.customerName);
      formData.append('email', customerData.email);
      if (customerData.profilePicture) {
        formData.append('image', customerData.profilePicture);
      }

      const response = await axios.post('api/customer/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data for file upload
        },
      });

      return response.data; // Assuming the response data is the new customer
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getCustomerThunk = createAsyncThunk(
  'customer/getCustomerAsync',
  async () => {
    try {
      const response = await axios.get('api/customer/get');
      return response.data;
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from the server.');
        // Note: No need to throw error here
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
        // Note: No need to throw error here
      }
    }
  }
);

export const deleteCustomerThunk = createAsyncThunk(
  'customer/deleteCustomerAsync',
  async (customerId: any, { rejectWithValue }) => {
    try {
      const response = await axios.post('api/customer/delete', { customerId });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const editCustomerThunk = createAsyncThunk(
  'customer/editCustomerAsync',
  async (customerData: Customer, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('userName', customerData.userName);
      formData.append('customerName', customerData.customerName);
      formData.append('email', customerData.email);
      if (customerData.profilePicture) {
        formData.append('image', customerData.profilePicture);
      }

      const response = await axios.put(
        `api/customer/edit/${customerData.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

