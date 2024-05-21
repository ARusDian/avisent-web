import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Tableaccount = () => {
  const navigate = useNavigate();
  const accounts = [
    {
      id: "1001",
      name: "Rina",
      password: "RinaPass123",
      type: "Operator",
    },
    {
      id: "1002",
      name: "Aldo",
      password: "AldoPass456",
      type: "Operator",
    },
    {
      id: "1003",
      name: "Siti",
      password: "SitiPass789",
      type: "Operator",
    },
    {
      id: "1004",
      name: "Bayu",
      password: "BayuPass012",
      type: "Operator",
    },
    {
      id: "1005",
      name: "Dewi",
      password: "DewiPass345",
      type: "Operator",
    },
    {
      id: "1006",
      name: "Fajar",
      password: "FajarPass678",
      type: "Operator",
    },
    {
      id: "1007",
      name: "Galih",
      password: "GalihPass901",
      type: "Operator",
    },
    {
      id: "1008",
      name: "Hana",
      password: "HanaPass234",
      type: "Operator",
    },
    {
      id: "1009",
      name: "Indra",
      password: "IndraPass567",
      type: "Operator",
    },
    {
      id: "1010",
      name: "Joko",
      password: "JokoPass890",
      type: "Operator",
    },
  ];

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(accounts.length / itemsPerPage);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = accounts.slice(firstItemIndex, lastItemIndex);

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
                Name
              </th>
              <th className="bg-[#697077] text-white border border-black font-roboto px-20 py-2">
                Password
              </th>
              <th className="bg-[#697077] text-white border border-black font-roboto px-20 py-2">
                Type
              </th>
              <th className="bg-[#697077] text-white border border-black font-roboto px-20 py-2 rounded-tr-xl">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((account, index) => (
              <tr key={index}>
                {" "}
                <td className="border border-[#697077] px-4 py-2 text-center align-middle ">
                  {account.id}
                </td>
                <td className="border border-[#697077] px-4 py-2 text-center align-middle ">
                  {account.name}
                </td>
                <td className="border border-[#697077] px-4 py-2 text-center align-middle ">
                  {account.password}
                </td>
                <td className="border border-[#697077] px-4 py-2 text-center align-middle ">
                  {account.type}
                </td>
                <td className="border border-[#697077] px-4 py-2 flex justify-center items-center space-x-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 hover:bg-blue-700 w-full rounded-xl shadow-lg"
                    onClick={() => navigate("/formedituser")}
                  >
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1  hover:bg-red-700 w-full rounded-xl shadow-lg">
                    Delete
                  </button>
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
        <div className="absolute bottom-16 right-48">
          <button
            onClick={() => navigate("/formuser")}
            className="bg-[#697077] text-white shadow hover:bg-[#f8dbb3] px-12 py-2 rounded-xl"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tableaccount;
