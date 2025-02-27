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
			actions.recoveryPassword(email)
			actions.resetRecoveryPassword()
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
				<form className="form w-100" onSubmit={handleSubmit} autofill="off">
					<div className="input-container">
						<input autocomplete="off" placeholder="Enter email" type="email" onChange={(e) => setEmail(e.target.value)} />
					</div>
					{!store.recoveryPassword ?
						<div className="input-container">
							<input placeholder="Enter password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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