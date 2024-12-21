import React, { useState, useEffect } from 'react';
import { Plus, X, Edit2, Save, Briefcase } from 'lucide-react';

const API_URL = 'http://localhost:8080/entrepreneurs';
const EXPERIENCE_API_URL = 'http://localhost:8080/experiences';

const ExperienceSettings = () => {
    const [entrepreneur, setEntrepreneur] = useState(null);
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);

    // Form states for new experience
    const [newExperience, setNewExperience] = useState({
        company_name: '',
        position: '',
        description: '',
        duration_years: ''
    });

    // Form states for editing experience
    const [editingExperience, setEditingExperience] = useState({
        company_name: '',
        position: '',
        description: '',
        duration_years: ''
    });

    // Refresh experiences list
    const refreshExperiences = async (entrepreneurId) => {
        try {
            const response = await fetch(EXPERIENCE_API_URL, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch experiences');
            }

            const data = await response.json();
            const userExperiences = data.filter(exp =>
                Number(exp.entrepreneur_id) === Number(entrepreneurId)
            );
            setExperiences(userExperiences);
        } catch (err) {
            console.error('Error refreshing experiences:', err);
        }
    };

    // Get user's entrepreneur info and experiences
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No token found');

                const payload = JSON.parse(atob(token.split('.')[1]));
                const userId = payload.id;

                const entrepreneursResponse = await fetch(API_URL, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!entrepreneursResponse.ok) {
                    throw new Error('Failed to fetch entrepreneurs');
                }

                const entrepreneurs = await entrepreneursResponse.json();
                const myEntrepreneur = entrepreneurs.find(e =>
                    Number(e.userId) === Number(userId)
                );

                if (!myEntrepreneur) {
                    throw new Error('No entrepreneur profile found for this user');
                }

                const entrepreneurDetailResponse = await fetch(`${API_URL}/${myEntrepreneur.entrepreneurId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!entrepreneurDetailResponse.ok) {
                    throw new Error('Failed to fetch entrepreneur details');
                }

                const entrepreneurDetail = await entrepreneurDetailResponse.json();
                setEntrepreneur(entrepreneurDetail);

                await refreshExperiences(entrepreneurDetail.entrepreneurId);
            } catch (err) {
                console.error('Error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Add new experience
    const handleAddExperience = async (e) => {
        e.preventDefault();
        if (!entrepreneur) return;

        try {
            const response = await fetch(EXPERIENCE_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    enterpreneur_id: entrepreneur.entrepreneurId, // Backend'deki field ismiyle eşleştirdik
                    company_name: newExperience.company_name,
                    position: newExperience.position,
                    description: newExperience.description,
                    duration_years: parseInt(newExperience.duration_years)
                })
            });

            if (!response.ok) throw new Error('Failed to add experience');

            await refreshExperiences(entrepreneur.entrepreneurId);
            setNewExperience({
                company_name: '',
                position: '',
                description: '',
                duration_years: ''
            });
        } catch (err) {
            setError(err.message);
        }
    };

    // Delete experience
    const handleDeleteExperience = async (experienceId) => {
        try {
            const response = await fetch(`${EXPERIENCE_API_URL}/${experienceId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) throw new Error('Failed to delete experience');

            setExperiences(experiences.filter(exp => exp.experience_id !== experienceId));
        } catch (err) {
            setError(err.message);
        }
    };

    // Update experience
    const handleUpdateExperience = async (experienceId) => {
        try {
            const response = await fetch(`${EXPERIENCE_API_URL}/${experienceId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    ...editingExperience,
                    experience_id: experienceId,
                    entrepreneur_id: entrepreneur.entrepreneurId,
                    duration_years: parseInt(editingExperience.duration_years)
                })
            });

            if (!response.ok) throw new Error('Failed to update experience');

            const updatedExperience = await response.json();
            setExperiences(experiences.map(exp =>
                exp.experience_id === experienceId ? updatedExperience : exp
            ));
            setEditingId(null);
            setEditingExperience({
                company_name: '',
                position: '',
                description: '',
                duration_years: ''
            });
        } catch (err) {
            setError(err.message);
        }
    };

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
                <div className="mb-4 p-4 bg-red-50 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            </div>
        );
    }

    if (!entrepreneur) {
        return (
            <div className="container mx-auto p-4">
                <div className="mb-4 p-4 bg-yellow-50 border border-yellow-400 text-yellow-700 rounded">
                    No entrepreneur profile found for your account.
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Work Experience</h1>
                    <p className="text-gray-600">Manage your professional experience</p>
                </div>

                {/* Add New Experience Form */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Briefcase className="w-5 h-5"/>
                        Add New Experience
                    </h2>
                    <form onSubmit={handleAddExperience} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                value={newExperience.company_name}
                                onChange={(e) => setNewExperience({
                                    ...newExperience,
                                    company_name: e.target.value
                                })}
                                placeholder="Company Name"
                                className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                value={newExperience.position}
                                onChange={(e) => setNewExperience({
                                    ...newExperience,
                                    position: e.target.value
                                })}
                                placeholder="Position"
                                className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <textarea
                            value={newExperience.description}
                            onChange={(e) => setNewExperience({
                                ...newExperience,
                                description: e.target.value
                            })}
                            placeholder="Description"
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                            rows="3"
                        />
                        <div className="flex gap-4">
                            <input
                                type="number"
                                value={newExperience.duration_years}
                                onChange={(e) => setNewExperience({
                                    ...newExperience,
                                    duration_years: e.target.value
                                })}
                                placeholder="Duration (years)"
                                className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4"/>
                                Add Experience
                            </button>
                        </div>
                    </form>
                </div>

                {/* Experience List */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Your Experience</h2>
                    {experiences.length === 0 ? (
                        <p className="text-gray-500 italic">No experience added yet</p>
                    ) : (
                        <div className="space-y-4">
                            {experiences.map((exp) => (
                                <div
                                    key={exp.experience_id}
                                    className="p-4 bg-gray-50 rounded"
                                >
                                    {editingId === exp.experience_id ? (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <input
                                                    type="text"
                                                    value={editingExperience.company_name}
                                                    onChange={(e) => setEditingExperience({
                                                        ...editingExperience,
                                                        company_name: e.target.value
                                                    })}
                                                    className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                                />
                                                <input
                                                    type="text"
                                                    value={editingExperience.position}
                                                    onChange={(e) => setEditingExperience({
                                                        ...editingExperience,
                                                        position: e.target.value
                                                    })}
                                                    className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                            <textarea
                                                value={editingExperience.description}
                                                onChange={(e) => setEditingExperience({
                                                    ...editingExperience,
                                                    description: e.target.value
                                                })}
                                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                                rows="3"
                                            />
                                            <div className="flex gap-2">
                                                <input
                                                    type="number"
                                                    value={editingExperience.duration_years}
                                                    onChange={(e) => setEditingExperience({
                                                        ...editingExperience,
                                                        duration_years: e.target.value
                                                    })}
                                                    className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                                />
                                                <button
                                                    onClick={() => handleUpdateExperience(exp.experience_id)}
                                                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-1"
                                                >
                                                    <Save className="w-4 h-4"/>
                                                    Save
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setEditingId(null);
                                                        setEditingExperience({
                                                            company_name: '',
                                                            position: '',
                                                            description: '',
                                                            duration_years: ''
                                                        });
                                                    }}
                                                    className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {exp.company_name}
                                                    </h3>
                                                    <p className="text-gray-600">{exp.position}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setEditingId(exp.experience_id);
                                                            setEditingExperience({
                                                                company_name: exp.company_name,
                                                                position: exp.position,
                                                                description: exp.description,
                                                                duration_years: exp.duration_years
                                                            });
                                                        }}
                                                        className="p-1 text-blue-600 hover:text-blue-800"
                                                    >
                                                        <Edit2 className="w-4 h-4"/>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteExperience(exp.experience_id)}
                                                        className="p-1 text-red-600 hover:text-red-800"
                                                    >
                                                        <X className="w-4 h-4"/>
                                                    </button>
                                                </div>
                                            </div>
                                            <p className="text-gray-700 mb-2">{exp.description}</p>
                                            <div className="text-sm text-gray-500">
                                                Duration: {exp.duration_years} {exp.duration_years === 1 ? 'year' : 'years'}
                                            </div>
                                        </div>
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

export default ExperienceSettings;