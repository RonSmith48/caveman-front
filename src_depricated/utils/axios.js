import axios from 'axios';

const axiosServices = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3010/' });

axiosServices.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('serviceToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosServices.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      // Attempt to refresh the token
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const refreshResponse = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:3010/'}token/refresh/`, {
          refresh: refreshToken
        });

        const newAccessToken = refreshResponse.data.access;
        localStorage.setItem('serviceToken', newAccessToken);

        // Retry the original request with the new token
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosServices(originalRequest);
      } catch (refreshError) {
        // If the token refresh fails, redirect to the login page
        if (refreshError.response && refreshError.response.status === 401) {
          localStorage.removeItem('serviceToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login'; // Redirect to login page
        }
      }
    }

    return Promise.reject((error.response && error.response.data) || 'Wrong Services');
  }
);

export default axiosServices;

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosServices.get(url, { ...config });
  return res.data;
};

export const fetcherPost = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosServices.post(url, { ...config });
  return res.data;
};
