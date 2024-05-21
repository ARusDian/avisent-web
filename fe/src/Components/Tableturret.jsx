import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Tableturret = () => {
  const navigate = useNavigate();
  const turrets = [
    {
      user: "123",
      turret: "456",
      startDate: "27-02-2024",
      endDate: "29-04-2024",
    },
    {
      user: "124",
      turret: "457",
      startDate: "28-02-2024",
      endDate: "30-04-2024",
    },
    {
      user: "125",
      turret: "458",
      startDate: "01-03-2024",
      endDate: "01-05-2024",
    },
    {
      user: "126",
      turret: "459",
      startDate: "02-03-2024",
      endDate: "02-05-2024",
    },
    {
      user: "127",
      turret: "460",
      startDate: "03-03-2024",
      endDate: "03-05-2024",
    },
    {
      user: "128",
      turret: "461",
      startDate: "04-03-2024",
      endDate: "04-05-2024",
    },
    {
      user: "129",
      turret: "462",
      startDate: "05-03-2024",
      endDate: "05-05-2024",
    },
    {
      user: "130",
      turret: "463",
      startDate: "06-03-2024",
      endDate: "06-05-2024",
    },
    {
      user: "131",
      turret: "464",
      startDate: "07-03-2024",
      endDate: "07-05-2024",
    },
  ];

  // Pagination setup
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(turrets.length / itemsPerPage);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = turrets.slice(firstItemIndex, lastItemIndex);

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
            {currentItems.map((turret, index) => (
              <tr key={index}>
                <td className="border border-[#697077] px-4 py-2 text-center align-middle">
                  {turret.user}
                </td>
                <td className="border border-[#697077] px-4 py-2 text-center align-middle">
                  {turret.turret}
                </td>
                <td className="border border-[#697077] px-4 py-2 text-center align-middle">
                  {turret.startDate}
                </td>
                <td className="border border-[#697077] px-4 py-2 text-center align-middle">
                  {turret.endDate}
                </td>
                <td className="border border-[#697077] px-4 py-2 flex justify-center items-center space-x-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 hover:bg-blue-700 w-full rounded-xl shadow-lg"
                    onClick={() => navigate("/formeditturret")}
                  >
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 hover:bg-red-700 w-full rounded-xl shadow-lg">
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
            onClick={() => {
              setCurrentPage(currentPage - 1);
              navigate("");
            }}
          >
            {"< Prev"}
          </button>

          {Array.from({ length: pageCount }, (_, index) => (
            <button
              key={index}
              className={`p-2 border rounded shadow ${
                currentPage === index + 1 ? "bg-gray-300" : "hover:bg-gray-200"
              }`}
              onClick={() => {
                setCurrentPage(index + 1);
                navigate("");
              }}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage >= pageCount}
            onClick={() => {
              setCurrentPage(currentPage + 1);
              navigate("");
            }}
          >
            {"Next >"}
          </button>
        </div>

        {/* Tombol "Add" */}
        <div className="absolute bottom-16 right-48">
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
