import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Globe, Rocket, Users, TrendingUp } from 'lucide-react';

const ExploreProjects = () => {
    const navigate = useNavigate();

    const categories = [
        {
            title: "Trending Projects",
            description: "Discover the most popular projects this week",
            icon: <TrendingUp className="w-8 h-8 text-blue-500" />,
            color: "bg-blue-50",
            textColor: "text-blue-600"
        },
        {
            title: "Global Innovations",
            description: "Explore projects from around the world",
            icon: <Globe className="w-8 h-8 text-green-500" />,
            color: "bg-green-50",
            textColor: "text-green-600"
        },
        {
            title: "Early Stage Startups",
            description: "Be part of the next big thing from the start",
            icon: <Rocket className="w-8 h-8 text-purple-500" />,
            color: "bg-purple-50",
            textColor: "text-purple-600"
        },
        {
            title: "Community Picks",
            description: "Projects loved by our community",
            icon: <Users className="w-8 h-8 text-orange-500" />,
            color: "bg-orange-50",
            textColor: "text-orange-600"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-white mb-6">
                        Explore Innovation
                    </h1>
                    <div className="max-w-2xl">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search projects, categories, or keywords..."
                                className="w-full pl-12 pr-4 py-4 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <Search className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories Grid */}
            <div className="container mx-auto px-4 -mt-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className={`${category.color} p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
                            onClick={() => navigate('/projects')}
                        >
                            <div className="mb-4">
                                {category.icon}
                            </div>
                            <h3 className={`text-xl font-semibold mb-2 ${category.textColor}`}>
                                {category.title}
                            </h3>
                            <p className="text-gray-600">
                                {category.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Featured Projects */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-2xl font-bold mb-8">Featured Projects</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Project cards would go here - using the same design as HomePage */}
                </div>
            </div>
        </div>
    );
};

export default ExploreProjects;