import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function AdminAccount() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const itemsPerPage = 5;
  const pageCount = Math.ceil(accounts.length / itemsPerPage);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = accounts.slice(firstItemIndex, lastItemIndex);

  useEffect(() => {
    const accessToken = localStorage.getItem("token");

    axios
      .get("http://127.0.0.1:8000/api/users", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const data = response.data;

        if (data.success) {
          setAccounts(
            data.data.map((user) => ({
              id: user.id_user,
              name: user.name,
              password: "******",
              type:
                user.type === 1
                  ? "Operator"
                  : user.type === 2
                  ? "Alat"
                  : "Admin",
            }))
          );
        } else {
          console.error("Gagal mengambil data pengguna");
        }
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleDelete = async (id) => {
    const accessToken = localStorage.getItem("token");

    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        setAccounts(accounts.filter((account) => account.id !== id));
      } else {
        console.error("Gagal menghapus pengguna");
      }
    } catch (error) {
      console.error("Error saat menghapus pengguna:", error);
    }
  };

  const toggleDropdown = (id) => {
    if (dropdownOpen === id) {
      setDropdownOpen(null);
    } else {
      setDropdownOpen(id);
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-between items-center bg-[#111827]">
      <div className="w-full max-w-4xl mt-24 mb-12">
        <div className="flex justify-end mb-2">
          <button
            onClick={() => navigate("/admin/account/create")}
            className="bg-gray-700 text-white shadow hover:bg-blue-500 text-sm mb-2 px-4 py-2 rounded-xl"
          >
            Create New Account
          </button>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg border-2 border-gray-700">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  User ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((account, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {account.id}
                  </th>
                  <td className="px-6 py-4">{account.name}</td>
                  <td className="px-6 py-4">{account.type}</td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(account.id)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Options
                      </button>
                      {dropdownOpen === account.id && (
                        <div
                          className="z-10 absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                          aria-labelledby="dropdownLargeButton"
                        >
                          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                            <li>
                              <Link
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-blue-500"
                                to={`/admin/account/${account.id}/edit`}
                              >
                                Edit
                              </Link>
                            </li>
                            <li>
                              <button
                                className="block px-4 py-2 text-left w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-red-500"
                                onClick={() => handleDelete(account.id)}
                              >
                                Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <nav
          className="flex items-center justify-center pt-4"
          aria-label="Table navigation"
        >
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </button>
            </li>
            {Array.from({ length: pageCount }, (_, index) => (
              <li key={index}>
                <button
                  onClick={() => setCurrentPage(index + 1)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 hover:dark:text-gray-400 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 ${
                    currentPage === index + 1
                      ? "text-white bg-gray-800 font-bold "
                      : "dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === pageCount}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
