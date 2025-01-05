import React, { useState } from 'react';
import { Search, ChevronRight, Clock, Users } from 'lucide-react';

const FilteredProjects = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Sample projects data with categories
    const allProjects = [
        {
            id: 1,
            title: "AI-Powered Healthcare Assistant",
            description: "Healthcare innovation using machine learning for personalized patient care and diagnosis support.",
            image: "/api/placeholder/400/200",
            fundedPercentage: "70",
            daysLeft: "12",
            tags: ["AI", "Healthcare", "ML"],
            category: "Artificial Intelligence"
        },
        {
            id: 2,
            title: "Sustainable Energy Platform",
            description: "Renewable energy management system for optimizing solar and wind power distribution.",
            image: "/api/placeholder/400/200",
            fundedPercentage: "65",
            daysLeft: "15",
            tags: ["Energy", "Sustainability"],
            category: "Technology"
        },
        {
            id: 3,
            title: "Smart City Infrastructure",
            description: "IoT-based urban management system for traffic, waste, and utility optimization.",
            image: "/api/placeholder/400/200",
            fundedPercentage: "80",
            daysLeft: "20",
            tags: ["IoT", "Smart City"],
            category: "Technology"
        },
        {
            id: 4,
            title: "EdTech Learning Platform",
            description: "Adaptive learning platform using AI to personalize educational content.",
            image: "/api/placeholder/400/200",
            fundedPercentage: "75",
            daysLeft: "18",
            tags: ["Education", "AI"],
            category: "Education"
        },
        {
            id: 5,
            title: "Online Marketplace",
            description: "Revolutionary e-commerce platform with AI-powered recommendations.",
            image: "/api/placeholder/400/200",
            fundedPercentage: "85",
            daysLeft: "10",
            tags: ["E-commerce", "Retail"],
            category: "E-commerce"
        },
        {
            id: 6,
            title: "Healthcare Management System",
            description: "Digital platform for healthcare provider management and patient care.",
            image: "/api/placeholder/400/200",
            fundedPercentage: "60",
            daysLeft: "25",
            tags: ["Healthcare", "Software"],
            category: "Health"
        },
        {
            id: 7,
            title: "Investment Analytics Platform",
            description: "AI-driven financial analysis and investment recommendation platform.",
            image: "/api/placeholder/400/200",
            fundedPercentage: "72",
            daysLeft: "30",
            tags: ["Finance", "AI"],
            category: "Finance"
        },
        {
            id: 8,
            title: "Code Learning Platform",
            description: "Interactive platform for learning programming and software development.",
            image: "/api/placeholder/400/200",
            fundedPercentage: "68",
            daysLeft: "22",
            tags: ["Education", "Software"],
            category: "Software"
        }
    ];

    // Filter projects based on selected category
    const filteredProjects = selectedCategory === 'All'
        ? allProjects
        : allProjects.filter(project => project.category === selectedCategory);

    const categories = [
        'All', 'Technology', 'Software', 'Artificial Intelligence',
        'E-commerce', 'Health', 'Education', 'Finance'
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Categories */}
            <div className="border-b bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex items-center space-x-6 py-4 overflow-x-auto">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`whitespace-nowrap px-4 py-2 rounded-full transition-colors ${
                                    selectedCategory === category
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {project.tags.map((tag, index) => (
                                        <span key={index} className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                                <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                                <div className="space-y-3">
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full"
                                            style={{ width: `${project.fundedPercentage}%` }}
                                        />
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-blue-600 font-medium">
                                            {project.fundedPercentage}% funded
                                        </span>
                                        <span className="text-gray-600">
                                            {project.daysLeft} days left
                                        </span>
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

export default FilteredProjects;