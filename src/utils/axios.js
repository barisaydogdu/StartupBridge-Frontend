import axios from 'axios';

// axios ile bir instance (örnek) oluşturuyoruz bu sayede her istek için tekrardan baseURL
//ayarlamak zorunda kalmadan aynı ayarlarla istek atabiliriz
const instance = axios.create({
    //Tüm isteklerin başına bu URL'yi koyuyoruz
    //Örneğin http://localhost:8080/project ya da http://localhost:8080/login gibi
    baseURL: 'http://localhost:8080', // burası bizim backend sunucumuzun URL'si
});
// bu fonksiyon herhangi bir istek atılmadan önce çalşıyor Get post vs
// burada eğer localStorage'da bir token varsa bu token'ı Authorization başlığına ekleyerek her isteği kimilik doğrulamalı hale getiriyor
instance.interceptors.request.use(
    (config) => {
        //localStrogeden token bilgisini al
        const token = localStorage.getItem('token');
        //eğer token varsa istek headers'ına Authorization  başlığını ekle
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        // Değiştirilen config'i geri döndür (istek bu ayarlarla sunucuya gidecek)
        return config;
    },
    // İstek ayarlanırken bir hata oluşursa, bu hatayı reddet.
    (error) => {
        return Promise.reject(error);
    }
);
//bu oluşturduğumuz instanceyi projenin diğer kısımlarıda kullanabilmek için dışa aktarıyoruz
// artık import edildiği yerde direkt olarak instance.get('/endpoint') şeklinde kullanabişliriz
export default instance;
