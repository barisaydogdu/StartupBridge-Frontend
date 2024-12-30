import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Search, ChevronRight, Clock, Users, TrendingUp,
    Network, Rocket, Globe, MapPin
} from 'lucide-react';

const HomePage = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [email, setEmail] = useState('');

    const categories = [
        'All', 'Technology', 'Software', 'Artificial Intelligence',
        'E-commerce', 'Health', 'Education', 'Finance'
    ];

    const projects = [
        {
            id: 1,
            title: "AI-Powered Healthcare Assistant",
            description: "Healthcare innovation using machine learning for personalized patient care and diagnosis support.",
            image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=400&h=200",
            fundedPercentage: "70",
            daysLeft: "12",
            tags: ["AI", "Healthcare", "ML"],
            category: "Artificial Intelligence"
        },
        {
            id: 2,
            title: "Sustainable Energy Platform",
            description: "Renewable energy management system for optimizing solar and wind power distribution.",
            image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=400&h=200",
            fundedPercentage: "65",
            daysLeft: "15",
            tags: ["Energy", "Sustainability"],
            category: "Technology"
        },
        {
            id: 3,
            title: "Smart City Infrastructure",
            description: "IoT-based urban management system for traffic, waste, and utility optimization.",
            image: "https://images.unsplash.com/photo-1494522358652-f30e61a60313?auto=format&fit=crop&w=400&h=200",
            fundedPercentage: "80",
            daysLeft: "20",
            tags: ["IoT", "Smart City"],
            category: "Technology"
        },
        {
            id: 4,
            title: "EdTech Learning Platform",
            description: "Adaptive learning platform using AI to personalize educational content.",
            image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&h=200",
            fundedPercentage: "75",
            daysLeft: "18",
            tags: ["Education", "AI"],
            category: "Education"
        },
        {
            id: 5,
            title: "FinTech Banking Solution",
            description: "Digital banking platform with advanced security and user-friendly interface.",
            image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=400&h=200",
            fundedPercentage: "85",
            daysLeft: "10",
            tags: ["FinTech", "Security"],
            category: "Finance"
        },
        {
            id: 6,
            title: "E-commerce Analytics Tool",
            description: "Advanced analytics platform for e-commerce businesses with predictive insights.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&h=200",
            fundedPercentage: "60",
            daysLeft: "25",
            tags: ["Analytics", "E-commerce"],
            category: "E-commerce"
        }

    ];

    const featuredProject = {
        id: 1,
        title: "AI-Powered Smart Investment Assistant",
        description: "Our platform revolutionizes investment decisions by leveraging advanced AI algorithms to provide personalized portfolio recommendations, real-time market analysis, and risk assessment. Built for both novice and experienced investors, it offers adaptive learning capabilities that evolve with your investment journey.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&h=400",
        funded: "85",
        backers: "1,234",
        daysLeft: "15",
        tags: ["AI", "FinTech", "Investment"],
        teamSize: "12",
        location: "San Francisco, CA",
        marketSize: "$50B+",
        competition: "Medium",
        stage: "Series A",
        traction: "50k+ Monthly Active Users"
    };

    const handleNavigation = {

        login: () => navigate('/login'),
        signup: () => navigate('/register'),
        project: (id) => navigate(`/projects/${id}`),
        category: (category) => {
            setSelectedCategory(category.toLowerCase());
        },
        search: (query) => navigate(`/search?q=${query}`)
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        console.log('Email submitted:', email);
        alert('Thank you for subscribing!');
        setEmail('');
    };


    const filteredProjects = selectedCategory === 'all'
        ? projects
        : projects.filter(project => project.category.toLowerCase() === selectedCategory);

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <Link to="/" className="text-2xl font-bold text-blue-700">
                            Startup Bridge
                        </Link>
                        <div className="hidden md:flex space-x-4">

                            <Link to="/projects" className="text-gray-600 hover:text-blue-600">
                                Projects
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleNavigation.search(e.target.search.value);
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
                        <button
                            onClick={handleNavigation.login}
                            className="text-gray-700 hover:text-blue-600 transition"
                        >
                            Login
                        </button>
                        <button
                            onClick={handleNavigation.signup}
                            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative h-[600px] overflow-hidden">
                {/* Animasyonlu Gradient Arka Plan */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-600 to-blue-700 animate-gradient-x" />

                {/* Dekoratif Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 25px 25px, white 2%, transparent 0%), radial-gradient(circle at 75px 75px, white 2%, transparent 0%)',
                        backgroundSize: '100px 100px'
                    }} />
                </div>

                {/* İçerik */}
                <div className="container mx-auto px-4 h-full flex items-center relative">
                    <div className="max-w-2xl text-white">
                        {/* Ana Başlık - Scale Animasyonu */}
                        <h1 className="text-6xl font-bold mb-6 animate-fade-in-up">
                            Discover the Innovations of the Future
                        </h1>

                        {/* Alt Başlık */}
                        <p className="text-xl mb-8 opacity-90 animate-fade-in-up delay-100">
                            Discover innovative ideas, evaluate investment opportunities, and shape the future
                        </p>

                        {/* Email Form */}
                        <form onSubmit={handleEmailSubmit}
                              className="flex space-x-2 max-w-md animate-fade-in-up delay-200">
                            <div className="flex-grow relative group">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email address"
                                    className="w-full px-4 py-3 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 bg-white/10 backdrop-blur-md placeholder-white/60"
                                    required
                                    autoFocus
                                />
                                <div className="absolute inset-0 rounded-l-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-8 py-3 rounded-r-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center group"
                            >
                                Get Started
                                <ChevronRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Categories and Projects */}
            <div className="bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    {/* Categories */}
                    <div className="flex flex-wrap gap-4 mb-8 justify-center">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleNavigation.category(category)}
                                className={`px-4 py-2 rounded-full transition-colors ${
                                    selectedCategory === category.toLowerCase()
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Projects Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project) => (
                            <div
                                key={project.id}
                                onClick={() => handleNavigation.project(project.id)}
                                className="group bg-white rounded-xl shadow-sm hover:shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                            >
                                {/* Image Container */}
                                <div className="relative overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                        <div className="p-4 text-white w-full">
                                            <p className="text-sm font-medium">Click to view details</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Container */}
                                <div className="p-6">
                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {project.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium
                                     hover:bg-blue-100 transition-colors duration-200"
                                            >
                            {tag}
                        </span>
                                        ))}
                                    </div>

                                    {/* Title & Description */}
                                    <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-200">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                        {project.description}
                                    </p>

                                    {/* Progress Section */}
                                    <div className="space-y-3">
                                        {/* Progress Bar */}
                                        <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
                                                 style={{
                                                     width: `${project.fundedPercentage}%`,
                                                     transition: 'width 1s ease-in-out'
                                                 }} />
                                        </div>

                                        {/* Stats */}
                                        <div className="flex justify-between text-sm">
                                            <div className="flex items-center gap-2">
                            <span className="text-blue-600 font-semibold">
                                {project.fundedPercentage}% funded
                            </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-500">
                                                <Clock className="w-4 h-4" />
                                                <span>{project.daysLeft} days left</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Featured Project */}
            <div className="container mx-auto px-4 py-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold">Featured Project</h2>
                    <Link
                        to="/projects"
                        className="text-gray-600 hover:text-blue-600 flex items-center gap-1"
                    >
                        See All <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

                <div
                    onClick={() => handleNavigation.project(featuredProject.id)}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                >
                    <div className="relative">
                        <img
                            src={featuredProject.image}
                            alt={featuredProject.title}
                            className="w-full h-96 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                            <div className="flex flex-wrap gap-2 mb-3">
                                {featuredProject.tags.map((tag, index) => (
                                    <span key={index} className="bg-blue-500 bg-opacity-70 text-white px-2 py-1 rounded-full text-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">{featuredProject.title}</h3>
                            <p className="text-white opacity-90">{featuredProject.description}</p>
                            <div className="mt-4 flex gap-4 text-white opacity-80 text-sm">
                                <span className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    {featuredProject.teamSize} Team Members
                                </span>
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {featuredProject.location}
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Featured Project */}
                    <div className="container mx-auto px-4 py-12">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold">Featured Project</h2>
                            <Link to="/projects" className="text-gray-600 hover:text-blue-600 flex items-center gap-1">
                                See All <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div onClick={() => handleNavigation.project(featuredProject.id)} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                            {/* ... image ve diğer içerikler ... */}

                            {/* BU KISMI DEĞİŞTİRECEKSİNİZ */}
                            <div className="p-6 grid grid-cols-3 gap-4 bg-gray-50">
                                {/* ... mevcut kartlar ... */}
                            </div>
                            {/* DEĞİŞİKLİK BURADA BİTİYOR */}

                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
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
                        <Link to="/privacy" className="text-gray-700 hover:text-blue-600">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="text-gray-700 hover:text-blue-600">
                            Terms of Use
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;