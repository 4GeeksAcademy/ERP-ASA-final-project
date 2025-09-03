import { Context } from "../../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";

export const ResetPasswordForm = (token) => {
    const { store, actions } = useContext(Context);

    const [password, setPassword] = useState("");
    const [tokenFormatted, setTokenFormatted] = useState(token.token.replaceAll("-", "."));


    const navigate = useNavigate();

    useEffect(() => {
        console.log(tokenFormatted)
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(tokenFormatted)
        console.log(password);

        actions.resetPassword(token.token, password)
        // navigate("/login")
    };

    return (
        <>
            <div className="container d-flex flex-column align-items-center">
                <p className="form-title w-100">Reset Password</p>
                <form className="form w-100" onSubmit={handleSubmit} autoComplete="off">
                    <div className="input-container">
                        <input
                            placeholder="Enter new password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className="submit" type="submit">Change password</button>
                </form>


                {/* {store.recoveryPassword && successMessage && (
                    <div className={"alert mt-3 " + (successMessage.includes("Error") ? "alert-danger" : "alert-success")} role="alert">
                        {successMessage}
                    </div>
                )} */}


            </div>
        </>
    );
};
