import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Formaddturret = () => {
  // State untuk menyimpan data dari formulir
  const [formData, setFormData] = useState({
    user: "",
    turret: "",
    startDate: "",
    endDate: "",
  });

  // State untuk daftar turrets
  const [turrets, setTurrets] = useState([]);

  // Mendapatkan fungsi navigasi
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Tambahkan data baru ke daftar turrets
    setTurrets([
      ...turrets,
      {
        user: formData.user,
        turret: formData.turret,
        startDate: formData.startDate,
        endDate: formData.endDate,
      },
    ]);

    // Reset formulir
    setFormData({
      user: "",
      turret: "",
      startDate: "",
      endDate: "",
    });

    // Arahkan ke halaman /addturret
    navigate("/addturret");
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-3xl shadow-lg w-2/5"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Turret</h2>

        {/* Input untuk User */}
        <div className="mb-4 flex justify-center">
          <div className="w-96">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="user"
            >
              User
            </label>
            <input
              type="text"
              name="user" // Properti `name` yang benar
              placeholder="Add User"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.user}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Input untuk Turret */}
        <div className="mb-4 flex justify-center mt-5">
          <div className="w-96">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="turret"
            >
              Turret
            </label>
            <input
              type="text"
              name="turret" // Properti `name` yang benar
              placeholder="Add Turret"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.turret}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-4 w-full mt-8">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 ml-20"
            htmlFor="dateRange"
          >
            Date
          </label>
          <div className="flex items-center justify-center">
            {" "}
            <input
              type="date"
              name="startDate"
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-1/3"
              value={formData.startDate}
              onChange={handleChange}
            />
            <span className="mx-2">-</span>
            <input
              type="date"
              name="endDate"
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-1/3"
              value={formData.endDate}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Tombol Add */}
        <div className="text-center mt-10">
          <button
            type="submit"
            className="bg-[#697077] text-white shadow hover:bg-[#f8dbb3] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default Formaddturret;
