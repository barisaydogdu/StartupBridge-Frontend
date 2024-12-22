import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const BlogForm = () => {
    const [blog, setBlog] = useState({
        title: '',
        content: '',
        category: '',
        author_id: 1
    });

    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    useEffect(() => {
        if (isEditMode) {
            fetchBlog();
        }
    }, [isEditMode, id]);

    const fetchBlog = async () => {
        try {
            const token = localStorage.getItem('token');
            const bearerToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;

            const response = await axios.get(`http://localhost:8080/blogs/${id}`, {
                headers: {
                    'Authorization': bearerToken,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                withCredentials: true
            });
            setBlog(response.data);
        } catch (error) {
            console.error('Error fetching blog:', error);
            if (error.response?.status === 403) {
                navigate('/login');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                alert('Please login first to create a blog');
                navigate('/login');
                return;
            }

            const blogData = {
                title: blog.title,
                content: blog.content,
                category: blog.category,
                author_id: 1
            };

            const bearerToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;

            const config = {
                headers: {
                    'Authorization': bearerToken,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                withCredentials: true
            };

            if (isEditMode) {
                await axios.put(`http://localhost:8080/blogs/${id}`, blogData, config);
            } else {
                await axios.post('http://localhost:8080/blogs', blogData, config);
            }

            navigate('/blogs');
        } catch (error) {
            console.error('Error saving blog:', error);
            let errorMessage = 'Error saving blog: ';
            if (error.response?.status === 403) {
                errorMessage += 'Authentication failed. Please login again.';
                navigate('/login');
            } else {
                errorMessage += error.response?.data?.message || error.message;
            }
            alert(errorMessage);
        }
    };

    const handleChange = (e) => {
        setBlog({
            ...blog,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="px-6 py-4 bg-gradient-to-r from-[#3299CC] to-[#297aa3]">
                        <h1 className="text-2xl font-bold text-white">
                            {isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={blog.title}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#3299CC] focus:border-[#3299CC] transition-colors"
                                placeholder="Enter blog title"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Content
                            </label>
                            <textarea
                                name="content"
                                value={blog.content}
                                onChange={handleChange}
                                rows="8"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#3299CC] focus:border-[#3299CC] transition-colors"
                                placeholder="Write your blog content here..."
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <input
                                type="text"
                                name="category"
                                value={blog.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#3299CC] focus:border-[#3299CC] transition-colors"
                                placeholder="Enter blog category"
                                required
                            />
                        </div>

                        <div className="flex items-center space-x-4 pt-4">
                            <button
                                type="submit"
                                className="flex-1 bg-[#3299CC] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#297aa3] focus:outline-none focus:ring-2 focus:ring-[#3299CC] focus:ring-offset-2 transition-colors"
                            >
                                {isEditMode ? 'Update Blog' : 'Publish Blog'}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/blogs')}
                                className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BlogForm;