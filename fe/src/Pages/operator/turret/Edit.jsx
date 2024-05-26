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
      console.log(localStorage);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/turrets/${id}`, // Menggunakan id_turret sebagai ID dalam URL
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;

        if (data.success) {
          // Mengatur nilai form berdasarkan data yang diterima dari API
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
  }, [id]); // Menggunakan id_turret sebagai dependency agar useEffect dipanggil setiap kali id_turret berubah

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
    formDataToSend.append("turret_url", formData.location);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/turrets/${id}`, // Menggunakan id_turret sebagai ID dalam URL
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
		<div className="flex justify-center items-center min-h-screen bg-gray-100">
			<form
				className="bg-white p-8 rounded-3xl shadow-lg w-2/5"
				onSubmit={handleSubmit}
			>
				<h2 className="text-2xl font-bold mb-6 text-center">
					Edit Turret
				</h2>

				<div className="mb-4 flex justify-center">
					<div className="w-96">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="path"
						>
							Turret Image (Path)
						</label>
						<input
							type="file"
							name="path"
							accept="image/*"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							onChange={handleChange}
						/>
					</div>
				</div>

				<div className="mb-4 flex justify-center mt-5">
					<div className="w-96">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="description"
						>
							Description
						</label>
						<input
							type="text"
							name="description"
							placeholder="Enter Description"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							value={formData.description}
							onChange={handleChange}
						/>
					</div>
				</div>

				<div className="mb-4 flex justify-center mt-5">
					<div className="w-96">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="serverUrl"
						>
							server Url
						</label>
						<input
							type="text"
							name="serverUrl"
							placeholder="Enter server Url"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							value={formData.serverUrl}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="mb-4 flex justify-center mt-5">
					<div className="w-96">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="turretUrl"
						>
							Turret Url
						</label>
						<input
							type="text"
							name="turretUrl"
							placeholder="Enter server Url"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							value={formData.turretUrl}
							onChange={handleChange}
						/>
					</div>
				</div>

				<div className="mb-4 flex justify-center mt-5">
					<div className="w-96">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="location"
						>
							Location
						</label>
						<input
							type="text"
							name="location"
							placeholder="Enter Location"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							value={formData.location}
							onChange={handleChange}
						/>
					</div>
				</div>

				<div className="text-center mt-10">
					<button
						type="submit"
						className="bg-[#697077] text-white shadow hover:bg-[#f8dbb3] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
					>
						Update
					</button>
				</div>
			</form>
		</div>
  );
}
