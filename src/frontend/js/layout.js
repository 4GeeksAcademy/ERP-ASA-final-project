import React, { useActionState, useState, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./modules/base/scrollToTop";
import { BackendURL } from "./modules/base/backendURL";

import { Navbar} from "./modules/base/navbar"

import { baseRoutes } from "./modules/base/routes";
import { authRoutes } from "./modules/auth/routes";
import { hrRoutes } from "./modules/rrhh/routes";

import { Footer } from "./modules/base/footer"

import injectContext from "./store/appContext";


const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    const allRoutes = [
        ...baseRoutes,
        ...authRoutes,
        ...hrRoutes,
        { path: "/unauthorized", element: <h1>Unauthorized</h1> },
        { path: "*", element: <h1>Not found!</h1> }
    ];

    return (
        <BrowserRouter basename={basename}>
            <ScrollToTop>
                <Navbar/>
                    <Routes>
                        {allRoutes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                element={route.element}
                            />
                        ))}
                    </Routes>
                <Footer/>
            </ScrollToTop>
        </BrowserRouter>
    );
};

export default injectContext(Layout);
