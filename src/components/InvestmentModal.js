import React, { useState } from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
import { DollarSign, AlertCircle, Shield, TrendingUp } from 'lucide-react';

const InvestmentModal = ({ project, isOpen, onClose }) => {
    const [amount, setAmount] = useState('');
    const [selectedReward, setSelectedReward] = useState(null);

    const rewardTiers = [
        {
            amount: 1000,
            title: "Early Investor",
            description: "Get early access to the platform and quarterly investor updates",
            estimated: "Dec 2024"
        },
        {
            amount: 5000,
            title: "Strategic Partner",
            description: "All previous rewards plus quarterly virtual meetings with the founding team",
            estimated: "Dec 2024"
        },
        {
            amount: 10000,
            title: "Key Stakeholder",
            description: "All previous rewards plus advisory board position and equity options",
            estimated: "Dec 2024"
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle investment submission
        console.log('Investment submitted:', { amount, selectedReward });
        onClose();
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-2xl font-bold">
                        Invest in {project?.title}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Join us in revolutionizing healthcare through AI technology
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="my-6">
                    {/* Project Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-blue-50 p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-blue-600">{project?.funded}%</div>
                            <div className="text-sm text-gray-600">Funded</div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-blue-600">{project?.backers}</div>
                            <div className="text-sm text-gray-600">Backers</div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-blue-600">{project?.daysLeft}</div>
                            <div className="text-sm text-gray-600">Days Left</div>
                        </div>
                    </div>

                    {/* Investment Benefits */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-4">Why Invest?</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                <Shield className="w-6 h-6 text-blue-600 flex-shrink-0" />
                                <div>
                                    <h4 className="font-medium">Secure Investment</h4>
                                    <p className="text-sm text-gray-600">Protected by secure payment processing</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                <TrendingUp className="w-6 h-6 text-blue-600 flex-shrink-0" />
                                <div>
                                    <h4 className="font-medium">Growth Potential</h4>
                                    <p className="text-sm text-gray-600">Be part of a rapidly growing market</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Investment Tiers */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Select Investment Tier</h3>
                        {rewardTiers.map((tier, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    setSelectedReward(tier);
                                    setAmount(tier.amount.toString());
                                }}
                                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                    selectedReward === tier
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-blue-300'
                                }`}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-semibold text-lg">{tier.title}</h4>
                                    <span className="text-blue-600 font-bold">${tier.amount.toLocaleString()}</span>
                                </div>
                                <p className="text-gray-600 mb-2">{tier.description}</p>
                                <div className="text-sm text-gray-500">
                                    Estimated delivery: {tier.estimated}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Custom Amount Input */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-3">Or Enter Custom Amount</h3>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter amount"
                            />
                        </div>
                    </div>

                    {/* Warning Notice */}
                    <div className="mt-6 flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
                        <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                        <div className="text-sm text-yellow-800">
                            <p className="font-medium mb-1">Important Notice</p>
                            <p>Investing in startups involves risks, including illiquidity and loss of capital. Please read all project documentation before investing.</p>
                        </div>
                    </div>
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleSubmit}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        Confirm Investment
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default InvestmentModal;