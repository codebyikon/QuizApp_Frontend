import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, LoginDto, RegisterDto } from '../types/auth.types';
import { authService } from '../services/auth.service';

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (credentials: LoginDto) => Promise<User>;
    register: (data: RegisterDto) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const initAuth = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                try {
                    const userData = await authService.getProfile();
                    // The profile endpoint returns the user object directly based on your controller
                    // But your auth service might be returning checks.
                    // Let's assume getProfile returns the user object.
                    // However, we need to be careful if the token is invalid.
                    setUser(userData);
                } catch (error) {
                    console.error("Failed to fetch profile", error);
                    logout();
                }
            }
            setIsLoading(false);
        };

        initAuth();
    }, []);

    const login = async (credentials: LoginDto) => {
        const data = await authService.login(credentials);
        setToken(data.access_token);
        setUser(data.user);
        localStorage.setItem('token', data.access_token);
        return data.user;
    };

    const register = async (data: RegisterDto) => {
        await authService.register(data);
        // Automatically login after register? Or redirect to login?
        // For now, let's just allow registration and let the component handle redirection
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            login,
            register,
            logout,
            isLoading,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
