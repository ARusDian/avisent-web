import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export function OperatorTurretEdit() {
  const [formData, setFormData] = useState({
    path: null,
    description: "",
    location: "",
    serverUrl: "",
    turretUrl: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `http://localhost:8000/api/turrets/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;

        if (data.success) {
          setFormData({
            path: data.data.path,
            description: data.data.description,
            location: data.data.location,
            serverUrl: data.data.server_url,
            turretUrl: data.data.turret_url,
          });
        } else {
          console.error("Failed to get data for editing turret");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "path") {
      setFormData({
        ...formData,
        path: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const formDataToSend = new FormData();
    formDataToSend.append("_method", "PATCH");
    formDataToSend.append("description", formData.description);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("server_url", formData.serverUrl);
    formDataToSend.append("turret_url", formData.turretUrl);

    if (formData.path instanceof File) {
      formDataToSend.append("path", formData.path);
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/api/turrets/${id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        navigate("/operator/turret");
      } else {
        console.error("Failed to update turret");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#111827]">
      <form
        className="bg-[#374151] bg-opacity-50 p-8 rounded-3xl shadow-lg w-2/5"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-16 text-center dark:text-white">
          Edit Turret
        </h2>

        <div className="mb-5">
          <label
            htmlFor="path"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Turret Image (Path)
          </label>
          <input
            type="file"
            id="path"
            name="path"
            accept="image/*"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleChange}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Enter Description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="serverUrl"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Server URL
          </label>
          <input
            type="text"
            id="serverUrl"
            name="serverUrl"
            placeholder="Enter Server URL"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formData.serverUrl}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="turretUrl"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Turret URL
          </label>
          <input
            type="text"
            id="turretUrl"
            name="turretUrl"
            placeholder="Enter Turret URL"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formData.turretUrl}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="location"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Enter Location"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="text-center mt-10">
          <button
            type="submit"
            className="text-white bg-[#697077] hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-[#f8dbb3] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
