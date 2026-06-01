export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'student' | 'admin';
    sex?: 'male' | 'female';
    class_level?: 'NCE I' | 'NCE II' | 'NCE III';
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    name: string;
    email: string;
    password: string;
    role?: 'student' | 'admin';
    sex?: 'male' | 'female';
    class_level?: 'NCE I' | 'NCE II' | 'NCE III';
}

export interface AuthResponse {
    access_token: string;
    user: User;
}
