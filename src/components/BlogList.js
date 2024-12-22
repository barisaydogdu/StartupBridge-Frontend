import React, { useState, useEffect } from 'react';
import {
    User,
    Edit2,
    Trash2,
    PlusCircle,
    MessageCircle,
    Heart,
    Share2,
    BookmarkPlus,
    Calendar,
    ChevronDown,
    TrendingUp,
    Clock
} from 'lucide-react';
import BlogComments from './BlogComments';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [expandedBlog, setExpandedBlog] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const [likes, setLikes] = useState({});

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
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
        } finally {
            setLoading(false);
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

    const toggleComments = (blogId) => {
        setExpandedBlog(expandedBlog === blogId ? null : blogId);
    };

    const handleLike = (blogId) => {
        setLikes(prev => ({
            ...prev,
            [blogId]: !prev[blogId]
        }));
    };

    const categories = ['Technology', 'Business', 'Design', 'Marketing', 'Development'];

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-pulse space-y-4">
                    <div className="h-12 w-48 bg-gray-200 rounded"></div>
                    <div className="h-64 w-96 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">Discover Amazing Stories</h1>
                        <p className="text-xl text-blue-100 mb-8">Join our community of writers and readers</p>
                        <button
                            onClick={navigateToNewBlog}
                            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                        >
                            <PlusCircle className="w-5 h-5 mr-2" />
                            Share Your Story
                        </button>
                    </div>
                </div>
            </div>

            {/* Category Filter */}
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center space-x-8 py-4 overflow-x-auto scrollbar-hide">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                selectedCategory === 'all'
                                    ? 'bg-blue-100 text-blue-600'
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            <TrendingUp className="w-4 h-4 mr-2" />
                            All Posts
                        </button>
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                    selectedCategory === category
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Blog Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <div key={blog.blog_id} className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                            {/* Blog Cover Image (placeholder) */}
                            <div className="h-48 bg-gradient-to-br from-blue-400 to-indigo-500 relative overflow-hidden">
                                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                                <div className="absolute bottom-4 left-4 right-4">
                  <span className="px-3 py-1 bg-white bg-opacity-90 text-blue-600 text-sm font-medium rounded-full">
                    {blog.category}
                  </span>
                                </div>
                            </div>

                            <div className="p-6">
                                {/* Author Section */}
                                <div className="flex items-center justify-between mb-4">
                                    <button
                                        onClick={() => navigateToProfile(blog.authorType, blog.authorProfileId)}
                                        className="flex items-center space-x-3 group"
                                    >
                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                                            {blog.authorProfilePicture ? (
                                                <img
                                                    src={blog.authorProfilePicture}
                                                    alt={blog.authorName}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <User className="w-6 h-6 text-gray-400" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                                                {blog.authorName}
                                            </p>
                                            <div className="flex items-center text-xs text-gray-500">
                                                <Clock className="w-3 h-3 mr-1" />
                                                {new Date(blog.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </button>
                                </div>

                                {/* Blog Content */}
                                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                    {blog.title}
                                </h2>
                                <p className="text-gray-600 mb-6 line-clamp-3">{blog.content}</p>

                                {/* Action Bar */}
                                <div className="flex items-center justify-between pt-4 border-t">
                                    <div className="flex items-center space-x-4">
                                        <button
                                            onClick={() => handleLike(blog.blog_id)}
                                            className={`flex items-center space-x-1 ${
                                                likes[blog.blog_id] ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                                            }`}
                                        >
                                            <Heart className="w-5 h-5" fill={likes[blog.blog_id] ? "currentColor" : "none"} />
                                            <span className="text-sm">123</span>
                                        </button>
                                        <button
                                            onClick={() => toggleComments(blog.blog_id)}
                                            className="flex items-center space-x-1 text-gray-500 hover:text-blue-600"
                                        >
                                            <MessageCircle className="w-5 h-5" />
                                            <span className="text-sm">46</span>
                                        </button>
                                        <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                                            <Share2 className="w-5 h-5" />
                                        </button>
                                        <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                                            <BookmarkPlus className="w-5 h-5" />
                                        </button>
                                    </div>

                                    {/* Admin Actions */}
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => navigateToEditBlog(blog.blog_id)}
                                            className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (window.confirm('Are you sure you want to delete this blog?')) {
                                                    deleteBlog(blog.blog_id);
                                                }
                                            }}
                                            className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Comments Section */}
                                {expandedBlog === blog.blog_id && (
                                    <div className="mt-6 pt-6 border-t">
                                        <BlogComments blogId={blog.blog_id} />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogList;