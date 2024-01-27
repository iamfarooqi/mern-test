import Modal from '@/common/modal';
import React, { useState } from 'react';

interface AddCustomerProps {
  open: boolean;
  setOpen: (arg0: boolean) => void;
}

const AddCustomerModal: React.FC<AddCustomerProps> = ({ open, setOpen }) => {
  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="w-96 rounded-xl shadow">
        <div className="flex flex-col items-center justify-between p-4 md:p-5 border-b bg-primary-color rounded-t-xl">
          <button
            onClick={() => setOpen(false)}
            className="end-2.5 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:opacity-60"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <h3 className="text-2xl font-semibold text-white">
            Add New Customer
          </h3>
        </div>
        <div className="p-4 md:p-5">
          <form className="space-y-4" action="#">
            <div className="py-1">
              <input
                type="text"
                name="userName"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Username"
                required
              />
            </div>
            <div className="py-1">
              <input
                type="text"
                name="customerName"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Customer Name"
                required
              />
            </div>
            <div className="py-1">
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Email"
                required
              />
            </div>

            <div className="flex justify-between">
              <a href="#" className="text-sm text-blue-700 hover:underline">
                Upload Photo
              </a>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-primary-color hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center uppercase"
            >
              Add Customer
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AddCustomerModal;
