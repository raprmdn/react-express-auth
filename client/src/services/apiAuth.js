import axios from "axios";
import { store } from "../app/store";
import { reset, setAccessToken } from "../features/authSlice";

const URL = "http://localhost:5000";

const instance = axios.create({
    baseURL: URL,
});

instance.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.data.accessToken
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalConfig = error.config;
        if (error.response?.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;
            originalConfig.headers = JSON.parse(JSON.stringify(originalConfig.headers));
            try {
                const response = await axios.post(`${URL}/api/auth/refresh-token`, {
                    refreshToken: store.getState().auth.data.refreshToken
                });
                store.dispatch(setAccessToken(response.data.data.accessToken));
                return instance(originalConfig);
            } catch (e) {
                store.dispatch(reset());
                return Promise.reject(e);
            }
        }
        return Promise.reject(error);
    },
);

export default instance;
