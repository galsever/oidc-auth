# oidc-auth
For React + Vite

## Dependencies
- react
- axios
- react-oidc-context
- oidc-client-ts

To install:

```bash
bun install @gal_sever/oidc-auth
```

Create a OIDC Provider Config:
```ts
const oidcConfig = {
    authority: "authority",
    client_id: "clientid",
    redirect_uri: "redirect url", // has to match the one in the oidc provider
    response_type: "code",
    scope: "openid profile email offline_access",
    userStore: new WebStorageStateStore({ store: window.localStorage }),
    automaticSilentRenew: true,
    onSigninCallback: () => {
        window.history.replaceState({}, document.title, window.location.pathname);
        window.location.replace("/");
    }
};
```

Then inside main.tsx add the EasyOidcAuthProvider and the AxiosProvider
```ts
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AxiosProvider>
          <EasyOidcAuthProvider>
              <App />
          </EasyOidcAuthProvider>
      </AxiosProvider>
  </StrictMode>,
)
```
