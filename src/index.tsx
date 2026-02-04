import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainApplication from "./components/pages/MainApplication";
import SettingsApplication from "./components/pages/SettingsAppliation";
import IntroApplication from "./components/pages/IntroApplication";
import AuthNavigator from "./components/pages/AuthNavigator";
import KakaoAD from "./components/ui/KakaoAD";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App child={<AuthNavigator login={<MainApplication />} no_login={<IntroApplication />} />} />
    },
    {
        path: '/settings',
        element: <App child={<SettingsApplication />} />
    }
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
        <div />
        <KakaoAD />
    </React.StrictMode>,
)