import React, { useState, useEffect } from 'react';
import { Plus, X, Edit2, Save, DollarSign, Calendar, Building } from 'lucide-react';


const API_URL = 'http://localhost:8080/investment-portfolios';

const InvestmentPortfolio = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Form states
    const [newPortfolio, setNewPortfolio] = useState({
        investedCompanyName: '',
        investmentDate: '',
        description: ''
    });
    const [editingId, setEditingId] = useState(null);
    const [editingPortfolio, setEditingPortfolio] = useState({
        investedCompanyName: '',
        investmentDate: '',
        description: ''
    });

    // Fetch all portfolios
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
                    throw new Error('Failed to fetch investment portfolios');
                }

                const data = await response.json();
                setPortfolios(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Add new portfolio
    const handleAddPortfolio = async (e) => {
        e.preventDefault();
        if (!newPortfolio.investedCompanyName.trim() || !newPortfolio.investmentDate) return;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(newPortfolio)
            });

            if (!response.ok) throw new Error('Failed to add portfolio');

            const addedPortfolio = await response.json();
            setPortfolios([...portfolios, addedPortfolio]);
            setNewPortfolio({
                investedCompanyName: '',
                investmentDate: '',
                description: ''
            });
        } catch (err) {
            setError(err.message);
        }
    };

    // Delete portfolio
    const handleDeletePortfolio = async (portfolioId) => {
        try {
            const response = await fetch(`${API_URL}/${portfolioId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) throw new Error('Failed to delete portfolio');

            setPortfolios(portfolios.filter(p => p.portfolioId !== portfolioId));
        } catch (err) {
            setError(err.message);
        }
    };

    // Update portfolio
    const handleUpdatePortfolio = async (portfolioId) => {
        try {
            const response = await fetch(`${API_URL}/${portfolioId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(editingPortfolio)
            });

            if (!response.ok) throw new Error('Failed to update portfolio');

            const updatedPortfolio = await response.json();
            setPortfolios(portfolios.map(p =>
                p.portfolioId === portfolioId ? updatedPortfolio : p
            ));
            setEditingId(null);
            setEditingPortfolio({
                investedCompanyName: '',
                investmentDate: '',
                description: ''
            });
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-lg text-gray-600">Loading investment portfolios...</div>
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
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Investment Portfolio</h1>
                    <p className="text-gray-600">Manage your investment portfolio and track your investments</p>
                </div>

                {/* Add New Portfolio Form */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <DollarSign className="w-5 h-5"/>
                        Add New Investment
                    </h2>
                    <form onSubmit={handleAddPortfolio} className="space-y-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Building className="w-4 h-4 text-gray-500"/>
                                <label className="text-sm font-medium text-gray-700">Company Name</label>
                            </div>
                            <input
                                type="text"
                                value={newPortfolio.investedCompanyName}
                                onChange={(e) => setNewPortfolio({
                                    ...newPortfolio,
                                    investedCompanyName: e.target.value
                                })}
                                placeholder="Enter company name"
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Calendar className="w-4 h-4 text-gray-500"/>
                                <label className="text-sm font-medium text-gray-700">Investment Date</label>
                            </div>
                            <input
                                type="date"
                                value={newPortfolio.investmentDate}
                                onChange={(e) => setNewPortfolio({
                                    ...newPortfolio,
                                    investmentDate: e.target.value
                                })}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">Description</label>
                            <textarea
                                value={newPortfolio.description}
                                onChange={(e) => setNewPortfolio({
                                    ...newPortfolio,
                                    description: e.target.value
                                })}
                                placeholder="Enter investment details"
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 h-24"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4"/>
                            Add Investment
                        </button>
                    </form>
                </div>

                {/* Portfolios List */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Your Investment Portfolio</h2>
                    {portfolios.length === 0 ? (
                        <p className="text-gray-500 italic">No investments added yet</p>
                    ) : (
                        <div className="space-y-4">
                            {portfolios.map((portfolio) => (
                                <div
                                    key={portfolio.portfolioId}
                                    className="p-4 bg-gray-50 rounded-lg"
                                >
                                    {editingId === portfolio.portfolioId ? (
                                        <div className="space-y-4">
                                            <input
                                                type="text"
                                                value={editingPortfolio.investedCompanyName}
                                                onChange={(e) => setEditingPortfolio({
                                                    ...editingPortfolio,
                                                    investedCompanyName: e.target.value
                                                })}
                                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                            <input
                                                type="date"
                                                value={editingPortfolio.investmentDate}
                                                onChange={(e) => setEditingPortfolio({
                                                    ...editingPortfolio,
                                                    investmentDate: e.target.value
                                                })}
                                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                            <textarea
                                                value={editingPortfolio.description}
                                                onChange={(e) => setEditingPortfolio({
                                                    ...editingPortfolio,
                                                    description: e.target.value
                                                })}
                                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 h-24"
                                            />
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleUpdatePortfolio(portfolio.portfolioId)}
                                                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-1"
                                                >
                                                    <Save className="w-4 h-4"/>
                                                    Save
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setEditingId(null);
                                                        setEditingPortfolio({
                                                            investedCompanyName: '',
                                                            investmentDate: '',
                                                            description: ''
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
                                                    <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                                                        <Building className="w-5 h-5 text-gray-500"/>
                                                        {portfolio.investedCompanyName}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                                        <Calendar className="w-4 h-4"/>
                                                        {new Date(portfolio.investmentDate).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setEditingId(portfolio.portfolioId);
                                                            setEditingPortfolio({
                                                                investedCompanyName: portfolio.investedCompanyName,
                                                                investmentDate: portfolio.investmentDate,
                                                                description: portfolio.description
                                                            });
                                                        }}
                                                        className="p-1 text-blue-600 hover:text-blue-800"
                                                    >
                                                        <Edit2 className="w-4 h-4"/>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeletePortfolio(portfolio.portfolioId)}
                                                        className="p-1 text-red-600 hover:text-red-800"
                                                    >
                                                        <X className="w-4 h-4"/>
                                                    </button>
                                                </div>
                                            </div>
                                            {portfolio.description && (
                                                <p className="text-gray-600 mt-2">{portfolio.description}</p>
                                            )}
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

export default InvestmentPortfolio;