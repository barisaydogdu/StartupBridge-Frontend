import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Shield,
    Eye,
    EyeOff,
    Lock,
    Globe,
    Users,
    Bell,
    Mail,
    Phone,
    ArrowLeft,
    AlertCircle,
    CheckCircle2,
    Download,
    Trash2,
    History
} from 'lucide-react';

const PrivacySettings = () => {
    const navigate = useNavigate();
    const [showSaveToast, setShowSaveToast] = useState(false);

    // Privacy settings state
    const [settings, setSettings] = useState({
        profileVisibility: 'public',
        showEmail: true,
        showPhone: false,
        showLocation: true,
        enableNotifications: true,
        emailNotifications: true,
        twoFactorAuth: false,
        dataCollection: true,
        marketingEmails: false,
        thirdPartySharing: false
    });

    // Handle toggle changes
    const handleToggle = (setting) => {
        setSettings(prev => ({
            ...prev,
            [setting]: !prev[setting]
        }));
    };

    // Handle visibility change
    const handleVisibilityChange = (value) => {
        setSettings(prev => ({
            ...prev,
            profileVisibility: value
        }));
    };

    // Save changes
    const handleSave = () => {
        // Here you would typically make an API call to save the settings
        setShowSaveToast(true);
        setTimeout(() => setShowSaveToast(false), 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => navigate('/settings')}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                    <Shield className="w-6 h-6 text-indigo-600" />
                                    Privacy Settings
                                </h1>
                                <p className="text-sm text-gray-500 mt-1">Manage your privacy preferences and data settings</p>
                            </div>
                        </div>
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-6">
                    {/* Profile Visibility Section */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Eye className="w-5 h-5 text-indigo-600" />
                            Profile Visibility
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => handleVisibilityChange('public')}
                                    className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                                        settings.profileVisibility === 'public'
                                            ? 'border-indigo-600 bg-indigo-50'
                                            : 'border-gray-200 hover:border-indigo-200'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Globe className={`w-5 h-5 ${settings.profileVisibility === 'public' ? 'text-indigo-600' : 'text-gray-400'}`} />
                                        <div>
                                            <p className="font-medium text-gray-900">Public</p>
                                            <p className="text-sm text-gray-500">Visible to everyone</p>
                                        </div>
                                    </div>
                                </button>
                                <button
                                    onClick={() => handleVisibilityChange('connections')}
                                    className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                                        settings.profileVisibility === 'connections'
                                            ? 'border-indigo-600 bg-indigo-50'
                                            : 'border-gray-200 hover:border-indigo-200'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Users className={`w-5 h-5 ${settings.profileVisibility === 'connections' ? 'text-indigo-600' : 'text-gray-400'}`} />
                                        <div>
                                            <p className="font-medium text-gray-900">Connections Only</p>
                                            <p className="text-sm text-gray-500">Only visible to your connections</p>
                                        </div>
                                    </div>
                                </button>
                                <button
                                    onClick={() => handleVisibilityChange('private')}
                                    className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                                        settings.profileVisibility === 'private'
                                            ? 'border-indigo-600 bg-indigo-50'
                                            : 'border-gray-200 hover:border-indigo-200'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Lock className={`w-5 h-5 ${settings.profileVisibility === 'private' ? 'text-indigo-600' : 'text-gray-400'}`} />
                                        <div>
                                            <p className="font-medium text-gray-900">Private</p>
                                            <p className="text-sm text-gray-500">Only visible to you</p>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information Section */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Mail className="w-5 h-5 text-indigo-600" />
                            Contact Information
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="font-medium text-gray-900">Show Email Address</p>
                                        <p className="text-sm text-gray-500">Allow others to see your email</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleToggle('showEmail')}
                                    className={`w-12 h-6 rounded-full transition-colors ${
                                        settings.showEmail ? 'bg-indigo-600' : 'bg-gray-200'
                                    }`}
                                >
                                    <div className={`w-5 h-5 bg-white rounded-full transform transition-transform ${
                                        settings.showEmail ? 'translate-x-6' : 'translate-x-1'
                                    }`} />
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="font-medium text-gray-900">Show Phone Number</p>
                                        <p className="text-sm text-gray-500">Allow others to see your phone number</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleToggle('showPhone')}
                                    className={`w-12 h-6 rounded-full transition-colors ${
                                        settings.showPhone ? 'bg-indigo-600' : 'bg-gray-200'
                                    }`}
                                >
                                    <div className={`w-5 h-5 bg-white rounded-full transform transition-transform ${
                                        settings.showPhone ? 'translate-x-6' : 'translate-x-1'
                                    }`} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Security Section */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Lock className="w-5 h-5 text-indigo-600" />
                            Security
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Shield className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                                        <p className="text-sm text-gray-500">Add an extra layer of security</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleToggle('twoFactorAuth')}
                                    className={`w-12 h-6 rounded-full transition-colors ${
                                        settings.twoFactorAuth ? 'bg-indigo-600' : 'bg-gray-200'
                                    }`}
                                >
                                    <div className={`w-5 h-5 bg-white rounded-full transform transition-transform ${
                                        settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                                    }`} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Data & Personalization */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <History className="w-5 h-5 text-indigo-600" />
                            Data & Personalization
                        </h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left">
                                    <Download className="w-5 h-5 text-gray-400 mb-2" />
                                    <h4 className="font-medium text-gray-900">Download Your Data</h4>
                                    <p className="text-sm text-gray-500">Get a copy of your data</p>
                                </button>
                                <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left">
                                    <Trash2 className="w-5 h-5 text-gray-400 mb-2" />
                                    <h4 className="font-medium text-gray-900">Delete Account</h4>
                                    <p className="text-sm text-gray-500">Permanently delete your account</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Save Toast */}
            {showSaveToast && (
                <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Settings saved successfully
                </div>
            )}
        </div>
    );
};

export default PrivacySettings;