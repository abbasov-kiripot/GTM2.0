// src/hooks/useAuth.js
import { useContext, useState, useEffect, createContext } from 'react';

// Auth Context oluşturulması
const AuthContext = createContext();

// Auth Provider bileşeni
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Kullanıcı oturum durumu kontrolü - uygulama başlatıldığında çalışır
  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Stored user data parsing error:", e);
        localStorage.removeItem('authUser');
      }
    }
    setLoading(false);
  }, []);

  // Giriş fonksiyonu
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock API çağrısı - gerçek senaryoda backend API'ye istek yapılır
      // Bu mock yapı sadece frontend testi içindir
      if (email === 'admin@example.com' && password === 'admin123') {
        const userData = {
          id: '1',
          name: 'Admin User',
          email: email,
          role: 'admin',
          token: 'mock-jwt-token-admin'
        };
        
        setCurrentUser(userData);
        localStorage.setItem('authUser', JSON.stringify(userData));
        return { success: true, user: userData };
      } 
      else if (email === 'user@example.com' && password === 'user123') {
        const userData = {
          id: '2',
          name: 'Normal User',
          email: email,
          role: 'user',
          token: 'mock-jwt-token-user'
        };
        
        setCurrentUser(userData);
        localStorage.setItem('authUser', JSON.stringify(userData));
        return { success: true, user: userData };
      } 
      else {
        setError('E-posta veya şifre hatalı');
        return { success: false, error: 'E-posta veya şifre hatalı' };
      }
    } catch (err) {
      setError(err.message || 'Giriş yapılırken bir hata oluştu');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Çıkış fonksiyonu
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('authUser');
  };

  // Kayıt fonksiyonu
  // eslint-disable-next-line no-unused-vars
  const register = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock API çağrısı - gerçek senaryoda backend API'ye istek yapılır
      // Bu mock yapı sadece frontend testi içindir
      if (email === 'admin@example.com' || email === 'user@example.com') {
        setError('Bu e-posta adresi zaten kullanımda');
        return { success: false, error: 'Bu e-posta adresi zaten kullanımda' };
      }
      
      const userData = {
        id: Date.now().toString(),
        name: name,
        email: email,
        role: 'user',
        token: `mock-jwt-token-${Date.now()}`
      };
      
      setCurrentUser(userData);
      localStorage.setItem('authUser', JSON.stringify(userData));
      return { success: true, user: userData };
    } catch (err) {
      setError(err.message || 'Kayıt olurken bir hata oluştu');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Şifre sıfırlama fonksiyonu
  const resetPassword = async (email) => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock API çağrısı - gerçek senaryoda backend API'ye istek yapılır
      if (email === 'admin@example.com' || email === 'user@example.com') {
        return { success: true, message: 'Şifre sıfırlama talimatları e-posta adresinize gönderildi' };
      } else {
        setError('Bu e-posta adresiyle kayıtlı bir kullanıcı bulunamadı');
        return { 
          success: false, 
          error: 'Bu e-posta adresiyle kayıtlı bir kullanıcı bulunamadı'
        };
      }
    } catch (err) {
      setError(err.message || 'Şifre sıfırlama işlemi sırasında bir hata oluştu');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Kullanıcı profil güncelleme fonksiyonu
  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!currentUser) {
        setError('Kullanıcı oturumu bulunamadı');
        return { success: false, error: 'Kullanıcı oturumu bulunamadı' };
      }
      
      // Mevcut kullanıcı verilerini güncelle
      const updatedUser = {
        ...currentUser,
        ...userData,
        // ID ve rol değiştirilemez
        id: currentUser.id,
        role: currentUser.role,
        token: currentUser.token
      };
      
      setCurrentUser(updatedUser);
      localStorage.setItem('authUser', JSON.stringify(updatedUser));
      return { success: true, user: updatedUser };
    } catch (err) {
      setError(err.message || 'Profil güncellenirken bir hata oluştu');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Kullanıcı silme fonksiyonu
  const deleteAccount = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!currentUser) {
        setError('Kullanıcı oturumu bulunamadı');
        return { success: false, error: 'Kullanıcı oturumu bulunamadı' };
      }
      
      // Kullanıcı verilerini temizle
      setCurrentUser(null);
      localStorage.removeItem('authUser');
      return { success: true, message: 'Hesap başarıyla silindi' };
    } catch (err) {
      setError(err.message || 'Hesap silinirken bir hata oluştu');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Auth durumu ve fonksiyonlarını içeren value objesi
  const value = {
    currentUser,
    loading,
    error,
    isAuthenticated: !!currentUser,
    isAdmin: currentUser?.role === 'admin',
    login,
    logout,
    register,
    resetPassword,
    updateProfile,
    deleteAccount
  };

  // Context Provider ile değerleri sağla
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// useAuth hook'u
export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export default useAuth;