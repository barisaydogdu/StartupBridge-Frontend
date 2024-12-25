import React, { useState } from 'react';
import {
    Heart,
    Search,
    ChevronRight,
    Clock,
    Users,
    TrendingUp,
    Network,
    Rocket,
    Globe
} from 'lucide-react';

const HomePage = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [email, setEmail] = useState('');

    const categories = [
        'All', 'Technology', 'Software', 'Artificial Intelligence', 'E-commerce', 'Health', 'Education', 'Finance'
    ];

    const featuredProject = {
        title: "AI Powered Smart Investment Assistant",
        description: "AI-powered, personalized investment assistant",
        image: "/api/placeholder/800/400",
        funded: "85",
        backers: "1,234",
        daysLeft: "15"
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        console.log('Email submitted:', email);
        alert('Thank you for your interest!');
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <span className="text-2xl font-bold text-blue-700">Startup Bridge</span>
                        <div className="hidden md:flex space-x-4">
                            <button className="text-gray-600 hover:text-blue-600">Explore</button>
                            <button className="text-gray-600 hover:text-blue-600">Projects</button>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="relative hidden md:block">
                            <input
                                type="text"
                                placeholder="Search Project..."
                                className="w-64 pl-10 pr-4 py-2 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                        </div>
                        <button className="text-gray-700 hover:text-blue-600 transition">Login</button>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
                            Sign Up
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative h-[600px] bg-gradient-to-r from-blue-700 to-purple-600 pt-16">
                <div className="absolute inset-0 bg-black bg-opacity-30" />
                <div className="container mx-auto px-4 h-full flex items-center relative">
                    <div className="max-w-2xl text-white">
                        <h1 className="text-5xl font-bold mb-6">
                            Discover the Innovations of the Future
                        </h1>
                        <p className="text-xl mb-8 opacity-90">
                            Discover innovative ideas, evaluate investment opportunities, and shape the future
                        </p>
                        <form onSubmit={handleEmailSubmit} className="flex space-x-2 max-w-md">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your email address"
                                className="flex-grow px-4 py-3 rounded-l-full focus:outline-none"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-6 py-3 rounded-r-full hover:bg-blue-600 transition flex items-center"
                            >
                                Get Started <ChevronRight className="ml-2 w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div className="border-b">
                <div className="container mx-auto px-4">
                    <div className="flex items-center space-x-6 py-4 overflow-x-auto">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`whitespace-nowrap px-4 py-2 rounded-full ${
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

            {/* Featured Project */}
            <div className="container mx-auto px-4 py-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold">Featured Project</h2>
                    <button className="text-gray-600 hover:text-blue-600 flex items-center gap-1">
                        See All <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <div className="relative">
                        <img
                            src={featuredProject.image}
                            alt="Featured project"
                            className="w-full h-96 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                            <h3 className="text-2xl font-bold text-white mb-2">{featuredProject.title}</h3>
                            <p className="text-white opacity-90">{featuredProject.description}</p>
                        </div>
                    </div>
                    <div className="p-6 grid grid-cols-3 gap-4 bg-gray-50">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                            <div>
                                <div className="text-sm text-gray-600">Funded</div>
                                <div className="font-semibold">%{featuredProject.funded}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-blue-600" />
                            <div>
                                <div className="text-sm text-gray-600">Backers</div>
                                <div className="font-semibold">{featuredProject.backers}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-blue-600" />
                            <div>
                                <div className="text-sm text-gray-600">Days Left</div>
                                <div className="font-semibold">{featuredProject.daysLeft}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Project Grid */}
            <div className="bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-8">Popular Projects</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <ProjectCard key={item} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Features Section with existing content */}
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">Why Startup Bridge?</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        We bridge the gap between innovative entrepreneurs and visionary investors.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <Network className="w-12 h-12 text-blue-600" />,
                            title: "Seamless Connections",
                            description: "We bridge the gap between visionary entrepreneurs and strategic investors."
                        },
                        {
                            icon: <Rocket className="w-12 h-12 text-blue-600" />,
                            title: "Startup Ecosystem",
                            description: "Discover innovative startups and promising investment opportunities."
                        },
                        {
                            icon: <Globe className="w-12 h-12 text-blue-600" />,
                            title: "Global Reach",
                            description: "Connect with entrepreneurs and investors from all over the world."
                        }
                    ].map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                        >
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-100 py-12">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-600">
                        © 2024 Startup Bridge. All rights reserved.
                    </p>
                    <div className="mt-4 space-x-4">
                        <a href="#" className="text-gray-700 hover:text-blue-600">Privacy Policy</a>
                        <a href="#" className="text-gray-700 hover:text-blue-600">Terms of Use</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const ProjectCard = () => {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow">
            <img
                src="/api/placeholder/400/200"
                alt="Project"
                className="w-full h-48 object-cover"
            />
            <div className="p-6">
                <h3 className="font-semibold text-lg mb-2">Innovative Startup Project</h3>
                <p className="text-gray-600 text-sm mb-4">
                    We optimize investor decisions with an AI-powered financial technology solution.
                </p>
                <div className="space-y-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width: '70%'}} />
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-blue-600 font-medium">70% funded</span>
                        <span className="text-gray-600">12 days left</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
