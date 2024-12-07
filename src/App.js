import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
//react-router-dom: Uygulama için yönlendirme işlemleri yapılmasını sağlar.
//BrowserRouter: URL'leri temel alarak sayfa yönlendirme işlemi yapar
//Routes ve Route: Sayfaları ve onların yollarını tanımlar
// NAvigate: Kullanıcıyı başka bir yola yöneldnrimek için
import { Login } from './components/Auth'; //Login bileşenini içe aktarıyor
import Dashboard from './components/Dashboard';
import HomePage from './components/HomePage';
import {Home} from "lucide-react"; //Dashboard bileşenini içe aktarıyor

// Koruma altına alınmış rota bileşeni
// buraya login olduktan sonra göstereceğimiz sayfaları ekliyicez
// asıl mantığı eğer localStrogeda token yoksa kullanıcıyı /login sayfasına yönlendiriyor
//token varsa içerii (children) render eder
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // LocalStorageden token alınır
    if (!token) {
        return <Navigate to="/login" replace />; // token yoksa login sayfasına yönlendiricek
    }
    return children; // token vaesa içeriği (childen) render al
};
// uygulamanın ana bileşeni
const App = () => {
    return (
        //uygulamadaki tüm yolları tanımlar
        <Router>
            <Routes>
                {/* "/login" yolu, Login bileşenini render eder */}
                <Route path="/login" element={<Login />} />
                {/* "/dashboard" yolu, korumalı bir rota. ProtectedRoute ile korunur */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard /> {/* ProtectedRoute içinde Dashboard bileşeni */}
                        </ProtectedRoute>
                    }
                />
                <Route path="/home" element={<HomePage />} />
                {/* "/" yolu, kullanıcı giriş yaptıysa "/dashboard"a, yapmadıysa "/login"e yönlendirilir */}
                <Route
                    path="/"
                    element={
                        localStorage.getItem('token')
                            ? <Navigate to="/dashboard" replace /> // token varsa dashboarda yönlendir
                            : <Navigate to="/login" replace /> // token yoksa logine yönlendir
                    }
                />
            </Routes>
        </Router>
    );
};
//app bileşenini dışa aktararak diğer dosyalarda kullanılır hale getireiyoeruz
export default App;