import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Bar */}
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={handleLogout}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Welcome Card */}
                        <div className="bg-white overflow-hidden shadow rounded-lg flex-1 p-6">
                            <div className="flex items-center mb-4">
                                <User className="h-8 w-8 text-blue-500 mr-3" />
                                <h2 className="text-xl font-semibold text-gray-900">Welcome Back!</h2>
                            </div>
                            <p className="text-gray-600">
                                You've successfully logged into your account. This is your secure dashboard area.
                            </p>
                        </div>

                        {/* Stats Card */}
                        <div className="bg-white overflow-hidden shadow rounded-lg flex-1 p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Your Activity</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="border rounded-md p-4">
                                    <p className="text-sm font-medium text-gray-500">Last Login</p>
                                    <p className="mt-1 text-lg font-semibold text-gray-900">
                                        {new Date().toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="border rounded-md p-4">
                                    <p className="text-sm font-medium text-gray-500">Status</p>
                                    <p className="mt-1 text-lg font-semibold text-green-600">Active</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;