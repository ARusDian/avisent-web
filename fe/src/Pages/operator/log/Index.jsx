import React, { useState, useEffect } from "react";
import axios from "axios";

export function OperatorLog() {
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchLogs = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`http://localhost:8000/api/logs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data && response.data.success) {
        setLogs(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const itemsPerPage = 5;
  const pageCount = Math.ceil(logs.length / itemsPerPage);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = logs.slice(firstItemIndex, lastItemIndex);

  return (
    <div className="flex flex-col min-h-screen justify-between items-center bg-[#111827]">
      <div className="w-full max-w-4xl mt-24 mb-12">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg border-2 border-gray-700">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3  cd ">
                  Id Log
                </th>
                <th scope="col" className="px-6 py-3">
                  ID Turret
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Location
                </th>
                <th scope="col" className="px-6 py-3">
                  Object
                </th>
                <th scope="col" className="px-6 py-3">
                  Shoot Date
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((log, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {log.id_log}
                  </th>
                  <td className="px-6 py-4">{log.turret_id}</td>
                  <td className="px-6 py-4 text-center">
                    <img
                      src={log.image}
                      alt={`Log Image ${log.id_log}`}
                      className="h-20 w-20 object-cover mx-auto"
                    />
                  </td>
                  <td className="px-6 py-4">{log.location}</td>
                  <td className="px-6 py-4">{log.object_type}</td>
                  <td className="px-6 py-4">{log.shot_date}</td>
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
