import React, { useState, useEffect } from 'react';
import { User, Edit2, Trash2, PlusCircle } from 'lucide-react';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/blogs', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch blogs');
            const data = await response.json();
            setBlogs(data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    const deleteBlog = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/blogs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Failed to delete blog');
            fetchBlogs();
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    const navigateToProfile = (authorType, authorProfileId) => {
        window.location.href = `/${authorType}s/${authorProfileId}`;
    };

    const navigateToNewBlog = () => {
        window.location.href = '/blogs/new';
    };

    const navigateToEditBlog = (blogId) => {
        window.location.href = `/blogs/${blogId}/edit`;
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
                    <button
                        onClick={navigateToNewBlog}
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                    >
                        <PlusCircle className="w-5 h-5 mr-2" />
                        Create New Blog
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((blog) => (
                        <div key={blog.blog_id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="p-6">
                                {/* Author Section */}
                                {blog.authorProfileId && (
                                    <button
                                        onClick={() => navigateToProfile(blog.authorType, blog.authorProfileId)}
                                        className="flex items-center space-x-3 mb-4 hover:opacity-80 transition-opacity w-full text-left"
                                    >
                                        {blog.authorProfilePicture ? (
                                            <img
                                                src={blog.authorProfilePicture}
                                                alt={blog.authorName}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                                <User className="w-6 h-6 text-gray-400" />
                                            </div>
                                        )}
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{blog.authorName}</p>
                                            <p className="text-xs text-gray-500 capitalize">{blog.authorType}</p>
                                        </div>
                                    </button>
                                )}

                                {/* Category Tag */}
                                <div className="flex items-center mb-4">
                                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full">
                                        {blog.category}
                                    </span>
                                </div>

                                {/* Blog Content */}
                                <h2 className="text-xl font-bold text-gray-900 mb-3">{blog.title}</h2>
                                <p className="text-gray-600 mb-6 line-clamp-3">{blog.content}</p>

                                {/* Action Buttons */}
                                <div className="flex justify-end space-x-3 pt-4 border-t">
                                    <button
                                        onClick={() => navigateToEditBlog(blog.blog_id)}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
                                    >
                                        <Edit2 className="w-4 h-4 mr-2" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (window.confirm('Are you sure you want to delete this blog?')) {
                                                deleteBlog(blog.blog_id);
                                            }
                                        }}
                                        className="inline-flex items-center px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600"
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
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