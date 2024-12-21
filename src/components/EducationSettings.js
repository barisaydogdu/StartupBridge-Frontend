import React, { useState, useEffect } from 'react';
import { Plus, X, Edit2, Save, GraduationCap } from 'lucide-react';

const API_URL = 'http://localhost:8080/entrepreneurs';
const EDUCATION_API_URL = 'http://localhost:8080/education';

const EducationSettings = () => {
    const [entrepreneur, setEntrepreneur] = useState(null);
    const [education, setEducation] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);

    // Form states
    const [newEducation, setNewEducation] = useState({
        schoolName: '',
        degree: '',
        graduationYear: ''
    });
    const [editingEducation, setEditingEducation] = useState({
        schoolName: '',
        degree: '',
        graduationYear: ''
    });

    // Refresh education list
    const refreshEducation = async (entrepreneurId) => {
        try {
            const response = await fetch(EDUCATION_API_URL, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch education');
            }

            const data = await response.json();
            const userEducation = data.filter(edu =>
                Number(edu.entrepreneurId) === Number(entrepreneurId)
            );
            setEducation(userEducation);
        } catch (err) {
            console.error('Error refreshing education:', err);
        }
    };

    // Get user's entrepreneur info and education
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

                setEntrepreneur(myEntrepreneur);

                // Fetch education data
                const educationResponse = await fetch(EDUCATION_API_URL, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!educationResponse.ok) {
                    throw new Error('Failed to fetch education data');
                }

                const educationData = await educationResponse.json();
                const userEducation = educationData.filter(edu =>
                    Number(edu.entrepreneurId) === Number(myEntrepreneur.entrepreneurId)
                );

                setEducation(userEducation);

            } catch (err) {
                console.error('Error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Add new education
    const handleAddEducation = async (e) => {
        e.preventDefault();
        if (!newEducation.schoolName.trim() || !entrepreneur) return;

        try {
            const response = await fetch(EDUCATION_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    entrepreneurId: entrepreneur.entrepreneurId,
                    schoolName: newEducation.schoolName.trim(),
                    degree: newEducation.degree.trim(),
                    graduationYear: parseInt(newEducation.graduationYear)
                })
            });

            if (!response.ok) throw new Error('Failed to add education');

            await refreshEducation(entrepreneur.entrepreneurId);
            setNewEducation({
                schoolName: '',
                degree: '',
                graduationYear: ''
            });
        } catch (err) {
            setError(err.message);
        }
    };

    // Delete education
    const handleDeleteEducation = async (educationId) => {
        try {
            const response = await fetch(`${EDUCATION_API_URL}/${educationId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) throw new Error('Failed to delete education');

            setEducation(education.filter(edu => edu.educationId !== educationId));
        } catch (err) {
            setError(err.message);
        }
    };

    // Update education
    const handleUpdateEducation = async (educationId) => {
        if (!editingEducation.schoolName.trim() || !entrepreneur) return;

        try {
            const response = await fetch(`${EDUCATION_API_URL}/${educationId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    educationId: educationId,
                    entrepreneurId: entrepreneur.entrepreneurId,
                    schoolName: editingEducation.schoolName.trim(),
                    degree: editingEducation.degree.trim(),
                    graduationYear: parseInt(editingEducation.graduationYear)
                })
            });

            if (!response.ok) throw new Error('Failed to update education');

            await refreshEducation(entrepreneur.entrepreneurId);
            setEditingId(null);
            setEditingEducation({
                schoolName: '',
                degree: '',
                graduationYear: ''
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
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Education Settings</h1>
                    <p className="text-gray-600">Manage your educational background</p>
                </div>

                {/* Add New Education Form */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5"/>
                        Add New Education
                    </h2>
                    <form onSubmit={handleAddEducation} className="space-y-3">
                        <div>
                            <input
                                type="text"
                                value={newEducation.schoolName}
                                onChange={(e) => setNewEducation({...newEducation, schoolName: e.target.value})}
                                placeholder="School Name"
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                value={newEducation.degree}
                                onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
                                placeholder="Degree"
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                value={newEducation.graduationYear}
                                onChange={(e) => setNewEducation({...newEducation, graduationYear: e.target.value})}
                                placeholder="Graduation Year"
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center gap-2"
                        >
                            <Plus className="w-4 h-4"/>
                            Add Education
                        </button>
                    </form>
                </div>

                {/* Education List */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Your Education History</h2>
                    {education.length === 0 ? (
                        <p className="text-gray-500 italic">No education history added yet</p>
                    ) : (
                        <div className="space-y-3">
                            {education.map((edu) => (
                                <div
                                    key={edu.educationId}
                                    className="p-4 bg-gray-50 rounded"
                                >
                                    {editingId === edu.educationId ? (
                                        <div className="space-y-3">
                                            <input
                                                type="text"
                                                value={editingEducation.schoolName}
                                                onChange={(e) => setEditingEducation({
                                                    ...editingEducation,
                                                    schoolName: e.target.value
                                                })}
                                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                            <input
                                                type="text"
                                                value={editingEducation.degree}
                                                onChange={(e) => setEditingEducation({
                                                    ...editingEducation,
                                                    degree: e.target.value
                                                })}
                                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                            <input
                                                type="number"
                                                value={editingEducation.graduationYear}
                                                onChange={(e) => setEditingEducation({
                                                    ...editingEducation,
                                                    graduationYear: e.target.value
                                                })}
                                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleUpdateEducation(edu.educationId)}
                                                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-1"
                                                >
                                                    <Save className="w-4 h-4"/>
                                                    Save
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setEditingId(null);
                                                        setEditingEducation({
                                                            schoolName: '',
                                                            degree: '',
                                                            graduationYear: ''
                                                        });
                                                    }}
                                                    className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{edu.schoolName}</h3>
                                                <p className="text-gray-600">{edu.degree}</p>
                                                <p className="text-gray-500">Graduation Year: {edu.graduationYear}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        setEditingId(edu.educationId);
                                                        setEditingEducation({
                                                            schoolName: edu.schoolName,
                                                            degree: edu.degree,
                                                            graduationYear: edu.graduationYear
                                                        });
                                                    }}
                                                    className="p-1 text-blue-600 hover:text-blue-800"
                                                >
                                                    <Edit2 className="w-4 h-4"/>
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteEducation(edu.educationId)}
                                                    className="p-1 text-red-600 hover:text-red-800"
                                                >
                                                    <X className="w-4 h-4"/>
                                                </button>
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

export default EducationSettings;