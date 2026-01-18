import React, { createContext, useContext, useEffect, useRef } from 'react';
import { AxiosInstance } from 'axios';
import { useAuth } from "react-oidc-context";
import { api } from "../api/api";

const AxiosContext = createContext<AxiosInstance | null>(null);

export const AxiosProvider = ({ children }: { children: React.ReactNode }) => {
    const auth = useAuth();

    const tokenRef = useRef<string | undefined>(undefined);

    useEffect(() => {
        tokenRef.current = auth.user?.id_token;
    }, [auth.user]);

    useEffect(() => {
        const interceptor = api.interceptors.request.use(
            (config) => {
                const token = tokenRef.current;

                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        return () => {
            api.interceptors.request.eject(interceptor);
        };
    }, []);

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