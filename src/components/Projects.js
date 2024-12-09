import React, { useState, useEffect } from 'react';
import {Pencil, Trash2 } from 'lucide-react';

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
            const response = await fetch(API_URL);
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

            const response = await fetch(url, {
                method,
                headers: {
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
                        <h3 className="text-lg font-semibold mb-2">{project.project_name}</h3>
                        <p className="text-gray-600 mb-2">{project.short_description}</p>
                        <div className="text-sm text-gray-500 mb-4">
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

export default ProjectManagement;