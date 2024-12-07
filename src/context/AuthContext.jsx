import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Here you could add logic to validate the token with your backend
            setUser({ token });
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        const response = await authService.login(username, password);
        setUser({ token: response.token });
        return response;
    };

    const register = async (userData) => {
        const response = await authService.register(userData);
        setUser({ token: response.token });
        return response;
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    if (loading) {
        return null; // or a loading spinner
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);