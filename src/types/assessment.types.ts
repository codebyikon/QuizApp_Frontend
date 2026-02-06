export interface Question {
    text: string;
    options: string[];
    correctAnswer: number;
}

export interface Assessment {
    _id: string;
    title: string;
    categoryId: string | {
        _id: string;
        name: string;
        description?: string;
    };
    questions: Question[];
    duration?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateAssessmentDto {
    title: string;
    categoryId: string;
    questions: Question[];
    duration?: number;
}

export interface UpdateAssessmentDto {
    title?: string;
    categoryId?: string;
    questions?: Question[];
    duration?: number;
}
