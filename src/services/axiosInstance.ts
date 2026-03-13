import axios from "axios"
import type { InternalAxiosRequestConfig } from "axios"

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
    const token = localStorage.getItem("token")

    if (
      err.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/refresh"
    ){

      originalRequest._retry = true

      try {

        const response = await axios.post(
          "http://localhost:3000/auth/refresh",
          {},
          { withCredentials: true }
        )

        const newToken = response.data.accessToken

        localStorage.setItem("token", newToken)

        originalRequest.headers = originalRequest.headers || {}
        originalRequest.headers.Authorization = `Bearer ${newToken}`

        return axiosInstance(originalRequest)

      } catch (error) {

        localStorage.removeItem("token")
        localStorage.removeItem("user")

        if (token){
          window.dispatchEvent(new Event("auth_error"))
        }

        return Promise.reject(error)
      }
    }

    return Promise.reject(err)
  }
)

export default axiosInstance