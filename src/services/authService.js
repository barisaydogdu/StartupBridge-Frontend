import axios from '../utils/axios';

export const authService = {
    async login(username, password) {
        //login endpointine yani bizim backenddeki yazdığımız metoda bir post isteği gönderiyor
        const response = await axios.post('/login', { username, password });
        //eğer sunucudan bir token dönerse bu token localStrogaye kaydediliyor
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        //sunucudan dönen tüm veriler geriye döndürülüyor
         return response.data;
    },
    //register endpointine bir post isteği gönderiliyor
    async register(userData) {
        const response = await axios.post('/register', userData);
        if (response.data.token) {
            // Eğer sunucudan bir "token" dönerse, bu token localStorage'a kaydediliyor.
            localStorage.setItem('token', response.data.token);
        }
        //sunucudan dönen verileri geriye döndürüyor
        return response.data;
    },

    logout() {
        //çıkış yaparken de localStrogedeki token'ı siliyoruz
        localStorage.removeItem('token');
    }
};
