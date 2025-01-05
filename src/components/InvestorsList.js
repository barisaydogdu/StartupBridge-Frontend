import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Heart, DollarSign, Building, Calendar, Upload, Camera, X, Bookmark, TrendingUp, Users, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NavbarAuth from "./NavbarAuth";

const API_URL = 'http://localhost:8080/investors';

const InvestorsList = () => {
    const navigate = useNavigate();
    const [investors, setInvestors] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        fetchInvestors();
    }, []);

    const fetchInvestors = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Failed to fetch investors');
            const data = await response.json();
            console.log('API Response:', data); // API yanıtını kontrol et
            setInvestors(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const filters = [
        { id: 'all', label: 'All Investors', icon: Users },
        { id: 'trending', label: 'Trending', icon: TrendingUp },
        { id: 'new', label: 'Recently Joined', icon: Target },
    ];

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                <p className="text-gray-500 animate-pulse">Discovering investors...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="max-w-4xl mx-auto m-4 p-4 bg-red-50 border border-red-400 text-red-700 rounded-lg flex items-center">
            <X className="w-5 h-5 mr-2" />
            {error.message}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <NavbarAuth/>
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl font-bold mb-4">Connect with World-Class Investors</h1>
                        <p className="text-lg text-emerald-100 mb-8">Discover opportunities and build meaningful partnerships with investors who share your vision</p>
                        <button
                            onClick={() => navigate('/investors/create')}
                            className="inline-flex items-center px-8 py-4 bg-white text-emerald-900 font-bold rounded-lg hover:bg-emerald-50 transition-colors duration-200 shadow-lg"
                        >
                            <DollarSign className="w-5 h-5 mr-2" />
                            Join as an Investor
                        </button>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8 overflow-x-auto py-4">
                        {filters.map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                    activeFilter === filter.id
                                        ? 'bg-emerald-100 text-emerald-900'
                                        : 'text-gray-600 hover:text-emerald-900 hover:bg-gray-50'
                                }`}
                            >
                                <filter.icon className="w-4 h-4 mr-2" />
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {investors && investors.map((investor) => (
                        <div
                            key={investor.investor_id} // ID'yi düzelttim
                            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
                            onClick={() => navigate(`/investors/${investor.investor_id}`)} // ID'yi düzelttim
                        >
                            <div className="relative">
                                <div className="w-full h-48 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:scale-105 transition-transform duration-300"></div>
                                <div className="absolute -bottom-12 w-full px-6 flex justify-between items-end">
                                    <div className="relative">
                                        {investor.profile_picture ? (
                                            <img
                                                src={investor.profile_picture}
                                                alt={`${investor.first_name} ${investor.last_name}`}
                                                className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg"
                                            />
                                        ) : (
                                            <div className="w-24 h-24 rounded-2xl bg-white border-4 border-white shadow-lg flex items-center justify-center">
                                                <User className="w-12 h-12 text-gray-400" />
                                            </div>
                                        )}
                                        <div className="absolute -top-2 -right-2 bg-emerald-500 text-white p-2 rounded-lg shadow-lg">
                                            <DollarSign className="w-4 h-4" />
                                        </div>
                                    </div>
                                    <button
                                        className="bg-white p-2 rounded-full shadow-lg hover:bg-emerald-50 transition-colors duration-200"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // Add to favorites functionality
                                        }}
                                    >
                                        <Bookmark className="w-5 h-5 text-emerald-600" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-6 pt-16">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-xl font-bold text-gray-900">
                                        {investor.first_name} {investor.last_name}
                                    </h3>
                                    <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                                        Active Investor
                                    </span>
                                </div>

                                {investor.location && (
                                    <div className="flex items-center text-gray-600 mb-2">
                                        <MapPin className="w-4 h-4 mr-2 text-emerald-500" />
                                        <span className="text-sm">{investor.location}</span>
                                    </div>
                                )}

                                <div className="flex items-center text-gray-600 mb-2">
                                    <Mail className="w-4 h-4 mr-2 text-emerald-500" />
                                    <span className="text-sm">{investor.email}</span>
                                </div>

                                {investor.phone_visibility && investor.phone_number && (
                                    <div className="flex items-center text-gray-600 mb-2">
                                        <Phone className="w-4 h-4 mr-2 text-emerald-500" />
                                        <span className="text-sm">{investor.phone_number}</span>
                                    </div>
                                )}

                                {investor.bio && (
                                    <p className="mt-4 text-gray-600 text-sm line-clamp-3 mb-4">
                                        {investor.bio}
                                    </p>
                                )}

                                <div className="mt-6 border-t pt-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex space-x-3">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                Tech
                                            </span>
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                                Startup
                                            </span>
                                        </div>
                                        <button
                                            className="flex items-center text-emerald-600 hover:text-emerald-700 text-sm font-medium group"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/investors/${investor.investor_id}`); // ID'yi düzelttim
                                            }}
                                        >
                                            View Profile
                                            <span className="ml-1 transform transition-transform group-hover:translate-x-1">→</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InvestorsList;