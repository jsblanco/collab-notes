import axios from "axios";

const baseUrl = 'xxxxxxxxx';

export const axiosInstance = axios.create({
    baseURL: baseUrl,
// @ts-ignore
    "Content-Type": "application/json"
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);

declare module 'axios' {
    export interface AxiosRequestConfig {
        title?: string,
    }
}
