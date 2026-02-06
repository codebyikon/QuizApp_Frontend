import api from './api';
import type { LoginDto, RegisterDto } from '../types/auth.types'; // We will define these types

export const authService = {
    login: async (credentials: LoginDto) => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },
    register: async (data: RegisterDto) => {
        const response = await api.post('/auth/register', data);
        return response.data;
    },
    getProfile: async () => {
        const response = await api.get('/auth/profile');
        return response.data;
    },
};
