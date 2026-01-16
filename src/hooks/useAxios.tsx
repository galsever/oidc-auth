import React, { createContext, useContext, useEffect, useMemo } from 'react';
import Axios, { AxiosInstance } from 'axios';
import { useAuth } from "react-oidc-context";
import {api} from "../api/api";

const AxiosContext = createContext<AxiosInstance | null>(null);

export const AxiosProvider = ({ children }: { children: React.ReactNode }) => {
    const auth = useAuth();

    useEffect(() => {
        const interceptor = api.interceptors.request.use(
            (config) => {
                if (auth.user?.access_token) {
                    config.headers['Authorization'] = `Bearer ${auth.user.access_token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        return () => {
            api.interceptors.request.eject(interceptor);
        };
    }, [auth.user, api]);

    return (
        <AxiosContext.Provider value={api}>
            {children}
        </AxiosContext.Provider>
    );
};

export const useAxios = () => {
    const context = useContext(AxiosContext);
    if (!context) throw new Error("useAxios must be used within AxiosProvider");
    return context;
};