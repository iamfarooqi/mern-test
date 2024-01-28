import React, { useState } from 'react';
import DeleteCustomerModal from './customer/delete';
import AddCustomerModal from './customer/add';
import EditCustomerModal from './customer/edit';
import { useAppSelector } from '@/redux/hooks';

interface Props {
  setMobileFiltersOpen: (arg0: boolean) => void;
}

const Table: React.FC<Props> = ({ setMobileFiltersOpen }) => {
  const customers = useAppSelector((state) => state.customer.customers);
  const [deleteCustomerModal, setDeleteCustomerModal] = useState(false);
  const [editCustomerModal, setEditCustomerModal] = useState(false);
  const [addCustomerModal, setAddCustomerModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  return (
    <div className="h-screen bg-gray-100 overflow-y-scroll">
      <DeleteCustomerModal
        open={deleteCustomerModal}
        customer={selectedCustomer} // This should be the customer you want to edit
        setOpen={setDeleteCustomerModal}
      />
      <AddCustomerModal open={addCustomerModal} setOpen={setAddCustomerModal} />
      <EditCustomerModal
        open={editCustomerModal}
        setOpen={setEditCustomerModal}
        customer={selectedCustomer} // This should be the customer you want to edit
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-b bg-white border-gray-200 shadow-lg">
        <div className="flex items-baseline justify-between p-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Customers
          </h1>

          <div className="flex items-center">
            <button
              type="button"
              className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </main>
      <main className="">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 ">
          <button
            onClick={() => setAddCustomerModal(true)}
            className="px-4 py-2 mb-10 mt-4 text-xl font-semibold text-center text-white transition duration-300 rounded-lg hover:opacity-75 flex items-center ease bg-gradient-to-br from-primary-color to-secondary-color md:w-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <p className="uppercase text-sm ml-3">add new customer</p>
          </button>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full border-separate border-spacing-y-4  text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-primary-color bg-[#015249]/30">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Customer Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {customers?.map((data: any, index: any) => {
                  const { customerName, userName, email } = data;
                  return (
                    <tr
                      key={index}
                      className="bg-white border-b rounded-lg hover:bg-gray-50 py-8"
                    >
                      <td className="p-4 py-8">
                        <img
                          src="/docs/images/products/apple-watch.png"
                          className="w-16 md:w-32 max-w-full max-h-full"
                          alt="Apple Watch"
                        />
                      </td>
                      <td className="px-6 py-8 font-semibold text-gray-900 ">
                        {userName}
                      </td>
                      <td className="px-6 py-8 font-semibold text-gray-900 ">
                        {customerName}
                      </td>
                      <td className="px-6 py-8 font-semibold text-gray-900">
                        {email}
                      </td>
                      <td className="px-6 py-8 flex justify-evenly">
                        <button
                          onClick={() => {
                            setSelectedCustomer(data);
                            setEditCustomerModal(true);
                          }}
                          className="px-4 py-[2px] font-medium text-green-600 bg-green-500/50 rounded hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setSelectedCustomer(data);
                            setDeleteCustomerModal(true);
                          }}
                          className="px-4 py-[2px] font-medium text-red-600 bg-red-500/50 rounded hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {customers.length == 0 && <div>No Data</div>}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Table;
