import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, X, ChevronRight, Search } from 'lucide-react';

const ProjectManagement = () => {
    const [projects, setProjects] = useState([]);
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
        revenue_model: ''
    };

    const [formData, setFormData] = useState(initialFormState);
    const API_URL = 'http://localhost:8080/projects';

    const categories = [
        'All', 'Technology', 'Software', 'Healthcare',
        'E-commerce', 'Finance', 'Education', 'Sustainability'
    ];

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Failed to load projects');
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

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
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

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
                if (!response.ok) throw new Error('Delete operation failed');
                fetchProjects();
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const handleEdit = (project) => {
        setIsEditing(true);
        setCurrentProject(project);
        setFormData({
            project_name: project.project_name,
            short_description: project.short_description,
            target_sector: project.target_sector,
            stage: project.stage,
            budget_needed: project.budget_needed,
            revenue_model: project.revenue_model
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.project_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.short_description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' ||
            project.target_sector.toLowerCase() === selectedCategory.toLowerCase();
        return matchesSearch && matchesCategory;
    });

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="text-lg text-blue-600">Loading...</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-700 to-purple-600 text-white">
                <div className="container mx-auto px-4 py-12">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-4xl font-bold">Project Management</h1>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                        >
                            <Plus size={20} />
                            Add Project
                        </button>
                    </div>

                    {/* Search and Filter */}
                    <div className="flex flex-col md:flex-row gap-4 items-center bg-white/10 backdrop-blur-md rounded-lg p-4">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-full bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div className="border-b bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex items-center space-x-6 py-4 overflow-x-auto">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category.toLowerCase())}
                                className={`whitespace-nowrap px-4 py-2 rounded-full ${
                                    selectedCategory === category.toLowerCase()
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-600 hover:bg-gray-100'
                                } transition-colors`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {/* Project Form Modal */}
                {isEditing && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold">
                                        {currentProject ? 'Edit Project' : 'Add New Project'}
                                    </h2>
                                    <button
                                        onClick={() => {
                                            setIsEditing(false);
                                            setCurrentProject(null);
                                            setFormData(initialFormState);
                                        }}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Project Name
                                            </label>
                                            <input
                                                type="text"
                                                name="project_name"
                                                value={formData.project_name}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Target Sector
                                            </label>
                                            <input
                                                type="text"
                                                name="target_sector"
                                                value={formData.target_sector}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Stage
                                            </label>
                                            <input
                                                type="text"
                                                name="stage"
                                                value={formData.stage}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Budget Needed
                                            </label>
                                            <input
                                                type="text"
                                                name="budget_needed"
                                                value={formData.budget_needed}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Description
                                            </label>
                                            <textarea
                                                name="short_description"
                                                value={formData.short_description}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                                rows="3"
                                                required
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Revenue Model
                                            </label>
                                            <input
                                                type="text"
                                                name="revenue_model"
                                                value={formData.revenue_model}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            type="submit"
                                            className="flex-1 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            {currentProject ? 'Update Project' : 'Add Project'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsEditing(false);
                                                setCurrentProject(null);
                                                setFormData(initialFormState);
                                            }}
                                            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map(project => (
                        <div key={project.project_id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {project.project_name}
                                        </h3>
                                        <div className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                                            {project.target_sector}
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-600 mb-4">
                                    {project.short_description}
                                </p>

                                <div className="space-y-2 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Stage:</span>
                                        <span className="font-medium">{project.stage}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Budget:</span>
                                        <span className="font-medium">{project.budget_needed}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Revenue Model:</span>
                                        <span className="font-medium">{project.revenue_model}</span>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleEdit(project)}
                                        className="flex items-center gap-2 flex-1 justify-center bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                                    >
                                        <Pencil size={16} />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project.project_id)}
                                        className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-12">
                        <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
                            <div className="text-gray-400 mb-4">
                                <Search className="w-12 h-12 mx-auto" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                No Projects Found
                            </h3>
                            <p className="text-gray-600 mb-6">
                                {searchQuery
                                    ? "No projects match your search criteria. Try adjusting your search."
                                    : "Get started by adding your first project."}
                            </p>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Plus size={20} />
                                Add New Project
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectManagement;