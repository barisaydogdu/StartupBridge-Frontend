import React from 'react';
import { Rocket, DollarSign } from 'lucide-react';

const RoleSelection = () => {
    const handleRoleSelect = (role) => {
        if (role === 'entrepreneur') {
            window.location.href = '/entrepreneurs/create';
        } else {
            window.location.href = '/investors/create';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Choose Your Path
                    </h1>
                    <p className="text-xl text-gray-600">
                        Select how you want to participate in our community
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Entrepreneur Card */}
                    <button
                        onClick={() => handleRoleSelect('entrepreneur')}
                        className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="p-8 relative">
                            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                                <Rocket className="w-8 h-8 text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                I'm an Entrepreneur
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Launch your ideas, connect with investors, and bring your vision to life.
                                Share your projects and find the support you need to grow.
                            </p>
                            <div className="text-blue-600 font-semibold flex items-center gap-2">
                                Get Started
                                <span className="transform group-hover:translate-x-1 transition-transform">
                  →
                </span>
                            </div>
                        </div>
                    </button>

                    {/* Investor Card */}
                    <button
                        onClick={() => handleRoleSelect('investor')}
                        className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="p-8 relative">
                            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                                <DollarSign className="w-8 h-8 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                I'm an Investor
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Discover promising opportunities, support innovative entrepreneurs,
                                and be part of the next big success story.
                            </p>
                            <div className="text-green-600 font-semibold flex items-center gap-2">
                                Get Started
                                <span className="transform group-hover:translate-x-1 transition-transform">
                  →
                </span>
                            </div>
                        </div>
                    </button>
                </div>

                <div className="text-center mt-12">
                    <p className="text-gray-500">
                        You can always change your role later from your account settings
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RoleSelection;