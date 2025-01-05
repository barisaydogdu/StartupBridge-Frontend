import React, { useState, useEffect } from 'react';
//import {Pencil, Trash2,UserCircle ,ArrowLeft,AlertCircle,FileQuestion,Rocket,LightbulbIcon,ExternalLink,User,Mail,Phone,FileText,Briefcase,Target,Layers,Wallet,LineChart,Calendar} from 'lucide-react';
//import {useParams, Link, useNavigate, Routes, Route} from 'react-router-dom';
import {
    Pencil, Trash2, UserCircle, ArrowLeft, AlertCircle, FileQuestion,
    Rocket, LightbulbIcon, ExternalLink, User, Mail, Phone, FileText,
    Briefcase, Target, Layers, Wallet, LineChart, Calendar, ClipboardList,
    Edit2, PlusCircle, Save, X, AlignLeft
} from 'lucide-react';
import { useParams, Link, useNavigate, Routes, Route } from 'react-router-dom';

const ProjectManagement = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);

    const initialFormState = {
        project_name: '',
        short_description: '',
        target_sector: '',
        stage: '',
        budget_needed: '',
        revenue_model: ''
    };

    const [formData, setFormData] = useState(initialFormState);

    const API_URL = 'http://localhost:8080/projects';

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await fetch(API_URL, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Authorization header ekleniyor
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) throw new Error('Projeler yüklenirken bir hata oluştu');
            const data = await response.json();
            setProjects(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = isEditing ? `${API_URL}/${currentProject.project_id}` : API_URL;
            const method = isEditing ? 'PUT' : 'POST';
            const token = localStorage.getItem('token'); // JWT token'ı al
            const response = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${token}`, // Authorization header ekleniyor
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('İşlem başarısız oldu');

            fetchProjects();
            setFormData(initialFormState);
            setIsEditing(false);
            setCurrentProject(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bu projeyi silmek istediğinizden emin misiniz?')) {
            try {
                const response = await fetch(`${API_URL}/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) throw new Error('Silme işlemi başarısız oldu');
                fetchProjects();
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const handleEdit = (project) => {
        setIsEditing(true);
        setCurrentProject(project);
        setFormData({
            project_name: project.project_name,
            short_description: project.short_description,
            target_sector: project.target_sector,
            stage: project.stage,
            budget_needed: project.budget_needed,
            revenue_model: project.revenue_model
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (loading) return <div className="flex justify-center items-center h-screen">Yükleniyor...</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Proje Yönetimi</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">
                    {isEditing ? 'Projeyi Düzenle' : 'Yeni Proje Ekle'}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Proje Adı</label>
                        <input
                            type="text"
                            name="project_name"
                            value={formData.project_name}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Hedef Sektör</label>
                        <input
                            type="text"
                            name="target_sector"
                            value={formData.target_sector}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Aşama</label>
                        <input
                            type="text"
                            name="stage"
                            value={formData.stage}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">İhtiyaç Duyulan Bütçe</label>
                        <input
                            type="text"
                            name="budget_needed"
                            value={formData.budget_needed}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Kısa Açıklama</label>
                        <textarea
                            name="short_description"
                            value={formData.short_description}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            rows="3"
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Gelir Modeli</label>
                        <input
                            type="text"
                            name="revenue_model"
                            value={formData.revenue_model}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                </div>

                <div className="mt-4 flex gap-2">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {isEditing ? 'Güncelle' : 'Ekle'}
                    </button>

                    {isEditing && (
                        <button
                            type="button"
                            onClick={() => {
                                setIsEditing(false);
                                setCurrentProject(null);
                                setFormData(initialFormState);
                            }}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            İptal
                        </button>
                    )}
                </div>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map(project => (
                    <div key={project.project_id} className="bg-white p-4 rounded-lg shadow-md">
                        <Link to={`/projects/${project.project_id}`}>
                            <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 transition-colors">
                                {project.project_name}
                            </h3>
                        </Link>
                        <h3 className="text-lg font-semibold mb-2">{project.project_name}</h3>
                        <p className="text-gray-600 mb-2">{project.short_description}</p>
                        <div className="text-sm text-gray-500 mb-4">

                            {project.entrepreneur && (
                                <div className="bg-gray-50 p-3 rounded mb-3">
                                    <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                                        <UserCircle size={16} />
                                        <span className="font-medium">Girişimci Bilgileri:</span>
                                    </div>

                                    <Link
                                        to={`/entrepreneurs/${project.entrepreneur_id}`}
                                        className="text-blue-500 hover:text-blue-700 underline text-sm"
                                    >
                                        Profile Git
                                    </Link>

                                    <div className="text-sm text-gray-600">
                                        <p>Ad Soyad: {project.entrepreneur.firstName} {project.entrepreneur.lastName}</p>
                                        <p>E-posta: {project.entrepreneur.email}</p>
                                        {project.entrepreneur.phoneVisibility && project.entrepreneur.phoneNumber && (
                                            <p>Telefon: {project.entrepreneur.phoneNumber}</p>
                                        )}
                                    </div>
                                </div>
                            )}
                            <p>Sektör: {project.target_sector}</p>
                            <p>Aşama: {project.stage}</p>
                            <p>Bütçe: {project.budget_needed}</p>
                            <p>Gelir Modeli: {project.revenue_model}</p>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEdit(project)}
                                className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                            >
                                <Pencil size={16} />
                                Düzenle
                            </button>
                            <button
                                onClick={() => handleDelete(project.project_id)}
                                className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                <Trash2 size={16} />
                                Sil
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


const ProjectDetail = () => {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetchProjectDetails();
    }, [id]);

    const fetchProjectDetails = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/projects/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) throw new Error('Proje detayları yüklenirken bir hata oluştu');
            const data = await response.json();
            setProject(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
    );
    if (error) return (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center flex items-center justify-center gap-2">
            <AlertCircle size={20} />
            {error}
        </div>
    );
    if (!project) return (
        <div className="text-center text-gray-600 flex items-center justify-center gap-2">
            <FileQuestion size={20} />
            Proje bulunamadı
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <div className="container mx-auto px-4 py-8">
                <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-8 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md"
                >
                    <ArrowLeft size={20} />
                    <span>Projelere Geri Dön</span>
                </Link>

                <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-blue-600 text-white p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Rocket size={32} className="text-blue-200" />
                            <h1 className="text-4xl font-bold">{project.project_name}</h1>
                        </div>
                        <div className="flex items-start gap-2">
                            <LightbulbIcon size={20} className="text-blue-200 mt-1 flex-shrink-0" />
                            <p className="text-blue-100 text-lg">{project.short_description}</p>
                        </div>
                    </div>

                    <div className="p-8">
                        {/* Girişimci Bilgileri */}
                        {project.entrepreneur && (
                            <div className="bg-blue-50 rounded-xl p-6 mb-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-600 rounded-full p-2">
                                            <UserCircle size={24} className="text-white" />
                                        </div>
                                        <h2 className="text-2xl font-semibold text-blue-900">Girişimci Bilgileri</h2>
                                    </div>
                                    <Link
                                        to={`/entrepreneurs/${project.entrepreneur_id}`}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                                    >
                                        <ExternalLink size={16} />
                                        Profile Git
                                    </Link>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <p className="flex items-center gap-2">
                                            <User size={18} className="text-blue-600" />
                                            <span className="text-blue-900 font-medium">Ad Soyad:</span>
                                            <span className="text-gray-700">{project.entrepreneur.firstName} {project.entrepreneur.lastName}</span>
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <Mail size={18} className="text-blue-600" />
                                            <span className="text-blue-900 font-medium">E-posta:</span>
                                            <span className="text-gray-700">{project.entrepreneur.email}</span>
                                        </p>
                                    </div>
                                    <div className="space-y-3">
                                        {project.entrepreneur.phoneVisibility && project.entrepreneur.phoneNumber && (
                                            <p className="flex items-center gap-2">
                                                <Phone size={18} className="text-blue-600" />
                                                <span className="text-blue-900 font-medium">Telefon:</span>
                                                <span className="text-gray-700">{project.entrepreneur.phoneNumber}</span>
                                            </p>
                                        )}
                                        {project.entrepreneur.bio && (
                                            <p className="flex items-center gap-2">
                                                <FileText size={18} className="text-blue-600" />
                                                <span className="text-blue-900 font-medium">Bio:</span>
                                                <span className="text-gray-700">{project.entrepreneur.bio}</span>
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Proje Detayları */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-gray-50 rounded-xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <Briefcase size={24} className="text-blue-600" />
                                    <h2 className="text-2xl font-semibold text-blue-900">Proje Detayları</h2>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
                                        <Target size={18} className="text-blue-600" />
                                        <span className="text-blue-900 font-medium">Sektör:</span>
                                        <span className="text-gray-700">{project.target_sector}</span>
                                    </div>
                                    <div className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
                                        <Layers size={18} className="text-blue-600" />
                                        <span className="text-blue-900 font-medium">Aşama:</span>
                                        <span className="text-gray-700">{project.stage}</span>
                                    </div>
                                    <div className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
                                        <Wallet size={18} className="text-blue-600" />
                                        <span className="text-blue-900 font-medium">Bütçe:</span>
                                        <span className="text-gray-700">{project.budget_needed}</span>
                                    </div>
                                    <div className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
                                        <LineChart size={18} className="text-blue-600" />
                                        <span className="text-blue-900 font-medium">Gelir Modeli:</span>
                                        <span className="text-gray-700">{project.revenue_model}</span>
                                    </div>
                                    {project.created_at && (
                                        <div className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
                                            <Calendar size={18} className="text-blue-600" />
                                            <span className="text-blue-900 font-medium">Oluşturulma Tarihi:</span>
                                            <span className="text-gray-700">
                                                {new Date(project.created_at).toLocaleDateString('tr-TR')}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <FileText size={24} className="text-blue-600" />
                                    <h2 className="text-2xl font-semibold text-blue-900">Proje Açıklaması</h2>
                                </div>
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <p className="text-gray-700 leading-relaxed">{project.short_description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Project = () => {
    const navigate = useNavigate();

    const handleNavigate = (view, id = null) => {
        switch (view) {
            case 'list':
                navigate('/projectslist');
                break;
            case 'create':
                navigate('/projects/create');
                break;
            case 'details':
                navigate(`/investprojects/${id}`);
                break;
            case 'edit':
                navigate(`/projects/${id}/edit`);
                break;
            default:
                navigate('/projects');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Routes>
                <Route
                    index
                    element={<ProjectManagement onNavigate={handleNavigate} />}
                />
              {/*  <Route
                    path="create"
                    element={<EntrepreneurForm onNavigate={handleNavigate} />}
                />*/}
                <Route
                    path=":id"
                    element={<ProjectDetail onNavigate={handleNavigate} />}
                />
                <Route
                    path=":id/edit"
                    element={<ProjectManagement onNavigate={handleNavigate} />}
                />
            </Routes>
        </div>
    );
};




export default Project;