import axios from 'axios'
import Cookies from 'js-cookie'

const client = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_SERVER || 'http://localhost:8080',
  headers: {
    Authorization: `Bearer ${Cookies.get('Tct') ?? ''}`,
    'Content-Type': 'application/json',
  },
})

client.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      Cookies.remove('Tct')
      return null
    }
    return Promise.reject(error)
  },
)

export default client
