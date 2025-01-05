import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User } from 'lucide-react';

const NavbarAuth = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    };

    const handleSettingsNavigation = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const userId = payload.id;

            // First check investors
            const investorsResponse = await fetch('http://localhost:8080/investors', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (investorsResponse.ok) {
                const investors = await investorsResponse.json();
                const investorProfile = investors.find(inv => Number(inv.userId) === Number(userId));

                if (investorProfile) {
                    navigate('/isettings');
                    setShowDropdown(false);
                    return;
                }
            }

            // If not an investor, check entrepreneurs
            const entrepreneursResponse = await fetch('http://localhost:8080/entrepreneurs', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (entrepreneursResponse.ok) {
                const entrepreneurs = await entrepreneursResponse.json();
                const entrepreneurProfile = entrepreneurs.find(ent => Number(ent.userId) === Number(userId));

                if (entrepreneurProfile) {
                    navigate('/esettings');
                    setShowDropdown(false);
                    return;
                }
            }

            // No profile found
            alert('No profile found. Please create a profile as an Investor or Entrepreneur first.');

        } catch (error) {
            console.error('Error navigating to settings:', error);
            alert('Error accessing settings. Please try logging in again.');
        }
    };

    const handleProfileNavigation = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const userId = payload.id;

            // First check investors
            const investorsResponse = await fetch('http://localhost:8080/investors', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (investorsResponse.ok) {
                const investors = await investorsResponse.json();
                const investorProfile = investors.find(inv => Number(inv.userId) === Number(userId));

                if (investorProfile) {
                    navigate(`/investors/${investorProfile.investor_id}`);
                    setShowDropdown(false);
                    return;
                }
            }

            // If not an investor, check entrepreneurs
            const entrepreneursResponse = await fetch('http://localhost:8080/entrepreneurs', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (entrepreneursResponse.ok) {
                const entrepreneurs = await entrepreneursResponse.json();
                const entrepreneurProfile = entrepreneurs.find(ent => Number(ent.userId) === Number(userId));

                if (entrepreneurProfile) {
                    navigate(`/entrepreneurs/${entrepreneurProfile.entrepreneurId}`);
                    setShowDropdown(false);
                    return;
                }
            }

            // No profile found
            alert('No profile found. Please create a profile as an Investor or Entrepreneur.');

        } catch (error) {
            console.error('Error navigating to profile:', error);
            alert('Error accessing profile. Please try logging in again.');
        }
    };

    return (
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-6">
                <Link to="/" className="text-2xl font-bold text-blue-700">
                    Startup Bridge
                </Link>
                <div className="hidden md:flex space-x-4">
                    <Link to="/projectslist" className="text-gray-600 hover:text-blue-600">
                        Projects
                    </Link>
                    <Link to="/investorslist" className="text-gray-600 hover:text-blue-600">
                        Investors
                    </Link>
                    <Link to="/entrepreneurslist" className="text-gray-600 hover:text-blue-600">
                        Entrepreneurs
                    </Link>
                    <Link to="/blogs" className="text-gray-600 hover:text-blue-600">
                        Blog
                    </Link>
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        navigate(`/search?q=${e.target.search.value}`);
                    }}
                    className="relative hidden md:block"
                >
                    <input
                        name="search"
                        type="text"
                        placeholder="Search Project..."
                        className="w-64 pl-10 pr-4 py-2 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                </form>

                {isLoggedIn ? (
                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            <User className="w-5 h-5 text-gray-600" />
                        </button>

                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                                <button
                                    onClick={() => handleProfileNavigation()}
                                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    Profile
                                </button>
                                <button
                                    onClick={() => handleSettingsNavigation()}
                                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    Settings
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => navigate('/login')}
                            className="text-gray-700 hover:text-blue-600 transition"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate('/register')}
                            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
                        >
                            Sign Up
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavbarAuth;