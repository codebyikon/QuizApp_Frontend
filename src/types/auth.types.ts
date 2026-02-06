export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'student' | 'admin';
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
}

export interface AuthResponse {
    access_token: string;
    user: User;
}
