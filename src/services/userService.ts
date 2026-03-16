import axiosInstance from "./axiosInstance";
import axios from "axios" // manejo errores

export interface createUser {
    mail: string;
    nickname: string;
    password: string;
}

export interface User {
    _id: string;
    mail: string;
    nickname: string;
}


// Registrar usuario
export const registerUser = async (userData:createUser) => {
    try {
        const response = await axiosInstance.post("/user", userData);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)){
            throw new Error(
                error.response?.data?.message ?? "Error del servidor"
            );
        }
        if (error instanceof Error){
            throw new Error(error.message)
        }
        throw new Error("Error desconocido")
    }
};

// Login: busca usuario por nickname
export const getByNickname = async (nickname: string) => {
    try {
        const response = await axiosInstance.get<User>(`/user/profile/${encodeURIComponent(nickname)}`)
        return response.data;

    } catch (error: unknown) {
        console.log(error)
        console.error("Error al obtener el perfil del usuario:", error);
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
        const response = await axiosInstance.get<User[]>("/user");
        return response.data;
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        return [];
    }
};

export const getUserPosts = async (userData: User) => {
    try {
        const response = await axiosInstance.get(`/post/user/${userData._id}`);
        return (response.data || []);
    } catch (error) {
        console.error("Error al obtener publicaciones:", error);
        throw error
    }
};