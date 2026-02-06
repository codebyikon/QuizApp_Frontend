export interface Submission {
    _id: string;
    studentId: string;
    assessmentId: string | {
        _id: string;
        title: string;
        categoryId: string | {
            _id: string;
            name: string;
        };
        questions: any[];
        duration?: number;
    };
    answers: number[];
    score: number;
    totalQuestions: number;
    submittedAt: string;
}

export interface SubmitAssessmentDto {
    assessmentId: string;
    answers: number[];
}
