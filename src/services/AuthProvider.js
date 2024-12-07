import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

//bir context oluşturulur bu context sayesinde token ve token'ı güncelleyen fonksiyon
//herhangi bir bileşen tarafından kolayca kullanılabilir
//Authentication bilgilerini saklayacak bir global context oluşturur.

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // localStrorafeden token'ı alarak başlatılır
    const [token, setToken_] = useState(localStorage.getItem("token"));

    // Token'i güncelleyen fonksiyon
    const setToken = (newToken) => {
        setToken_(newToken);
    };

    // Token değiştiğinde Axios header'ını ve LocalStorage'ı güncelle
    useEffect(() => {
        if (token) {
            //eğer token varsa
            //Axios'un global header'ına Authorization başlığı eklenir
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            //Token localStorage'ye kaydedilir sayfa yenilense bile saklanır
            localStorage.setItem("token", token); // Token'i sakla
        } else {
            //Eğer token yoksa
            //Axios'un Authorization başlığı temizlenir
            delete axios.defaults.headers.common["Authorization"];
            // token localStorageden temizlenir
            localStorage.removeItem("token");
        }
    }, [token]);

    // Auth context değerini memoize et
    const contextValue = useMemo(
        () => ({
            token, //mevcut token
            setToken, // tokenı güncellemek için fonksiyon
        }),
        [token] // sadece token değiştiğinde bu değer yeniden hesaplanır
    );

    // AuthContext.Provider: Uygulamadaki bileşenlere context değerini sağlar.
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// Context değerini kolayca kullanmayı sağlayan bir Hook tanımlanıyor.
export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;
