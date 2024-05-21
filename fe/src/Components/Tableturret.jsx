import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Tableturret = () => {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const pageCount = Math.ceil(logs.length / itemsPerPage);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = logs.slice(firstItemIndex, lastItemIndex);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("token");

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/mlogs", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = response.data;

        if (data.success) {
          setLogs(data.data);
        } else {
          console.error("Gagal mengambil data log manual");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const accessToken = localStorage.getItem("token");

    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/mlogs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        setLogs(logs.filter((log) => log.id_manual_log !== id));
      } else {
        console.error("Gagal menghapus log manual");
      }
    } catch (error) {
      console.error("Error saat menghapus log manual:", error);
    }
  };

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
                User ID
              </th>
              <th className="bg-[#697077] text-white border border-black font-roboto px-20 py-2">
                Turret ID
              </th>
              <th className="bg-[#697077] text-white border border-black font-roboto px-20 py-2">
                Start Date
              </th>
              <th className="bg-[#697077] text-white border border-black font-roboto px-20 py-2">
                End Date
              </th>
              <th className="bg-[#697077] text-white border border-black font-roboto px-20 py-2 rounded-tr-xl">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((log, index) => (
              <tr key={index}>
                <td className="border border-[#697077] px-4 py-2 text-center align-middle">
                  {log.user_id}
                </td>
                <td className="border border-[#697077] px-4 py-2 text-center align-middle">
                  {log.turret_id}
                </td>
                <td className="border border-[#697077] px-4 py-2 text-center align-middle">
                  {log.start_date}
                </td>
                <td className="border border-[#697077] px-4 py-2 text-center align-middle">
                  {log.end_date}
                </td>
                <td className="border border-[#697077] px-4 py-2 flex justify-center items-center space-x-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 hover:bg-blue-700 w-full rounded-xl shadow-lg"
                    onClick={() => navigate("/formeditturret")}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 hover:bg-red-700 w-full rounded-xl shadow-lg"
                    onClick={() => handleDelete(log.id_manual_log)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center space-x-2 my-20">
          <button
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="p-2 border rounded shadow text-gray-600 hover:bg-gray-200"
          >
            {"< Prev"}
          </button>

          {Array.from({ length: pageCount }, (_, index) => (
            <button
              key={index}
              className={`p-2 border rounded shadow ${
                currentPage === index + 1 ? "bg-gray-300" : "hover:bg-gray-200"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage >= pageCount}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="p-2 border rounded shadow text-gray-600 hover:bg-gray-200"
          >
            {"Next >"}
          </button>
        </div>

        {/* Tombol "Add" */}
        <div className="absolute bottom-16 right-48 ">
          <button
            onClick={() => navigate("/formturret")}
            className="bg-[#697077] text-white shadow hover:bg-[#f8dbb3] px-12 py-2 rounded-xl"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tableturret;
