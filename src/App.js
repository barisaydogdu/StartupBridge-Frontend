import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
//react-router-dom: Uygulama için yönlendirme işlemleri yapılmasını sağlar.
//BrowserRouter: URL'leri temel alarak sayfa yönlendirme işlemi yapar
//Routes ve Route: Sayfaları ve onların yollarını tanımlar
// NAvigate: Kullanıcıyı başka bir yola yöneldnrimek için
import { Login } from './components/Auth'; //Login bileşenini içe aktarıyor
import { Register } from './components/Auth'; //Login bileşenini içe aktarıyor
import Dashboard from './components/Dashboard';
import HomePage from './components/HomePage';
import Projects from './components/Projects';
import Entrepreneur from "./components/Entrepreneur";
import Project from "./components/Projects";
import UserSettings from './components/UserSettings';
import EducationSettings from './components/EducationSettings';
import {Home} from "lucide-react";
import Investors from "./components/Investors";
import InterestsAndValues from './components/InterestsAndValues';
import ExperienceSettings from "./components/Experience"; //Dashboard bileşenini içe aktarıyor
import BlogList from "./components/BlogList";
import BlogForm from './components/BlogForm';
import InvestmentPortfolio from "./components/InvestmentPortfolio";
import BlogComments from "./components/BlogComments";
import RoleSelection     from "./components/RoleSelection";
import EntrepreneurList from "./components/EntrepreneurList";
import InvestorsList from "./components/InvestorsList";
import ProjectList from "./components/ProjectList";
import ProjectCreate from "./components/ProjectCreate";
import EntrepreneurSettings from "./components/EntrepreneurSettings";
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
                <Route path="/home" element={<HomePage/>} />
                <Route path="/register" element={<Register />} />
                <Route path="/projects" element={<Projects />} />
                {/* "/dashboard" yolu, korumalı bir rota. ProtectedRoute ile korunur */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard /> {/* ProtectedRoute içinde Dashboard bileşeni */}
                        </ProtectedRoute>
                    }
                />

                {/* Updated Entrepreneur routes */}
                <Route
                    path="/entrepreneurs/*"
                    element={
                        <ProtectedRoute>
                            <Entrepreneur />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/entrepreneurssettings/*"
                    element={
                        <ProtectedRoute>
                            <EntrepreneurSettings />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/entrepreneurslist/*"
                    element={
                        <ProtectedRoute>
                            <EntrepreneurList />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/projects/*"
                    element={
                        <ProtectedRoute>
                            <Project />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/projectslist/*"
                    element={
                        <ProtectedRoute>
                            <ProjectList />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/addproject/*"
                    element={
                        <ProtectedRoute>
                            <ProjectCreate />
                        </ProtectedRoute>
                    }
                />
                {/* Updated Entrepreneur routes */}
                <Route
                    path="/investors/*"
                    element={
                        <ProtectedRoute>
                            <Investors />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/investorslist/*"
                    element={
                        <ProtectedRoute>
                            <InvestorsList/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/education/*"
                    element={
                        <ProtectedRoute>
                            <EducationSettings/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/experience/*"
                    element={
                        <ProtectedRoute>
                            <ExperienceSettings/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/interestandvalues/*"
                    element={
                        <ProtectedRoute>
                            <InterestsAndValues />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/investmentportfolio/*"
                    element={
                        <ProtectedRoute>
                            <InvestmentPortfolio />
                        </ProtectedRoute>
                    }
                />

                {/* Blog routes */}
                <Route
                    path="/blogs"
                    element={
                        <ProtectedRoute>
                            <BlogList />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/blogs/new"
                    element={
                        <ProtectedRoute>
                            <BlogForm />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/blogs/:id/edit"
                    element={
                        <ProtectedRoute>
                            <BlogForm />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/comments"
                    element={
                        <ProtectedRoute>
                            <BlogComments/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/roleselection"
                    element={
                        <ProtectedRoute>
                            <RoleSelection/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/settings"
                    element={<UserSettings />}
                />
                />
                <Route path="/home" element={<HomePage />} />
                {/* "/" yolu, kullanıcı giriş yaptıysa "/dashboard"a, yapmadıysa "/login"e yönlendirilir */}
                <Route
                    path="/"
                    element={
                        localStorage.getItem('token')
                            ? <Navigate to="/home" replace /> // token varsa dashboarda yönlendir
                            : <Navigate to="/login" replace /> // token yoksa logine yönlendir
                    }
                />
            </Routes>
        </Router>
    );
};
//app bileşenini dışa aktararak diğer dosyalarda kullanılır hale getireiyoeruz
export default App;