import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/blogs', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setBlogs(response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    const deleteBlog = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8080/blogs/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchBlogs();
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
                    <Link
                        to="/blogs/new"
                        className="inline-flex items-center px-6 py-3 bg-[#3299CC] text-white font-medium rounded-lg hover:bg-[#297aa3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3299CC] transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Create New Blog
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((blog) => (
                        <div key={blog.blog_id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                   <span className="px-3 py-1 bg-[#e6f4f9] text-[#3299CC] text-sm font-medium rounded-full">
                                       {blog.category}
                                   </span>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 mb-3">{blog.title}</h2>
                                <p className="text-gray-600 mb-6 line-clamp-3">{blog.content}</p>

                                <div className="flex justify-end space-x-3 pt-4 border-t">
                                    <Link
                                        to={`/blogs/${blog.blog_id}/edit`}
                                        className="inline-flex items-center px-4 py-2 bg-[#3299CC] text-white text-sm font-medium rounded-lg hover:bg-[#297aa3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3299CC] transition-colors"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => {
                                            if (window.confirm('Are you sure you want to delete this blog?')) {
                                                deleteBlog(blog.blog_id);
                                            }
                                        }}
                                        className="inline-flex items-center px-4 py-2 bg-rose-400 text-white text-sm font-medium rounded-lg hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400 transition-colors"

                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogList;