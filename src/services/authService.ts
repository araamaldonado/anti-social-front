import axios from "axios";
import axiosInstance from "./axiosInstance";
import type { User } from "./userService";


export interface RefreshResponse{
    accessToken: string
}

export interface userLogin {
    nickname: string;
    password: string;
}

export interface LoginResponse {
    user: User;
    accessToken: string;
}


export const loginUser = async (loginData: userLogin): Promise<LoginResponse> => {
    try {

        const response = await axiosInstance.post("/user/login/", loginData);

        return response.data;

    } catch (error: unknown) {

        console.error("Error al iniciar sesión:", error);
        const message =
            axios.isAxiosError(error)
                ? (error.response?.data as { message?: string })?.message ?? "Usuario no encontrado"
                : error instanceof Error
                    ? error.message
                    : String(error);
        throw message;

    }
};

export const logoutUser = async () => {
    await axiosInstance.post("/auth/logout", {}, {
        withCredentials: true
    })
}

export const refreshToken = async () => {
    const response =  await axiosInstance.post<RefreshResponse>(
        "http://localhost:3000/auth/refresh", {},
        { withCredentials: true }
    )

    return response.data.accessToken
}