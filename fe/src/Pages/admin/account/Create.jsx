import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function AdminAccountCreate() {
  const [formData, setFormData] = useState({
    user: "",
    name: "",
    password: "",
    operator: false,
    admin: false,
    type: 0,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };

    if (name === "operator" && checked) {
      newFormData.type = 1;
    } else if (name === "admin" && checked) {
      newFormData.type = 3;
    } else if (!newFormData.operator && !newFormData.admin) {
      newFormData.type = 0;
    }

    setFormData(newFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi checkbox
    if (!formData.operator && !formData.admin) {
      setErrors({ checkbox: "Please select at least one option" });
      return;
    }

    setSubmitting(true);

    const accessToken = localStorage.getItem("token");

    // Konversi formData menjadi format URL-encoded
    const formDataString = Object.keys(formData)
      .map((key) => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(
          formData[key]
        )}`;
      })
      .join("&");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/users",
        formDataString,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log("Response:", response.data);

      setFormData({
        user: "",
        name: "",
        password: "",
        operator: false,
        admin: false,
        type: 0,
      });

      navigate("/admin/account");
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        setErrors(error.response.data);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      console.error("There was an error posting the data!", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-3xl shadow-lg w-2/5"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Account</h2>

        {errors.checkbox && (
          <p className="text-red-500 text-sm mb-4">{errors.checkbox}</p>
        )}

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
          {errors.name && (
            <p className="text-red-500 text-xs italic">{errors.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">{errors.password}</p>
          )}
        </div>

        <div className="flex space-x-4 mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="operator"
              checked={formData.operator}
              onChange={handleChange}
              className="form-checkbox text-blue-600"
            />
            <span className="ml-2 text-gray-700">Operator</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="admin"
              checked={formData.admin}
              onChange={handleChange}
              className="form-checkbox text-blue-600"
            />
            <span className="ml-2 text-gray-700">Admin</span>
          </label>
        </div>

        <div className="text-center mt-10">
          <button
            type="submit"
            className="bg-[#697077] text-white shadow hover:bg-[#f8dbb3] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={submitting}
          >
            {submitting ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}
