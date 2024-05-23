import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";

const Edituser = () => {
  const location = useLocation();
  const { userId } = location.state;

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    password: "", // Initialize the password field here
  });

  const [originalPassword, setOriginalPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("token");

    axios
      .get(`http://127.0.0.1:8000/api/users/${userId}`, {
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
            password: "", // Clear the password field here
          });
          setOriginalPassword(user.password); // Store the original password
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
  }, [userId]);

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
        password: formData.password || originalPassword, // Use the original password if not changed
      };

      const response = await axios.put(
        `http://127.0.0.1:8000/api/users/${userId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("User updated successfully");
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-3xl shadow-lg w-2/5"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Account</h2>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="flex space-x-4 mb-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="role"
              value="operator"
              checked={formData.role === "operator"}
              onChange={handleChange}
              className="form-radio text-blue-600"
            />
            <span className="ml-2 text-gray-700">Operator</span>
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
            <span className="ml-2 text-gray-700">Admin</span>
          </label>
        </div>

        <Link
          to="/admin/account/change-password"
          state={{ userId: userId }}
          className="text-blue-400 hover:text-blue-700"
        >
          Change Password
        </Link>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <div className="text-center mt-10">
          <button
            type="submit"
            className="bg-[#697077] text-white shadow hover:bg-[#f8dbb3] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edituser;
