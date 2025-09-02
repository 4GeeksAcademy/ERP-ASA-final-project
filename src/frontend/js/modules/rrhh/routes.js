import React from "react";
import { Employees } from "./employeesPage";
import { EmployeeData } from "./employeeDataPage";
import { Profile } from "./profilePage";
import { Signup } from "./signupPage";

export const hrRoutes = [
    { path: "/employees", element: <Employees /> },
    { path: "/employee/:id", element: <EmployeeData /> },
    { path: "/profile", element: <Profile />, roles: ["user", "admin"] },
    { path: "/signup", element: <Signup /> },
];