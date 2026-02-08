export type LoginResponse = {
    access_token: string;
    refresh_token: string;
}
export type RegisterResponse = {
    id: string;
    email: string;
    name: string;
    role: string;
}