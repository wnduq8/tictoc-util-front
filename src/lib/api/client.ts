import axios from 'axios'
import Cookies from 'js-cookie'
import { JWT_NAME } from '@lib/constants'

const client = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_SERVER || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
})

client.interceptors.request.use(
  async (config) => {
    const jwt = Cookies.get(JWT_NAME) || ''

    config.headers = {
      Authorization: `Bearer ${jwt}`,
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

client.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      Cookies.remove(JWT_NAME)
      window.location.href = '/login'
      return
    }
    return Promise.reject(error)
  },
)

export default client
