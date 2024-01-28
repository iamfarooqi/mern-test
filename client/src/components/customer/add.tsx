import React, { useState } from 'react';

import { addCustomerThunk } from '@/redux/thunks/customerThunks';
import { useAppDispatch } from '@/redux/hooks';
import Modal from '@/common/modal';

interface AddCustomerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AddCustomerModal: React.FC<AddCustomerProps> = ({ open, setOpen }) => {
  const dispatch = useAppDispatch();
  const [fileError, setFileError] = useState('');
  const [customerData, setCustomerData] = useState({
    _id: '',
    userName: '',
    customerName: '',
    email: '',
    profilePicture: null as File | null,
  });

  const MAX_SIZE = 100 * 1024;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const file = files && files[0];
    if (file) {
      if (file.type !== 'image/png') {
        setFileError('Please upload a PNG image.');
      } else if (file.size > MAX_SIZE) {
        setFileError('File size should not exceed 100KB.');
      } else {
        setCustomerData({ ...customerData, profilePicture: file });
        setFileError('');
      }
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(addCustomerThunk(customerData));
    } catch (error) {
      console.log('Error', error);
    } finally {
      setOpen(false);
    }
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="w-96 rounded-xl shadow">
        <div className="flex flex-col items-center justify-between p-4 md:p-5 border-b rounded-t-xl bg-gradient-to-r from-[#50B389] via-[#328B6E] to-[#095748]">
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
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
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="py-1">
              <input
                type="text"
                name="userName"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Username"
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="py-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="upload-photo"
                required
              />
              <label
                htmlFor="upload-photo"
                className="text-sm text-blue-700 hover:underline cursor-pointer"
              >
                Upload Photo
              </label>
              {fileError && <p className="text-red-500">{fileError}</p>}
            </div>
            {fileError ? (
              <button
                className="w-full text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center uppercase bg-gradient-to-r from-[#50B389] via-[#328B6E] to-[#095748] cursor-not-allowed opacity-75"
                disabled
              >
                Add Customer
              </button>
            ) : (
              <button
                type="submit"
                className="w-full text-white hover:opacity-75 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center uppercase bg-gradient-to-r from-[#50B389] via-[#328B6E] to-[#095748]"
              >
                Add Customer
              </button>
            )}
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AddCustomerModal;
