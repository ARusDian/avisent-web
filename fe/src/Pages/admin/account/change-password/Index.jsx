import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export function AdminAccountChangePassword() {
  const { id } = useParams();
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("token");

    const payload = {
      password: password,
    };

    try {
      const response = await axios.put(
        `http://localhost:8000/api/users/password/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        navigate("/admin/account");
      } else {
        console.error("Failed to change password");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#111827]">
      <form
        onSubmit={handleSubmit}
        className="bg-[#374151] bg-opacity-50 p-8 rounded-3xl shadow-lg w-2/5"
      >
        <h2 className="text-2xl font-bold mb-16 text-center text-white">
          Change Password
        </h2>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="text"
            id="password"
            name="password"
            placeholder="Enter New Password"
            value={password}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleChange}
            required
          />
        </div>
        <div className="text-center mt-10">
          <button
            type="submit"
            className="text-white bg-[#697077] hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-[#f8dbb3] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
