import axios from 'axios'
import Qs from 'qs'
import { API_URL, ACCESS } from 'shared/config/api'
import { ROUTES } from 'shared/config/routes'
import { getToken } from 'shared/api/lib'

export const apiInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "http://192.168.1.101:3150",
    },
    withCredentials: true,
    baseURL: API_URL,
    paramsSerializer: function(params) {
        return Qs.stringify(params, { arrayFormat: 'comma' })
    }
})

apiInstance.interceptors.request.use(
    async (config) => {
        const token = getToken()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

apiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config
        if ((error?.response?.status === 401 || error?.response?.status === 403) && !originalRequest._retry) {
            originalRequest._retry = true
            try {
                const response = await axios.post<{ access: string, token_type: string }>(`${API_URL}/jwt_login/refresh_token`)
                apiInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`
                localStorage.setItem(ACCESS, response.data.access)
                return apiInstance(originalRequest)
            } catch (refreshError) {
                localStorage.clear()
                try {
                    await axios.get(API_URL + "/jwt/logout")
                    window.location.href = ROUTES.LOGIN
                    return Promise.reject(refreshError)
                } catch(logoutError) {
                    window.location.href = ROUTES.LOGIN
                    return Promise.reject(logoutError)
                }
            }
        }
        return Promise.reject(error)
    }
)
