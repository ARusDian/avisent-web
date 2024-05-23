export function AdminAccountChangePassword() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-3xl shadow-lg w-2/5">
        <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-3">
            Password
          </label>
          <input
            type="text"
            name="change-password"
            placeholder="Enter New Password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
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
}
