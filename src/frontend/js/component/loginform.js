import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => actions.resetRecoveryPassword(), []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (store.recoveryPassword) {
            const success = await actions.forgotPassword(email);
            if (success) {
                setSuccessMessage("Check your email to reset your password.");
            } else {
                setSuccessMessage("Error sending reset email. Please try again.");
            }
        } else {
            const success = await actions.login(email, password);
            if (success) {
                navigate("/profile");
            } else {
                alert("Email or password is incorrect.");
                navigate("/");
            }
        }
    };

    return (
        <>
            <div className="container d-flex flex-column align-items-center">
                <p className="form-title w-100">Welcome</p>
                <form className="form w-100" onSubmit={handleSubmit} autoComplete="off">
                    <div className="input-container">
                        <input
                            autoComplete="off"
                            placeholder="Enter email"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {!store.recoveryPassword ? (
                        <div className="input-container">
                            <input
                                placeholder="Enter password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    ) : null}

                    {!store.recoveryPassword ? (
                        <button className="submit" type="submit">Log in</button>
                    ) : (
                        <button className="submit" type="submit">
                            Send email
                        </button>
                    )}
                </form>
                {!store.recoveryPassword && (
                    <a className="reset-pw" onClick={() => actions.setRecoveryPassword()}>
                        Forgot your password?
                    </a>
                )}

                {store.recoveryPassword && successMessage && (
                    <div className={"alert mt-3 " + (successMessage.includes("Error") ? "alert-danger" : "alert-success")} role="alert">
                        {successMessage}
                    </div>
                )}


            </div>
        </>
    );
};
