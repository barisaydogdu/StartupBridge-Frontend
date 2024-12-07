import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

// Auth Context oluştur
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // JWT token için state
    const [token, setToken_] = useState(localStorage.getItem("token"));

    // Token'i güncelleyen fonksiyon
    const setToken = (newToken) => {
        setToken_(newToken);
    };

    // Token değiştiğinde Axios header'ını ve LocalStorage'ı güncelle
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            localStorage.setItem("token", token); // Token'i sakla
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("token"); // Token'i temizle
        }
    }, [token]);

    // Auth context değerini memoize et
    const contextValue = useMemo(
        () => ({
            token,
            setToken,
        }),
        [token]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// Context'i kullanan Hook
export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;
