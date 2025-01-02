// App.js
import React, { useState, useEffect} from 'react';
import {Award, User, Mail, Phone, MessageCircle,GraduationCap,  Briefcase, Clock,  Camera, X, LightbulbIcon, Rocket  } from 'lucide-react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';



const API_URL = 'http://localhost:8080/entrepreneurs';


const EntrepreneurSettings = ({onNavigate}) => {
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

export default EntrepreneurSettings;