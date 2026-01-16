import {AuthProvider as OidcAuthProvider, type AuthProviderProps} from "react-oidc-context"
import React from "react";

export type EasyOidcAuthProviderProps = {
    children: React.ReactNode;
} & AuthProviderProps

export function EasyOidcAuthProvider({children, ...props} : EasyOidcAuthProviderProps) {
    return (
        <OidcAuthProvider {...props}>
            {children}
        </OidcAuthProvider>
    )
}