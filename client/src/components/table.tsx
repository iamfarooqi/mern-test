import React, { useEffect, useState } from 'react';
import DeleteCustomerModal from './customer/delete';
import AddCustomerModal from './customer/add';
import EditCustomerModal from './customer/edit';
import { useAppSelector } from '@/redux/hooks';

interface Props {
  setMobileFiltersOpen: (arg0: boolean) => void;
}

const Table: React.FC<Props> = ({ setMobileFiltersOpen }) => {
  const { customers, loading, error } = useAppSelector(
    (state: any) => state.customer
  );
  const [deleteCustomerModal, setDeleteCustomerModal] = useState(false);
  const [editCustomerModal, setEditCustomerModal] = useState(false);
  const [addCustomerModal, setAddCustomerModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [sortedCustomer, setSortedCustomer] = useState<any>();

  // Additional state for sorting
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    setSortedCustomer(customers);
  }, [customers]);
  // Function to handle sorting
  const sortCustomers = (field: any) => {
    const newDirection =
      sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(newDirection);

    // Creating a new array for sorting
    const sortedCustomers = [...customers].sort((a, b) => {
      if (a[field] < b[field]) {
        return newDirection === 'asc' ? -1 : 1;
      }
      if (a[field] > b[field]) {
        return newDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setSortedCustomer(sortedCustomers);
  };
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
            className="px-4 py-2 mb-10 mt-4 text-xl font-semibold text-center text-white  bg-gradient-to-r from-[#50B389] via-[#328B6E] to-[#095748] transition duration-300 rounded-lg hover:opacity-75 flex items-center ease md:w-auto"
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
              <thead className="text-xs text-primary-color bg-green-500/30">
                <tr>
                  <th scope="col" className="px-16 py-3 rounded-l-lg">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Username
                    <svg
                      onClick={() => sortCustomers('userName')}
                      className="w-3 h-3 cursor-pointer inline"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Customer Name
                    <svg
                      onClick={() => sortCustomers('customerName')}
                      className="w-3 h-3 cursor-pointer inline"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                    <svg
                      onClick={() => sortCustomers('email')}
                      className="w-3 h-3 cursor-pointer inline"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </th>
                  <th scope="col" className="px-6 py-3 rounded-r-lg"></th>
                </tr>
              </thead>
              <tbody>
                {sortedCustomer?.map((data: any, index: any) => {
                  const { customerName, userName, email, profilePicture } =
                    data;
                  // const dataUrl = profilePicture?.data
                  //   ? `data:image/png;base64,${btoa(
                  //       String.fromCharCode.apply(
                  //         null,
                  //         profilePicture.data.data
                  //       )
                  //     )}`
                  //   : '';

                  return (
                    <tr
                      key={index}
                      className="bg-white border-b rounded-lg my-auto hover:bg-gray-50 py-8"
                    >
                      <td className="p-4 py-4 rounded-l-lg">
                        <div className="w-24 h-16 ">
                          {/* <Image
                            width={10}
                            height={10}
                            src={dataUrl}
                            className="w-full h-full rounded-lg"
                            alt="Customer Profile Picture"
                          /> */}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700 ">{userName}</td>
                      <td className="px-6 py-4 text-green-500 hover:underline">
                        {customerName}
                      </td>
                      <td className="px-6 py-4 text-gray-700">{email}</td>
                      <td className="px-6 py-4 rounded-r-lg">
                        <div className="flex justify-evenly items-center">
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
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {loading && (
              <div className="flex justify-center items-center h-[45vh]">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-200 animate-spin  fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <p className="pl-2">Loading Customer Data...</p>
              </div>
            )}
            {error && <div className="text-red-600">{error}</div>}
            {!loading && !error && customers.length == 0 && <div>No Data</div>}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Table;
