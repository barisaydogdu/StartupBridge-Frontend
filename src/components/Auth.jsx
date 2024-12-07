import React, { useState } from 'react';
import { User, Lock, Mail } from 'lucide-react';

//Bu fonksiyon asenktron olarak çalışır ve sunucu yanıtına göre token gibi bilgileri localStrogeye kaydeder
//login ve register için gerekli verileri backend tarafıına gönderir
const handleAuth = async (endpoint, data) => {
    try {
        //Fetch API ile sunucuya bir post isteği gönderiyoruz
        const response = await fetch(`http://localhost:8080/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        // HTTP yanıtı 200-299 arasında değilse hata fırtlat
        if (!response.ok) {
            throw new Error('Authentication failed');
        }
        // sunucudan dönen JSON verisini parse et
        const result = await response.json();
        //eğer cevapta token varsa localStrogaye kaydet
        if (result.token) {
            localStorage.setItem('token', result.token);
            return result;  // token dahil tüm result verisini döndür
        }
        //Token gelmediyese hata fırlat
        throw new Error('No token received');
    } catch (err) {
        return { success: false, error: err.message };
    }
};
//Login bileşeni kullanıcı adı ve şifreyi alarak handleAuth fonksiyonunu login endpointi ile çağırır
//Eğer başarılı olursa dahsboard (şimdilik) sayfasına yönlendirir  başarısız olursa ekrana hata mesajı yazdıreır
export const Login = () => {
    const [username, setUsername] = useState(''); // Kullanıcının girdiği kullanıcı adı
    const [password, setPassword] = useState(''); // kullanıcının girdiği parola
    const [error, setError] = useState('');        // Hata mesajı
    const [isLoading, setIsLoading] = useState(false); // yüklenme durumu istek atıldığında true
    //form gönderildiğinde çalışır yani giriş yap butonuna yazdığımızda tetiklenir
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
    //Kullanıcı adı ve şifre her ikisi de girilmiş mi kontrol et
        if (username && password) {
            try {
                //handleAuth fonksiyonuna login bilgilerini gönder
                const result = await handleAuth('login', {
                    name: username,
                    password: password
                });
                // Eğer result bir token döndürdüyse localStroge'a kaydet ve dashboarda yönlendir -- dashboard şimdilik test için yönlendirilen bir sayfa değişecek
                if (result.token) {
                    localStorage.setItem('token', result.token);
                    window.location.replace('/dashboard');
                } else {
                    //Token gelmediyse hata mesajı göster
                    setError('Login failed!');
                }
            } catch (err) {
                console.error('Login error:', err);
                setError('Login failed. Please try again.');
            }
        } else {
            // Eğer kullanıcı adı veya şifre girilmemişsse uyar
            setError('Please enter both username and password');
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Welcome Back</h2>

                {error && (
                    <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Username"
                            required
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                            isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    >
                        {isLoading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role : "ROLE_ADMIN",
        createdAt: new Date().toISOString(),
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    //form alanlarındaki değişiklikleri takip eder
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    //form submit işlemi kullanıcı register butonuna bastığında tetiklenen fonskişyon
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);
        setError('');
        //handleAuth fonksiyonuna register isteği at
        const result = await handleAuth('register', {
            name: formData.username,
            email: formData.email,
            password: formData.password,
            role : formData.role,
            createdAt: formData.createdAt,
        });

        setIsLoading(false);
        //ba

        if (result.token) {
            localStorage.setItem('token', result.token);
            window.location.replace('/dashboard');
        } else {
            //Token gelmediyse hata mesajı göster
            setError('Sign up failed!');
        }
        //bu kod calismiyor ama kalsin simdilik ihtiyacimiz olur belki
       /* if (!result.success) {
            setError(result.error || 'Registration failed');
            return;
        } else {
            window.location.href = '/dashboard';
        }*/
    };
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Create Account</h2>

                {error && (
                    <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            name="username"
                            value={formData.name}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Username"
                            required
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Email"
                            required
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Password"
                            required
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Confirm Password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                            isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    >
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default { Login, Register };