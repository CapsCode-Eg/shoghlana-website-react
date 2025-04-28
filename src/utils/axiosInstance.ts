import axios, { InternalAxiosRequestConfig } from "axios";
export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
});

// if (typeof window !== 'undefined') {
//   const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
//   if (!isLocalhost) {
//     axiosInstance.defaults.withXSRFToken = true;
//     axiosInstance.defaults.withCredentials = true;
//   }
// }

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers['Accept'] = 'application/json';
  if(window.localStorage.getItem('token')) config.headers['Authorization'] = `Bearer ${window.localStorage.getItem('token')}`
  return config;
});


// For Status Codes 
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response.status === 401 
      // error.response.data.message === "You are not authenticated"
    ) {
          window.localStorage.clear();
          window.location.replace("/");
    } 
    return Promise.reject(error);
  }
);

export default axiosInstance;
