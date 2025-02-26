import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";

export const LoginForm = () => {

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const { store, actions } = useContext(Context)

	const navigate = useNavigate();

	useEffect(() => actions.resetRecoveryPassword(), [])

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (store.recoveryPassword) {
			// enviar email
			console.log("email: ");
			console.log(email);
			actions.recoveryPassword(email)
		} else {
			const success = await actions.login(email, password);
			if (success) {
				navigate("/profile");
			} else {
				alert("Email o contraseña incorrectos");
				navigate("/");
			}
		}
	};


	return (
		<>
			<div className="container d-flex flex-column align-items-center">
				<p className="form-title w-100">Welcome</p>
				<form className="form w-100" onSubmit={handleSubmit}>
					<div className="input-container">
						<input placeholder="Enter email" type="email" onChange={(e) => setEmail(e.target.value)} />
						<span>
							<svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
							</svg>
						</span>
					</div>
					{!store.recoveryPassword ?
						<div className="input-container">
							<input placeholder="Enter password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
							<span>
								<svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
									<path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
								</svg>
							</span>
						</div> : null}
					{!store.recoveryPassword ?
						<button className="submit" type="submit">Log in</button> :
						<>
							{/* <!-- Button trigger modal --> */}
							<button type="button" className="submit" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleSubmit}>
								Send email
							</button>

							{/* <!-- Modal --> */}
							<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
								<div className="modal-dialog">
									<div className="modal-content">
										<div className="modal-header">
											<h1 className="modal-title fs-5" id="exampleModalLabel">Reset password</h1>
											<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
										</div>
										<div className="modal-body">
											Check your email to reset your password
										</div>
									</div>
								</div>
							</div>
						</>
					}
				</form>
				{!store.recoveryPassword ? <a className="reset-pw" onClick={() => actions.setRecoveryPassword()}>Forgot your password?</a> : null}
			</div>
		</>
	)
}