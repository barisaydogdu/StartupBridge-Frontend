import React, { useState, useEffect } from 'react';
import {
    Pencil, Trash2, UserCircle, ArrowLeft, AlertCircle, FileQuestion,
    Rocket, LightbulbIcon, ExternalLink, User, Mail, Phone, FileText,
    Briefcase, Target, Layers, Wallet, LineChart, Calendar, ClipboardList,
    Edit2, PlusCircle, Save, X, AlignLeft
} from 'lucide-react';
import { useParams, Link, useNavigate, Routes, Route } from 'react-router-dom';

const ProjectCreate = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);

    const initialFormState = {
        project_name: '',
        short_description: '',
        target_sector: '',
        stage: '',
        budget_needed: '',
        revenue_model: ''
    };

    const [formData, setFormData] = useState(initialFormState);
    const API_URL = 'http://localhost:8080/projects';

    useEffect(() => {
        fetchProjects();
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

            if (!response.ok) throw new Error('Error loading projects');
            const data = await response.json();
            setProjects(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = isEditing ? `${API_URL}/${currentProject.project_id}` : API_URL;
            const method = isEditing ? 'PUT' : 'POST';
            const token = localStorage.getItem('token');
            const response = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Operation failed');

            fetchProjects();
            setFormData(initialFormState);
            setIsEditing(false);
            setCurrentProject(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-5xl mx-auto p-6">
                <div className="flex items-center gap-4 mb-8">
                    <Rocket className="w-8 h-8 text-blue-600" />
                    <h1 className="text-3xl font-bold text-gray-900">
                        {isEditing ? 'Edit Project' : 'Create New Project'}
                    </h1>
                </div>

                {error && (
                    <div className="flex items-center gap-2 bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <p className="text-red-700">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <FileText className="w-4 h-4 text-gray-500" />
                                    Project Name
                                </label>
                                <input
                                    type="text"
                                    name="project_name"
                                    value={formData.project_name}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    placeholder="Enter your project name"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <Target className="w-4 h-4 text-gray-500" />
                                    Target Sector
                                </label>
                                <input
                                    type="text"
                                    name="target_sector"
                                    value={formData.target_sector}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    placeholder="Specify your target sector"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <Layers className="w-4 h-4 text-gray-500" />
                                    Project Stage
                                </label>
                                <input
                                    type="text"
                                    name="stage"
                                    value={formData.stage}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    placeholder="Current stage of your project"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <Wallet className="w-4 h-4 text-gray-500" />
                                    Required Budget
                                </label>
                                <input
                                    type="text"
                                    name="budget_needed"
                                    value={formData.budget_needed}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    placeholder="Required budget amount"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2 space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <AlignLeft className="w-4 h-4 text-gray-500" />
                                    Project Description
                                </label>
                                <textarea
                                    name="short_description"
                                    value={formData.short_description}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    rows="4"
                                    placeholder="Briefly describe your project"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2 space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <LineChart className="w-4 h-4 text-gray-500" />
                                    Revenue Model
                                </label>
                                <input
                                    type="text"
                                    name="revenue_model"
                                    value={formData.revenue_model}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    placeholder="Describe your project's revenue model"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 border-t rounded-b-xl">
                        {isEditing && (
                            <button
                                type="button"
                                onClick={() => {
                                    setIsEditing(false);
                                    setCurrentProject(null);
                                    setFormData(initialFormState);
                                }}
                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                            >
                                <X className="w-4 h-4" />
                                Cancel
                            </button>
                        )}
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            {isEditing ? (
                                <>
                                    <Save className="w-4 h-4" />
                                    Update
                                </>
                            ) : (
                                <>
                                    <PlusCircle className="w-4 h-4" />
                                    Create Project
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectCreate;