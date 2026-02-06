import api from './api';
import type { Submission, SubmitAssessmentDto } from '../types/submission.types';

export const submissionsService = {
    submit: async (data: SubmitAssessmentDto) => {
        const response = await api.post<Submission>('/submissions/submit', data);
        return response.data;
    },
    getMySubmissions: async () => {
        const response = await api.get<Submission[]>('/submissions/me');
        return response.data;
    },
    getMySubmission: async (id: string) => {
        const response = await api.get<Submission>(`/submissions/me/${id}`);
        return response.data;
    },
    getAllSubmissions: async (filters?: { studentId?: string; assessmentId?: string }) => {
        const params = new URLSearchParams();
        if (filters?.studentId) params.append('studentId', filters.studentId);
        if (filters?.assessmentId) params.append('assessmentId', filters.assessmentId);

        const response = await api.get<Submission[]>(`/submissions/admin?${params.toString()}`);
        return response.data;
    },
    getStudentSubmissions: async (studentId: string) => {
        const response = await api.get<Submission[]>(`/submissions/student/${studentId}`);
        return response.data;
    }
};
