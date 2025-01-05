import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    ArrowLeft, Target, Briefcase, Wallet, LineChart, User, Mail, Phone,
    Share2, Heart, MessageCircle, Rocket, Clock, Globe, BarChart, Users,
    DollarSign, TrendingUp,AlertCircle,FileQuestion


} from 'lucide-react';
import NavbarAuth from "./NavbarAuth";

const ProjectDetailDb = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:8080/projects/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) throw new Error('Failed to fetch project details');
                const data = await response.json();
                setProject(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProjectDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center flex items-center justify-center gap-2">
                <AlertCircle size={20} />
                {error}
            </div>
        );
    }

    if (!project) {
        return (
            <div className="text-center text-gray-600 flex items-center justify-center gap-2">
                <FileQuestion size={20} />
                Project not found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
            <NavbarAuth/>
            <div className="container mx-auto px-4 py-8">
                {/* Navigation */}
                <button
                    onClick={() => navigate('/projectslist')}
                    className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-800 transition-colors mb-8 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md"
                >
                    <ArrowLeft size={20} />
                    <span>Back to Projects</span>
                </button>

                {/* Hero Section */}
                <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 rounded-xl shadow-xl overflow-hidden mb-8">
                    <div className="p-8 text-white">
                        <div className="flex items-center gap-3 mb-4">
                            <Rocket size={32} className="text-emerald-300" />
                            <h1 className="text-4xl font-bold">{project.project_name}</h1>
                        </div>
                        <p className="text-emerald-100 text-lg max-w-3xl mb-8">{project.short_description}</p>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <button     onClick={() => navigate("/investnow")}
                                        className="flex items-center gap-2 bg-white text-emerald-800 px-6 py-3 rounded-lg font-medium hover:bg-emerald-50 transition-colors">
                                <DollarSign className="w-5 h-5" />
                                Invest Now
                            </button>
                            <button className="flex items-center gap-2 bg-emerald-700/50 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700/70 transition-colors">
                                <Share2 className="w-5 h-5" />
                                Share Project
                            </button>
                            <button className="flex items-center gap-2 bg-emerald-700/50 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700/70 transition-colors">
                                <Heart className="w-5 h-5" />
                                Save
                            </button>
                        </div>
                    </div>
                </div>

                {/* Project Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-center gap-2 text-emerald-600 mb-2">
                            <BarChart className="w-5 h-5" />
                            <span className="font-medium">Progress</span>
                        </div>
                        <div className="text-3xl font-bold mb-2">75%</div>
                        <div className="w-full h-2 bg-gray-100 rounded-full">
                            <div className="w-3/4 h-full bg-emerald-500 rounded-full"></div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-center gap-2 text-emerald-600 mb-2">
                            <Clock className="w-5 h-5" />
                            <span className="font-medium">Time Left</span>
                        </div>
                        <div className="text-3xl font-bold">15</div>
                        <div className="text-gray-600">Days Remaining</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-center gap-2 text-emerald-600 mb-2">
                            <Users className="w-5 h-5" />
                            <span className="font-medium">Investors</span>
                        </div>
                        <div className="text-3xl font-bold">847</div>
                        <div className="text-gray-600">Total Backers</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-center gap-2 text-emerald-600 mb-2">
                            <TrendingUp className="w-5 h-5" />
                            <span className="font-medium">Goal</span>
                        </div>
                        <div className="text-3xl font-bold">{project.budget_needed}</div>
                        <div className="text-gray-600">Target Amount</div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Project Details */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Target className="w-5 h-5 text-emerald-600" />
                                    Project Details
                                </h2>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <Globe className="w-5 h-5 text-emerald-600" />
                                                <span className="text-gray-600">Sector</span>
                                            </div>
                                            <span className="font-medium">{project.target_sector}</span>
                                        </div>
                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <Briefcase className="w-5 h-5 text-emerald-600" />
                                                <span className="text-gray-600">Stage</span>
                                            </div>
                                            <span className="font-medium">{project.stage}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <Wallet className="w-5 h-5 text-emerald-600" />
                                                <span className="text-gray-600">Budget</span>
                                            </div>
                                            <span className="font-medium">{project.budget_needed}</span>
                                        </div>
                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <LineChart className="w-5 h-5 text-emerald-600" />
                                                <span className="text-gray-600">Revenue Model</span>
                                            </div>
                                            <span className="font-medium">{project.revenue_model}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Entrepreneur Info */}
                    {project.entrepreneur && (
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <User className="w-5 h-5 text-emerald-600" />
                                    Entrepreneur Details
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                                                <User className="w-6 h-6 text-emerald-600" />
                                            </div>
                                            <div>
                                                <div className="font-medium">
                                                    {project.entrepreneur.firstName} {project.entrepreneur.lastName}
                                                </div>
                                                <div className="text-sm text-gray-500">Founder</div>
                                            </div>
                                        </div>
                                        <button className="text-emerald-600 hover:text-emerald-700">
                                            View Profile →
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
                                        <Mail className="w-5 h-5 text-emerald-600" />
                                        <span className="text-gray-600">{project.entrepreneur.email}</span>
                                    </div>
                                    {project.entrepreneur.phoneVisibility && project.entrepreneur.phoneNumber && (
                                        <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
                                            <Phone className="w-5 h-5 text-emerald-600" />
                                            <span className="text-gray-600">{project.entrepreneur.phoneNumber}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailDb;