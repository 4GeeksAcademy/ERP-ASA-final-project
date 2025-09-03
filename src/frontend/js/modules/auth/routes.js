import React from "react";
import { Login } from "./loginPage";
import { ResetPassword } from "./resetPasswordPage";


export const authRoutes = [
    { path: "/login", element: <Login /> },
    { path: "/reset-password/:token", element: <ResetPassword /> }
];