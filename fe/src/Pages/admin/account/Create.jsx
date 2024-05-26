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
    <div className="flex justify-center items-center min-h-screen bg-[#111827]">
      <form
        className="bg-[#374151] bg-opacity-50 p-8 rounded-3xl shadow-lg w-2/5"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-16 text-center text-white">
          Create New Account
        </h2>

        {errors.checkbox && (
          <p className="text-red-500 text-sm mb-4">{errors.checkbox}</p>
        )}

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
          {errors.name && (
            <p className="text-red-500 text-xs italic">{errors.name}</p>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">{errors.password}</p>
          )}
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Type
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                id="operator"
                name="operator"
                checked={formData.operator}
                onChange={handleChange}
                className="form-checkbox text-blue-600"
              />
              <span className="ml-2 text-gray-700 dark:text-white">
                Operator
              </span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                id="admin"
                name="admin"
                checked={formData.admin}
                onChange={handleChange}
                className="form-checkbox text-blue-600"
              />
              <span className="ml-2 text-gray-700 dark:text-white">Admin</span>
            </label>
          </div>
        </div>

        <div className="text-center mt-10">
          <button
            type="submit"
            className="text-white bg-[#697077] hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-[#f8dbb3] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            disabled={submitting}
          >
            {submitting ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
