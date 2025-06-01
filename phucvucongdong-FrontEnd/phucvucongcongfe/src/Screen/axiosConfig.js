

import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5093",
});

axios.interceptors.request.use(
    (config) => {
        const token = Cookies.get("jwtToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            Cookies.remove("jwtToken");
            Cookies.remove("user");
            Cookies.remove("nguoi_dung_id");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;