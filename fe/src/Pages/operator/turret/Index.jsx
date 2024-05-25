import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function OperatorTurret() {
  const navigate = useNavigate();
  const [turrets, setTurrets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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

  const handleDelete = async (id) => {
    const accessToken = localStorage.getItem("token");

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
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <div className="flex flex-1 flex-col items-center mt-24 justify-center mb-12">
        <div className="flex flex-col">
          <div className="flex justify-end">
            <button
              onClick={handleAddClick}
              className="bg-[#697077] text-white shadow hover:bg-[#f8dbb3] px-12 py-2 rounded-xl"
            >
              Add
            </button>
          </div>
          <table
            className="shadow-lg bg-white border-separate mt-4"
            style={{ borderSpacing: 0 }}
          >
            <thead>
              <tr>
                <th className="bg-[#697077] text-white border border-black font-roboto px-20 py-2 rounded-tl-xl">
                  Turret ID
                </th>
                <th className="bg-[#697077] text-white border border-black font-roboto px-20 py-2">
                  Turret Image
                </th>
                <th className="bg-[#697077] text-white border border-black font-roboto px-20 py-2">
                  Description
                </th>
                <th className="bg-[#697077] text-white border border-black font-roboto px-20 py-2">
                  Secret Key
                </th>
                <th className="bg-[#697077] text-white border border-black font-roboto px-20 py-2">
                  Location
                </th>
                <th className="bg-[#697077] text-white border border-black font-roboto px-20 py-2 rounded-tr-xl">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((turret) => (
                <tr key={turret.id_turret}>
                  <td className="border border-[#697077] px-4 py-2 text-center align-middle">
                    {turret.id_turret}
                  </td>
                  <td className="border border-[#697077] px-4 py-2 text-center align-middle">
                    <img
                      src={turret.turret_image}
                      alt={`Turret Image ${turret.id_turret}`}
                      className="h-20 w-20 object-cover"
                    />
                  </td>
                  <td className="border border-[#697077] px-4 py-2 text-center align-middle">
                    {turret.description}
                  </td>
                  <td className="border border-[#697077] px-4 py-2 text-center align-middle">
                    {turret.secret_key}
                  </td>
                  <td className="border border-[#697077] px-4 py-2 text-center align-middle">
                    {turret.location}
                  </td>
                  <td className="border border-[#697077] px-10 py-2 text-center align-middle">
                    <Link
                      className="inline-block w-full bg-blue-500 text-white px-2 py-1 hover:bg-blue-700 rounded-xl shadow-lg"
                      to={`/operator/turret/${turret.id_turret}/edit`}
                    >
                      Edit
                    </Link>
                    <button
                      className="bg-red-500 text-white px-2 py-1 hover:bg-red-700 w-full rounded-xl shadow-lg mt-2"
                      onClick={() => handleDelete(turret.id_turret)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center space-x-2 my-6">
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
              onClick={() => setCurrentPage(index + 1)}
              className={`p-2 border rounded shadow ${
                currentPage === index + 1 ? "bg-gray-300" : "hover:bg-gray-200"
              }`}
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
      </div>
    </div>
  );
}
