import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin,Heart,DollarSign, Building,Calendar } from 'lucide-react';
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
        created_at : ''
    });
    //profil fotografi icin kullaniyoruz
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);



        try {

            const response = await fetch(API_URL, {
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

            onNavigate('list');
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
          //  [name]: type === 'checkbox' ? checked.toString() : value
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

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <h1 className="text-2xl font-bold mb-6">Create New Investor Profile</h1>

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
                        <label className="block text-sm font-medium mb-1">Password *</label>
                        <input
                            type="password"
                            name="password"
                            required
                            value={formData.password}
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

                    <div>
                        <label className="block text-sm font-medium mb-1">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
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
                                accept="image/*"
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
                            //checked={formData.phone_visibility === 'true'}
                            onChange={handleChange}
                            className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                        />
                        <span className="text-sm">Make phone number visible to others</span>
                    </label>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => onNavigate('list')}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Creating...' : 'Create Investor'}
                    </button>
                </div>
            </form>
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
                <div className="text-lg text-emerald-600">Loading...</div>
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

    return (
        <div className="container mx-auto p-4">
            {/* Header Section */}
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-emerald-800">Investor Profile</h1>
                <div className="flex space-x-4">
                    {isOwner && (
                        <button
                            onClick={() => onNavigate('edit', id)}
                            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                        >
                            Edit Profile
                        </button>
                    )}
                    <button
                        onClick={() => onNavigate('list')}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                    >
                        Back to List
                    </button>
                </div>
            </div>

            {/* Profile Info Section */}
            <div className="space-y-6">
                {/* Main Profile Card */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Cover & Profile Picture Section */}
                    <div className="h-48 bg-gradient-to-r from-emerald-500 to-emerald-700 relative">
                        <div className="absolute -bottom-16 left-8">
                            {investor.profile_picture ? (
                                <img
                                    src={investor.profile_picture}
                                    alt={`${investor.first_name} ${investor.last_name}`}
                                    className="w-32 h-32 rounded-xl border-4 border-white object-cover shadow-lg"
                                />
                            ) : (
                                <div className="w-32 h-32 rounded-xl border-4 border-white bg-emerald-50 flex items-center justify-center shadow-lg">
                                    <User className="w-16 h-16 text-emerald-400"/>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Profile Info */}
                    <div className="pt-20 px-8 pb-8">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {investor.first_name} {investor.last_name}
                            </h2>
                            <p className="text-emerald-600">{investor.email}</p>
                        </div>

                        {investor.bio && (
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-emerald-800 mb-2">About</h3>
                                <p className="text-gray-600 leading-relaxed">{investor.bio}</p>
                            </div>
                        )}

                        <div className="bg-emerald-50 rounded-lg p-4 space-y-3">
                            <div className="flex items-center text-gray-700">
                                <Mail className="w-5 h-5 mr-3 text-emerald-600"/>
                                <span>{investor.email}</span>
                            </div>
                            {investor.phone_visibility && investor.phone_number && (
                                <div className="flex items-center text-gray-700">
                                    <Phone className="w-5 h-5 mr-3 text-emerald-600"/>
                                    <span>{investor.phone_number}</span>
                                </div>
                            )}
                            {investor.location && (
                                <div className="flex items-center text-gray-700">
                                    <MapPin className="w-5 h-5 mr-3 text-emerald-600"/>
                                    <span>{investor.location}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Interests and Values Section */}
                <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl">
                    <div className="mb-6 flex items-center">
                        <Heart className="w-6 h-6 text-emerald-500 mr-2"/>
                        <h2 className="text-xl font-semibold text-emerald-800">Interests & Values</h2>
                    </div>

                    {interests.length === 0 ? (
                        <p className="text-gray-500 italic">No interests or values added yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {interests.map((interest) => (
                                <div key={interest.interest_id}
                                     className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
                                    <h3 className="font-medium text-emerald-700 mb-2">
                                        {interest.interest_area}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {interest.social_impact}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>




                {/* Investment Portfolio Section */}
                <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl">
                    <div className="mb-6 flex items-center">
                        <DollarSign className="w-6 h-6 text-emerald-500 mr-2"/>
                        <h2 className="text-xl font-semibold text-emerald-800">Investment Portfolio</h2>
                    </div>

                    {portfolios.length === 0 ? (
                        <p className="text-gray-500 italic">No investments added yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {portfolios.map((portfolio) => (
                                <div key={portfolio.portfolioId}
                                     className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
                                    <div className="flex items-center mb-2">
                                        <Building className="w-5 h-5 text-emerald-600 mr-2"/>
                                        <h3 className="font-medium text-emerald-700">
                                            {portfolio.investedCompanyName}
                                        </h3>
                                    </div>
                                    <div className="flex items-center text-sm text-emerald-600 mb-2">
                                        <Calendar className="w-4 h-4 mr-2"/>
                                        <span>
                                            {new Date(portfolio.investmentDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    {portfolio.description && (
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {portfolio.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
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

    if (loading) return <div className="flex justify-center p-8">Loading...</div>;

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
                                accept="image/*"
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