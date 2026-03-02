import axios from "axios";
import type { User } from "../context/UserContext";

const API_URL = "http://localhost:3000";

export interface createUser {
    mail: string;
    nickname: string;
    password: string;
}

export interface userLogin {
    nickname: string;
    password: string;
}

export interface LoginResponse {
    user: User;
    token: string;
}

export interface User {
    _id: string;
    mail: string;
    nickname: string;
}

// Registrar usuario
export const registerUser = async (userData:createUser) => {
    try {
        const response = await axios.post(`${API_URL}/user`, userData);
        return response.data;
    } catch (error: unknown) {
        console.error("Error al registrar usuario:", error);
        const message =
            axios.isAxiosError(error)
                ? error.response?.data?.message ?? "Error en el registro"
                : error instanceof Error
                    ? error.message
                    : String(error);
        throw message;
    }
};

// Login: busca usuario por nickname
export const getByNickname = async (nickname: string) => {
    try {
        const response = await axios.get<User>(`${API_URL}/user/profile/${encodeURIComponent(nickname)}`);
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

// Login:
export const loginUser = async (loginData: userLogin): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>(`${API_URL}/user/login/`, loginData);
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

// Obtener todos los usuarios
export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await axios.get<User[]>(`${API_URL}/user`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        return [];
    }
};

export const getUserPosts = async (userData: User) => {
    try {
        const response = await axios.get(`${API_URL}/post/user/${{userData}._id}`);
        return (response.data || []);
    } catch (error) {
        console.error("Error al obtener publicaciones:", error);
    }
};