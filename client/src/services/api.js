import axios from "axios";

const URL = "http://localhost:5000";

export const registerAPI = async (user) => {
    try {
        return await axios.post(`${URL}/api/auth/register`, {
            name: user.name,
            username: user.username,
            email: user.email,
            password: user.password,
            password_confirmation: user.password_confirmation,
        });
    } catch (e) {
        throw e;
    }
};

export const loginAPI = async (user) => {
    try {
        return await axios.post(`${URL}/api/auth/login`, {
            email: user.email,
            password: user.password,
        });
    } catch (e) {
        throw e;
    }
};
