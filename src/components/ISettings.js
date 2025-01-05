import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Heart,
    DollarSign,
    Settings,
    ChevronRight,
    UserCog,
    Shield,
    Bell,
    Layout,
    Target,
    TrendingUp,
    LineChart,
    Wallet
} from 'lucide-react';
import NavbarAuth from "./NavbarAuth";

const InvestorSettingsHub = () => {
    const navigate = useNavigate();

    const settingsSections = [
        {
            title: 'Interests & Values',
            description: 'Manage your investment interests and impact goals',
            icon: Heart,
            path: '/interestandvalues',
            color: 'bg-rose-500',
            lightColor: 'bg-rose-50',
            textColor: 'text-rose-500'
        },
        {
            title: 'Investment Portfolio',
            description: 'Track and update your investment history',
            icon: LineChart,
            path: '/investmentportfolio',
            color: 'bg-emerald-500',
            lightColor: 'bg-emerald-50',
            textColor: 'text-emerald-500'
        },
        {
            title: 'Account Settings',
            description: 'Manage your account preferences and security',
            icon: UserCog,
            path: '/account',
            color: 'bg-blue-500',
            lightColor: 'bg-blue-50',
            textColor: 'text-blue-500'
        },
        {
            title: 'Privacy & Security',
            description: 'Control your privacy settings and security preferences',
            icon: Shield,
            path: '/privacy',
            color: 'bg-purple-500',
            lightColor: 'bg-purple-50',
            textColor: 'text-purple-500'
        },
        {
            title: 'Investment Goals',
            description: 'Set and track your investment targets',
            icon: Target,
            path: '/goals',
            color: 'bg-amber-500',
            lightColor: 'bg-amber-50',
            textColor: 'text-amber-500'
        },
        {
            title: 'Notifications',
            description: 'Customize your notification preferences',
            icon: Bell,
            path: '/notifications',
            color: 'bg-indigo-500',
            lightColor: 'bg-indigo-50',
            textColor: 'text-indigo-500'
        }
    ];

    const quickActions = [
        {
            title: 'Portfolio Overview',
            description: 'View your investment summary',
            icon: Wallet
        },
        {
            title: 'Investment Analytics',
            description: 'Track your performance',
            icon: TrendingUp
        },
        {
            title: 'Market Updates',
            description: 'Latest market insights',
            icon: DollarSign
        },
        {
            title: 'Support',
            description: 'Get help with your account',
            icon: Layout
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <NavbarAuth/>
            {/* Header Section */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center space-x-4">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                            <Settings className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Investor Settings</h1>
                            <p className="text-gray-500">Manage your investor profile and preferences</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Settings Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {settingsSections.map((section) => (
                        <button
                            key={section.path}
                            onClick={() => navigate(section.path)}
                            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 text-left group relative overflow-hidden"
                        >
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-200">
                                <div className="absolute inset-0" style={{
                                    backgroundImage: 'radial-gradient(circle at 20px 20px, black 1%, transparent 1%)',
                                    backgroundSize: '40px 40px'
                                }}/>
                            </div>

                            <div className="relative">
                                {/* Icon */}
                                <div className={`w-12 h-12 ${section.lightColor} rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-200`}>
                                    <section.icon className={`w-6 h-6 ${section.textColor}`} />
                                </div>

                                {/* Content */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                                        <ChevronRight className="w-5 h-5 text-gray-400 transform group-hover:translate-x-1 transition-transform duration-200" />
                                    </div>
                                    <p className="text-sm text-gray-500">{section.description}</p>
                                </div>
                            </div>

                            {/* Hover Border Effect */}
                            <div className={`absolute bottom-0 left-0 h-1 ${section.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200`} />
                        </button>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <DollarSign className="w-5 h-5 text-emerald-600" />
                        <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {quickActions.map((action, index) => (
                            <button
                                key={index}
                                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left group"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <action.icon className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                                    <h4 className="font-medium text-gray-900">{action.title}</h4>
                                </div>
                                <p className="text-sm text-gray-500">{action.description}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Investment Summary */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold">Investment Summary</h2>
                        <button className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                            View Details
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/10 rounded-lg p-4">
                            <p className="text-sm text-white/80 mb-1">Active Investments</p>
                            <p className="text-2xl font-bold">12</p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-4">
                            <p className="text-sm text-white/80 mb-1">Total Portfolio Value</p>
                            <p className="text-2xl font-bold">$1.2M</p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-4">
                            <p className="text-sm text-white/80 mb-1">YTD Return</p>
                            <p className="text-2xl font-bold">+15.4%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestorSettingsHub;