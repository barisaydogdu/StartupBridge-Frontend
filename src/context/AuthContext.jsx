//React Context apisinin bir parçası ve oturtum bilgilierini saklamak ve paylaşmak için context oluşturur --context'in ne olduğunu okuyup daha iyi kavrayabiliriz
import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';


//----------------------Context'în kullanım amacı-----------------------------------------------------
   /*Uygulamanızda kullanıcıyla ilgili bilgileri (user) merkezi bir yerde saklar.
    login, register ve logout gibi işlemleri de aynı yerden yönetir.
    Kullanıcı oturum bilgisi (örneğin token) her bileşende ayrı ayrı tutulmak yerine tek bir yerde saklanır.*/
//-----------------------------------------------------------------------------------------------------
//kullanıcı oturum bilgilerini paylaşmak için bir context oluşturur
//bu sayede tüm uygulama context sayesinde bilgilere erişebilir
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // kullanıcı bilgileri
    const [loading, setLoading] = useState(true); // yükleme durumu başlangıçta true olarak set ettik

    useEffect(() => {
        const token = localStorage.getItem('token'); //localStorageden token al
        if (token) {
            // Here you could add logic to validate the token with your backend
            setUser({ token }); //token varsa kullanıcı bilgisi güncellenir
        }
        setLoading(false); //yükleme durumu tamamlandığında loadingi false yaptık
    }, []);

    const login = async (username, password) => {
        const response = await authService.login(username, password); // authServiceden login isteği
        setUser({ token: response.token }); // kullanıcı bilgisi güncellenir
        return response;
    };

    const register = async (userData) => {
        const response = await authService.register(userData); // authService'den register isteği
        setUser({ token: response.token });  // Kullanıcı bilgisi güncellenir.
        return response; // yanıt döndürür
    };

    const logout = () => {
        authService.logout();  // authService üzerinden localStorage'daki token'i temizle
        setUser(null); // kullanıcı bilgisi sıfırlanır çıkış yapılır
    };

    if (loading) {
        return null; // buraya bir spinner ekleyebiliriz
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);