// App.js
import React, { useState, useEffect} from 'react';
import {Award, User, Mail, Phone, MessageCircle,GraduationCap,  Briefcase, Clock } from 'lucide-react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';



const API_URL = 'http://localhost:8080/entrepreneurs';
const EntrepreneurList = ({ onNavigate }) => {
    const [entrepreneurs, setEntrepreneurs] = useState([]);
    const [error, setError] = useState(null);

    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        fetchEntrepreneurs();
    }, []);

    const fetchEntrepreneurs = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Failed to fetch entrepreneurs');
            const data = await response.json();
            setEntrepreneurs(data);
        } catch (err) {
            setError(err.message);
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
                {entrepreneurs.map((entrepreneur) => (
                    //burdan id sildik
                    <div key={entrepreneur} className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center space-x-4">
                            {entrepreneur.profilePicture ? (
                                <img
                                    src={entrepreneur.profilePicture}
                                    alt={`${entrepreneur.firstName} ${entrepreneur.lastName}`}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                    <User className="w-8 h-8 text-gray-400" />
                                </div>
                            )}
                            <div>
                                <h3 className="text-lg font-semibold">
                                    {entrepreneur.firstName} {entrepreneur.lastName}
                                </h3>
                                <p className="text-gray-600">{entrepreneur.email}</p>
                            </div>
                        </div>

                        {entrepreneur.bio && (
                            <p className="mt-4 text-gray-600 text-sm">{entrepreneur.bio}</p>
                        )}

                        {entrepreneur.phoneVisibility && entrepreneur.phoneNumber && (
                            <p className="mt-2 text-gray-600 text-sm">
                                Phone: {entrepreneur.phoneNumber}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const EntrepreneurForm = ({ onNavigate }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        bio: '',
        phoneNumber: '',
        phoneVisibility: true,
        profilePicture: ''
    });
    //profil fotografi icin kullanilan
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
                throw new Error(errorData.message || 'Failed to create entrepreneur');
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
            [name]: type === 'checkbox' ? checked : value
        }));
    };
//profil fotografi icin
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Dosya boyutu kontrolü (örneğin 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('Image size should be less than 5MB');
            return;
        }

        try {
            const base64 = await convertToBase64(file);
            setImagePreview(base64);
            setFormData(prev => ({
                ...prev,
                profilePicture: base64
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
            <h1 className="text-2xl font-bold mb-6">Create New Entrepreneur</h1>

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
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Last Name *</label>
                        <input
                            type="text"
                            name="lastName"
                            required
                            value={formData.lastName}
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
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
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
                            name="phoneVisibility"
                            checked={formData.phoneVisibility}
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
                        {isSubmitting ? 'Creating...' : 'Create Entrepreneur'}
                    </button>
                </div>
            </form>
        </div>
    );
};



// Updated EntrepreneurDetails Component
/*const EntrepreneurDetails = ({ onNavigate }) => {
    const { id } = useParams();
    const [entrepreneur, setEntrepreneur] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEntrepreneurDetails = async () => {
            try {
                const response = await fetch(`${API_URL}/${id}`);
                const textResponse = await response.text();

                if (!textResponse) {
                    throw new Error('Empty response from server');
                }

                const data = JSON.parse(textResponse);

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to fetch entrepreneur details');
                }

                setEntrepreneur(data);
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err.message || 'Failed to load entrepreneur details');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchEntrepreneurDetails();
        }
    }, [id]);

    if (loading) return <div className="flex justify-center p-8">Loading...</div>;
    if (error) return (
        <div className="m-4 p-4 bg-red-50 border border-red-400 text-red-700 rounded">
            {error}
        </div>
    );
    if (!entrepreneur) return <div>No entrepreneur found</div>;
*/

const EXPERTISE_API_URL = 'http://localhost:8080/expertise';
const EDUCATION_API_URL = 'http://localhost:8080/education';
const EXPERIENCE_API_URL = 'http://localhost:8080/experiences';


const EntrepreneurDetails = ({ onNavigate }) => {
    const id = window.location.pathname.split('/').pop();
    const entrepreneurId = id;
    const [entrepreneur, setEntrepreneur] = useState(null);
    const [expertise, setExpertise] = useState([]);
    const [education, setEducation] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [experiences, setExperiences] = useState([]);

    const [isOwner, setIsOwner] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            console.log('Current entrepreneurId:', entrepreneurId);
            if (!entrepreneurId && entrepreneurId !== 0) {
                setLoading(false);
                return;
            }

            try {
                // Fetch entrepreneur details
                console.log('Fetching entrepreneur with ID:', entrepreneurId);
                const entrepreneurResponse = await fetch(`${API_URL}/${entrepreneurId}`);
                console.log('Response status:', entrepreneurResponse.status);

                if (!entrepreneurResponse.ok) {
                    const errorText = await entrepreneurResponse.text();
                    console.error('Error response:', errorText);
                    throw new Error('Failed to fetch entrepreneur details');
                }

                const entrepreneurData = await entrepreneurResponse.json();
                console.log('Entrepreneur data:', entrepreneurData);
                setEntrepreneur(entrepreneurData);

                try {
                    // Fetch expertise data if available
                    const expertiseResponse = await fetch(`${EXPERTISE_API_URL}`);

                    if (expertiseResponse.ok) {
                        const expertiseData = await expertiseResponse.json();
                        // Filter expertise for current entrepreneur
                        const entrepreneurExpertise = expertiseData.filter(
                            exp => exp.entrepreneur_id === parseInt(entrepreneurId)
                        );
                        setExpertise(entrepreneurExpertise);
                    }
                } catch (expertiseError) {
                    console.log('Expertise data not available:', expertiseError);
                    // Don't set error state for expertise failure
                }

                try {
                    // Fetch education data if available
                    const educationResponse = await fetch(`${EDUCATION_API_URL}`);

                    if (educationResponse.ok) {
                        const educationData = await educationResponse.json();
                        // Filter education for current entrepreneur
                        const entrepreneurEducation = educationData.filter(
                            edu => edu.entrepreneurId === parseInt(entrepreneurId)
                        );
                        setEducation(entrepreneurEducation); // Fix: Use setEducation instead of setExpertise
                        console.log('Education data:', entrepreneurEducation); // Add logging
                    }
                } catch (educationError) {
                    console.log('Education data not available:', educationError);
                    // Don't set error state for education failure
                }


                try {
                    // Fetch experience data if available
                    const experienceResponse = await fetch(`${EXPERIENCE_API_URL}`);

                    if (experienceResponse.ok) {
                        const experienceData = await experienceResponse.json();
                        // Filter experience for current entrepreneur
                        const entrepreneurExperience = experienceData.filter(
                            exp => Number(exp.entrepreneur_id) === Number(entrepreneurId)
                        );
                        setExperiences(entrepreneurExperience);
                        console.log('Experience data:', entrepreneurExperience);
                    }
                } catch (experienceError) {
                    console.log('Experience data not available:', experienceError);
                    // Don't set error state for experience failure
                }



                // Check if current user is the owner
                const token = localStorage.getItem('token');
                if (token) {
                    try {
                        const payload = JSON.parse(atob(token.split('.')[1]));
                        const tokenUserId = Number(payload.id);
                        setCurrentUserId(tokenUserId);
                        setIsOwner(tokenUserId === Number(entrepreneurData.userId));
                    } catch (e) {
                        console.log('Token parsing error:', e);
                    }
                }

            } catch (err) {
                console.error('Fetch error:', err);
                setError(err.message || 'Failed to load entrepreneur data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [entrepreneurId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-lg text-gray-600">Loading data...</div>
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

    if (!entrepreneur || !Object.keys(entrepreneur).length) {
        return (
            <div className="container mx-auto p-4">
                <div className="bg-yellow-50 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                    <p>No entrepreneur found for ID: {entrepreneurId}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            {/* Header Section */}
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Entrepreneur Profile</h1>
                <div className="flex space-x-4">
                    {!isOwner && (
                        <button
                            onClick={() => setShowChat(!showChat)}
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-2"
                        >
                            <MessageCircle className="w-5 h-5"/>
                            {showChat ? 'Hide Chat' : 'Send Message'}
                        </button>
                    )}
                    {isOwner && (
                        <button
                            onClick={() => onNavigate('edit', entrepreneurId)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Edit Profile
                        </button>
                    )}
                    <button
                        onClick={() => onNavigate('list')}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                    >
                        Back to List
                    </button>
                </div>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Cover & Profile Picture Section */}
                <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-500 relative">
                    <div className="absolute -bottom-16 left-8">
                        {entrepreneur.profilePicture ? (
                            <img
                                src={entrepreneur.profilePicture}
                                alt={`${entrepreneur.firstName} ${entrepreneur.lastName}`}
                                className="w-32 h-32 rounded-full border-4 border-white object-cover"
                            />
                        ) : (
                            <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center">
                                <User className="w-16 h-16 text-gray-400"/>
                            </div>
                        )}
                    </div>
                </div>

                {/* Profile Info Section */}
                <div className="pt-20 px-8 pb-8">
                    {/* Name and Basic Info */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {entrepreneur.firstName} {entrepreneur.lastName}
                        </h2>
                        <p className="text-gray-600">{entrepreneur.email}</p>
                    </div>

                    {/* Bio Section */}
                    {entrepreneur.bio && (
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
                            <p className="text-gray-600">{entrepreneur.bio}</p>
                        </div>
                    )}

                    {/* Education Section */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <GraduationCap className="w-5 h-5"/>
                            Education
                        </h3>
                        {education && education.length > 0 ? (
                            <div className="space-y-3">
                                {education.map((edu) => (
                                    <div
                                        key={edu.educationId}
                                        className="p-4 bg-gray-50 rounded-lg border border-gray-100"
                                    >
                                        <h4 className="font-semibold text-gray-900">
                                            {edu.schoolName}
                                        </h4>
                                        <p className="text-gray-600">
                                            {edu.degree}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Graduated: {edu.graduationYear}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">No education history listed</p>
                        )}
                    </div>


                    {/* Experience Section */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <Briefcase className="w-5 h-5"/>
                            Work Experience
                        </h3>
                        {loading ? (
                            <div className="animate-pulse space-y-3">
                                <div className="h-20 bg-gray-100 rounded-lg"></div>
                                <div className="h-20 bg-gray-100 rounded-lg"></div>
                            </div>
                        ) : experiences && experiences.length > 0 ? (
                            <div className="space-y-3">
                                {experiences.map((exp) => (
                                    <div
                                        key={exp.experience_id}
                                        className="p-4 bg-gray-50 rounded-lg border border-gray-100"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-semibold text-gray-900">
                                                    {exp.company_name}
                                                </h4>
                                                <p className="text-blue-600">
                                                    {exp.position}
                                                </p>
                                                <p className="text-gray-600 mt-2">
                                                    {exp.description}
                                                </p>
                                            </div>
                                            <div className="text-sm text-gray-500 flex items-center gap-1">
                                                <Clock className="w-4 h-4"/>
                                                {exp.duration_years} {exp.duration_years === 1 ? 'year' : 'years'}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">No work experience listed</p>
                        )}
                    </div>









                    {/* Expertise Section */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <Award className="w-5 h-5"/>
                            Expertise & Skills
                        </h3>
                        {expertise && expertise.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {expertise.map((skill) => (
                                    <span
                                        key={skill.expertise_id}
                                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                                    >
                                        {skill.skill_name}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">No expertise listed yet</p>
                        )}
                    </div>

                    {/* Contact Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Details</h3>
                            <div className="space-y-3">
                                <div className="flex items-center text-gray-600">
                                    <Mail className="w-5 h-5 mr-2"/>
                                    <span>{entrepreneur.email}</span>
                                </div>
                                {entrepreneur.phoneVisibility && entrepreneur.phoneNumber && (
                                    <div className="flex items-center text-gray-600">
                                        <Phone className="w-5 h-5 mr-2"/>
                                        <span>{entrepreneur.phoneNumber}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
const EntrepreneurEditForm = ({onNavigate}) => {
    const {id} = useParams();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password  : '',
        bio: '',
        phoneNumber: '',
        phoneVisibility: true,
        profilePicture: ''
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
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: data.password,
                    bio: data.bio || '',
                    phoneNumber: data.phoneNumber || '',
                    phoneVisibility: data.phoneVisibility,
                    profilePicture: data.profilePicture || ''
                });

                if (data.profilePicture) {
                    setImagePreview(data.profilePicture);
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
                entrepreneurId: parseInt(id), // Add the ID explicitly
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                bio: formData.bio || '',
                phoneNumber: formData.phoneNumber || '',
                phoneVisibility: formData.phoneVisibility,
                profilePicture: formData.profilePicture || ''
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
            [name]: type === 'checkbox' ? checked : value
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
                profilePicture: base64
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
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Last Name *</label>
                        <input
                            type="text"
                            name="lastName"
                            required
                            value={formData.lastName}
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
                            name="phoneNumber"
                            value={formData.phoneNumber}
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
                            name="phoneVisibility"
                            checked={formData.phoneVisibility}
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

const Entrepreneur = () => {
    const navigate = useNavigate();

    const handleNavigate = (view, id = null) => {
        switch (view) {
            case 'list':
                navigate('/entrepreneurs');
                break;
            case 'create':
                navigate('/entrepreneurs/create');
                break;
            case 'details':
                navigate(`/entrepreneurs/${id}`);
                break;
            case 'edit':
                navigate(`/entrepreneurs/${id}/edit`);
                break;
            default:
                navigate('/entrepreneurs');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Routes>
                <Route
                    index
                    element={<EntrepreneurList onNavigate={handleNavigate} />}
                />
                <Route
                    path="create"
                    element={<EntrepreneurForm onNavigate={handleNavigate} />}
                />
                <Route
                    path=":id"
                    element={<EntrepreneurDetails onNavigate={handleNavigate} />}
                />
                <Route
                    path=":id/edit"
                    element={<EntrepreneurEditForm onNavigate={handleNavigate} />}
                />
            </Routes>
        </div>
    );
};


export default Entrepreneur;