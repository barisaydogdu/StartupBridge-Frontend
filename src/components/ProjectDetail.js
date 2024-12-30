import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Share2, Heart, Users, MapPin, ArrowLeft, X, DollarSign, AlertCircle, Shield, TrendingUp } from 'lucide-react';

// Investment Modal Component
const InvestmentModal = ({ project, isOpen, onClose }) => {
    const [amount, setAmount] = useState('');
    const [selectedReward, setSelectedReward] = useState(null);

    if (!isOpen) return null;

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
        console.log('Investment submitted:', { amount, selectedReward });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">
                            Invest in {project?.title}
                        </h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <X size={24} />
                        </button>
                    </div>

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

                    {/* Action Buttons */}
                    <div className="mt-6 flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Confirm Investment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main ProjectDetail Component
const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showInvestModal, setShowInvestModal] = useState(false);

    const projectsData = {
        1: {
            title: "AI-Powered Healthcare Assistant",
            description: "Healthcare innovation using machine learning for personalized patient care and diagnosis support.",
            longDescription: "Our healthcare platform leverages advanced machine learning algorithms to revolutionize patient care by providing personalized diagnoses, treatment recommendations, and continuous monitoring. The system analyzes patient data, medical history, and current symptoms to assist healthcare professionals in making more accurate and timely decisions.",
            keyFeatures: [
                "Real-time patient monitoring",
                "AI-powered diagnosis assistance",
                "Personalized treatment recommendations",
                "Medical imaging analysis",
                "Patient data analytics",
                "Healthcare provider collaboration tools"
            ],
            image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&h=400",
            funded: "70",
            fundingGoal: "$1,500,000",
            backers: "856",
            daysLeft: "12",
            tags: ["AI", "Healthcare", "ML"],
            teamSize: "8",
            location: "Boston, MA",
            stage: "Series A",
            marketSize: "$20B+",
            competition: "Medium",
            traction: "25k+ Active Users"
        },
        2: {
            title: "Sustainable Energy Platform",
            description: "Renewable energy management system for optimizing solar and wind power distribution.",
            longDescription: "Our platform revolutionizes renewable energy distribution through smart grid technology and advanced analytics. We optimize energy allocation, reduce waste, and maximize the efficiency of renewable energy sources through real-time monitoring and AI-driven predictive maintenance.",
            keyFeatures: [
                "Smart grid optimization",
                "Renewable energy forecasting",
                "Distribution automation",
                "Energy storage management",
                "Real-time monitoring",
                "Predictive maintenance"
            ],
            image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&h=400",
            funded: "65",
            fundingGoal: "$2,500,000",
            backers: "1,023",
            daysLeft: "15",
            tags: ["Energy", "Sustainability"],
            teamSize: "15",
            location: "Austin, TX",
            stage: "Series B",
            marketSize: "$30B+",
            competition: "Low",
            traction: "40k+ Installations"
        },
        3: {
            title: "Smart City Infrastructure",
            description: "IoT-based urban management system for traffic, waste, and utility optimization.",
            longDescription: "Our smart city solution integrates IoT sensors, real-time analytics, and automated systems to optimize urban infrastructure. From traffic management to waste collection and utility monitoring, we're making cities more efficient and sustainable.",
            keyFeatures: [
                "Traffic optimization",
                "Waste management",
                "Utility monitoring",
                "Environmental sensing",
                "Emergency response",
                "Public transportation integration"
            ],
            image: "https://images.unsplash.com/photo-1494522358652-f30e61a60313?auto=format&fit=crop&w=800&h=400",
            funded: "80",
            fundingGoal: "$3,000,000",
            backers: "1,544",
            daysLeft: "20",
            tags: ["IoT", "Smart City"],
            teamSize: "20",
            location: "Singapore",
            stage: "Growth",
            marketSize: "$40B+",
            competition: "Medium",
            traction: "10 City Partnerships"
        },
        4: {
            title: "EdTech Learning Platform",
            description: "Adaptive learning platform using AI to personalize educational content.",
            longDescription: "Our educational technology platform uses artificial intelligence to create personalized learning experiences for students. The system adapts to individual learning styles, paces, and preferences while providing real-time feedback and progress tracking.",
            keyFeatures: [
                "Personalized learning paths",
                "Real-time progress tracking",
                "Interactive content",
                "AI-powered assessments",
                "Collaborative learning tools",
                "Parent-teacher dashboard"
            ],
            image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&h=400",
            funded: "75",
            fundingGoal: "$1,000,000",
            backers: "925",
            daysLeft: "18",
            tags: ["Education", "AI"],
            teamSize: "10",
            location: "London, UK",
            stage: "Series A",
            marketSize: "$15B+",
            competition: "High",
            traction: "100k+ Students"
        },
        5: {
            title: "FinTech Banking Solution",
            description: "Digital banking platform with advanced security and user-friendly interface.",
            longDescription: "Our digital banking platform combines cutting-edge security measures with an intuitive user interface to provide a seamless banking experience. We offer innovative features like AI-powered fraud detection, real-time transactions, and personalized financial insights.",
            keyFeatures: [
                "Advanced security protocols",
                "Real-time transactions",
                "AI fraud detection",
                "Personal finance management",
                "Investment tools",
                "Cross-border payments"
            ],
            image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=800&h=400",
            funded: "85",
            fundingGoal: "$4,000,000",
            backers: "2,102",
            daysLeft: "10",
            tags: ["FinTech", "Security"],
            teamSize: "25",
            location: "New York, NY",
            stage: "Series C",
            marketSize: "$100B+",
            competition: "High",
            traction: "500k+ Users"
        },
        6: {
            title: "E-commerce Analytics Tool",
            description: "Advanced analytics platform for e-commerce businesses with predictive insights.",
            longDescription: "Our e-commerce analytics platform provides businesses with deep insights into their operations, customer behavior, and market trends. Using AI and machine learning, we deliver predictive analytics that help businesses optimize their strategies and grow their revenue.",
            keyFeatures: [
                "Customer behavior analysis",
                "Predictive analytics",
                "Inventory optimization",
                "Price optimization",
                "Marketing automation",
                "Competitive analysis"
            ],
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&h=400",
            funded: "60",
            fundingGoal: "$800,000",
            backers: "634",
            daysLeft: "25",
            tags: ["Analytics", "E-commerce"],
            teamSize: "6",
            location: "Berlin, Germany",
            stage: "Seed",
            marketSize: "$10B+",
            competition: "Medium",
            traction: "5k+ Merchants"
        }
    };

    const project = projectsData[id];

    if (!project) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Project not found</h2>
                    <button
                        onClick={() => navigate('/projects')}
                        className="mt-4 text-blue-600 hover:text-blue-800"
                    >
                        Back to Projects
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <div className="container mx-auto px-4 pt-8">
                <button
                    onClick={() => navigate('/homepage')}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
                >
                    <ArrowLeft className="w-4 h-4 mr-2"/>
                    Back to Projects
                </button>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-[400px] object-cover"
                    />

                    <div className="p-8">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                >
                                   {tag}
                               </span>
                            ))}
                        </div>

                        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
                        <p className="text-gray-600 mb-6">{project.description}</p>

                        <div className="flex items-center gap-6 text-gray-600 mb-8">
                           <span className="flex items-center gap-2">
                               <Users className="w-5 h-5"/>
                               {project.teamSize} Team Members
                           </span>
                            <span className="flex items-center gap-2">
                               <MapPin className="w-5 h-5"/>
                                {project.location}
                           </span>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowInvestModal(true)}
                                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-center"
                            >
                                Invest Now
                            </button>
                            <button className="p-3 border rounded-lg hover:bg-gray-50 transition">
                                <Share2 className="w-5 h-5"/>
                            </button>
                            <button className="p-3 border rounded-lg hover:bg-gray-50 transition">
                                <Heart className="w-5 h-5"/>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-6 my-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                        <div className="text-3xl font-bold text-blue-600">{project.funded}%</div>
                        <div className="text-gray-600">Funded</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                        <div className="text-3xl font-bold text-blue-600">{project.fundingGoal}</div>
                        <div className="text-gray-600">Funding Goal</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                        <div className="text-3xl font-bold text-blue-600">{project.backers}</div>
                        <div className="text-gray-600">Backers</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                        <div className="text-3xl font-bold text-blue-600">{project.daysLeft}</div>
                        <div className="text-gray-600">Days Left</div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white p-8 rounded-xl shadow-sm">
                            <h2 className="text-2xl font-bold mb-4">About the Project</h2>
                            <div className="space-y-4 text-gray-600">
                                <p>{project.longDescription}</p>
                                <h3 className="font-semibold text-gray-900">Key Features:</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    {project.keyFeatures.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-bold mb-4">Project Details</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Stage</span>
                                    <span className="font-medium">{project.stage}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Market Size</span>
                                    <span className="font-medium">{project.marketSize}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Competition</span>
                                    <span className="font-medium">{project.competition}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Traction</span>
                                    <span className="font-medium">{project.traction}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Investment Modal */}
            <InvestmentModal
                project={project}
                isOpen={showInvestModal}
                onClose={() => setShowInvestModal(false)}
            />
        </div>
    );
};

export default ProjectDetail;
