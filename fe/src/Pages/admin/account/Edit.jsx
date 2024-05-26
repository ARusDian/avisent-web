import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link, useParams } from "react-router-dom";
import axios from "axios";

export function AdminAccountEdit() {
  const location = useLocation();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("token");

    axios
      .get(`http://127.0.0.1:8000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          const user = response.data.data;
          setFormData({
            name: user.name,
            role: user.type === 1 ? "operator" : user.type === 3 ? "admin" : "",
          });
        } else {
          console.error("Gagal mengambil data pengguna", response.data);
          setError("Failed to fetch user");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        console.error("Error Response:", error.response);
        setError("Failed to fetch user data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.role) {
      setError("You must choose the role");
      return;
    }

    const accessToken = localStorage.getItem("token");

    try {
      const userType =
        formData.role === "operator"
          ? 1
          : formData.role === "admin"
          ? 3
          : undefined;

      const payload = {
        name: formData.name,
        type: userType,
      };

      const response = await axios.put(
        `http://127.0.0.1:8000/api/users/${id}`,
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
        console.error("Failed to update user");
        setError("Nothing Change");
      }
    } catch (error) {
      console.error("Nothing Change:", error);
      if (error.response && error.response.status === 422) {
        setError(
          "Error: " + (error.response.data.message || "Unprocessable Entity")
        );
      } else {
        setError("Nothing Change");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#111827]">
      <form
        className="bg-[#374151] bg-opacity-50 p-8 rounded-3xl shadow-lg w-2/5"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-16 text-center text-white">
          Edit Account
        </h2>

        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter Name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Role
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="role"
                value="operator"
                checked={formData.role === "operator"}
                onChange={handleChange}
                className="form-radio text-blue-600"
              />
              <span className="ml-2 text-gray-700 dark:text-white">
                Operator
              </span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={formData.role === "admin"}
                onChange={handleChange}
                className="form-radio text-blue-600"
              />
              <span className="ml-2 text-gray-700 dark:text-white">Admin</span>
            </label>
          </div>
        </div>

        <Link
          to={`/admin/account/${id}/change-password`}
          className="text-blue-400 hover:text-blue-700"
        >
          Change Password
        </Link>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

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
