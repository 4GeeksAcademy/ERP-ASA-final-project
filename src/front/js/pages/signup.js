import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/signup.css";
import { SignupForm } from "../component/signupform";

export const Signup = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="form-style flex-column">
			<p className="form-title-2 mt-2">{store.workerData.id ? "Update worker data" : "Add a new worker"}</p>
			<SignupForm/>
		</div>
	);
};
