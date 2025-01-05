import React, { useState, useEffect } from 'react';
import { Award, User, Mail, Phone, MessageCircle, GraduationCap, Briefcase, Clock, Camera, X, LightbulbIcon, Rocket, Bookmark, TrendingUp, Users, Target, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NavbarAuth from "./NavbarAuth";

const API_URL = 'http://localhost:8080/entrepreneurs';

const EntrepreneurList = () => {
    const navigate = useNavigate();
    const [entrepreneurs, setEntrepreneurs] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        fetchEntrepreneurs();
    }, []);

    const fetchEntrepreneurs = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Failed to fetch entrepreneurs');
            const data = await response.json();
            console.log('Fetched data:', data); // Debugging için veriyi kontrol et
            setEntrepreneurs(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const filters = [
        { id: 'all', label: 'All Entrepreneurs', icon: Users },
        { id: 'trending', label: 'Trending', icon: TrendingUp },
        { id: 'featured', label: 'Featured', icon: Sparkles },
    ];

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                <p className="text-gray-500 animate-pulse">Discovering innovators...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="max-w-4xl mx-auto m-4 p-4 bg-red-50 border border-red-400 text-red-700 rounded-lg flex items-center">
            <X className="w-5 h-5 mr-2" />
            {error}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <NavbarAuth/>
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl font-bold mb-4">Discover Game-Changing Entrepreneurs</h1>
                        <p className="text-lg text-indigo-100 mb-8">Connect with innovative founders who are reshaping industries and creating the future</p>
                        <button
                            onClick={() => navigate('/entrepreneurs/create')}
                            className="inline-flex items-center px-8 py-4 bg-white text-indigo-900 font-bold rounded-lg hover:bg-indigo-50 transition-colors duration-200 shadow-lg"
                        >
                            <Rocket className="w-5 h-5 mr-2" />
                            Join as an Entrepreneur
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
                                        ? 'bg-indigo-100 text-indigo-900'
                                        : 'text-gray-600 hover:text-indigo-900 hover:bg-gray-50'
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
                    {entrepreneurs && entrepreneurs.map((entrepreneur) => {
                        // Debug için id'yi kontrol et
                        console.log('Entrepreneur:', entrepreneur);

                        return (
                            <div
                                key={entrepreneur.entrepreneurId || entrepreneur.id} // Her iki olası id'yi kontrol et
                                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
                                onClick={() => navigate(`/entrepreneurs/${entrepreneur.entrepreneurId || entrepreneur.id}`)}
                            >
                                <div className="relative">
                                    <div className="w-full h-48 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 group-hover:scale-105 transition-transform duration-300"></div>
                                    <div className="absolute -bottom-12 w-full px-6 flex justify-between items-end">
                                        <div className="relative">
                                            {entrepreneur.profilePicture ? (
                                                <img
                                                    src={entrepreneur.profilePicture}
                                                    alt={`${entrepreneur.firstName} ${entrepreneur.lastName}`}
                                                    className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg"
                                                />
                                            ) : (
                                                <div className="w-24 h-24 rounded-2xl bg-white border-4 border-white shadow-lg flex items-center justify-center">
                                                    <User className="w-12 h-12 text-gray-400" />
                                                </div>
                                            )}
                                            <div className="absolute -top-2 -right-2 bg-indigo-500 text-white p-2 rounded-lg shadow-lg">
                                                <Rocket className="w-4 h-4" />
                                            </div>
                                        </div>
                                        <button
                                            className="bg-white p-2 rounded-full shadow-lg hover:bg-indigo-50 transition-colors duration-200"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // Add to favorites functionality
                                            }}
                                        >
                                            <Bookmark className="w-5 h-5 text-indigo-600" />
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6 pt-16">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            {entrepreneur.firstName} {entrepreneur.lastName}
                                        </h3>
                                        <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                                        Founder
                                    </span>
                                    </div>

                                    <div className="flex items-center text-gray-600 mb-2">
                                        <Mail className="w-4 h-4 mr-2 text-indigo-500" />
                                        <span className="text-sm">{entrepreneur.email}</span>
                                    </div>

                                    {entrepreneur.phoneVisibility && entrepreneur.phoneNumber && (
                                        <div className="flex items-center text-gray-600 mb-2">
                                            <Phone className="w-4 h-4 mr-2 text-indigo-500" />
                                            <span className="text-sm">{entrepreneur.phoneNumber}</span>
                                        </div>
                                    )}

                                    {entrepreneur.bio && (
                                        <p className="mt-4 text-gray-600 text-sm line-clamp-3 mb-4">
                                            {entrepreneur.bio}
                                        </p>
                                    )}

                                    <div className="mt-6 border-t pt-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex space-x-3">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                                <LightbulbIcon className="w-3 h-3 mr-1" />
                                                Innovator
                                            </span>
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                                                <Briefcase className="w-3 h-3 mr-1" />
                                                Startup
                                            </span>
                                            </div>
                                            <button
                                                className="flex items-center text-indigo-600 hover:text-indigo-700 text-sm font-medium group"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/entrepreneurs/${entrepreneur.entrepreneurId || entrepreneur.id}`);
                                                }}
                                            >
                                                View Profile
                                                <span className="ml-1 transform transition-transform group-hover:translate-x-1">→</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )})}
                </div>
            </div>
        </div>
    );
};

export default EntrepreneurList;