import React, { useState, useEffect } from 'react';
import { Plus, X, Edit2, Save, Heart } from 'lucide-react';

const API_URL = 'http://localhost:8080/interestandvalues';

const InterestsAndValues = () => {
    const [investor, setInvestor] = useState(null);
    const [interests, setInterests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Form states
    const [newInterest, setNewInterest] = useState({
        social_impact: '',
        interest_area: ''
    });
    const [editingId, setEditingId] = useState(null);
    const [editingValues, setEditingValues] = useState({
        social_impact: '',
        interest_area: ''
    });

    // Fetch all interests and values
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No token found');

                const response = await fetch(API_URL, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch interests and values');
                }

                const data = await response.json();
                setInterests(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Add new interest and values
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

            const addedInterest = await response.json();
            setInterests([...interests, addedInterest]);
            setNewInterest({ social_impact: '', interest_area: '' });
        } catch (err) {
            setError(err.message);
        }
    };

    // Delete interest
    const handleDeleteInterest = async (interestId) => {
        try {
            const response = await fetch(`${API_URL}/${interestId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) throw new Error('Failed to delete interest');

            setInterests(interests.filter(int => int.interest_id !== interestId));
        } catch (err) {
            setError(err.message);
        }
    };

    // Update interest
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

            const updatedInterest = await response.json();
            setInterests(interests.map(int =>
                int.interest_id === interestId ? updatedInterest : int
            ));
            setEditingId(null);
            setEditingValues({ social_impact: '', interest_area: '' });
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

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Interests & Values</h1>
                    <p className="text-gray-600">Manage your interests and social impact values</p>
                </div>

                {/* Add New Interest Form */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Heart className="w-5 h-5"/>
                        Add New Interest & Value
                    </h2>
                    <form onSubmit={handleAddInterest} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                value={newInterest.interest_area}
                                onChange={(e) => setNewInterest({
                                    ...newInterest,
                                    interest_area: e.target.value
                                })}
                                placeholder="Interest Area"
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <textarea
                                value={newInterest.social_impact}
                                onChange={(e) => setNewInterest({
                                    ...newInterest,
                                    social_impact: e.target.value
                                })}
                                placeholder="Social Impact Description"
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 h-24"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4"/>
                            Add
                        </button>
                    </form>
                </div>

                {/* Interests List */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Your Interests & Values</h2>
                    {interests.length === 0 ? (
                        <p className="text-gray-500 italic">No interests added yet</p>
                    ) : (
                        <div className="space-y-4">
                            {interests.map((interest) => (
                                <div
                                    key={interest.interest_id}
                                    className="p-4 bg-gray-50 rounded-lg"
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
                                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                            <textarea
                                                value={editingValues.social_impact}
                                                onChange={(e) => setEditingValues({
                                                    ...editingValues,
                                                    social_impact: e.target.value
                                                })}
                                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 h-24"
                                            />
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleUpdateInterest(interest.interest_id)}
                                                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-1"
                                                >
                                                    <Save className="w-4 h-4"/>
                                                    Save
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setEditingId(null);
                                                        setEditingValues({ social_impact: '', interest_area: '' });
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
                                                <h3 className="text-lg font-medium text-gray-900">
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
                                                        className="p-1 text-blue-600 hover:text-blue-800"
                                                    >
                                                        <Edit2 className="w-4 h-4"/>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteInterest(interest.interest_id)}
                                                        className="p-1 text-red-600 hover:text-red-800"
                                                    >
                                                        <X className="w-4 h-4"/>
                                                    </button>
                                                </div>
                                            </div>
                                            <p className="text-gray-600">{interest.social_impact}</p>
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

export default InterestsAndValues;