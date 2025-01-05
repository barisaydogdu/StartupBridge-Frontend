import React, { useState, useEffect } from 'react';
import {
    Plus, X, Edit2, Save, DollarSign, Calendar, Building,
    Loader2, ChartLine, Target, Briefcase, TrendingUp,
    PieChart, BarChart4, Clock, FileText, Coins
} from 'lucide-react';
import NavbarAuth from "./NavbarAuth";

const API_URL = 'http://localhost:8080/investment-portfolios';

const InvestmentPortfolio = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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

    // Fetch data
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

            if (!response.ok) throw new Error('Failed to fetch investments');
            const data = await response.json();
            setPortfolios(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Add portfolio
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

            if (!response.ok) throw new Error('Failed to add investment');
            await fetchData();
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

            if (!response.ok) throw new Error('Failed to delete investment');
            await fetchData();
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

            if (!response.ok) throw new Error('Failed to update investment');
            await fetchData();
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
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center space-y-3">
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
                    <p className="text-gray-600 animate-pulse">Loading your investment portfolio...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
            <NavbarAuth/>
            <div className="max-w-6xl mx-auto px-4">
                {/* Stats/Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm flex items-start space-x-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <PieChart className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Portfolio Diversity</h3>
                            <p className="text-sm text-gray-600">Track your investment spread</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm flex items-start space-x-4">
                        <div className="p-3 bg-green-100 rounded-lg">
                            <TrendingUp className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Growth Tracking</h3>
                            <p className="text-sm text-gray-600">Monitor your investments</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm flex items-start space-x-4">
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <Target className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Investment Goals</h3>
                            <p className="text-sm text-gray-600">Set and track objectives</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600">
                        <div className="flex items-center gap-4">
                            <Briefcase className="w-10 h-10 text-white" />
                            <div>
                                <h1 className="text-3xl font-bold text-white">Investment Portfolio</h1>
                                <p className="text-blue-100 mt-1">Manage and track your investment journey</p>
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
                        {/* Add New Investment Form */}
                        <div className="mb-8 bg-gray-50 rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <DollarSign className="w-6 h-6 text-blue-600" />
                                Add New Investment
                            </h2>
                            <form onSubmit={handleAddPortfolio} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                            <Building className="w-4 h-4 text-gray-500" />
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            value={newPortfolio.investedCompanyName}
                                            onChange={(e) => setNewPortfolio({
                                                ...newPortfolio,
                                                investedCompanyName: e.target.value
                                            })}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter company name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-500" />
                                            Investment Date
                                        </label>
                                        <input
                                            type="date"
                                            value={newPortfolio.investmentDate}
                                            onChange={(e) => setNewPortfolio({
                                                ...newPortfolio,
                                                investmentDate: e.target.value
                                            })}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-gray-500" />
                                        Investment Details
                                    </label>
                                    <textarea
                                        value={newPortfolio.description}
                                        onChange={(e) => setNewPortfolio({
                                            ...newPortfolio,
                                            description: e.target.value
                                        })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        rows="3"
                                        placeholder="Describe your investment strategy and goals"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <Plus className="w-5 h-5 mr-2" />
                                    Add Investment
                                </button>
                            </form>
                        </div>

                        {/* Investments List */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Coins className="w-6 h-6 text-blue-600" />
                                Your Investments
                            </h2>

                            {portfolios.length === 0 ? (
                                <div className="text-center py-12 bg-gray-50 rounded-xl">
                                    <ChartLine className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500">No investments added yet. Start building your portfolio!</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {portfolios.map((portfolio) => (
                                        <div
                                            key={portfolio.portfolioId}
                                            className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-blue-200 transition-colors"
                                        >
                                            {editingId === portfolio.portfolioId ? (
                                                <div className="space-y-4">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <input
                                                            type="text"
                                                            value={editingPortfolio.investedCompanyName}
                                                            onChange={(e) => setEditingPortfolio({
                                                                ...editingPortfolio,
                                                                investedCompanyName: e.target.value
                                                            })}
                                                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                                        />
                                                        <input
                                                            type="date"
                                                            value={editingPortfolio.investmentDate}
                                                            onChange={(e) => setEditingPortfolio({
                                                                ...editingPortfolio,
                                                                investmentDate: e.target.value
                                                            })}
                                                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                                        />
                                                    </div>
                                                    <textarea
                                                        value={editingPortfolio.description}
                                                        onChange={(e) => setEditingPortfolio({
                                                            ...editingPortfolio,
                                                            description: e.target.value
                                                        })}
                                                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                                        rows="3"
                                                    />
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleUpdatePortfolio(portfolio.portfolioId)}
                                                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                                        >
                                                            <Save className="w-4 h-4 mr-2" />
                                                            Save Changes
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
                                                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div>
                                                            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                                                <Building className="w-5 h-5 text-blue-600" />
                                                                {portfolio.investedCompanyName}
                                                            </h3>
                                                            <div className="flex items-center gap-3 mt-2 text-gray-600">
                                                                <span className="flex items-center gap-1">
                                                                    <Calendar className="w-4 h-4" />
                                                                    {new Date(portfolio.investmentDate).toLocaleDateString('en-US', {
                                                                        year: 'numeric',
                                                                        month: 'long',
                                                                        day: 'numeric'
                                                                    })}
                                                                </span>
                                                                <span className="flex items-center gap-1">
                                                                    <Clock className="w-4 h-4" />
                                                                    {`Added ${new Date(portfolio.investmentDate).toLocaleDateString()}`}
                                                                </span>
                                                            </div>
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
                                                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                                            >
                                                                <Edit2 className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeletePortfolio(portfolio.portfolioId)}
                                                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {portfolio.description && (
                                                        <div className="mt-4 bg-white rounded-lg p-4 text-gray-600">
                                                            <p className="flex items-start gap-2">
                                                                <FileText className="w-4 h-4 mt-1 flex-shrink-0" />
                                                                {portfolio.description}
                                                            </p>
                                                        </div>
                                                    )}
                                                    <div className="mt-4 flex gap-4">
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                            <BarChart4 className="w-3 h-3 mr-1" />
                                                            Analytics
                                                        </span>
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                            <TrendingUp className="w-3 h-3 mr-1" />
                                                            Active
                                                        </span>
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
            </div>
        </div>
    );
};

export default InvestmentPortfolio;