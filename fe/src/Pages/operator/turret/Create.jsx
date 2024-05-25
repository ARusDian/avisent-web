import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function OperatorTurretCreate() {
	const [formData, setFormData] = useState({
		path: null, // Mengganti turretImage menjadi path
		description: "",
		location: "",
		serverUrl: "",
		turretUrl: "",
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value, files } = e.target;
		if (name === "path") {
			// Menggunakan "path" sebagai name
			setFormData({
				...formData,
				path: files[0], // Menggunakan files[0] sebagai nilai untuk "path"
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
		formDataToSend.append("path", formData.path); // Menggunakan "path" sebagai kunci
		formDataToSend.append("description", formData.description);
		formDataToSend.append("location", formData.location);
		formDataToSend.append("server_url", formData.serverUrl);
		formDataToSend.append("turret_url", formData.location);

		try {
			const response = await axios.post(
				"http://localhost:8000/api/turrets",
				formDataToSend,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "multipart/form-data",
					},
				}
			);

			if (response.status === 201) {
				navigate("/operator/turret");
			} else {
				console.error("Failed to add turret");
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
					Add New Turret
				</h2>

				<div className="mb-4 flex justify-center">
					<div className="w-96">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="path" // Menggunakan "path" sebagai htmlFor
						>
							Turret Image (Path)
						</label>
						<input
							type="file"
							name="path" // Menggunakan "path" sebagai name
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
							Server URL
						</label>
						<input
							type="text"
							name="serverUrl"
							placeholder="Enter Server URL"
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
							Turret URL
						</label>
						<input
							type="text"
							name="turretUrl"
							placeholder="Enter Server URL"
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
						Add
					</button>
				</div>
			</form>
		</div>
	);
}
