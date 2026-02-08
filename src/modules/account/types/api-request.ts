export type RegisterRequest = {
    username: string;
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
}

export type LogInRequest = {
    username: string;
    password: string;
}