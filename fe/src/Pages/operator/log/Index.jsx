import React, { useState, useEffect } from "react";
import axios from "axios";
export function OperatorLog() {
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchLogs = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://localhost:8000/api/logs`, // Menggunakan id_turret sebagai ID dalam URL
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
    <div className="flex flex-col min-h-screen justify-between">
      <div className="flex flex-1 flex-col items-center mt-24 justify-center mb-12">
        <table
          className="shadow-lg bg-white border-separate"
          style={{ borderSpacing: 0 }}
        >
          <thead>
            <tr>
              <th className="bg-[#697077] text-white border border-black font-roboto px-20 py-2 rounded-tl-xl">
                Id Log
              </th>
              <th className="bg-[#697077] text-white border border-black font-roboto px-20 py-2">
                ID Turret
              </th>
              <th className="bg-[#697077] text-white border border-black font-roboto px-20 py-2">
                Image
              </th>
              <th className="bg-[#697077] text-white border border-black font-roboto px-20 py-2">
                Location
              </th>
              <th className="bg-[#697077] text-white border border-black font-roboto px-20 py-2">
                Object
              </th>
              <th className="bg-[#697077] text-white border border-black font-roboto px-20 py-2">
                Shoot Date
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((log, index) => (
              <tr key={index}>
                <td className="border border-[#697077] px-28 py-5">
                  {log.id_log}
                </td>
                <td className="border border-[#697077] px-28 py-5">
                  {log.turret_id}
                </td>
                <td className="border border-[#697077] px-20 py-5">
                <img
											src={log.image}
											alt={`${log.image}`}
											className="h-20 w-20 object-cover"
										/>
                </td>
                <td className="border border-[#697077] px-20 py-5">
                  {log.location}
                </td>
                <td className="border border-[#697077] px-20 py-5">
                  {log.object_type}
                </td>
                <td className="border border-[#697077] px-20 py-5">
                  {log.shot_date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center space-x-2 my-20">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 border rounded shadow text-gray-600 hover:bg-gray-200"
          >
            {"< Prev"}
          </button>
          {Array.from({ length: pageCount }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`p-2 border rounded shadow ${
                currentPage === index + 1 ? "bg-gray-300" : "hover:bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === pageCount}
            className="p-2 border rounded shadow text-gray-600 hover:bg-gray-200"
          >
            {"Next >"}
          </button>
        </div>
      </div>
    </div>
  );
}
