import { BackendResponse } from "@/libs/shared/types/backend-response";
import { LogInRequest, RegisterRequest } from "../types/api-request";
import { LoginResponse, RegisterResponse } from "../types/api-response";
import api from "@/services/axios";
import { ApiUrls } from "@/config/url";

export const onLoginApi = async (
    payload: LogInRequest
) : Promise<BackendResponse<LoginResponse>> => {
    console.log("api: ",ApiUrls.apiBaseUrl);
    const {username, password} = payload
    const data = await api.post("auth/login", {
        username,
        password
    })
    return data.data
}
export const onRegisterApi = async(
    payload: RegisterRequest
) : Promise<BackendResponse<RegisterResponse>> => {
    const {email, name, password, username, confirmPassword: confirmPassword} = payload
    const data = await api.post("/auth/register", {
        email,
        name, 
        password,
        username,
        confirmPassword
    })
    return data.data
}