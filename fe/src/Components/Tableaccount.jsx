import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Tableaccount = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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
        console.log("Response status:", response.status);
        const data = response.data;
        console.log("Response data:", data);
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
      console.log("Delete Response:", response);

      if (response.status === 200) {
        // Filter out the deleted account
        setAccounts(accounts.filter((account) => account.id !== id));
      } else {
        console.error("Gagal menghapus pengguna");
      }
    } catch (error) {
      console.error("Error saat menghapus pengguna:", error);
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
                    onClick={() =>
                      navigate("/formedituser", {
                        state: { userId: account.id },
                      })
                      // console.log(account)
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 hover:bg-red-700 w-full rounded-xl shadow-lg"
                    onClick={() => handleDelete(account.id)}
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
