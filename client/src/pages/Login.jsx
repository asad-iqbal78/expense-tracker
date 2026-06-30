import {link} from 'react-router-dom';
import {faEnvelope, faLock} from 'react-icons/fa';


const login = () => {
  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

        <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Expense Tracker</h1>
            <p className="text-gray-600">Welcome back! Please login to your account.</p>
        </div>
        <form className="space-y-4">
            <div>
                <label className="font-medium text-gray-700">
                    Email
                </label>
                <div className="mt-1">
                    <input
                        type="email"
                        className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                    />
                </div>
            </div>
            <div>
                <label className="font-medium text-gray-700">
                    Password
                </label>
                <div className="mt-1">
                    <input
                        type="password"
                        className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                    />
                </div>

            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Login
            </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
            Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register</a>
        </p>
      </div>
    </div>

  );
}

export default login;