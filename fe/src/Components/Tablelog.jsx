import React, { useState } from "react";

const Tablelog = () => {
  const logs = [
    {
      date: "27-02-2024",
      time: "11.00 PM",
      turret: "Turret 1",
      image: "../assets/turretgun.jpg",
      object: "Object 1",
    },
    {
      date: "28-02-2024",
      time: "10.00 PM",
      turret: "Turret 2",
      image: "../assets/turretgun2.jpg",
      object: "Object 2",
    },
    {
      date: "01-03-2024",
      time: "09.00 PM",
      turret: "Turret 3",
      image: "../assets/turretgun3.jpg",
      object: "Object 3",
    },
    {
      date: "02-03-2024",
      time: "08.00 PM",
      turret: "Turret 4",
      image: "../assets/turretgun4.jpg",
      object: "Object 4",
    },
    {
      date: "03-03-2024",
      time: "07.00 PM",
      turret: "Turret 5",
      image: "../assets/turretgun5.jpg",
      object: "Object 5",
    },
    {
      date: "04-03-2024",
      time: "06.00 PM",
      turret: "Turret 6",
      image: "../assets/turretgun6.jpg",
      object: "Object 6",
    },
    {
      date: "05-03-2024",
      time: "05.00 PM",
      turret: "Turret 7",
      image: "../assets/turretgun7.jpg",
      object: "Object 7",
    },
    {
      date: "06-03-2024",
      time: "04.00 PM",
      turret: "Turret 8",
      image: "../assets/turretgun8.jpg",
      object: "Object 8",
    },
    {
      date: "07-03-2024",
      time: "03.00 PM",
      turret: "Turret 9",
      image: "../assets/turretgun9.jpg",
      object: "Object 9",
    },
    {
      date: "08-03-2024",
      time: "02.00 PM",
      turret: "Turret 10",
      image: "../assets/turretgun10.jpg",
      object: "Object 10",
    },
  ];

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
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
                Date
              </th>
              <th className="bg-[#697077] text-white border border-black font-roboto px-20 py-2">
                Time
              </th>
              <th className="bg-[#697077] text-white border border-black font-roboto px-20 py-2">
                Turret
              </th>
              <th className="bg-[#697077] text-white border border-black font-roboto px-20 py-2">
                Image
              </th>
              <th className="bg-[#697077] text-white border border-black font-roboto px-20 py-2 rounded-tr-xl">
                Object
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((log, index) => (
              <tr key={index}>
                <td className="border border-[#697077] px-20 py-5">
                  {" "}
                  {log.date}{" "}
                </td>
                <td className="border border-[#697077] px-20 py-5">
                  {" "}
                  {log.time}{" "}
                </td>
                <td className="border border-[#697077] px-20 py-5">
                  {log.turret}{" "}
                </td>
                <td className="border border-[#697077] px-20 py-5">
                  <img
                    src={log.image}
                    alt="Turret"
                    className="w-20 h-20 object-cover"
                  />
                </td>
                <td className="border border-[#697077] px-20 py-5">
                  {" "}
                  {log.object}{" "}
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
};

export default Tablelog;
