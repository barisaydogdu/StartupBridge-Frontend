import React, { useState, useEffect } from 'react';
import {
    Send,
    User,
    Edit2,
    Trash2,
    Clock,
    MessageSquare
} from 'lucide-react';

const BlogComments = ({ blogId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');
    const [currentUserId, setCurrentUserId] = useState(null);
    const [userProfiles, setUserProfiles] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setCurrentUserId(payload.id);
        }
        fetchComments();
    }, [blogId]);

    const fetchUserProfile = async (userId) => {
        if (userProfiles[userId]) return userProfiles[userId];

        try {
            const entrepreneurResponse = await fetch(`http://localhost:8080/entrepreneurs`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const entrepreneurs = await entrepreneurResponse.json();
            const entrepreneur = entrepreneurs.find(e => e.userId === userId);

            if (entrepreneur) {
                const profile = {
                    type: 'entrepreneur',
                    id: entrepreneur.entrepreneurId,
                    name: `${entrepreneur.firstName} ${entrepreneur.lastName}`,
                    profilePicture: entrepreneur.profilePicture
                };
                setUserProfiles(prev => ({ ...prev, [userId]: profile }));
                return profile;
            }

            const investorResponse = await fetch(`http://localhost:8080/investors`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const investors = await investorResponse.json();
            const investor = investors.find(i => i.userId === userId);

            if (investor) {
                const profile = {
                    type: 'investor',
                    id: investor.investor_id,
                    name: `${investor.first_name} ${investor.last_name}`,
                    profilePicture: investor.profile_picture
                };
                setUserProfiles(prev => ({ ...prev, [userId]: profile }));
                return profile;
            }

            return null;
        } catch (error) {
            console.error('Error fetching user profile:', error);
            return null;
        }
    };

    const fetchComments = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/comments', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Failed to fetch comments');

            const allComments = await response.json();
            const blogComments = allComments.filter(comment => comment.blogId === blogId);

            for (const comment of blogComments) {
                if (comment.userId) {
                    await fetchUserProfile(comment.userId);
                }
            }

            setComments(blogComments);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const navigateToProfile = (type, id) => {
        window.location.href = `/${type}s/${id}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    blogId: blogId,
                    commentText: newComment.trim()
                })
            });

            if (!response.ok) throw new Error('Failed to add comment');

            setNewComment('');
            await fetchComments();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEdit = async (commentId) => {
        if (!editText.trim()) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/comments/${commentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    commentText: editText.trim()
                })
            });

            if (!response.ok) throw new Error('Failed to update comment');

            setEditingId(null);
            setEditText('');
            await fetchComments();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (commentId) => {
        if (!window.confirm('Are you sure you want to delete this comment?')) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Failed to delete comment');
            await fetchComments();
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8 text-blue-600">
                <span className="text-lg">Loading comments...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-600">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                        Comments ({comments.length})
                    </h3>
                </div>

                <form onSubmit={handleSubmit} className="mb-8">
                    <div className="flex items-start gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Join the discussion..."
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                            <button
                                type="submit"
                                className="mt-2 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Send className="w-4 h-4 mr-2" />
                                Post Comment
                            </button>
                        </div>
                    </div>
                </form>

                <div className="space-y-6">
                    {comments.length === 0 ? (
                        <div className="text-center py-8">
                            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
                        </div>
                    ) : (
                        comments.map((comment) => {
                            const userProfile = userProfiles[comment.userId];
                            return (
                                <div key={comment.commentId} className="group">
                                    <div className="flex items-start gap-4">
                                        <button
                                            onClick={() => userProfile && navigateToProfile(userProfile.type, userProfile.id)}
                                            className="flex-shrink-0"
                                        >
                                            {userProfile?.profilePicture ? (
                                                <img
                                                    src={userProfile.profilePicture}
                                                    alt={userProfile.name}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <User className="w-6 h-6 text-blue-600" />
                                                </div>
                                            )}
                                        </button>

                                        <div className="flex-1 bg-gray-50 rounded-lg p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <button
                                                        onClick={() => userProfile && navigateToProfile(userProfile.type, userProfile.id)}
                                                        className="font-medium text-gray-900 hover:text-blue-600"
                                                    >
                                                        {userProfile?.name || 'Unknown User'}
                                                    </button>
                                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                                        <span className="capitalize">{userProfile?.type || 'User'}</span>
                                                        <span>•</span>
                                                        <span className="flex items-center">
                                                            <Clock className="w-3 h-3 mr-1" />
                                                            {new Date(comment.createdAt).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>

                                                {currentUserId === comment.userId && (
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => {
                                                                setEditingId(comment.commentId);
                                                                setEditText(comment.commentText);
                                                            }}
                                                            className="p-1 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(comment.commentId)}
                                                            className="p-1 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                            {editingId === comment.commentId ? (
                                                <div className="mt-2 space-y-2">
                                                    <input
                                                        type="text"
                                                        value={editText}
                                                        onChange={(e) => setEditText(e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleEdit(comment.commentId)}
                                                            className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setEditingId(null);
                                                                setEditText('');
                                                            }}
                                                            className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p className="text-gray-700 leading-relaxed">{comment.commentText}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogComments;