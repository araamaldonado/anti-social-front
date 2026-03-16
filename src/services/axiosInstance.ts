import axios from "axios"
import type { InternalAxiosRequestConfig } from "axios"
import { logoutUser, refreshToken } from "./authService"

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true
})

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {

  const token = localStorage.getItem("token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

axiosInstance.interceptors.response.use(
  (res) => res,

  async (err) => {

    const originalRequest = err.config as CustomAxiosRequestConfig

    if (
      err.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/refresh" &&
      !originalRequest.url?.includes("/user/login")
    ){

      originalRequest._retry = true

      try {

        const newToken = await refreshToken()

        localStorage.setItem("token", newToken)

        originalRequest.headers = originalRequest.headers || {}
        originalRequest.headers.Authorization = `Bearer ${newToken}`

        return axiosInstance(originalRequest)

      } catch (error) {

        localStorage.removeItem("token")
        localStorage.removeItem("user")
        try {
            await logoutUser();
        } catch {
            // Ignoramos errores aquí, ya que el usuario igual será deslogueado localmente
            console.warn("No se pudo cerrar sesión en el servidor, pero se limpió localmente.");
        }

        window.dispatchEvent(new Event("auth_error"))

        return Promise.reject(error)
      }
    }
    return Promise.reject(err)
  }
)

export default axiosInstance