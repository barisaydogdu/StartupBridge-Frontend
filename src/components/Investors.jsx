import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin,Heart,DollarSign, Building,Calendar,Upload, Camera, X, XIcon,SaveIcon,MailIcon,EyeIcon, FileTextIcon,PhoneIcon,UserIcon,ImageIcon,EyeOffIcon} from 'lucide-react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';

const API_URL = 'http://localhost:8080/investors';

const InvestorsList = ({ onNavigate }) => {
    const [investors, setInvestors] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        fetchInvestors();
    }, []);

    const fetchInvestors = async () => {
       try {
           const response= await fetch(API_URL);
           if (!response.ok) throw new Error('Failed to fetch investors');
           const data = await response.json();
           setInvestors(data)
       } catch (err) {
           setError(err);
       } finally {
           setLoading(false);
       }
    };


    if (loading) return <div className="flex justify-center p-8">Loading...</div>;
    if (error) return (
        <div className="m-4 p-4 bg-red-50 border border-red-400 text-red-700 rounded">
            {error}
        </div>
    );

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Entrepreneurs</h1>
                <button
                    onClick={() => onNavigate('create')}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add New Entrepreneur
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {investors.map((investors) => (
                    <div key={investors} className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center space-x-4">
                            {investors.profile_picture ? (
                                <img
                                    src={investors.profile_picture}
                                    alt={`${investors.first_name} ${investors.last_name}`}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                    <User className="w-8 h-8 text-gray-400" />
                                </div>
                            )}
                            <div>
                                <h3 className="text-lg font-semibold">
                                    {investors.first_name} {investors.last_name}
                                </h3>
                                <p className="text-gray-600">{investors.email}</p>
                            </div>
                        </div>

                        {investors.bio && (
                            <p className="mt-4 text-gray-600 text-sm">{investors.bio}</p>
                        )}

                        {investors.location && (
                            <p className="mt-2 text-gray-600 text-sm">
                                📍 {investors.location}
                            </p>
                        )}

                        {investors.phone_visibility && investors.phone_number && (
                            <p className="mt-2 text-gray-600 text-sm">
                                Phone: {investors.phone_number}
                            </p>
                        )}
                      {/*  {investors.phone_visibility && investors.phone_number && (
                            <p className="mt-2 text-gray-600 text-sm">
                                Phone: {investors.phone_number}
                            </p>
                        )}*/}
                    </div>
                ))}
            </div>
        </div>
    );
};

//import { Upload, Camera, X } from 'lucide-react';

//import { Upload, Camera, X } from 'lucide-react';

const InvestorForm = ({ onNavigate }) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        bio: '',
        phone_number: '',
        phone_visibility: true,
        location: '',
        profile_picture: '',
        created_at: ''
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentSection, setCurrentSection] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:8080/investors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create investor');
            }

           // onNavigate('Home');
          //  window.location.href = '/Home';
            window.location.href = '/Home';
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
            created_at: new Date().toISOString(),
        }));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setError('Image size should be less than 5MB');
            return;
        }

        try {
            const base64 = await convertToBase64(file);
            setImagePreview(base64);
            setFormData(prev => ({
                ...prev,
                profile_picture: base64
            }));
        } catch (err) {
            setError('Failed to process image');
            console.error('Error processing image:', err);
        }
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };

    const removeImage = () => {
        setImagePreview(null);
        setFormData(prev => ({
            ...prev,
            profile_picture: ''
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-12">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="px-8 py-6 bg-gradient-to-r from-emerald-600 to-teal-600">
                        <h1 className="text-3xl font-bold text-white">Join Our Investment Community</h1>
                        <p className="text-emerald-50 mt-2">Create your investor profile and connect with innovative entrepreneurs</p>
                    </div>

                    {/* Progress Indicator */}
                    <div className="px-8 py-4 bg-gray-50 border-b">
                        <div className="flex justify-between">
                            <button
                                onClick={() => setCurrentSection(1)}
                                className={`flex-1 py-2 text-center rounded-lg mx-2 transition-colors ${currentSection === 1 ? 'bg-emerald-100 text-emerald-700' : 'text-gray-500 hover:bg-gray-100'}`}
                            >
                                Basic Info
                            </button>
                            <button
                                onClick={() => setCurrentSection(2)}
                                className={`flex-1 py-2 text-center rounded-lg mx-2 transition-colors ${currentSection === 2 ? 'bg-emerald-100 text-emerald-700' : 'text-gray-500 hover:bg-gray-100'}`}
                            >
                                Profile Details
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="mx-8 mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-700 text-sm">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="p-8">
                        {currentSection === 1 ? (
                            <div className="space-y-6">
                                {/* Profile Picture Upload */}
                                <div className="flex justify-center">
                                    <div className="relative">
                                        {imagePreview ? (
                                            <div className="relative w-32 h-32">
                                                <img
                                                    src={imagePreview}
                                                    alt="Profile preview"
                                                    className="w-full h-full rounded-full object-cover border-4 border-emerald-100"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={removeImage}
                                                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="w-32 h-32 rounded-full bg-emerald-50 border-4 border-emerald-100 flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-100 transition-colors">
                                                <Camera className="w-8 h-8 text-emerald-600 mb-2" />
                                                <span className="text-sm text-emerald-600 font-medium">Add Photo</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Basic Info Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                        <input
                                            type="text"
                                            name="first_name"
                                            required
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                            placeholder="Enter your first name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            name="last_name"
                                            required
                                            value={formData.last_name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                            placeholder="Enter your last name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                            placeholder="you@example.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            required
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                            placeholder="Create a secure password"
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        rows="4"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                        placeholder="Tell us about yourself and your investment interests..."
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone_number"
                                            value={formData.phone_number}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                            placeholder="Enter your phone number"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                            placeholder="City, Country"
                                        />
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4">
                                    <label className="flex items-center space-x-3">
                                        <input
                                            type="checkbox"
                                            name="phone_visibility"
                                            checked={formData.phone_visibility}
                                            onChange={handleChange}
                                            className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                        />
                                        <span className="text-gray-700">Make my phone number visible to other users</span>
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="mt-8 flex justify-between items-center pt-6 border-t">
                            <button
                                type="button"
                                onClick={() => onNavigate('list')}
                                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors"
                            >
                                Cancel
                            </button>

                            <div className="flex space-x-4">
                                {currentSection === 2 && (
                                    <button
                                        type="button"
                                        onClick={() => setCurrentSection(1)}
                                        className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors"
                                    >
                                        Previous
                                    </button>
                                )}
                                {currentSection === 1 ? (
                                    <button
                                        type="button"
                                        onClick={() => setCurrentSection(2)}
                                        className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-colors"
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-colors disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Creating...' : 'Create Profile'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const INTERESTS_API_URL = 'http://localhost:8080/interestandvalues';
const PORTFOLIO_API_URL = 'http://localhost:8080/investment-portfolios';

const InvestorDetails = ({ onNavigate }) => {
    const { id } = useParams();
    const [investor, setInvestor] = useState(null);
    const [interests, setInterests] = useState([]);
    const [portfolios, setPortfolios] = useState([]); // Added portfolios state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [activeTab, setActiveTab] = useState('about');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No token found');

                // Fetch investor details
                const investorResponse = await fetch(`${API_URL}/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!investorResponse.ok) {
                    throw new Error('Failed to fetch investor details');
                }

                const investorData = await investorResponse.json();
                setInvestor(investorData);

                // Check if current user is the owner
                const payload = JSON.parse(atob(token.split('.')[1]));
                setIsOwner(Number(payload.id) === Number(investorData.userId));

                // Fetch interests and values
                const interestsResponse = await fetch(INTERESTS_API_URL, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!interestsResponse.ok) {
                    throw new Error('Failed to fetch interests');
                }

                const interestsData = await interestsResponse.json();
                // Filter interests for the current investor
                const investorInterests = interestsData.filter(
                    interest => Number(interest.investor_id) === Number(investorData.investor_id)
                );
                setInterests(investorInterests);



                // Fetch investment portfolios
                const portfoliosResponse = await fetch(PORTFOLIO_API_URL, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!portfoliosResponse.ok) {
                    throw new Error('Failed to fetch portfolios');
                }

                const portfoliosData = await portfoliosResponse.json();
                // Filter portfolios for the current investor
                const investorPortfolios = portfoliosData.filter(
                    portfolio => Number(portfolio.investorId) === Number(investorData.investor_id)
                );
                setPortfolios(investorPortfolios);




            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-lg text-indigo-600">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-4">
                <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p className="font-bold">Error</p>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (!investor) {
        return (
            <div className="container mx-auto p-4">
                <div className="bg-yellow-50 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                    <p>No investor found with this ID.</p>
                </div>
            </div>
        );
    }


    const TabButton = ({ tab, current, children }) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium text-sm transition-colors ${
                current === tab
                    ? 'border-b-2 border-indigo-600 text-indigo-600'
                    : 'text-gray-600 hover:text-gray-900'
            }`}
        >
            {children}
        </button>
    );
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <div className="container mx-auto px-4 py-12">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-4xl font-bold">Investor Profile</h1>
                        <div className="flex space-x-4">
                            {isOwner && (
                                <button
                                    onClick={() => onNavigate('edit', id)}
                                    className="px-6 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
                                >
                                    Edit Profile
                                </button>
                            )}
                            <button
                                //onClick={() => onNavigate('list')}
                                onClick={() => window.location.replace('/Home')}
                                className="px-6 py-2 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-400 transition-colors"
                            >
                                Back to Home
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        {investor.profile_picture ? (
                            <img
                                src={investor.profile_picture}
                                alt={`${investor.first_name} ${investor.last_name}`}
                                className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-lg"
                            />
                        ) : (
                            <div className="w-24 h-24 rounded-full border-4 border-white bg-indigo-100 flex items-center justify-center shadow-lg">
                                <User className="w-12 h-12 text-indigo-600"/>
                            </div>
                        )}
                        <div>
                            <h2 className="text-3xl font-bold mb-2">
                                {investor.first_name} {investor.last_name}
                            </h2>
                            <div className="flex items-center space-x-4 text-indigo-100">
                                <Mail className="w-4 h-4"/>
                                <span>{investor.email}</span>
                                {investor.location && (
                                    <>
                                        <MapPin className="w-4 h-4 ml-4"/>
                                        <span>{investor.location}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4">
                    <div className="flex space-x-8">
                        <TabButton tab="about" current={activeTab}>About</TabButton>
                        <TabButton tab="interests" current={activeTab}>Interests & Values</TabButton>
                        <TabButton tab="portfolio" current={activeTab}>Investment Portfolio</TabButton>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-8">
                {activeTab === 'about' && (
                    <div className="bg-white rounded-xl shadow-sm p-8">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-6">About</h3>
                        <p className="text-gray-600 leading-relaxed max-w-3xl">
                            {investor.bio || 'No bio available.'}
                        </p>

                        {/*{investor.phone_visibility && investor.phone_number && (*/}
                        {/*    <div className="mt-6 flex items-center text-gray-600">*/}
                        {/*        <Phone className="w-5 h-5 mr-3 text-indigo-600"/>*/}
                        {/*        <span>{investor.phone_number}</span>*/}
                        {/*    </div>*/}
                        {/*)}*/}

                        {/* Phone visibility kontrolünü düzelttik */}
                        {(investor.phone_visibility === true || investor.phone_visibility === "true") &&
                            investor.phone_number && (
                                <div className="mt-6 flex items-center text-gray-600">
                                    <Phone className="w-5 h-5 mr-3 text-indigo-600"/>
                                    <span>{investor.phone_number}</span>
                                </div>
                            )}
                    </div>
                )}

                {activeTab === 'interests' && (
                    <div className="max-w-3xl">
                        <div className="bg-white rounded-xl shadow-sm p-8">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                                <Heart className="w-6 h-6 text-indigo-600 mr-3"/>
                                Interests & Values
                            </h3>

                            {interests.length === 0 ? (
                                <p className="text-gray-500 italic">No interests or values added yet.</p>
                            ) : (
                                <div className="space-y-6">
                                    {interests.map((interest) => (
                                        <div
                                            key={interest.interest_id}
                                            className="bg-gray-50 rounded-lg p-6 border border-gray-100 hover:border-indigo-200 transition-colors"
                                        >
                                            <h4 className="text-xl font-medium text-indigo-600 mb-3">
                                                {interest.interest_area}
                                            </h4>
                                            <p className="text-gray-600 leading-relaxed">
                                                {interest.social_impact}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'portfolio' && (
                    <div className="max-w-3xl">
                        <div className="bg-white rounded-xl shadow-sm p-8">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                                <DollarSign className="w-6 h-6 text-indigo-600 mr-3"/>
                                Investment Portfolio
                            </h3>

                            {portfolios.length === 0 ? (
                                <p className="text-gray-500 italic">No investments added yet.</p>
                            ) : (
                                <div className="space-y-6">
                                    {portfolios.map((portfolio) => (
                                        <div
                                            key={portfolio.portfolioId}
                                            className="bg-gray-50 rounded-lg p-6 border border-gray-100 hover:border-indigo-200 transition-colors"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center">
                                                    <Building className="w-6 h-6 text-indigo-600 mr-3"/>
                                                    <h4 className="text-xl font-medium text-gray-900">
                                                        {portfolio.investedCompanyName}
                                                    </h4>
                                                </div>
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <Calendar className="w-4 h-4 mr-2"/>
                                                    <span>
                                                        {new Date(portfolio.investmentDate).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                            </div>
                                            {portfolio.description && (
                                                <p className="text-gray-600 leading-relaxed mt-2">
                                                    {portfolio.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// EntrepreneurEditForm Component
const InvestorEditForm = ({onNavigate}) => {
    const {id} = useParams();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password  : '',
        bio: '',
        phone_number: '',
        location : '',
        phone_visibility: true,
        profile_picture: '',
        created_at : ''
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    // Mevcut veriyi yükleme
    useEffect(() => {
        const fetchEntrepreneur = async () => {
            try {
                const response = await fetch(`${API_URL}/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                if (!response.ok) throw new Error(data.message);

                setFormData({
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    password: data.password,
                    bio: data.bio || '',
                    location: data.location,
                    phone_number: data.phone_number || '',
                    phone_visibility: data.phone_visibility,
                    profile_picture: data.profile_picture || ''
                });

                if (data.profile_picture) {
                    setImagePreview(data.profile_picture);
                }
            } catch (err) {
                setError(err.message);
                console.error('Fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEntrepreneur();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {

            const token = localStorage.getItem('token');
            console.log("Token: ",token);
            if (!token) {
                throw new Error('Authentication token not found');
            }
            // Boş değerleri kontrol et
            /*   const validatedFormData = {
                   ...formData,
                   bio: formData.bio || '',
                   phoneNumber: formData.phoneNumber || '',
                   profilePicture: formData.profilePicture || ''
               };*/
            const validatedFormData = {
              //  investor_id: parseInt(id), // Add the ID explicitly
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                password: formData.password,
                bio: formData.bio || '',
                phone_number: formData.phone_number || '',
                phone_visibility: formData.phone_visibility,
                profile_picture: formData.profile_picture || ''
            };

            const response = await fetch(`${API_URL}/${id}/edit`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                },
                body: JSON.stringify(validatedFormData)
            });
            console.log("Response: ",response);


            // Diğer hata durumları kontrolü
            if (!response.ok) {
                const errorData = await response.text();
                try {
                    const parsedError = JSON.parse(errorData);
                    throw new Error(parsedError.message || 'Failed to fetch entrepreneur data');
                } catch (e) {
                    throw new Error('Failed to fetch entrepreneur data');
                }
            }

            const data = await response.json();
            onNavigate('details', id);

            if (!response.ok) throw new Error(data.message);
            onNavigate('details', id);
        } catch (err) {
            setError(err.message);
            console.error('Update error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
            created_at: new Date().toISOString(),
        }));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setError('Image size should be less than 5MB');
            return;
        }

        try {
            const base64 = await convertToBase64(file);
            setImagePreview(base64);
            setFormData(prev => ({
                ...prev,
                profile_picture: base64
            }));
        } catch (err) {
            setError('Failed to process image');
            console.error('Error processing image:', err);
        }
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };

   /* if (loading) return <div className="flex justify-center p-8">Loading...</div>;

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <h1 className="text-2xl font-bold mb-6">Edit Entrepreneur Profile</h1>

            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">First Name *</label>
                        <input
                            type="text"
                            name="first_name"
                            required
                            value={formData.first_name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Last Name *</label>
                        <input
                            type="text"
                            name="last_name"
                            required
                            value={formData.last_name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Email *</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Phone Number</label>
                        <input
                            type="tel"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Profile Picture</label>
                        <div className="space-y-2">
                            {imagePreview && (
                                <div className="w-32 h-32 mx-auto">
                                    <img
                                        src={imagePreview}
                                        alt="Profile preview"
                                        className="w-full h-full rounded-full object-cover border-2 border-gray-200"
                                    />
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/!*"
                                onChange={handleImageChange}
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Bio</label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows="4"
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="phone_visibility"
                            checked={formData.phone_visibility}
                            onChange={handleChange}
                            className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                        />
                        <span className="text-sm">Make phone number visible to others</span>
                    </label>
                </div>


                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => onNavigate('details', id)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};*/
    if (loading) return <div className="flex justify-center p-8">Loading...</div>;

    return (
        <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white shadow-2xl rounded-xl border border-gray-100 overflow-hidden">
                <div className="bg-blue-600 text-white p-6 flex items-center space-x-4">
                    <UserIcon className="w-10 h-10" />
                    <h1 className="text-2xl font-bold">Edit Entrepreneur Profile</h1>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 m-4">
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="relative">
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                <UserIcon className="w-4 h-4 mr-2 text-blue-500" />
                                First Name
                            </label>
                            <input
                                type="text"
                                name="first_name"
                                required
                                value={formData.first_name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                                placeholder="Enter first name"
                            />
                        </div>

                        <div className="relative">
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                <UserIcon className="w-4 h-4 mr-2 text-blue-500" />
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="last_name"
                                required
                                value={formData.last_name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                                placeholder="Enter last name"
                            />
                        </div>

                        <div className="relative">
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                <MailIcon className="w-4 h-4 mr-2 text-blue-500" />
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                                placeholder="Enter email address"
                            />
                        </div>

                        <div className="relative">
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                <PhoneIcon className="w-4 h-4 mr-2 text-blue-500" />
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                                placeholder="Optional phone number"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                            <ImageIcon className="w-4 h-4 mr-2 text-blue-500" />
                            Profile Picture
                        </label>
                        <div className="flex items-center space-x-4">
                            {imagePreview && (
                                <div className="w-24 h-24 rounded-full border-4 border-blue-200 overflow-hidden">
                                    <img
                                        src={imagePreview}
                                        alt="Profile preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                            <FileTextIcon className="w-4 h-4 mr-2 text-blue-500" />
                            Bio
                        </label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder="Tell us about yourself..."
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="phone_visibility"
                            checked={formData.phone_visibility}
                            onChange={handleChange}
                            className="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <label className="flex items-center text-sm text-gray-700">
                            {formData.phone_visibility ? <EyeIcon className="w-4 h-4 mr-2 text-blue-500" /> : <EyeOffIcon className="w-4 h-4 mr-2 text-gray-400" />}
                            Make phone number visible to others
                        </label>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => onNavigate('details', id)}
                            className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                        >
                            <XIcon className="w-4 h-4 mr-2" /> Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
                        >
                            {isSubmitting ? 'Saving...' : <><SaveIcon className="w-4 h-4 mr-2" /> Save Changes</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};




const Investors = () => {
    const navigate = useNavigate();

    const handleNavigate = (view, id = null) => {
        switch (view) {
            case 'list':
                navigate('/investors');
                break;
            case 'create':
                navigate('/investors/create');
                break;
            case 'details':
                navigate(`/investors/${id}`);
                break;
            case 'edit':
                navigate(`/investors/${id}/edit`);
                break;
            case "Home":
                navigate('/Home')
            default:
                navigate('/investors');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Routes>
                <Route
                    index
                    element={<InvestorsList onNavigate={handleNavigate} />}
                />
                <Route
                    path="create"
                    element={<InvestorForm onNavigate={handleNavigate} />}
                />
                <Route
                    path=":id"
                    element={<InvestorDetails onNavigate={handleNavigate} />}
                />
                <Route
                    path=":id/edit"
                    element={<InvestorEditForm onNavigate={handleNavigate} />}
                />
            </Routes>
        </div>
    );
};
export default Investors;