import React, { useState, useEffect } from 'react';
import {
    Pencil, Trash2, Plus, X, ChevronRight, Search, Briefcase, Rocket, Target,
    User, ExternalLink, Clock, MapPin,Wallet,BarChart,TrendingUp,Heart,MessageCircle,Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProjectList = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [entrepreneurs, setEntrepreneurs] = useState({}); // Store entrepreneur data
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const initialFormState = {
        project_name: '',
        short_description: '',
        target_sector: '',
        stage: '',
        budget_needed: '',
        revenue_model: '',
        entrepreneur_id: null
    };

    const [formData, setFormData] = useState(initialFormState);
    const API_URL = 'http://localhost:8080/projects';
    const ENTREPRENEURS_API_URL = 'http://localhost:8080/entrepreneurs';

    const categories = [
        'All', 'Technology', 'Software', 'Healthcare',
        'E-commerce', 'Finance', 'Education', 'Sustainability'
    ];

    useEffect(() => {
        fetchProjects();
        fetchEntrepreneurs();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await fetch(API_URL, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) throw new Error('Failed to load projects');
            const data = await response.json();
            setProjects(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchEntrepreneurs = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(ENTREPRENEURS_API_URL, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) throw new Error('Failed to load entrepreneurs');
            const data = await response.json();
            // Create a map of entrepreneur data by ID
            const entrepreneurMap = data.reduce((acc, entrepreneur) => {
                acc[entrepreneur.entrepreneurId] = entrepreneur;
                return acc;
            }, {});
            setEntrepreneurs(entrepreneurMap);
        } catch (err) {
            console.error('Error fetching entrepreneurs:', err);
        }
    };

    const handleViewProjectDetails = (projectId) => {
        navigate(`/projectsdb/${projectId}`);
    };

    const handleViewEntrepreneurProfile = (entrepreneurId, event) => {
        event.stopPropagation(); // Prevent triggering project click
        navigate(`/entrepreneurs/${entrepreneurId}`);
    };

    // ... [Keep existing handleSubmit, handleDelete, handleEdit, handleInputChange functions]

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.project_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.short_description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' ||
            project.target_sector.toLowerCase() === selectedCategory.toLowerCase();
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative">
                {/* Background with gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-emerald-950"></div>

                {/* Optional background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 25px 25px, white 2%, transparent 0%), radial-gradient(circle at 75px 75px, white 2%, transparent 0%)',
                        backgroundSize: '100px 100px'
                    }}/>
                </div>

                {/* Content */}
                <div className="relative container mx-auto px-4 py-24 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Discover Groundbreaking Projects
                    </h1>
                    <p className="text-lg md:text-xl text-emerald-100 mb-12 max-w-3xl mx-auto">
                        Connect with innovative entrepreneurs and explore opportunities that shape the future
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto mb-8">
                        {/* Search input */}
                        <div className="relative flex-1 w-full">
                            <input
                                type="text"
                                placeholder="Search projects..."
                                className="w-full px-6 py-4 pr-12 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                            />
                            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                        </div>

                        {/* Add Project Button */}
                        <button
                            onClick={() => navigate('/addproject')}
                            className="flex items-center gap-2 px-6 py-4 bg-white text-emerald-800 rounded-xl font-semibold hover:bg-emerald-50 transition-colors whitespace-nowrap"
                        >
                            <Plus className="w-5 h-5" />
                            Add Project
                        </button>
                    </div>

                    {/* Project Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
                            <div className="text-3xl font-bold mb-1">1.2k+</div>
                            <div className="text-emerald-100">Active Projects</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
                            <div className="text-3xl font-bold mb-1">$50M+</div>
                            <div className="text-emerald-100">Total Investment</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
                            <div className="text-3xl font-bold mb-1">500+</div>
                            <div className="text-emerald-100">Successful Launches</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map(project => {
                        const entrepreneur = entrepreneurs[project.entrepreneur_id];
                        // Calculate a random progress percentage (replace with actual data)
                        const progress = Math.floor(Math.random() * (100 - 30) + 30);

                        return (
                            <div
                                key={project.project_id}
                                className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                                onClick={() => handleViewProjectDetails(project.project_id)}
                            >
                                {/* Project Image/Cover */}
                                <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-500 overflow-hidden">
                                    <div className="absolute inset-0 bg-black/10"></div>
                                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                        <div className="flex items-center gap-2 text-white">
                                            <Target className="w-5 h-5" />
                                            <span className="font-medium">{project.target_sector}</span>
                                        </div>
                                        {entrepreneur && (
                                            <button
                                                onClick={(e) => handleViewEntrepreneurProfile(entrepreneur.entrepreneurId, e)}
                                                className="group flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full hover:bg-white transition-colors"
                                            >
                                                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                                                    {entrepreneur.profilePicture ? (
                                                        <img
                                                            src={entrepreneur.profilePicture}
                                                            alt={`${entrepreneur.firstName} ${entrepreneur.lastName}`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <User className="w-4 h-4" />
                                                    )}
                                                </div>
                                                <ExternalLink className="w-3 h-3 text-gray-600" />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="p-6">
                                    {/* Project Title & Stage */}
                                    <div className="mb-4">
                                        <div className="flex items-center gap-2 text-sm text-blue-600 font-medium mb-2">
                                            <Briefcase className="w-4 h-4" />
                                            {project.stage}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                            {project.project_name}
                                        </h3>
                                    </div>

                                    {/* Project Description */}
                                    <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                                        {project.short_description}
                                    </p>

                                    {/* Progress Bar */}
                                    <div className="mb-6">
                                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>
                                        <div className="flex items-center justify-between mt-2 text-sm">
                                            <div className="flex items-center gap-2 text-blue-600 font-medium">
                                                <BarChart className="w-4 h-4" />
                                                {progress}% Complete
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-500">
                                                <Clock className="w-4 h-4" />
                                                5 days left
                                            </div>
                                        </div>
                                    </div>

                                    {/* Project Metrics */}
                                    <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-y">
                                        <div className="text-center">
                                            <div className="flex items-center justify-center gap-1 text-gray-500 text-sm mb-1">
                                                <Wallet className="w-4 h-4" />
                                                Budget
                                            </div>
                                            <div className="font-bold text-gray-900">{project.budget_needed}</div>
                                        </div>
                                        <div className="text-center border-l">
                                            <div className="flex items-center justify-center gap-1 text-gray-500 text-sm mb-1">
                                                <TrendingUp className="w-4 h-4" />
                                                Revenue Model
                                            </div>
                                            <div className="font-bold text-gray-900">{project.revenue_model}</div>
                                        </div>
                                    </div>

                                    {/* Engagement Metrics */}
                                    <div className="flex items-center justify-between text-gray-500">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1">
                                                <Heart className="w-4 h-4" />
                                                <span className="text-sm">24</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MessageCircle className="w-4 h-4" />
                                                <span className="text-sm">12</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Users className="w-4 h-4" />
                                                <span className="text-sm">86</span>
                                            </div>
                                        </div>
                                        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                            Learn More →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProjectList;