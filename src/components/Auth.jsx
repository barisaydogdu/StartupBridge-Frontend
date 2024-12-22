import React, { useState } from 'react';
//import { User, Lock, Mail } from 'lucide-react';
import { User, Lock, Mail, Sparkles, ChevronRight, LogIn } from 'lucide-react';


//maybe we can use
const WaveBackground = () => (
    <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute top-0 left-0 w-full h-48 transform rotate-180" preserveAspectRatio="none" viewBox="0 0 1440 320">
            <path fill="#F27649" fillOpacity="0.05" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-white/40"></div>
    </div>
);

const FloatingShapes = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-[#F27649]/5 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 rounded-full bg-[#0D1F2D]/5 animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 rounded-full bg-[#F27649]/5 animate-float"></div>
    </div>
);
const AuthCard = ({ children, title, subtitle, icon: Icon }) => (
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md relative z-10 backdrop-blur-sm bg-white/90">
        <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#F27649]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 transform transition-transform hover:scale-105">
                <Icon className="w-8 h-8 text-[#F27649]" />
            </div>
            <h2 className="text-3xl font-bold text-[#0D1F2D] font-montserrat">{title}</h2>
            <p className="text-gray-600 mt-2">{subtitle}</p>
        </div>
        {children}
    </div>
);
const InputGroup = ({ icon: Icon, ...props }) => (
    <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {/* Icon container with modern effects */}
            <div className="p-1 rounded-full transition-all duration-300 relative group-hover:bg-[#F27649]/5 group-focus-within:bg-[#F27649]/10">
                <Icon className="h-5 w-5 text-gray-400 group-focus-within:text-[#F27649] group-hover:text-gray-500 transition-all duration-300 transform group-focus-within:scale-110" />
                {/* Animated glow effect on focus */}
                <div className="absolute inset-0 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 bg-[#F27649]/5 blur-sm"></div>
            </div>
        </div>
        <input
            {...props}
            className="block w-full pl-12 pr-3 py-3.5 border border-gray-200 rounded-xl text-gray-700 bg-white/50 backdrop-blur-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F27649] focus:border-transparent transition-all duration-200 hover:border-[#F27649]/30"
        />
    </div>
);
const SubmitButton = ({ isLoading, children }) => (
    <button
        type="submit"
        disabled={isLoading}
        className={`w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white transition-all duration-200 ${
            isLoading
                ? 'bg-[#F27649]/70 cursor-not-allowed'
                : 'bg-[#F27649] hover:bg-[#E56539] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F27649]`}
    >
        {isLoading ? (
            <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
            </span>
        ) : (
            <span className="flex items-center">
                {children}
                <ChevronRight className="ml-2 w-5 h-5" />
            </span>
        )}
    </button>
);

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
                   // window.location.replace('/dashboard');
                    window.location.replace('/roleselection');
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
        <div
            className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4 relative">
            {/* Updated WaveBackground with blue colors */}
            <div className="absolute inset-0 overflow-hidden">
                <svg className="absolute top-0 left-0 w-full h-48 transform rotate-180" preserveAspectRatio="none"
                     viewBox="0 0 1440 320">
                    <path fill="rgb(59 130 246 / 0.05)"
                          d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>

            {/* Updated FloatingShapes with blue colors */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-blue-500/5 animate-float"></div>
                <div
                    className="absolute top-40 right-20 w-16 h-16 rounded-full bg-blue-600/5 animate-float-delayed"></div>
                <div className="absolute bottom-20 left-1/4 w-24 h-24 rounded-full bg-blue-400/5 animate-float"></div>
            </div>

            {/* Updated AuthCard with blue theme */}
            <div
                className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md relative z-10 backdrop-blur-sm border border-blue-100">
                <div className="text-center mb-8">
                    <div
                        className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 transform transition-transform hover:scale-105">
                        <LogIn className="w-8 h-8 text-blue-600"/>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 font-montserrat">Welcome Back</h2>
                    <p className="text-gray-600 mt-2">Sign in to your account</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center">
                        <Sparkles className="w-5 h-5 mr-2 flex-shrink-0"/>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Updated InputGroup styles */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <div
                                className="p-1 rounded-full transition-all duration-300 group-focus-within:bg-blue-100">
                                <Mail
                                    className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200"/>
                            </div>
                        </div>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="block w-full pl-12 pr-4 py-3.5 text-gray-700 border border-gray-200 rounded-xl
                                 bg-white/50 placeholder-gray-400 transition-all duration-200
                                 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                                 hover:border-blue-300"
                            placeholder="Email Address"
                            required
                        />
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <div
                                className="p-1 rounded-full transition-all duration-300 group-focus-within:bg-blue-100">
                                <Lock
                                    className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200"/>
                            </div>
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full pl-12 pr-4 py-3.5 text-gray-700 border border-gray-200 rounded-xl
                                 bg-white/50 placeholder-gray-400 transition-all duration-200
                                 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                                 hover:border-blue-300"
                            placeholder="Password"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember-me"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                                Remember me
                            </label>
                        </div>
                        <a href="/forgot-password"
                           className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                            Forgot Password?
                        </a>
                    </div>

                    {/* Updated button style */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full flex items-center justify-center py-3.5 px-4 rounded-xl text-white font-medium 
                             transition-all duration-200 
                             ${isLoading
                            ? 'bg-blue-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 transform hover:scale-[1.02] active:scale-[0.98]'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    >
                        {isLoading ? (
                            <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        strokeWidth="4"/>
                                <path className="opacity-75" fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                            </svg>
                            Signing in...
                        </span>
                        ) : (
                            <span className="flex items-center">
                            Sign In
                            <ChevronRight className="ml-2 w-5 h-5"/>
                        </span>
                        )}
                    </button>

                    <div className="text-center mt-6">
                        <span className="text-gray-600">Don't have an account? </span>
                        <a href="/register" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                            Create Account
                        </a>
                    </div>
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-6">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-100/50 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-200/50 blur-3xl"></div>
            </div>

            {/* Main container */}
            <div className="w-full max-w-md relative">
                <div className="bg-white p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-blue-100">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 transform transition-transform hover:scale-105">
                            <User className="w-8 h-8 text-blue-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
                        <p className="text-gray-600">Join our community today</p>
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center animate-shake">
                            <div className="p-1 bg-red-100 rounded-full mr-3">
                                <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Username input */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <div className="p-1 rounded-full transition-all duration-300 group-focus-within:bg-blue-100">
                                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200" />
                                </div>
                            </div>
                            <input
                                type="text"
                                name="username"
                                value={formData.name}
                                onChange={handleChange}
                                className="block w-full pl-12 pr-4 py-3.5 text-gray-700 border border-gray-200 rounded-xl
                                         bg-white/50 placeholder-gray-400 transition-all duration-200
                                         focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                                         hover:border-blue-300"
                                placeholder="Username"
                                required
                            />
                        </div>

                        {/* Email input */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <div className="p-1 rounded-full transition-all duration-300 group-focus-within:bg-blue-100">
                                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200" />
                                </div>
                            </div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="block w-full pl-12 pr-4 py-3.5 text-gray-700 border border-gray-200 rounded-xl
                                         bg-white/50 placeholder-gray-400 transition-all duration-200
                                         focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                                         hover:border-blue-300"
                                placeholder="Email"
                                required
                            />
                        </div>

                        {/* Password input */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <div className="p-1 rounded-full transition-all duration-300 group-focus-within:bg-blue-100">
                                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200" />
                                </div>
                            </div>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="block w-full pl-12 pr-4 py-3.5 text-gray-700 border border-gray-200 rounded-xl
                                         bg-white/50 placeholder-gray-400 transition-all duration-200
                                         focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                                         hover:border-blue-300"
                                placeholder="Password"
                                required
                            />
                        </div>

                        {/* Confirm Password input */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <div className="p-1 rounded-full transition-all duration-300 group-focus-within:bg-blue-100">
                                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200" />
                                </div>
                            </div>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="block w-full pl-12 pr-4 py-3.5 text-gray-700 border border-gray-200 rounded-xl
                                         bg-white/50 placeholder-gray-400 transition-all duration-200
                                         focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                                         hover:border-blue-300"
                                placeholder="Confirm Password"
                                required
                            />
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full flex items-center justify-center py-3.5 px-4 rounded-xl text-white 
                                     font-medium transition-all duration-200 
                                     ${isLoading
                                ? 'bg-blue-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 transform hover:scale-[1.02] active:scale-[0.98]'
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                        >
                            {isLoading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                    </svg>
                                    Creating Account...
                                </span>
                            ) : (
                                'Create Account'
                            )}
                        </button>

                        {/* Login link */}
                        <div className="text-center mt-6">
                            <span className="text-gray-600">Already have an account? </span>
                            <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                                Sign In
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default { Login, Register };