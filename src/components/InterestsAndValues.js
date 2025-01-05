import React, { useState, useEffect } from 'react';
import { Plus, X, Edit2, Save, Heart, Loader2, LightbulbIcon, Target } from 'lucide-react';
import NavbarAuth from "./NavbarAuth";

const API_URL = 'http://localhost:8080/interestandvalues';

const InterestsAndValues = () => {
    const [interests, setInterests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newInterest, setNewInterest] = useState({
        social_impact: '',
        interest_area: ''
    });
    const [editingId, setEditingId] = useState(null);
    const [editingValues, setEditingValues] = useState({
        social_impact: '',
        interest_area: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');

            const response = await fetch(API_URL, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Failed to fetch interests and values');
            const data = await response.json();
            setInterests(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddInterest = async (e) => {
        e.preventDefault();
        if (!newInterest.interest_area.trim() || !newInterest.social_impact.trim()) return;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(newInterest)
            });

            if (!response.ok) throw new Error('Failed to add interest');

            await fetchData();
            setNewInterest({ social_impact: '', interest_area: '' });
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteInterest = async (interestId) => {
        try {
            const response = await fetch(`${API_URL}/${interestId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) throw new Error('Failed to delete interest');
            await fetchData();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdateInterest = async (interestId) => {
        try {
            const response = await fetch(`${API_URL}/${interestId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(editingValues)
            });

            if (!response.ok) throw new Error('Failed to update interest');
            await fetchData();
            setEditingId(null);
            setEditingValues({ social_impact: '', interest_area: '' });
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <NavbarAuth/>
                <div className="flex flex-col items-center space-y-4">
                    <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                    <p className="text-gray-600 animate-pulse">Loading your interests...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600">
                        <div className="flex items-center gap-4">
                            <Heart className="w-10 h-10 text-white" />
                            <div>
                                <h1 className="text-3xl font-bold text-white">Interests & Values</h1>
                                <p className="text-blue-100 mt-1">Share your passions and social impact goals</p>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="mx-8 mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                            <X className="w-5 h-5 text-red-500" />
                            <p className="text-red-700">{error}</p>
                        </div>
                    )}

                    <div className="p-8">
                        {/* Add New Interest Form */}
                        <div className="mb-8 bg-gray-50 rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Target className="w-6 h-6 text-blue-600" />
                                Add New Interest
                            </h2>
                            <form onSubmit={handleAddInterest} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Interest Area
                                    </label>
                                    <input
                                        type="text"
                                        value={newInterest.interest_area}
                                        onChange={(e) => setNewInterest({
                                            ...newInterest,
                                            interest_area: e.target.value
                                        })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="What's your area of interest?"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Social Impact
                                    </label>
                                    <textarea
                                        value={newInterest.social_impact}
                                        onChange={(e) => setNewInterest({
                                            ...newInterest,
                                            social_impact: e.target.value
                                        })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        rows="3"
                                        placeholder="Describe the social impact you want to make..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <Plus className="w-5 h-5 mr-2" />
                                    Add Interest
                                </button>
                            </form>
                        </div>

                        {/* Interests List */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <LightbulbIcon className="w-6 h-6 text-blue-600" />
                                Your Interests & Values
                            </h2>

                            {interests.length === 0 ? (
                                <div className="text-center py-12 bg-gray-50 rounded-xl">
                                    <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500">No interests added yet. Share what matters to you!</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {interests.map((interest) => (
                                        <div
                                            key={interest.interest_id}
                                            className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-blue-200 transition-colors"
                                        >
                                            {editingId === interest.interest_id ? (
                                                <div className="space-y-4">
                                                    <input
                                                        type="text"
                                                        value={editingValues.interest_area}
                                                        onChange={(e) => setEditingValues({
                                                            ...editingValues,
                                                            interest_area: e.target.value
                                                        })}
                                                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                                    />
                                                    <textarea
                                                        value={editingValues.social_impact}
                                                        onChange={(e) => setEditingValues({
                                                            ...editingValues,
                                                            social_impact: e.target.value
                                                        })}
                                                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                                        rows="3"
                                                    />
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleUpdateInterest(interest.interest_id)}
                                                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                                        >
                                                            <Save className="w-4 h-4 mr-2" />
                                                            Save Changes
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setEditingId(null);
                                                                setEditingValues({
                                                                    social_impact: '',
                                                                    interest_area: ''
                                                                });
                                                            }}
                                                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <div className="flex justify-between items-start">
                                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                            {interest.interest_area}
                                                        </h3>
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => {
                                                                    setEditingId(interest.interest_id);
                                                                    setEditingValues({
                                                                        interest_area: interest.interest_area,
                                                                        social_impact: interest.social_impact
                                                                    });
                                                                }}
                                                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                                            >
                                                                <Edit2 className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteInterest(interest.interest_id)}
                                                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-600 leading-relaxed">
                                                        {interest.social_impact}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterestsAndValues;