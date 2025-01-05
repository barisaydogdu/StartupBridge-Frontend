import React, { useState } from 'react';
import {
    DollarSign, AlertCircle, Shield, TrendingUp,
    Calendar, Users, CheckCircle2, ArrowLeft, LightbulbIcon,
    Clock, Rocket
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const InvestNow = ({ project }) => {
    const navigate = useNavigate();
    const [selectedTier, setSelectedTier] = useState(null);
    const [customAmount, setCustomAmount] = useState('');
    const [step, setStep] = useState(1);

    const investmentTiers = [
        {
            id: 1,
            name: "Early Bird Investor",
            amount: 1000,
            perks: [
                "Early access to platform features",
                "Quarterly investor updates",
                "Priority customer support"
            ],
            description: "Perfect for those starting their investment journey",
        },
        {
            id: 2,
            name: "Strategic Partner",
            amount: 5000,
            perks: [
                "All Early Bird benefits",
                "Monthly virtual meetings with founding team",
                "Access to beta features",
                "Strategic input opportunities"
            ],
            description: "For investors looking for active involvement",
            recommended: true
        },
        {
            id: 3,
            name: "Lead Investor",
            amount: 10000,
            perks: [
                "All Strategic Partner benefits",
                "Board observer rights",
                "Priority investment rights in future rounds",
                "Direct line to founders",
                "Advisory board position"
            ],
            description: "For experienced investors seeking significant influence",
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle investment submission
        console.log('Investment submitted:', { selectedTier, customAmount });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
            <div className="container mx-auto px-4 py-8">
                {/* Navigation */}
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-800 transition-colors mb-8 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md"
                >
                    <ArrowLeft size={20} />
                    <span>Back to Project</span>
                </button>

                {/* Project Summary */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-white p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Rocket className="w-8 h-8 text-emerald-300" />
                            <h1 className="text-3xl font-bold">{project?.title || "Investment Details"}</h1>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                <div className="flex items-center gap-2 text-emerald-300 mb-2">
                                    <DollarSign className="w-5 h-5" />
                                    <span>Raised</span>
                                </div>
                                <div className="text-2xl font-bold">$750,000</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                <div className="flex items-center gap-2 text-emerald-300 mb-2">
                                    <TrendingUp className="w-5 h-5" />
                                    <span>Goal</span>
                                </div>
                                <div className="text-2xl font-bold">$1,000,000</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                <div className="flex items-center gap-2 text-emerald-300 mb-2">
                                    <Users className="w-5 h-5" />
                                    <span>Investors</span>
                                </div>
                                <div className="text-2xl font-bold">245</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                <div className="flex items-center gap-2 text-emerald-300 mb-2">
                                    <Clock className="w-5 h-5" />
                                    <span>Time Left</span>
                                </div>
                                <div className="text-2xl font-bold">15 days</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Investment Options */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Investment Tiers */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-2xl font-bold mb-6">Select Investment Tier</h2>
                        {investmentTiers.map((tier) => (
                            <div
                                key={tier.id}
                                onClick={() => {
                                    setSelectedTier(tier);
                                    setCustomAmount('');
                                }}
                                className={`relative p-6 bg-white rounded-xl shadow-sm border-2 transition-all cursor-pointer
                                    ${selectedTier?.id === tier.id
                                    ? 'border-emerald-500 shadow-emerald-100'
                                    : 'border-transparent hover:border-emerald-200'}`}
                            >
                                {tier.recommended && (
                                    <div className="absolute -top-3 left-6 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm">
                                        Recommended
                                    </div>
                                )}
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-semibold">{tier.name}</h3>
                                        <p className="text-gray-600">{tier.description}</p>
                                    </div>
                                    <div className="text-2xl font-bold text-emerald-600">
                                        ${tier.amount.toLocaleString()}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    {tier.perks.map((perk, index) => (
                                        <div key={index} className="flex items-center gap-2 text-gray-600">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                            <span>{perk}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Custom Amount */}
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-bold mb-4">Custom Amount</h3>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="number"
                                    value={customAmount}
                                    onChange={(e) => {
                                        setCustomAmount(e.target.value);
                                        setSelectedTier(null);
                                    }}
                                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                    placeholder="Enter custom amount"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Investment Summary */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm sticky top-6">
                            <h2 className="text-xl font-bold mb-6">Investment Summary</h2>
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Investment Amount</span>
                                    <span className="font-bold">
                                        ${(selectedTier?.amount || customAmount || 0).toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Platform Fee (2%)</span>
                                    <span className="font-bold">
                                        ${((selectedTier?.amount || customAmount || 0) * 0.02).toLocaleString()}
                                    </span>
                                </div>
                                <div className="pt-4 border-t">
                                    <div className="flex justify-between">
                                        <span className="font-bold">Total</span>
                                        <span className="font-bold text-emerald-600">
                                            ${((selectedTier?.amount || customAmount || 0) * 1.02).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={!selectedTier && !customAmount}
                                className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium
                                    hover:bg-emerald-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                Proceed to Payment
                            </button>

                            <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
                                <Shield className="w-4 h-4" />
                                <span>Secure payment processing</span>
                            </div>
                        </div>

                        {/* Investment Tips */}
                        <div className="bg-emerald-50 p-6 rounded-xl">
                            <div className="flex items-center gap-2 text-emerald-800 mb-4">
                                <LightbulbIcon className="w-5 h-5" />
                                <h3 className="font-semibold">Investment Tips</h3>
                            </div>
                            <ul className="text-sm text-emerald-700 space-y-2">
                                <li>• Diversify your investment portfolio</li>
                                <li>• Research the team and market thoroughly</li>
                                <li>• Consider the investment timeline</li>
                                <li>• Review all legal documents carefully</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Risk Warning */}
                <div className="mt-8 flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                    <div>
                        <p className="font-medium text-yellow-800 mb-1">Important Notice</p>
                        <p className="text-sm text-yellow-700">
                            Investing in startups involves risks, including illiquidity and loss of capital.
                            Please read all project documentation before investing and ensure you understand
                            the risks involved. Past performance is not indicative of future results.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestNow;