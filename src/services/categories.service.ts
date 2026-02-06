import api from './api';
import type { Category, CreateCategoryDto, UpdateCategoryDto } from '../types/category.types';

export const categoriesService = {
    getAll: async () => {
        const response = await api.get<Category[]>('/categories');
        return response.data;
    },
    getOne: async (id: string) => {
        const response = await api.get<Category>(`/categories/${id}`);
        return response.data;
    },
    create: async (data: CreateCategoryDto) => {
        const response = await api.post<Category>('/categories', data);
        return response.data;
    },
    update: async (id: string, data: UpdateCategoryDto) => {
        const response = await api.put<Category>(`/categories/${id}`, data);
        return response.data;
    },
    delete: async (id: string) => {
        const response = await api.delete<Category>(`/categories/${id}`);
        return response.data;
    }
};
