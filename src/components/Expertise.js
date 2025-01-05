import React, { useState, useEffect } from 'react';
import { Plus, X, Edit2, Save, Award } from 'lucide-react';

const API_URL = 'http://localhost:8080/entrepreneurs';
const EXPERTISE_API_URL = 'http://localhost:8080/expertise';

const UserSettings = () => {
    const [entrepreneur, setEntrepreneur] = useState(null);
    const [expertise, setExpertise] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newSkill, setNewSkill] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingSkill, setEditingSkill] = useState('');

    // Refresh expertise list
    const refreshExpertise = async (entrepreneurId) => {
        try {
            const response = await fetch(EXPERTISE_API_URL, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch expertise');
            }

            const data = await response.json();
            console.log('Refreshing expertise list for entrepreneur:', entrepreneurId);
            console.log('All expertise:', data);

            const userExpertise = data.filter(exp =>
                Number(exp.entrepreneur_id) === Number(entrepreneurId)
            );
            console.log('Filtered expertise after refresh:', userExpertise);
            setExpertise(userExpertise);
        } catch (err) {
            console.error('Error refreshing expertise:', err);
        }
    };

    // Get user's entrepreneur info and expertise
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get user ID from token
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No token found');

                const payload = JSON.parse(atob(token.split('.')[1]));
                const userId = payload.id;
                console.log('Current user ID:', userId);

                // First, get all entrepreneurs
                const entrepreneursResponse = await fetch(API_URL, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!entrepreneursResponse.ok) {
                    throw new Error('Failed to fetch entrepreneurs');
                }

                const entrepreneurs = await entrepreneursResponse.json();
                console.log('All entrepreneurs:', entrepreneurs);

                // Find the entrepreneur matching the user ID
                const myEntrepreneur = entrepreneurs.find(e => {
                    console.log('Checking entrepreneur:', {
                        'entrepreneurId': e.entrepreneurId,
                        'userId': e.userId,
                        'tokenUserId': userId
                    });
                    return Number(e.userId) === Number(userId);
                });

                if (!myEntrepreneur) {
                    console.error('No matching entrepreneur found for user ID:', userId);
                    throw new Error('No entrepreneur profile found for this user');
                }

                console.log('Found entrepreneur:', myEntrepreneur);

                if (!myEntrepreneur) {
                    throw new Error('No entrepreneur profile found for this user');
                }

                // Now get this specific entrepreneur's details
                const entrepreneurDetailResponse = await fetch(`${API_URL}/${myEntrepreneur.entrepreneurId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!entrepreneurDetailResponse.ok) {
                    throw new Error('Failed to fetch entrepreneur details');
                }

                const entrepreneurDetail = await entrepreneurDetailResponse.json();
                console.log('Entrepreneur details:', entrepreneurDetail);
                setEntrepreneur(entrepreneurDetail);

                // Fetch expertise data
                const expertiseResponse = await fetch(EXPERTISE_API_URL, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!expertiseResponse.ok) {
                    throw new Error('Failed to fetch expertise data');
                }

                const expertiseData = await expertiseResponse.json();
                console.log('All expertise data:', expertiseData);
                console.log('Looking for expertise with entrepreneur_id:', entrepreneurDetail.entrepreneurId);

                // Filter expertise for current entrepreneur
                const userExpertise = expertiseData.filter(exp =>
                    Number(exp.entrepreneur_id) === Number(entrepreneurDetail.entrepreneurId)
                );

                console.log('Filtered expertise:', userExpertise);
                setExpertise(userExpertise);

            } catch (err) {
                console.error('Error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Add new expertise
    const handleAddExpertise = async (e) => {
        e.preventDefault();
        if (!newSkill.trim() || !entrepreneur) return;

        console.log('Adding expertise for entrepreneur:', entrepreneur.entrepreneurId);

        try {
            const response = await fetch(EXPERTISE_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    entrepreneur_id: entrepreneur.entrepreneurId,
                    skill_name: newSkill.trim()
                })
            });

            if (!response.ok) throw new Error('Failed to add expertise');

            const addedExpertise = await response.json();
            console.log('Added expertise:', addedExpertise);
            // Refresh the expertise list instead of updating state directly
            await refreshExpertise(entrepreneur.entrepreneurId);
            setNewSkill('');
        } catch (err) {
            setError(err.message);
        }
    };

    // Delete expertise
    const handleDeleteExpertise = async (expertiseId) => {
        try {
            const response = await fetch(`${EXPERTISE_API_URL}/${expertiseId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) throw new Error('Failed to delete expertise');

            setExpertise(expertise.filter(exp => exp.expertise_id !== expertiseId));
        } catch (err) {
            setError(err.message);
        }
    };

    // Update expertise
    const handleUpdateExpertise = async (expertiseId) => {
        if (!editingSkill.trim() || !entrepreneur) return;

        try {
            const response = await fetch(`${EXPERTISE_API_URL}/${expertiseId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    expertise_id: expertiseId,
                    entrepreneur_id: entrepreneur.entrepreneurId,
                    skill_name: editingSkill.trim()
                })
            });

            if (!response.ok) throw new Error('Failed to update expertise');

            const updatedExpertise = await response.json();
            setExpertise(expertise.map(exp =>
                exp.expertise_id === expertiseId ? updatedExpertise : exp
            ));
            setEditingId(null);
            setEditingSkill('');
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
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">User Settings</h1>
                    <p className="text-gray-600">Manage your expertise and skills</p>
                </div>

                {/* Add New Expertise Form */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Award className="w-5 h-5"/>
                        Add New Expertise
                    </h2>
                    <form onSubmit={handleAddExpertise} className="flex gap-2">
                        <input
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            placeholder="Enter skill or expertise"
                            className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4"/>
                            Add
                        </button>
                    </form>
                </div>

                {/* Expertise List */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Your Expertise</h2>
                    {expertise.length === 0 ? (
                        <p className="text-gray-500 italic">No expertise added yet</p>
                    ) : (
                        <div className="space-y-2">
                            {expertise.map((exp) => (
                                <div
                                    key={exp.expertise_id}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded"
                                >
                                    {editingId === exp.expertise_id ? (
                                        <div className="flex-1 flex gap-2">
                                            <input
                                                type="text"
                                                value={editingSkill}
                                                onChange={(e) => setEditingSkill(e.target.value)}
                                                className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                            <button
                                                onClick={() => handleUpdateExpertise(exp.expertise_id)}
                                                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-1"
                                            >
                                                <Save className="w-4 h-4"/>
                                                Save
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setEditingId(null);
                                                    setEditingSkill('');
                                                }}
                                                className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <span className="text-gray-700">{exp.skill_name}</span>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        setEditingId(exp.expertise_id);
                                                        setEditingSkill(exp.skill_name);
                                                    }}
                                                    className="p-1 text-blue-600 hover:text-blue-800"
                                                >
                                                    <Edit2 className="w-4 h-4"/>
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteExpertise(exp.expertise_id)}
                                                    className="p-1 text-red-600 hover:text-red-800"
                                                >
                                                    <X className="w-4 h-4"/>
                                                </button>
                                            </div>
                                        </>
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

export default UserSettings;