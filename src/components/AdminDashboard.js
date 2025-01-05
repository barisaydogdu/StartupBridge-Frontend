import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Briefcase,
    Settings,
    LogOut,
    ChevronRight,
    Menu,
    X,
    LineChart,
    UserPlus,
    Building,
    FileText,
    Mail
} from 'lucide-react';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [entrepreneurs, setEntrepreneurs] = useState([]);
    const [investors, setInvestors] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [activePage, setActivePage] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Fetch initial data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                };

                // Fetch projects
                const projectsRes = await fetch('http://localhost:8080/projects', { headers });
                const projectsData = await projectsRes.json();
                setProjects(projectsData);

                // Fetch entrepreneurs
                const entrepreneursRes = await fetch('http://localhost:8080/entrepreneurs', { headers });
                const entrepreneursData = await entrepreneursRes.json();
                setEntrepreneurs(entrepreneursData);

                // Fetch investors
                const investorsRes = await fetch('http://localhost:8080/investors', { headers });
                const investorsData = await investorsRes.json();
                setInvestors(investorsData);

                // Fetch blogs
                const blogsRes = await fetch('http://localhost:8080/blogs', { headers });
                const blogsData = await blogsRes.json();
                setBlogs(blogsData);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'entrepreneurs', label: 'Entrepreneurs', icon: Users },
        { id: 'investors', label: 'Investors', icon: Building },
        { id: 'projects', label: 'Projects', icon: Briefcase },
        { id: 'blogs', label: 'Blog Posts', icon: FileText },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    const StatCard = ({ title, value, icon: Icon, color }) => (
        <div className="bg-white rounded-xl shadow-sm p-6 flex items-start gap-4">
            <div className={`p-3 rounded-lg ${color}`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
                <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
                <p className="text-2xl font-semibold text-gray-900">{value}</p>
            </div>
        </div>
    );

    const RecentActivity = () => (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
                {[...projects, ...entrepreneurs, ...investors]
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .slice(0, 5)
                    .map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                {item.project_name ? (
                                    <Briefcase className="w-4 h-4 text-blue-600" />
                                ) : item.first_name ? (
                                    <Building className="w-4 h-4 text-blue-600" />
                                ) : (
                                    <Users className="w-4 h-4 text-blue-600" />
                                )}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">
                                    {item.project_name || `${item.first_name} ${item.last_name}`}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {new Date(item.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-transform duration-300 transform z-30 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
                style={{ width: '280px' }}
            >
                <div className="p-6">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="lg:hidden text-gray-500 hover:text-gray-700"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <nav className="space-y-1">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActivePage(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                                    activePage === item.id
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                                <ChevronRight className={`w-4 h-4 ml-auto ${
                                    activePage === item.id ? 'text-blue-600' : 'text-gray-400'
                                }`} />
                            </button>
                        ))}
                    </nav>

                    <button
                        onClick={handleLogout}
                        className="w-full mt-8 flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div
                className={`transition-all duration-300 ${
                    isSidebarOpen ? 'lg:ml-[280px]' : 'ml-0'
                }`}
            >
                {/* Top Bar */}
                <div className="bg-white shadow-sm">
                    <div className="flex items-center justify-between h-16 px-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        <div className="flex items-center gap-4">
                            <button className="p-2 text-gray-500 hover:text-gray-700">
                                <Mail className="w-5 h-5" />
                            </button>
                            <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                <Users className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6">
                    {activePage === 'dashboard' && (
                        <div className="space-y-6">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <StatCard
                                    title="Total Projects"
                                    value={projects.length}
                                    icon={Briefcase}
                                    color="bg-blue-600"
                                />
                                <StatCard
                                    title="Entrepreneurs"
                                    value={entrepreneurs.length}
                                    icon={Users}
                                    color="bg-green-600"
                                />
                                <StatCard
                                    title="Investors"
                                    value={investors.length}
                                    icon={Building}
                                    color="bg-purple-600"
                                />
                                <StatCard
                                    title="Blog Posts"
                                    value={blogs.length}
                                    icon={FileText}
                                    color="bg-orange-600"
                                />
                            </div>

                            {/* Additional Sections */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <RecentActivity />

                                {/* Quick Actions */}
                                <div className="bg-white rounded-xl shadow-sm p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { label: 'Add Project', icon: Briefcase, color: 'bg-blue-600' },
                                            { label: 'New User', icon: UserPlus, color: 'bg-green-600' },
                                            { label: 'Analytics', icon: LineChart, color: 'bg-purple-600' },
                                            { label: 'Settings', icon: Settings, color: 'bg-orange-600' },
                                        ].map((action, index) => (
                                            <button
                                                key={index}
                                                className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                                            >
                                                <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-2`}>
                                                    <action.icon className="w-5 h-5 text-white" />
                                                </div>
                                                <span className="text-sm font-medium text-gray-900">{action.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Other pages content will be added here */}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;