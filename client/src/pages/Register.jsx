import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";


const Register = () => {
  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mn-8">
          <h1 className="text-3xl font-bold mb-4">Expense Tracker</h1>
          <p className="text-gray-600">Create your account</p>
        </div>
        <form className="space-y-5">

          {/* Name */}
          <div>
            <label className="font-medium text-gray-700">
              Full Name
            </label>

            <div className="flex items-center border rounded-lg mt-2 px-3">
              <FaUser className="text-gray-400" />
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-3 outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="font-medium text-gray-700">
              Email
            </label>

            <div className="flex items-center border rounded-lg mt-2 px-3">
              <FaEnvelope className="text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="font-medium text-gray-700">
              Password
            </label>

            <div className="flex items-center border rounded-lg mt-2 px-3">
              <FaLock className="text-gray-400" />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-3 outline-none"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="font-medium text-gray-700">
              Confirm Password
            </label>

            <div className="flex items-center border rounded-lg mt-2 px-3">
              <FaLock className="text-gray-400" />
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full p-3 outline-none"
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white py-3 rounded-lg font-semibold"
          >
            Register
          </button>

        </form>
        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <link to="/login" className="text-blue-600 font-semibold hover:underline">
          Login
          </link>
        </p>
      </div>
    </div>
  );
};

export default Register;