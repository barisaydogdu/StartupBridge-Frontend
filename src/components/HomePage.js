import React, { useState } from 'react';
import { ChevronRight, Globe, Rocket, Network } from 'lucide-react';

const HomePage = () => {
    const [email, setEmail] = useState('');

    const features = [
        {
            icon: <Network className="w-12 h-12 text-emerald-600" />,
            title: "Seamless Connections",
            description: "Bridge the gap between visionary entrepreneurs and strategic investors."
        },
        {
            icon: <Rocket className="w-12 h-12 text-emerald-600" />,
            title: "Startup Ecosystem",
            description: "Discover innovative ventures and promising investment opportunities."
        },
        {
            icon: <Globe className="w-12 h-12 text-emerald-600" />,
            title: "Global Reach",
            description: "Connect with entrepreneurs and investors from around the world."
        }
    ];

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement email submission logic
        console.log('Email submitted:', email);
        alert('Thank you for your interest!');
    };

    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* Header */}
            <header className="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold text-emerald-700">InvestConnect</div>
                    <nav className="space-x-6">
                        <a href="#" className="text-gray-700 hover:text-emerald-600 transition">Features</a>
                        <a href="#" className="text-gray-700 hover:text-emerald-600 transition">About</a>
                        <a href="#" className="text-gray-700 hover:text-emerald-600 transition">Contact</a>
                        <a href="#" className="bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700 transition">Login</a>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <main className="container mx-auto px-4 pt-24 pb-16">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h1 className="text-5xl font-bold leading-tight">
                            Connect. Invest. <span className="text-emerald-600">Innovate.</span>
                        </h1>
                        <p className="text-xl text-gray-600">
                            A revolutionary platform bringing entrepreneurs and investors together,
                            transforming groundbreaking ideas into successful ventures.
                        </p>

                        {/* Email Signup */}
                        <form onSubmit={handleEmailSubmit} className="flex space-x-2 max-w-md">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="flex-grow px-4 py-3 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-emerald-600 text-white px-6 py-3 rounded-r-full hover:bg-emerald-700 transition flex items-center"
                            >
                                Get Started <ChevronRight className="ml-2 w-5 h-5" />
                            </button>
                        </form>
                    </div>

                    {/* Hero Image Placeholder */}
                    <div className="hidden md:block">
                        <div className="bg-emerald-50 rounded-xl p-8 transform hover:scale-105 transition-transform duration-300">
                            <img
                                src="/api/placeholder/600/400"
                                alt="Investors and Entrepreneurs Connecting"
                                className="rounded-lg shadow-xl"
                            />
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <section className="mt-24">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Why InvestConnect?</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            We provide a sophisticated platform that simplifies the connection between
                            innovative entrepreneurs and forward-thinking investors.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow group"
                            >
                                <div className="mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-100 py-12 mt-16">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-600">
                        © 2024 InvestConnect. All rights reserved.
                    </p>
                    <div className="mt-4 space-x-4">
                        <a href="#" className="text-gray-700 hover:text-emerald-600">Privacy Policy</a>
                        <a href="#" className="text-gray-700 hover:text-emerald-600">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;