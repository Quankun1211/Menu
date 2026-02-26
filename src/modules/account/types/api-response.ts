export type LoginResponse = {
    access_token: string;
    refresh_token: string;
    role: string
}
export type RegisterResponse = {
    id: string;
    email: string;
    name: string;
    role: string;
}