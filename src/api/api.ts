import axios from 'axios';
import type {AxiosInstance} from "axios";

export const api: AxiosInstance = axios.create({
    baseURL: process.env.BACKEND_URL!,
    headers: {
        "Content-Type": "application/json",
    }
})