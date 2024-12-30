import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// react-router-dom: Uygulama için yönlendirme işlemleri yapılmasını sağlar.
// BrowserRouter: URL'leri temel alarak sayfa yönlendirme işlemi yapar.
// Routes ve Route: Sayfaları ve onların yollarını tanımlar.
// Navigate: Kullanıcıyı başka bir yola yönlendirmek için kullanılır.

import { Login } from './components/Auth'; // Login bileşenini içe aktarıyor.
import { Register } from './components/Auth'; // Register bileşenini içe aktarıyor.
import Dashboard from './components/Dashboard'; // Dashboard bileşenini içe aktarıyor.
import HomePage from './components/HomePage'; // HomePage bileşenini içe aktarıyor.
import Projects from './components/Projects'; // Projects bileşenini içe aktarıyor.
import Entrepreneur from "./components/Entrepreneur"; // Entrepreneur bileşenini içe aktarıyor.
import BlogList from './components/BlogList'; // BlogList bileşenini içe aktarıyor.
import BlogForm from './components/BlogForm'; // BlogForm bileşenini içe aktarıyor.
import ProjectDetail from './components/ProjectDetail'; // ProjectDetail bileşenini içe aktarıyor.
import { Home } from "lucide-react"; // Lucide React kütüphanesinden Home bileşenini içe aktarıyor.
import ExploreProjects from './components/ExploreProjects';

// Koruma altına alınmış rota bileşeni.
// Bu bileşen, login olduktan sonra erişilebilecek sayfaları belirler.
// Asıl mantığı, eğer localStorage'da token yoksa kullanıcıyı "/login" sayfasına yönlendirmektir.
// Token varsa içeriği (children) render eder.
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // LocalStorage'dan token alınır.
    if (!token) {
        return <Navigate to="/login" replace />; // Token yoksa kullanıcıyı login sayfasına yönlendirir.
    }
    return children; // Token varsa içerik render edilir.
};

// Uygulamanın ana bileşeni.
const App = () => {
    return (
        // Uygulamadaki tüm yolları tanımlar.
        <Router>
            <Routes>
                {/* "/login" yolu, Login bileşenini render eder. */}
                <Route path="/login" element={<Login />} />
                {/* "/home" yolu, Home bileşenini render eder. */}
                <Route path="/home" element={<Home />} />
                {/* "/register" yolu, Register bileşenini render eder. */}
                <Route path="/register" element={<Register />} />
                {/* "/projects" yolu, Projects bileşenini render eder. */}
                <Route path="/projects" element={<Projects />} />
                {/* "/projects/:id" yolu, belirli bir projenin detaylarını gösteren ProjectDetail bileşenini render eder. */}
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/explore" element={<ExploreProjects />} />

                {/* "/dashboard" yolu, korumalı bir rota. ProtectedRoute ile korunur. */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard /> {/* ProtectedRoute içinde Dashboard bileşeni render edilir. */}
                        </ProtectedRoute>
                    }
                />

                {/* "/entrepreneurs/*" yolu, korumalı bir rota. ProtectedRoute ile korunur. */}
                <Route
                    path="/entrepreneurs/*"
                    element={
                        <ProtectedRoute>
                            <Entrepreneur />
                        </ProtectedRoute>
                    }
                />

                {/* Blog ile ilgili rotalar. */}
                {/* "/blogs" yolu, BlogList bileşenini render eder. */}
                <Route
                    path="/blogs"
                    element={
                        <ProtectedRoute>
                            <BlogList />
                        </ProtectedRoute>
                    }
                />
                {/* "/blogs/new" yolu, yeni bir blog oluşturmak için BlogForm bileşenini render eder. */}
                <Route
                    path="/blogs/new"
                    element={
                        <ProtectedRoute>
                            <BlogForm />
                        </ProtectedRoute>
                    }
                />
                {/* "/blogs/:id/edit" yolu, mevcut bir blogu düzenlemek için BlogForm bileşenini render eder. */}
                <Route
                    path="/blogs/:id/edit"
                    element={
                        <ProtectedRoute>
                            <BlogForm />
                        </ProtectedRoute>
                    }
                />

                {/* "/home" yolu, HomePage bileşenini render eder. */}
                <Route path="/home" element={<HomePage />} />

                {/* "/" yolu, kullanıcı giriş yaptıysa "/dashboard"a, yapmadıysa "/login"e yönlendirilir. */}
                <Route
                    path="/"
                    element={
                        localStorage.getItem('token')
                            ? <Navigate to="/dashboard" replace /> // Token varsa dashboard'a yönlendirir.
                            : <Navigate to="/login" replace /> // Token yoksa login sayfasına yönlendirir.
                    }
                />
            </Routes>

            {/* Ek rotalar. */}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/homepage" element={<HomePage />} />
            </Routes>
        </Router>
    );
};

// App bileşenini dışa aktararak diğer dosyalarda kullanılabilir hale getirir.
export default App;