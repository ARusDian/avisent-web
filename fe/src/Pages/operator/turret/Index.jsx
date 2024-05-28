import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function OperatorTurret() {
  const navigate = useNavigate();
  const [turrets, setTurrets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [turretToDelete, setTurretToDelete] = useState(null);
  const dropdownRefs = useRef([]);

  const itemsPerPage = 5;
  const pageCount = Math.ceil(turrets.length / itemsPerPage);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = turrets.slice(firstItemIndex, lastItemIndex);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:8000/api/turrets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;

        if (data.success) {
          setTurrets(data.data);
        } else {
          console.error("Failed to get data from turret");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddClick = () => {
    navigate("/operator/turret/create");
  };

  const handleDeleteClick = (id) => {
    setTurretToDelete(id);
    setModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    const accessToken = localStorage.getItem("token");
    const id = turretToDelete;

    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/turrets/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        setTurrets(turrets.filter((turret) => turret.id_turret !== id));
      } else {
        console.error("Gagal menghapus turret");
      }
    } catch (error) {
      console.error("Error saat menghapus turret:", error);
    } finally {
      setModalOpen(false);
      setTurretToDelete(null);
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
            onClick={handleAddClick}
            className="bg-gray-700 text-white text-sm mb-2 shadow hover:bg-blue-500
             px-4 py-2 rounded-xl"
          >
            Create New Turret
          </button>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg border-2 border-gray-700">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Turret ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Turret Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Server Url
                </th>
                <th scope="col" className="px-6 py-3">
                  Turret Url
                </th>
                <th scope="col" className="px-6 py-3">
                  Location
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((turret, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {turret.id_turret}
                  </th>
                  <td className="px-6 py-4 text-center">
                    <img
                      src={turret.turret_image}
                      alt={`Turret Image ${turret.id_turret}`}
                      className="h-20 w-20 object-cover mx-auto"
                    />
                  </td>
                  <td className="px-6 py-4">{turret.description}</td>
                  <td className="px-6 py-4">{turret.server_url}</td>
                  <td className="px-6 py-4">{turret.turret_url}</td>
                  <td className="px-6 py-4">{turret.location}</td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(turret.id_turret)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Options
                      </button>
                      {dropdownOpen === turret.id_turret && (
                        <div
                          className={`z-10 absolute mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
                          aria-labelledby="dropdownLargeButton"
                          ref={(el) => (dropdownRefs.current[index] = el)}
                          style={{
                            top:
                              dropdownRefs.current[index] &&
                              dropdownRefs.current[
                                index
                              ].getBoundingClientRect().bottom >
                                window.innerHeight
                                ? "auto"
                                : "100%",
                            bottom:
                              dropdownRefs.current[index] &&
                              dropdownRefs.current[
                                index
                              ].getBoundingClientRect().bottom >
                                window.innerHeight
                                ? "100%"
                                : "auto",
                            left: "auto",
                            right: "0",
                          }}
                        >
                          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                            <li>
                              <Link
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-blue-500"
                                to={`/operator/turret/${turret.id_turret}/edit`}
                              >
                                Edit
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-green-500"
                                to={`/operator/turret/${turret.id_turret}/control`}
                              >
                                Control
                              </Link>
                            </li>
                            <li>
                              <button
                                className="block px-4 py-2 text-left w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-red-500"
                                onClick={() =>
                                  handleDeleteClick(turret.id_turret)
                                }
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

      {modalOpen && (
        <div
          id="default-modal"
          tabindex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Confirm Before Deleting
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setModalOpen(false)}
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
              <div className="p-4 md:p-5 space-y-4">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete it?
                </p>
              </div>
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-red-700 dark:focus:ring-blue-800"
                  onClick={handleDeleteConfirm}
                >
                  Sure
                </button>
                <button
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={() => setModalOpen(false)}
                >
                  No, I'm not sure
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
