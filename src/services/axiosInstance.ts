import axios from "axios"
import type { AxiosError, InternalAxiosRequestConfig } from "axios"
import { logoutUser, refreshToken } from "./authService"
import toast from "react-hot-toast"

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

interface FailedRequest {
  resolve: (token: string | null) => void;
  reject: (error: AxiosError | unknown) => void;
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true
})

// REQUEST

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {

  const token = localStorage.getItem("token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// RESPONSE


let estaRecargando = false;
let colaDeFallas: FailedRequest[] = [];

const colaDeProcesos = (error: AxiosError | null, token: string | null = null) => {
  colaDeFallas.forEach((promise) => {
    if(error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  colaDeFallas = []
}


axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    
    if (err.response?.status === 429) {
      toast.error("Vas muy rápido. Por favor, espera un momento.");
      return Promise.reject(err);
    }

    const originalRequest = err.config as CustomAxiosRequestConfig;

    if (err.response?.status === 401 && !originalRequest._retry &&
      originalRequest.url !== "/auth/refresh" && !originalRequest.url?.includes("/user/login")) {

      if (estaRecargando) {
        return new Promise((resolve, reject) => {
          colaDeFallas.push({resolve, reject});
        })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest)
        })
        .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true;
      estaRecargando = true;

      return new Promise((resolve, reject) => {
        refreshToken()
          .then((newToken) => {
            localStorage.setItem("token", newToken);

            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newToken}`

            originalRequest.headers.Authorization = `Bearer ${newToken}`

            colaDeProcesos(null, newToken);
            resolve(axiosInstance(originalRequest))
          })
          .catch((error) => {
            const axiosError = error as AxiosError;

            if (axiosError.response?.status === 429){
              colaDeProcesos(null, null);
              toast.error("Error al refrescar: Demasiadas peticiones");
              reject(error);
              return;
            }

            colaDeProcesos(error, null);
            localStorage.removeItem("token")
            localStorage.removeItem("user")

            logoutUser().catch(() => console.warn("No se pudo cerrar sesión en server"))
            window.dispatchEvent(new Event("auth_error"));
            reject(error);
          })
          .finally(() => {
            estaRecargando = false
          })
      })
    }
    return Promise.reject(err);
  }
);

export default axiosInstance