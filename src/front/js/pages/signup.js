import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { SignupForm } from "../component/signupform";

export const Signup = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="form-style">
			<SignupForm/>
		</div>
	);
};
