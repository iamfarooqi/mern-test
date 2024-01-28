import Modal from '@/common/modal';
import { useAppDispatch } from '@/redux/hooks';
import { deleteCustomer } from '@/redux/slices/customerSlice';
import { deleteCustomerThunk } from '@/redux/thunks/customerThunks';
import { Customer } from '@/redux/types';
import React from 'react';

interface AddCustomerProps {
  open: boolean;
  setOpen: (arg0: boolean) => void;
  customer: Customer | null; // Add this line
}

const DeleteCustomerModal: React.FC<AddCustomerProps> = ({
  open,
  setOpen,
  customer,
}) => {
  const dispatch = useAppDispatch();

  const handleDeleteCustomer = (customer: any) => {
    try {
      const id = customer?._id;
      dispatch(deleteCustomerThunk(id));
    } catch (error) {
      console.log(error);
    } finally {
      setOpen(false);
    }
  };
  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="w-96 rounded-xl shadow">
        <div className="flex flex-col items-center justify-between p-4 md:p-5 rounded-t-xl">
          <button
            onClick={() => setOpen(false)}
            className="end-2.5 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:opacity-60"
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
        </div>
        <div className="pb-6 px-4 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="mx-auto mb-4 text-red-600 w-12 h-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>

          <h3 className="mb-5 text-lg font-bold">Are you sure?</h3>
          <p className="mb-5 text-md font-normal ">
            Do you really want to delete this customer? This process cannot be
            undone.
          </p>
          <button className="text-white bg-gray-400 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-12 py-2.5 mt-4 text-center me-6 uppercase">
            cancel
          </button>
          <button
            onClick={() => handleDeleteCustomer(customer)}
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-12 py-2.5 hover:text-gray-900 focus:z-10 uppercase"
          >
            delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteCustomerModal;
