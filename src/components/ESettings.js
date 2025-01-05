import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    GraduationCap,
    Briefcase,
    Award,
    Settings,
    ChevronRight,
    UserCog,
    Shield,
    Bell,
    Layout
} from 'lucide-react';

const EntrepreneurSettingsHub = () => {
    const navigate = useNavigate();

    const settingsSections = [
        {
            title: 'Profile Settings',
            description: 'Manage your educational background and qualifications',
            icon: GraduationCap,
            path: '/education',
            color: 'bg-blue-500',
            lightColor: 'bg-blue-50',
            textColor: 'text-blue-500'
        },
        {
            title: 'Experience',
            description: 'Update your professional experience and achievements',
            icon: Briefcase,
            path: '/experience',
            color: 'bg-emerald-500',
            lightColor: 'bg-emerald-50',
            textColor: 'text-emerald-500'
        },
        {
            title: 'Expertise & Skills',
            description: 'Showcase your skills and areas of expertise',
            icon: Award,
            path: '/expertise',
            color: 'bg-purple-500',
            lightColor: 'bg-purple-50',
            textColor: 'text-purple-500'
        },
        {
            title: 'Account Settings',
            description: 'Manage your account preferences and security',
            icon: UserCog,
            path: '/account',
            color: 'bg-gray-500',
            lightColor: 'bg-gray-50',
            textColor: 'text-gray-500'
        },
        {
            title: 'Privacy & Security',
            description: 'Control your privacy settings and security preferences',
            icon: Shield,
            path: '/privacy',
            color: 'bg-red-500',
            lightColor: 'bg-red-50',
            textColor: 'text-red-500'
        },
        {
            title: 'Notifications',
            description: 'Customize your notification preferences',
            icon: Bell,
            path: '/notifications',
            color: 'bg-amber-500',
            lightColor: 'bg-amber-50',
            textColor: 'text-amber-500'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Settings className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                            <p className="text-gray-500">Manage your entrepreneur profile and preferences</p>
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
                        <Layout className="w-5 h-5 text-gray-400" />
                        <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left">
                            <h4 className="font-medium text-gray-900">View Profile</h4>
                            <p className="text-sm text-gray-500">See how others view your profile</p>
                        </button>
                        <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left">
                            <h4 className="font-medium text-gray-900">Download Data</h4>
                            <p className="text-sm text-gray-500">Export your profile data</p>
                        </button>
                        <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left">
                            <h4 className="font-medium text-gray-900">Help Center</h4>
                            <p className="text-sm text-gray-500">Get help with your account</p>
                        </button>
                        <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left">
                            <h4 className="font-medium text-gray-900">Support</h4>
                            <p className="text-sm text-gray-500">Contact our support team</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EntrepreneurSettingsHub;