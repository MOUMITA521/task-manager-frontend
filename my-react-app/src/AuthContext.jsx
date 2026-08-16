import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const API_URL = 'https://task-manager-backend-6yiw.onrender.com/auth';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const signup = async (email, password) => {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Signup failed");
    }

    return response.json();
  };

  const login = async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Login failed");
    }

    const data = await response.json();
    setToken(data.token);
    localStorage.setItem('token', data.token); // token ko save karo
    return data;
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}