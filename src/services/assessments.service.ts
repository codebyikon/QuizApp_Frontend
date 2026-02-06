import api from './api';
import type { Assessment, CreateAssessmentDto, UpdateAssessmentDto } from '../types/assessment.types';

export const assessmentsService = {
    getAll: async (categoryId?: string) => {
        const url = categoryId ? `/assessments?categoryId=${categoryId}` : '/assessments';
        const response = await api.get<Assessment[]>(url);
        return response.data;
    },
    getOne: async (id: string) => {
        const response = await api.get<Assessment>(`/assessments/${id}`);
        return response.data;
    },
    create: async (data: CreateAssessmentDto) => {
        const response = await api.post<Assessment>('/assessments', data);
        return response.data;
    },
    update: async (id: string, data: UpdateAssessmentDto) => {
        const response = await api.put<Assessment>(`/assessments/${id}`, data);
        return response.data;
    },
    delete: async (id: string) => {
        const response = await api.delete<Assessment>(`/assessments/${id}`);
        return response.data;
    }
};
