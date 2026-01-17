import axios from 'axios';
import type {AxiosInstance} from "axios";

export let api: AxiosInstance;

export function initApi(backendUrl: string) {
    api = axios.create({
        baseURL: backendUrl,
        headers: {
            "Content-Type": "application/json",
        }
    })
}